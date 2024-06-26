import React from "react";

interface Props {
  onClick: () => void;
  children: string;
  style?: React.CSSProperties;
}

const PrimaryButton = ({ onClick, children, style }: Props) => {
  return (
    <button style={style} className="primary-btn" onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

export default PrimaryButton;
