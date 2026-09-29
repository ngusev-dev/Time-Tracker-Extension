import type { UserModel } from '@/graphql/generated/output';

export type UserStoreModel = Omit<UserModel, 'createdAt'>;
