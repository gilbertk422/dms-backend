import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/user.create.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new NotFoundException();

    const isValid = await bcrypt.compare(password, user.password);

    if (user && isValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const payload = {
      email: createUserDto.email,
      password: hashPassword,
      role: createUserDto.role,
    };
    await this.usersService.create(payload);
    return {};
  }
}
