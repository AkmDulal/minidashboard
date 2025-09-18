'use client';

import { useState } from 'react';
import { User } from '@/types';
import { useFetch } from '@/hooks/useFetch';
import UserTable from '@/components/UserTable';
import Modal from '@/components/Modal/Modal';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const endpoint = '/users';
  
  const { data: users, loading, error } = useFetch<User[]>(endpoint);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <ErrorBoundary error={error} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Users</h1>
      {users && users.length > 0 ? (
        <UserTable users={users} onRowClick={handleRowClick} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found</p>
        </div>
      )}
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        user={selectedUser} 
      />
    </div>
  );
}