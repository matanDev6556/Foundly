import React from 'react';

interface InvestorSignUpFormProps {
  setStep: (step: number) => void;
}

const InvestorSignUpForm: React.FC<InvestorSignUpFormProps> = ({ setStep }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep(2);
      }}
    >
      <label>Full name</label>
      <input type="text" />
      <label>Email</label>
      <input type="email" />
      <label>Password</label>
      <input type="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default InvestorSignUpForm;
