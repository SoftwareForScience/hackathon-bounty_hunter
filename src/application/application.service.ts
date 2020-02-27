import { Injectable } from '@nestjs/common';
import { APPLICATION_DESCRIPTION, APPLICATION_TITLE, APPLICATION_VERSION } from './application.constants';

@Injectable()
export class ApplicationService {
  getTitle () {
    return APPLICATION_TITLE;
  }

  getDescription () {
    return APPLICATION_DESCRIPTION;
  }

  getVersion () {
    return APPLICATION_VERSION;
  }
}
