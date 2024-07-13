import { Injectable } from '@nestjs/common';

interface envConfig {
  PORT: string;
  APPWRITE_API_KEY: string;
  APPWRITE_ENDPOINT: string;
  APPWRITE_PROJECT_ID: string;
}

@Injectable()
export class ConfigService {
  constructor() {}

  get db() {
    return {
      databaseId: process.env.APPWRITE_DATABASE_ID,
    };
  }

  get appwriteConfig() {
    return {
      APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
      APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
      APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,
    };
  }

  get globalConfig() {
    return {
      host: process.env.APP_HOST || '0.0.0.0',
      port: +process.env.APP_PORT || 3000,
    };
  }

  getPort(): number {
    return +process.env.PORT || 3000;
  }

  get(key: keyof envConfig): string {
    return process.env[key];
  }
}
