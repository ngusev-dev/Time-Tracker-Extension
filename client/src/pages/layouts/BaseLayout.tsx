/* eslint-disable @typescript-eslint/no-unused-vars */
import Skeleton from '@/components/ui/Skeleton';
import { useProfileDataQuery } from '@/graphql/generated/output';
import { PUBLIC_ROUTES } from '@/lib/router.config';
import { AppStore } from '@/store/App.store';
import { observer } from 'mobx-react-lite';
import { useState, useTransition } from 'react';
import { Outlet, useNavigate } from 'react-router';

const BaseLayout = observer(() => {
  const navigate = useNavigate();
  const [_, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  const { setUserData } = AppStore;
  useProfileDataQuery({
    onCompleted({ profileData }) {
      setUserData(profileData);
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
});

export default BaseLayout;
