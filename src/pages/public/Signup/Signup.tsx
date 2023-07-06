import React, { useState } from "react";
import { IonPage, IonContent, IonImg, IonInput, IonButton } from "@ionic/react";
import {
  Form,
  FormItem,
  Header,
  SubContent,
  SubHeader,
} from "../../../components";
import signupBGSVG from "../../../../resources/signup-bg.svg";
import { useAuth } from "../../../stores";

import "./signup.css";

const Signup: React.FC = () => {
  const authState = useAuth();

  const { signupAction } = authState;

  const [formValue, setFormValue] = useState({
    username: "Jeevan Jyoti Dash",
    email: "dashjeevanjyoti@gmail.com",
    password: "123456",
  });

  const handleSignup = (event: React.SyntheticEvent) => {
    event.preventDefault();

    signupAction(formValue);
  };
  return (
    <IonPage>
      <Header title="Signup" showBack defaultHref="/splash" />
      <IonContent fullscreen>
        <div className="login-container">
          <IonImg
            className="ion-margin-top"
            style={{
              marginTop: "2rem",
              flex: 0.09,
            }}
            src={signupBGSVG}
            alt="login"
          />
          <SubContent>
            <SubHeader text="Connect with" subText="Rhythms" />
            <Form>
              <FormItem>
                <IonInput
                  value={formValue.username}
                  onIonChange={(event) =>
                    setFormValue((prev) => ({
                      ...prev,
                      username: event.target.value?.toString() || "",
                    }))
                  }
                  label="Fullname"
                  placeholder="enter your name"
                  type="text"
                  fill="outline"
                  labelPlacement="stacked"
                  color="light"
                  mode="md"
                  style={{
                    background: "var(--ion-color-secondary)",
                  }}
                />
              </FormItem>
              <FormItem>
                <IonInput
                  value={formValue.email}
                  onIonChange={(event) =>
                    setFormValue((prev) => ({
                      ...prev,
                      email: event.target.value?.toString() || "",
                    }))
                  }
                  label="Email"
                  placeholder="enter your email"
                  type="email"
                  fill="outline"
                  labelPlacement="stacked"
                  color="light"
                  mode="md"
                  style={{
                    background: "var(--ion-color-secondary)",
                  }}
                />
              </FormItem>

              <FormItem>
                <IonInput
                  value={formValue.password}
                  onIonChange={(event) =>
                    setFormValue((prev) => ({
                      ...prev,
                      password: event.target.value?.toString() || "",
                    }))
                  }
                  label="Password"
                  placeholder="enter your password"
                  type="password"
                  fill="outline"
                  labelPlacement="stacked"
                  color="light"
                  mode="md"
                  style={{ background: "var(--ion-color-secondary)" }}
                />
              </FormItem>
              <FormItem>
                <IonButton
                  onClick={handleSignup}
                  color="secondary"
                  expand="block"
                  mode="ios"
                  disabled={
                    !(formValue.email && formValue.password) ||
                    authState.getActionLoading
                  }
                >
                  {authState.getActionLoading ? "Signing up..." : "Signup"}
                </IonButton>
              </FormItem>
            </Form>
          </SubContent>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
