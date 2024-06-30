import React from 'react';

const CompanySignUpForm: React.FC = () => {
  return (
    <form>
      <label>Company Name</label>
      <input type="text" />
      <label>Email</label>
      <input type="email" />
      <label>Password</label>
      <input type="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default CompanySignUpForm;
