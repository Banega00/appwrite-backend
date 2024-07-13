import { Injectable } from "@nestjs/common";
import { ClsService } from 'nestjs-cls';

export const ContextKeys = {
	sessionSecret: 'sessionSecret',
    user: 'user',
} as const;

@Injectable()
export class ContextService {
	
	constructor(private readonly clsService: ClsService) {}

	get<T = any>(key: (typeof ContextKeys)[keyof typeof ContextKeys]): T {
		return this.clsService.get(key);
	}

	set(key: (typeof ContextKeys)[keyof typeof ContextKeys], value: any): void {
		this.clsService.set(key, value);
	}
}