export interface IUserSession {
  email?: string; //used by email and social login
  full_phone_number?: string;
  password: string;
  //possible values: [email_account, social_account, sms_account]
  type: string;
  unique_auth_id?: string;
}
