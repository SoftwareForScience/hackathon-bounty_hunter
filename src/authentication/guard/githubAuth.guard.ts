import { ExecutionContext, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {
  constructor (
    private readonly configService: ConfigService,
  ) {
    super();
  }

  canActivate (
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.configService.get<boolean>('authentication.github_login_enabled')) {
      throw new ServiceUnavailableException();
    }

    return super.canActivate(context);
  }
}
