import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import {
  useChangePasswordMutation,
  useResetPasswordMutation,
  useValidateResetCodeMutation,
} from '@/graphql/generated/output';
import { PUBLIC_ROUTES } from '@/lib/router.config';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';

interface IResetPasswordForm {
  email: string;
  code: number;
  password: string;
  repeatPassword: string;
  token: string;
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const {
    getValues,
    register,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<IResetPasswordForm>({
    mode: 'onChange',
  });

  const [resetPasswordMutation] = useResetPasswordMutation();
  const [validateResetCodeMutation] = useValidateResetCodeMutation();
  const [changePasswordMutation] = useChangePasswordMutation();

  const onClickHandler = async () => {
    if (step === 1) {
      await resetPasswordMutation({
        variables: {
          email: getValues('email'),
        },
        async onCompleted({ resetPassword }) {
          if (resetPassword) setStep((prev) => prev + 1);
        },
        async onError(error) {
          const { toast } = await import('react-hot-toast');
          toast.error(error.message, {
            id: 'reset-password-error',
          });
        },
      });
    } else if (step === 2) {
      await validateResetCodeMutation({
        variables: {
          email: getValues('email'),
          code: getValues('code'),
        },
        async onCompleted({ validateResetCode }) {
          setValue('token', validateResetCode);
          setStep((prev) => prev + 1);
        },
        async onError(error) {
          const { toast } = await import('react-hot-toast');
          toast.error(error.message, {
            id: 'reset-password-error',
          });
        },
      });
    } else if (step === 3) {
      if (!isValid) return;

      await changePasswordMutation({
        variables: {
          email: getValues('email'),
          password: getValues('password'),
          token: getValues('token'),
        },
        async onCompleted() {
          const { toast } = await import('react-hot-toast');
          toast.success('Пароль успешно изменен', {
            id: 'reset-password-success',
          });
          navigate(PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.AUTH));
        },
        async onError(error) {
          const { toast } = await import('react-hot-toast');
          toast.error(error.message, {
            id: 'reset-password-error',
          });
        },
      });
    }
  };

  return (
    <form className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Восстановление доступа</CardTitle>
          <CardDescription>
            {step === 1 && 'Введите E-mail от аккаунта, для восстановления доступа'}
            {step === 2 && 'Введите код подтверждения, отправленный на вашу электронную почту'}
            {step === 3 && 'Введите новый пароль'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <Input id="email" {...register('email', { required: true })} type="email" placeholder="test@mail.ru" />
          )}
          {step === 2 && (
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={(e) => field.onChange(+e)}>
                  <InputOTPGroup className="w-full justify-center">
                    {[0, 1, 2, 3].map((index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          )}
          {step === 3 && (
            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <Input
                  id="password"
                  placeholder="Введите новый пароль"
                  className="placeholder:text-sm"
                  type="password"
                  {...register('password', { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="repeat-password"
                  className="placeholder:text-sm"
                  placeholder="Повоторите пароль"
                  type="password"
                  {...register('repeatPassword', {
                    required: true,
                    validate: (val?: string) => val === watch('password') || 'Пароли не совпадают',
                  })}
                />
                <FieldDescription className="text-xs text-red-500">{errors.repeatPassword?.message}</FieldDescription>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="button" className="w-full" onClick={onClickHandler}>
            Далее
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <NavLink to={PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.AUTH)}>Войти в систему</NavLink>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
