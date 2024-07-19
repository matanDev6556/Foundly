import React from 'react';

interface NoDataProps {
  img: string;
  messeage: string;
}

const NoData: React.FC<NoDataProps> = ({ img, messeage }) => {
  return (
    <>
      <img height={500} src={img} alt="N0_data" />
      <h3 style={{ color: '#728f9e' }}>{messeage}</h3>
    </>
  );
};

export default NoData;
