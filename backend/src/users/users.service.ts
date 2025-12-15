import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { HashingService } from 'src/common/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Inject user entity
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

   
    private hashingService: HashingService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto, 'user service');

    const hashPassword = await this.hashingService.hashPassword(
      createUserDto.password,
    );
    console.log('hashedPassword', hashPassword);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });

    return await this.userRepository.save(user);
  }

  public async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }
}
