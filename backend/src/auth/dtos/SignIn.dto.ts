import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator";

export class SignInDto{

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;
}