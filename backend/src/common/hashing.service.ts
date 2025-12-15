import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  public async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSaltSync();
    return await bcrypt.hash(data, salt);
  }

  comparePassword(data: string | Buffer, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
