interface UserLoginPayload {
  email: string;
  password: string;
}

interface UserSignupPayload {
  username: string;
  email: string;
  password: string;
}

interface ResponseData {
  username: string;
  email: string;
  token: string;
}

interface UserAuthResponse {
  success: true | false;
  data: ResponseData;
  message: string;
}
