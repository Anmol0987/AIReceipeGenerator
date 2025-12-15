import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingModule } from 'src/common/hashing.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateToken } from './providers/generate-token.provider';

@Module({
  imports: [
    UsersModule,
    HashingModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [AuthService, GenerateToken],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
