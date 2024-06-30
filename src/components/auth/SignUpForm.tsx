import React from 'react';

interface SignUpFormProps {
  userType: string;
  handleSumbit: () => void;
}
const SignUpForm: React.FC<SignUpFormProps> = ({ userType, handleSumbit }) => {
  const handleFormSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSumbit();
  };
  return (
    <form onSubmit={handleFormSumbit}>
      <label>{userType} Name</label>
      <input type="text" />
      <label>Email</label>
      <input type="email" />
      <label>Password</label>
      <input type="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
