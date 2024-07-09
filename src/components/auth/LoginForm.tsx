import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { loginUser } from '../../services/authService';
import { useModal } from '../../context/popupContext';
import { useAppStatus } from '../../context/AppStatusContext';
import { ClipLoader } from 'react-spinners';
import { fetchUserFromDb } from '../../services/dbService';

const LoginForm: React.FC = () => {
  const { setUser } = useUser();
  const { closeModal } = useModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, setLoading, error, setError } = useAppStatus();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      // Fetch user from database
      const fetchedUser = await fetchUserFromDb(user.uid);
      console.log(fetchedUser);
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        setUser(null);
      }

      // Close popup
      setLoading(false);
      closeModal();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading ? (
        <ClipLoader color="#39958c" loading={loading} size={50} />
      ) : (
        <button type="submit">Login</button>
      )}

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginForm;
