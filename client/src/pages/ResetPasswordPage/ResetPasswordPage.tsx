import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useResetPasswordMutation, useValidateResetCodeMutation } from '@/graphql/generated/output';
import { PUBLIC_ROUTES } from '@/lib/router.config';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router';

interface IResetPasswordForm {
  email: string;
  code: number;
  password: string;
}

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);

  const { getValues, register, control } = useForm<IResetPasswordForm>({
    mode: 'onChange',
  });

  const [resetPasswordMutation] = useResetPasswordMutation();
  const [validateResetCodeMutation] = useValidateResetCodeMutation();

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
          if (validateResetCode.length) setStep((prev) => prev + 1);
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
            {step === 1 && 'Введите E-mail от аккаунта, для восстанволения доступа'}
            {step === 2 && 'Введите код подтверждения, отправленный на вашу почту'}
            {step === 3 && 'Укажите новый пароль от аккаунта'}
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
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="repeat-password"
                  className="placeholder:text-sm"
                  placeholder="Повоторите пароль"
                  type="password"
                />
                {/* <FieldDescription className="text-xs text-red-500">{errors.repeatPassword?.message}</FieldDescription> */}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="button" className="w-full" onClick={onClickHandler}>
            Далее
          </Button>
          {(step === 1 || step === 3) && (
            <Button variant="outline" className="w-full" asChild>
              <NavLink to={PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.AUTH)}>Войти в систему</NavLink>
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
