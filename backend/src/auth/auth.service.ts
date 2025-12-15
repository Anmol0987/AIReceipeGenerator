import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dtos/SignIn.dto';

import { UsersService } from 'src/users/users.service';
import { HashingService } from 'src/common/hashing.service';
import { GenerateToken } from './providers/generate-token.provider';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,

    private readonly generateTokenProvider: GenerateToken,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const compare: boolean = await this.hashingService.comparePassword(
      signInDto.password,
      user.password,
    );
    if (!compare) throw new UnauthorizedException('Invalid credentials');

    return this.generateTokenProvider.signInAccessToken(
      user.id,
      this.jwtConfiguration.accessTokenTtl,
    );
  }
}
