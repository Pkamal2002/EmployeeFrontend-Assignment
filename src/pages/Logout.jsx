import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../App';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const mutation = useMutation(() => api.post('/logout'), {
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error('Error logging out:', error);
    }
  });

  useEffect(() => {
    mutation.mutate();
  }, [mutation]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;
