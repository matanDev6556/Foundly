import React from 'react';

const LoginForm: React.FC = () => {
  return (
    <form>
      <label>Email</label>
      <input type="text" />
      <label>Password</label>
      <input type="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
