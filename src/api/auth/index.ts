import { getAPIUrl } from '../../utils/getAPIUrl';

const BASE_URL = `${getAPIUrl('auth')}/api/v1/beatbuzz`;

export const UserAuth = {
  userValid: (): APIRequest => ({
    url: `${BASE_URL}/users/validToken`,
    method: 'GET',
  }),
  userLogin: (payload: UserLoginPayload): APIRequest => ({
    url: `${BASE_URL}/users/login`,
    method: 'POST',
    payload,
  }),
  userSignup: (payload: UserSignupPayload): APIRequest => ({
    url: `${BASE_URL}/users/signup`,
    method: 'POST',
    payload,
  }),
  userRemove: (): APIRequest => ({
    url: `${BASE_URL}/users/remove`,
    method: 'DELETE',
  }),
};
