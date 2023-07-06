import React from "react";

import "./subheader.css";

interface IProps {
  text?: string;
  subText?: string;
  renderRight?: () => JSX.Element | null;
}

export const SubHeader: React.FC<IProps> = ({
  text,
  subText,
  renderRight = () => null,
}) => {
  return (
    <div className="sub-header-container">
      <h1 className="text-sub-header">
        <span>{text}</span> {subText}
      </h1>
      {renderRight()}
    </div>
  );
};
