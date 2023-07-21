import React from 'react';

import './slider.css';

interface IProps {
  children?: React.ReactNode;
}
export const Slider: React.FC<IProps> = ({ children }) => {
  return <div className="slider">{children}</div>;
};
