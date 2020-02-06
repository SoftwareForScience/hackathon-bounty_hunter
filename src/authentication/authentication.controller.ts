import { Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiExcludeEndpoint, ApiOkResponse, ApiResponse, ApiServiceUnavailableResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoginBodyDto, LoginResponseDto, UnauthorizedResponseDto } from './dto';
import { GithubAuthGuard } from './guard/githubAuth.guard';
import { LocalAuthGuard } from './guard/localAuth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor (
    private readonly authenticationService: AuthenticationService,
  ) {}

  @ApiBody({ type: LoginBodyDto })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  login (@Request() req): LoginResponseDto {
    return this.authenticationService.login(req.user);
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  @ApiResponse({ status: 302 })
  @ApiServiceUnavailableResponse()
  loginGithub () {
    // Initiates the GitHub OAuth web application flow
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  @ApiExcludeEndpoint()
  loginGithubCallback (@Request() req): LoginResponseDto {
    return this.authenticationService.login(req.user);
  }
}
