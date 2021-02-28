import { AuthenticateResponse } from '../services/contracts/authentication.service.contracts';

export class User {
  userName: string;
  email: string;
  roles: string[];
  refreshToken: string;
  id: string;

  constructor(data: AuthenticateResponse) {
    this.userName = data.userName;
    this.email = data.email;
    this.roles = data.roles;
    this.refreshToken = data.refreshToken;
    this.id = data.id;
  }
}
