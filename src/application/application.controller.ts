import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/guard/jwtAuth.guard';
import { ApplicationService } from './application.service';

@Controller()
export class ApplicationController {
  constructor (private readonly applicationService: ApplicationService) {}

  @Get()
  getHello (): object {
    return {
      title: this.applicationService.getTitle(),
      description: this.applicationService.getDescription(),
      version: this.applicationService.getVersion(),
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile (@Request() req) {
    return req.user;
  }
}
