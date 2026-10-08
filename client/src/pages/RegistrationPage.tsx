import { Button } from '@/shared/ui/Button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card';
import { FieldDescription, FieldLabel } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import { useRegistrationUserMutation, type RegistrationDto } from '@/shared/api/generated/output';
import { AUTH_ROUTES, PUBLIC_ROUTES } from '@/shared/config/routes';
import { AppStore } from '@/shared/model/App.store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { NavLink, useNavigate } from 'react-router';

const STEP_DESCRIPTION = [
  'Укажите Фамилию, Имя, Отчество (необязательно)',
  'Введите E-mail и логин для последующего входа в систему',
  'Введите и повторите пароль для создания вашего профиля',
];

interface IRegistrationForm extends RegistrationDto {
  repeatPassword?: string;
}

export const RegistrationPage = observer(() => {
  const navigate = useNavigate();
  const [step, setSep] = useState(0);

  const { setUserData } = AppStore;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>({
    mode: 'onChange',
  });

  const [registrationUserMutation] = useRegistrationUserMutation();

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    delete data.repeatPassword;

    registrationUserMutation({
      variables: {
        registrationDto: data,
      },
      async onCompleted({ registrationUser }) {
        const { toast } = await import('react-hot-toast');
        toast.success(`Успешно зарегистрирован!`, {
          id: 'register-success',
        });

        setUserData(registrationUser);
        navigate(AUTH_ROUTES.MAIN);
      },
      async onError(error) {
        const { toast } = await import('react-hot-toast');
        toast.error(error.message, {
          id: 'register-error',
        });
      },
    });
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <Card className="gap-3 py-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Шаг {step + 1} из 3</CardTitle>
          <CardDescription className="col-span-2">{STEP_DESCRIPTION[step]}</CardDescription>
          <CardAction className="h-full">
            <NavLink className="flex items-center h-full underline" to={PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.AUTH)}>
              Уже есть аккаунт?
            </NavLink>
          </CardAction>
        </CardHeader>
        <CardContent>
          {step === 0 && (
            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <FieldLabel htmlFor="lastName">Фамилия</FieldLabel>
                <Input id="lastName" {...register('lastName', { required: true })} type="text" />
              </div>
              <div className="grid gap-2">
                <FieldLabel htmlFor="firstName">Имя</FieldLabel>
                <Input id="firstName" {...register('firstName', { required: true })} type="text" />
              </div>
              <div className="grid gap-2">
                <FieldLabel htmlFor="middlename">Отчество</FieldLabel>
                <Input id="middlename" {...register('middleName')} type="text" />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input id="email" type="email" {...register('email', { required: true })} placeholder="test@mail.ru" />
              </div>
              <div className="grid gap-2">
                <FieldLabel htmlFor="login">Логин</FieldLabel>
                <Input
                  id="login"
                  {...register('login', {
                    required: true,
                    validate: {
                      minLength: (value: string) => {
                        if (value.length < 4) return 'Минимальная длина - 4 символа';
                      },
                    },
                  })}
                  type="text"
                />
                <FieldDescription className="text-xs text-red-500">{errors.login?.message}</FieldDescription>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <FieldLabel htmlFor="password">Пароль</FieldLabel>
                <Input id="password" {...register('password', { required: true })} type="password" />
              </div>
              <div className="grid gap-2">
                <FieldLabel htmlFor="repeat-password">Повторите пароль</FieldLabel>
                <Input
                  id="repeat-password"
                  {...register('repeatPassword', {
                    required: true,
                    validate: (val?: string) => val === watch('password') || 'Пароли не совпадают',
                  })}
                  type="password"
                />
                <FieldDescription className="text-xs text-red-500">{errors.repeatPassword?.message}</FieldDescription>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {step === 2 && (
            <Button type="submit" className="w-full">
              Зарегистрироваться
            </Button>
          )}

          {step < 2 && (
            <Button className="w-full" type="button" onClick={() => setSep((prev) => prev + 1)}>
              Следующий шаг
            </Button>
          )}

          {step > 0 && (
            <Button variant="outline" type="button" className="w-full" onClick={() => setSep((prev) => prev - 1)}>
              Назад
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
});

