import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  saltOrRounds = 10;

  async compare(payload, hash) {
    return await bcrypt.compare(payload, hash);
  }

  async hash(payload) {
    return await bcrypt.hash(payload, this.saltOrRounds);
  }
}
