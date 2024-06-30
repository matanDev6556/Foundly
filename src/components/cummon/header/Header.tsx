import React, { useState } from 'react';
import './Header.css';
import Modal from '../../auth/Modal/modal';


const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState('');
  return (
    <header className="header">
      <div className="header__logo">
        <img src="path/to/logo.png" alt="Logo" />
      </div>
      <div className="header__buttons">
        <button
          className="header__button header_button--signup"
          onClick={() => {
            setIsModalOpen(true);
            setType('Sign Up As');
          }}
        >
          Sign-Up
        </button>
        <button
          className="header__button header_button--login"
          onClick={() => {
            setIsModalOpen(true);
            setType('Login');
          }}
        >
          Login
        </button>
      </div>
      {isModalOpen && <Modal type={type} setOpenModal={setIsModalOpen} />}
    </header>
  );
};

export default Header;
