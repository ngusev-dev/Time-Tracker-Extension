/* eslint-disable @typescript-eslint/no-unused-vars */
import Skeleton from '@/components/ui/Skeleton';
import { useValidateSessionQuery } from '@/graphql/generated/output';
import { PUBLIC_ROUTES } from '@/lib/router.config';
import { useState, useTransition } from 'react';
import { Outlet, useNavigate } from 'react-router';

export default function BaseLayout() {
  const navigate = useNavigate();
  const [_, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  useValidateSessionQuery({
    onCompleted() {
      setIsLoading(false);
    },
    onError(error) {
      const { extensions } = error.graphQLErrors[0];
      if (extensions.originalError.statusCode === 401) navigate(PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.AUTH));
      startTransition(() => {
        setIsLoading(false);
      });
    },
  });

  if (isLoading) return <Skeleton className="h-[450px] w-[550px]" />;
  return <Outlet />;
}
