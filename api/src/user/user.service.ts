import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      firstName: 'Николай',
      lastName: 'Мельников',
      position: 'программист',
    },
    {
      id: 2,
      firstName: 'Елена',
      lastName: 'Старшова',
      position: 'hr-менеджер',
    },
  ];

  findAll() {
    return this.users;
  }
}
