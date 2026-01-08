'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

interface Admin {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export default function ManageAdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Add admin form
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  // Edit admin form
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editName, setEditName] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/users');
      
      if (!res.ok) {
        throw new Error('Failed to fetch admins');
      }
      
      const data = await res.json();
      setAdmins(data.admins || []);
      setError('');
    } catch (err) {
      setError('Failed to load admin accounts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setError('');
    setSuccessMessage('');

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsAdding(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, name: newName, password: newPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add admin');
      }

      setSuccessMessage('Admin account added successfully!');
      setNewEmail('');
      setNewName('');
      setNewPassword('');
      setConfirmPassword('');
      fetchAdmins();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteAdmin = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to remove admin privileges from ${email}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete admin');
      }

      setSuccessMessage('Admin account removed successfully!');
      fetchAdmins();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: editingId, 
          email: editEmail, 
          name: editName 
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update admin');
      }

      setSuccessMessage('Admin account updated successfully!');
      setEditingId(null);
      setEditEmail('');
      setEditName('');
      fetchAdmins();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const startEdit = (admin: Admin) => {
    setEditingId(admin.id);
    setEditEmail(admin.email);
    setEditName(admin.name || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditEmail('');
    setEditName('');
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => router.push('/admin')}
            variant="primary"
            size="xl"
          >
            ← Back to Dashboard
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Manage Admin Accounts
          </h1>
          
          <p className="text-center text-gray-600 mb-8">
            View, add, edit, or remove admin email accounts.
          </p>

          {/* Messages */}
          {error && (
            <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-500 text-white px-4 py-3 rounded-lg mb-6">
              {successMessage}
            </div>
          )}

          {/* Current Admins List */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Current Admin Accounts
            </h2>
            
            {isLoading ? (
              <div className="text-center py-8 text-gray-600">
                Loading admin accounts...
              </div>
            ) : admins.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                No admin accounts found.
              </div>
            ) : (
              <div className="space-y-4">
                {admins.map((admin) => (
                  <div
                    key={admin.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    {editingId === admin.id ? (
                      // Edit Form
                      <form onSubmit={handleEditAdmin} className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            type="submit"
                            variant="primary"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Save
                          </Button>
                          <Button
                            type="button"
                            onClick={cancelEdit}
                            variant="secondary"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      // Display View
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            {admin.email}
                          </p>
                          {admin.name && (
                            <p className="text-sm text-gray-600">{admin.name}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Added: {new Date(admin.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => startEdit(admin)}
                            variant="secondary"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                            variant="secondary"
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={admins.length <= 1}
                            title={admins.length <= 1 ? "Cannot delete the last admin account" : "Remove admin account"}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add New Admin Form */}
          <div className="bg-purple-50 p-6 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">
              Add New Admin
            </h2>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="newEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="admin@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="newName" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Minimum 8 characters"
                  minLength={8}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Re-enter password"
                  minLength={8}
                  required
                />
              </div>
              
              <Button
                type="submit"
                variant="primary"
                isLoading={isAdding}
                className="bg-purple-700 hover:bg-purple-800"
              >
                Add Admin
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
