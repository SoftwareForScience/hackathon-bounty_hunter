import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponseDto {
  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty()
  readonly error: string;
}

export class JwtPayloadDto {
  sub: number;

  username: string;
}

export class LoginBodyDto {
  @ApiProperty({ required: true })
  readonly username: string;

  @ApiProperty({ required: true })
  readonly password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  readonly access_token: string;
}

export class StrategyValidateResponseDto {
  userId: number;

  username: string;
}
