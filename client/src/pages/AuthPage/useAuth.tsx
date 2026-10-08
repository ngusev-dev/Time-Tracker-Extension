import { useLoginUserMutation, type LoginDto } from '@/graphql/generated/output';
import { AUTH_ROUTES } from '@/lib/router.config';
import { AppStore } from '@/store/App.store';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUserData } = AppStore;
  const [loginUserMutation] = useLoginUserMutation();

  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    try {
      const { data: result } = await loginUserMutation({ variables: { loginDto: data } });
      if (!result?.loginUser) {
        return;
      }
      const { toast } = await import('react-hot-toast');
      toast.success(`Продуктивной работы, ${result.loginUser.firstName}!`, { id: 'login-success', duration: 2000 });
      setUserData(result.loginUser);
      navigate(AUTH_ROUTES.MAIN);
    } catch (error) {
      const { toast } = await import('react-hot-toast');
      toast.error(error instanceof Error ? error.message : 'Произошла ошибка при авторизации', { id: 'login-error' });
    }
  };

  return {
    onSubmit,
  };
};
