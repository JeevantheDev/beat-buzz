import React from "react";

import "./form.css";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Form: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <div className="form-container" {...props}>
      {children}
    </div>
  );
};

export * from "./Item";
