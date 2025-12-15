import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignInDto } from './dtos/SignIn.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public SignIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  public me(@Req() req: any) {
    console.log(req)
    return {
      user: req.user,
    };
  }
}
