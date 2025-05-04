
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import MediaGallery from '@/components/admin/MediaGallery';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const AdminGallery = () => {
  const { user, isLoading } = useUser();
  
  // Check if user is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta-600"></div>
      </div>
    );
  }
  
  // Check if user is an admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <AdminLayout>
      <MediaGallery />
    </AdminLayout>
  );
};

export default AdminGallery;
