import { useLoginUserMutation } from '@/graphql/generated/output';
import { AUTH_ROUTES } from '@/lib/router.config';
import { AppStore } from '@/store/App.store';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { ILoginForm } from './AuthForm.type';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUserData } = AppStore;
  const [loginUserMutation] = useLoginUserMutation();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    loginUserMutation({
      variables: { loginDto: data },
      async onCompleted({ loginUser }) {
        const { toast } = await import('react-hot-toast');
        toast.success(`Продуктивной работы, ${loginUser.firstName}!`, {
          id: 'login-success',
          duration: 2000,
        });

        setUserData(loginUser);
        navigate(AUTH_ROUTES.MAIN);
      },
      async onError(error) {
        const { toast } = await import('react-hot-toast');
        toast.error(error.message, {
          id: 'login-error',
        });
      },
    });
  };

  return {
    onSubmit,
  };
};
