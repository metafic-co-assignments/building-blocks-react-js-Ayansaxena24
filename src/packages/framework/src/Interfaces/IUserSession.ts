export interface IUserSession {
  userName: string;
  countryCode: string;
  accountType?: string;
  rememberMe: boolean;
  token: string;
}
