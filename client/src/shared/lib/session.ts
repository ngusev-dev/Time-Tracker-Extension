import { apolloClient } from '@/shared/api/apollo.client';
import { AppStore } from '@/shared/model/App.store';

type ResetHandler = () => void;

const resetHandlers = new Set<ResetHandler>();

export const onSessionReset = (handler: ResetHandler) => {
  resetHandlers.add(handler);
  return () => resetHandlers.delete(handler);
};

export const resetSession = async () => {
  resetHandlers.forEach((handler) => handler());
  AppStore.reset();
  await apolloClient.clearStore();
};
