import type { UserModel } from '@/shared/api/generated/output';

export type UserStoreModel = Omit<UserModel, 'createdAt'>;
