import React, { useState } from 'react';
import './Modal.css';
import CompanySignUpForm from './CompanySignUpForm/CompanySignUpForm';
import InvestorSignUpForm from './InvestorSignUpForm/InvestorSignUpForm';
import PreferencesStep from './InvestorSignUpForm/PreferencesStep';
import LoginForm from './LoginForm';

const Modal: React.FC<{
  setOpenModal: (open: boolean) => void;
  type: string;
}> = ({ setOpenModal, type }) => {
  const [signUpType, setSignUpType] = useState('Investor');
  const [step, setStep] = useState(1);

  const renderForm = () => {
    //show login form
    if (type !== 'Sign Up As') {
      return <LoginForm />;
    }

    // show the spetsific form
    if (signUpType === 'Investor') {
      return step === 1 ? (
        <InvestorSignUpForm setStep={setStep} />
      ) : (
        <PreferencesStep />
      );
    }
    if (signUpType === 'Company') {
      switch (step) {
        case 1:
          return <CompanySignUpForm />;
      }
    }
  };

  const getTitle = () => {
    if (step > 1) {
      if (signUpType === 'Investor') {
        return 'Preferences';
      } else {
        return 'Verification process';
      }
    }
    return type;
  };

  return (
    <div className="modalBackground">
      <h1 className="modalTitle">{getTitle()}</h1>
      {step === 1 && type === 'Sign Up As' && (
        <div className="sign-up-as">
          <button
            className={
              signUpType === 'Company'
                ? 'activeSignUpButton'
                : 'unActiveSignUpButton'
            }
            onClick={() => setSignUpType('Company')}
          >
            Company
          </button>
          <button
            className={
              signUpType === 'Investor'
                ? 'activeSignUpButton'
                : 'unActiveSignUpButton'
            }
            onClick={() => setSignUpType('Investor')}
          >
            Investor
          </button>
        </div>
      )}
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body">{renderForm()}</div>
      </div>
    </div>
  );
};

export default Modal;
