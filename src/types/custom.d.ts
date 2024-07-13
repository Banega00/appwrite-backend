import { Models } from 'node-appwrite'
import { Request } from 'express';

type User = Models.User<any>;

declare global {
	namespace Express {
		interface Request {
            user?: User
        }
    }
}