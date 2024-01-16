import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TodoList from '../components/Todo/TodoList';
import { logoutUser } from '../Services/api';
import { clearUser } from '../Store/userSlice';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const url = useSelector((state) => state.user.picture);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <div className="mt-5 py-3">
      <TodoList />
      <button className="btn btn-sm btn-danger" type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;