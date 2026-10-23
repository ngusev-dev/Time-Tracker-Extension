import { Injectable } from '@nestjs/common';
import { v4 as uuid_v4 } from 'uuid';

@Injectable()
export class UuidService {
  generateUUID_v4() {
    return uuid_v4();
  }
}
