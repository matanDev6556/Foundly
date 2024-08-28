import React from 'react';
import { ClipLoader } from 'react-spinners';

interface LoadingProps {
  size?: number;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 50, color = '#39958c' }) => {
  return (
    <div className="loading-container">
      <ClipLoader color={color} loading={true} size={size} />
    </div>
  );
};

export default Loading;
