import React, { useEffect, useRef } from "react";

import "./subcontent.css";
import { createAnimation } from "@ionic/react";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  color?: "primary" | "secondary";
  children?: React.ReactNode;
}

export const SubContent: React.FC<IProps> = ({
  color = "primary",
  children,
  className,
  ...props
}) => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animationElement = animationRef.current;

    if (animationElement) {
      const animation = createAnimation()
        .addElement(animationElement)
        .duration(500)
        .easing("ease-in-out")
        .fromTo("transform", "translateY(100%)", "translateY(0%)");
      animation.play();
    }
  }, []);

  return (
    <div
      ref={animationRef}
      className={`ion-padding ${color} subcontent ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
