
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

const AdminPanel = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="my-8 p-4 bg-terracotta-50 dark:bg-sand-800 rounded-lg border border-terracotta-100 dark:border-sand-700">
      <h2 className="text-xl font-semibold mb-3">Admin Panel</h2>
      <p className="mb-4">Welcome, {user.name}. Access your admin dashboard to manage website content and users.</p>
      <Button 
        onClick={() => navigate('/admin')}
        className="bg-terracotta-600 hover:bg-terracotta-700"
      >
        Go to Admin Dashboard
      </Button>
    </div>
  );
};

export default AdminPanel;
