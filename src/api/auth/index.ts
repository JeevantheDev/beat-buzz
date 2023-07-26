import { getAPIUrl } from '../../utils/getAPIUrl';

const BASE_URL = getAPIUrl('auth');

export const UserAuth = {
  userValid: (): APIRequest => ({
    url: `${BASE_URL}/validToken`,
    method: 'GET',
  }),
  userLogin: (payload: UserLoginPayload): APIRequest => ({
    url: `${BASE_URL}/login`,
    method: 'POST',
    payload,
  }),
  userSignup: (payload: UserSignupPayload): APIRequest => ({
    url: `${BASE_URL}/signup`,
    method: 'POST',
    payload,
  }),
  userRemove: (): APIRequest => ({
    url: `${BASE_URL}/remove`,
    method: 'DELETE',
  }),
};
