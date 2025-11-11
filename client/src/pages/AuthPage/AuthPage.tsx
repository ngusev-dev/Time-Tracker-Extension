import { Button } from '@/components/ui/Button';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import type { ILoginForm } from './AuthForm.type';
import { useAuth } from './useAuth';

const AuthPage = observer(() => {
  const { onSubmit } = useAuth();

  const { register, handleSubmit } = useForm<ILoginForm>({
    mode: 'onChange',
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
});

export default AuthPage;
