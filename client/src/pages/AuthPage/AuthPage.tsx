import { Button } from '@/components/ui/Button';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useLoginUserMutation } from '@/graphql/generated/output';
import { AUTH_ROUTES } from '@/lib/router.config';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface ILoginForm {
  login: string;
  password: string;
}

export default function AuthPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const [loginUserMutation] = useLoginUserMutation();

  const onSubmit: SubmitHandler<ILoginForm> = (data) =>
    loginUserMutation({
      variables: { loginDto: data },
      async onCompleted({ loginUser }) {
        const { toast } = await import('react-hot-toast');
        toast.success(`Продуктивной работы, ${loginUser.firstName}!`, {
          id: 'login-success',
          duration: 2000,
        });
        navigate(AUTH_ROUTES.MAIN);
      },
      async onError(error) {
        const { toast } = await import('react-hot-toast');
        toast.error(error.message, {
          id: 'login-error',
        });
      },
    });

  return (
    <div className="w-3/4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Логин или E-mail</FieldLabel>
              <Input id="username" {...register('login', { required: true })} type="text" placeholder="test@mail.ru" />
            </Field>
            <Field>
              <FieldDescription>Пароль</FieldDescription>
              <Input
                id="password"
                {...register('password', { required: true })}
                type="password"
                placeholder="••••••••"
              />
            </Field>
          </FieldGroup>
          <Button type="submit">Войти</Button>
        </FieldSet>
      </form>
    </div>
  );
}
