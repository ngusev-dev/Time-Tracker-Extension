import { Button } from '@/shared/ui/Button';
import { FieldLabel } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/features/auth';
import { Card, CardContent, CardFooter } from '@/shared/ui/Card';
import { NavLink } from 'react-router';
import { PUBLIC_ROUTES } from '@/shared/config/routes';
import type { LoginDto } from '@/shared/api/generated/output';

export const LoginPage = observer(() => {
  const { onSubmit } = useLogin();

  const { register, handleSubmit } = useForm<LoginDto>({
    mode: 'onChange',
  });

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <FieldLabel htmlFor="username">Логин или E-mail</FieldLabel>
              <Input id="username" {...register('login', { required: true })} type="text" placeholder="test@mail.ru" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <FieldLabel>Пароль</FieldLabel>
                <NavLink
                  to={PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.RESET_PASSWORD)}
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Забыли пароль?
                </NavLink>
              </div>

              <Input
                id="password"
                {...register('password', { required: true })}
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Войти
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <NavLink to={PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.REGISTER)}>Создать аккаунт</NavLink>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
});

