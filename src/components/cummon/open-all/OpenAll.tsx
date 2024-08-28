import React from 'react';
import './OpenAll.css';

interface OpenAllProps {
  title: string;
  isBold?: boolean;
  onClick?: () => void;
  buttonText?: string;
}

const OpenAll: React.FC<OpenAllProps> = ({
  title,
  isBold = true,
  onClick,
  buttonText = 'הכל',
}) => {
  return (
    <div className="container">
       <h2 className="title" style={{ fontWeight: isBold ? 'bold' : 'normal' }}>
        {title}
      </h2>
      
      <button className="allButton" onClick={onClick}>
        {buttonText}
      </button>

     
    </div>
  );
};

export default OpenAll;
