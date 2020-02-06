import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayloadDto, LoginResponseDto } from './dto';

@Injectable()
export class AuthenticationService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser (username: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      return user;
    }

    return null;
  }

  login (user: User): LoginResponseDto {
    const payload: JwtPayloadDto = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
