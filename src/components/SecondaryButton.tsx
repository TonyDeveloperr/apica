import React from "react";

interface Props {
  onClick: () => void;
  children: string;
  style?: React.CSSProperties;
}

const SecondaryButton = ({ onClick, children, style }: Props) => {
  return (
    <button style={style} className="secondary-btn" onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

export default SecondaryButton;
