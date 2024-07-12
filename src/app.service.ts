import { Injectable } from '@nestjs/common';
import * as packageJson from '../package.json';
@Injectable()
export class AppService {

  getServerHealth() {
    return { name: packageJson.name, version: packageJson.version, status: 'UP' };
  }
}
