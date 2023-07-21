import { hookstate, useHookstate } from '@hookstate/core';
import { PerformRequest, UserAuth } from '../../api';
import { useHistory } from 'react-router';
import { localstored } from '@hookstate/localstored';

interface AuthState {
  authLoading: true | false;
  actionLoading: true | false;
  isLoggedin: true | false;
  currUserDetails: { email: string; username: string; user_id: number } | null;
  errorMessage: string | null;
}

const initState: AuthState = {
  authLoading: true,
  actionLoading: false,
  isLoggedin: false,
  currUserDetails: null,
  errorMessage: null,
};

const authState = hookstate(initState);
const tokenState = hookstate(
  '',
  localstored({
    key: 'userToken',
  })
);

export const useAuth = () => {
  const history = useHistory();
  const state = useHookstate(authState);
  const userTokenState = useHookstate(tokenState);

  const logoutAction = () => {
    state.currUserDetails.set(null);
    state.isLoggedin.set(false);
    state.errorMessage.set(null);
    userTokenState.set('');
    localStorage.clear();
    history.push('/splash');
  };

  const validUserAction = async () => {
    try {
      const request = UserAuth.userValid();
      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response?.data || !response?.data?.success) {
        state.errorMessage.set(
          response?.data?.message || 'Something went wrong!!!'
        );
        userTokenState.set('');
        localStorage.clear();
      } else {
        const { data } = response.data as UserAuthResponse;
        state.isLoggedin.set(true);
        state.currUserDetails.set(
          data
            ? {
                username: data?.username,
                email: data?.email,
                user_id: data?.user_id,
              }
            : null
        );
        history.push('/tab/home');
      }
      state.authLoading.set(false);
    } catch (error) {
      state.authLoading.set(false);
      state.errorMessage.set(
        error instanceof Error ? error.message : 'Something went wrong!!!'
      );
    }
  };

  const loginAction = async (payload: UserLoginPayload) => {
    state.actionLoading.set(true);
    try {
      const request = UserAuth.userLogin(payload);
      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response?.data || !response?.data?.success) {
        state.errorMessage.set(
          response?.data?.message || 'Something went wrong!!!'
        );
      } else {
        const { data } = response.data as UserAuthResponse;
        state.isLoggedin.set(true);
        state.currUserDetails.set(
          data
            ? {
                user_id: data?.user_id,
                username: data?.username,
                email: data?.email,
              }
            : null
        );
        userTokenState.set(data?.token || '');
        history.push('/tab/home');
      }
      state.actionLoading.set(false);
    } catch (error) {
      state.actionLoading.set(false);
      state.errorMessage.set(
        error instanceof Error ? error.message : 'Something went wrong!!!'
      );
    }
  };

  const signupAction = async (payload: UserSignupPayload) => {
    state.actionLoading.set(true);
    try {
      const request = UserAuth.userSignup(payload);
      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response?.data || !response?.data?.success) {
        state.errorMessage.set(
          response?.data?.message || 'Something went wrong!!!'
        );
      } else {
        const { data } = response.data as UserAuthResponse;
        state.isLoggedin.set(true);
        state.currUserDetails.set(
          data
            ? {
                user_id: data?.user_id,
                username: data?.username,
                email: data?.email,
              }
            : null
        );
        userTokenState.set(data?.token || '');
        history.push('/tab/home');
      }
      state.actionLoading.set(false);
    } catch (error) {
      state.actionLoading.set(false);
      state.errorMessage.set(
        error instanceof Error ? error.message : 'Something went wrong!!!'
      );
    }
  };

  const removeAction = async () => {
    state.actionLoading.set(true);
    try {
      const request = UserAuth.userRemove();
      const responseCallback = PerformRequest(request);
      const response = await responseCallback();

      if (!response?.data || !response?.data?.success) {
        state.errorMessage.set(
          response?.data?.message || 'Something went wrong!!!'
        );
      } else {
        logoutAction();
      }
      state.actionLoading.set(false);
    } catch (error) {
      state.actionLoading.set(false);
      state.errorMessage.set(
        error instanceof Error ? error.message : 'Something went wrong!!!'
      );
    }
  };

  const getter = {
    get getAuthLoading() {
      return state.authLoading.get();
    },

    get getActionLoading() {
      return state.actionLoading.get();
    },

    get getIsLoggedIn() {
      return state.isLoggedin.get();
    },

    get getUserToken() {
      return userTokenState.get();
    },

    get getCurrUserDetails() {
      return state.currUserDetails.get();
    },

    get getError() {
      return state.errorMessage;
    },
  };

  const setter = {
    setAuthLoading(value: true | false) {
      state.authLoading.set(value);
    },
  };

  return {
    logoutAction,
    loginAction,
    signupAction,
    removeAction,
    validUserAction,
    ...getter,
    ...setter,
  };
};
