import { Injectable } from "@nestjs/common";

interface envConfig {
    PORT: string,
    APPWRITE_API_KEY: string,
    APPWRITE_ENDPOINT: string,
    APPWRITE_PROJECT_ID: string,
}

@Injectable()
export class ConfigService {

    constructor() {
    }

    getPort(): number {
        return +process.env.PORT || 3000;
    }
    
    get(key: keyof envConfig): string {
        return process.env[key];
    }
}