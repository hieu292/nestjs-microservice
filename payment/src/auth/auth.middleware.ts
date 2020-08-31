import {Injectable, NestMiddleware} from '@nestjs/common';
import {ACCESS_TOKEN_HEADER_NAME, MOCK_ACCESS_TOKEN, MOCK_AUTHORIZED_USER} from "../mock/auth.mock";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req, _, next) {
    const user = this.getUser(req);
    if (user) {
      req.user = user;
    }
    next();
  }

  getUser(req) {
    const accessToken = req.get(ACCESS_TOKEN_HEADER_NAME);
    return accessToken === MOCK_ACCESS_TOKEN ? MOCK_AUTHORIZED_USER : null;
  }
}

