import '@types/express';
import { User } from 'generated/prisma/client';

declare module '@types/express' {
  interface Request {
    user?: User;
  }
}
