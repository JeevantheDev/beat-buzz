import { IonInput } from "@ionic/react";
import React from "react";

import "./item.css";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const FormItem: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <div className="form-item" {...props}>
      {children}
    </div>
  );
};
