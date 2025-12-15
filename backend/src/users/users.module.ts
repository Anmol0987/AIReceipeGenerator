import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HashingModule } from 'src/common/hashing.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]),HashingModule],
  exports:[UsersService,]
})
export class UsersModule {}
