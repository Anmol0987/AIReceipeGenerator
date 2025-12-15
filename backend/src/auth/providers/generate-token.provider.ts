import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class GenerateToken {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtconfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signInAccessToken<T>(
    userId: number,
    expiresIn: number,
    payload?: T,
  ) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtconfiguration.secret,
        audience: this.jwtconfiguration.audience,
        issuer: this.jwtconfiguration.issuer,
        expiresIn,
      },
    );
    return {accessToken}
  }
}
