export interface LoginRequestData {
  username: string;
  password: string;
  code: string;
}

export type LoginResponseData = ApiResponseData<{ token: string }>;
