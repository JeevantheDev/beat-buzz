import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonImg,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/react';
import {
  Form,
  FormItem,
  Header,
  SubContent,
  SubHeader,
} from '../../../components';
import { useAuth } from '../../../stores';
import { useHistory } from 'react-router';
import loginBGSVG from '../../../../resources/login-bg.svg';

import './login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const authState = useAuth();

  const { loginAction } = authState;

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();

    loginAction(formValue);
  };

  return (
    <IonPage>
      <Header title="Login" showBack defaultHref="/splash" />
      <IonContent fullscreen>
        <div className="login-container">
          <IonImg
            className="ion-margin-top"
            style={{
              marginTop: '2rem',
              flex: 0.08,
            }}
            src={loginBGSVG}
            alt="login"
          />
          <SubContent>
            <SubHeader text="Unlock your" subText="Rhythms" />
            <Form>
              <FormItem>
                <IonInput
                  label="Email"
                  value={formValue.email}
                  onIonChange={(event) =>
                    setFormValue((prev) => ({
                      ...prev,
                      email: event.target.value?.toString() || '',
                    }))
                  }
                  placeholder="enter your email"
                  type="email"
                  fill="outline"
                  labelPlacement="stacked"
                  color="light"
                  mode="md"
                  style={{
                    background: 'var(--ion-color-secondary)',
                  }}
                />
              </FormItem>

              <FormItem>
                <IonInput
                  label="Password"
                  value={formValue.password}
                  onIonChange={(event) =>
                    setFormValue((prev) => ({
                      ...prev,
                      password: event.target.value?.toString() || '',
                    }))
                  }
                  placeholder="enter your password"
                  type="password"
                  fill="outline"
                  labelPlacement="stacked"
                  color="light"
                  mode="md"
                  style={{ background: 'var(--ion-color-secondary)' }}
                />
              </FormItem>
              <FormItem>
                <IonButton
                  color="secondary"
                  expand="block"
                  mode="ios"
                  disabled={
                    !(formValue.email && formValue.password) ||
                    authState.getActionLoading
                  }
                  onClick={handleLogin}
                >
                  {authState.getActionLoading ? 'Logging in...' : 'Login'}
                </IonButton>
                <div
                  className="ion-padding-vertical"
                  style={{ textAlign: 'center' }}
                >
                  <IonText color="light" mode="ios">
                    <span> Not an account?</span>{' '}
                    <IonText
                      color="medium"
                      style={{ textDecoration: 'underline' }}
                      onClick={() => history.push('/signup')}
                    >
                      Signup now
                    </IonText>
                  </IonText>
                </div>
              </FormItem>
            </Form>
          </SubContent>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
