import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  color: string;
  backgroundColor: string;
  borderColor: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  color,
  backgroundColor,
  borderColor,
}) => {
  const buttonStyle = {
    backgroundColor: backgroundColor,
    color: color,
    border: `2px solid ${borderColor}`,
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '5px',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
