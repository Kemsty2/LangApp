export interface AuthenticateRequest {
  email: string;
  password: string;
}

export interface AuthenticateResponse {
  id: string,
  userName: string,
  email: string,
  roles: string[],
  isVerified: boolean,
  jwtToken: string,
  refreshToken: string
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

