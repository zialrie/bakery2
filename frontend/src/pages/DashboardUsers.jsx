import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

// 🔹 Tambah style responsif
const styles = `
  @media (max-width: 768px) {
    .dashboard-container {
      margin-left: 0 !important;
      padding: 1rem !important;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    table {
      width: 100%;
      min-width: 600px;
    }
  }
`;

const DashboardUsers = () => {
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState({ id: '', nama: '', email: '', password: '' });

  const loadData = () => {
    try {
      const saved = localStorage.getItem('userList');
      setUserList(saved ? JSON.parse(saved) : []);
    } catch (err) {
      console.error('Error loading users:', err);
      setUserList([]);
    }
  };

  useEffect(() => {
    loadData();
    const handleStorage = (e) => { if (e.key === 'userList') loadData(); };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.nama || !formData.email || !formData.password) {
      alert('Semua field wajib diisi!');
      return;
    }
    const updatedUsers = [...userList, formData];
    setUserList(updatedUsers);
    localStorage.setItem('userList', JSON.stringify(updatedUsers));
    setFormData({ id: '', nama: '', email: '', password: '' });
  };

  const thStyle = { padding: '12px', fontWeight: 'bold', borderBottom: '1px solid #e2e8f0', textAlign: 'left', backgroundColor: '#f1f5f9' };
  const tdStyle = { padding: '12px', borderBottom: '1px solid #e2e8f0', color: '#334155' };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <style>{styles}</style>
      <Sidebar />
      <div className="dashboard-container" style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc', marginLeft: '250px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>User Dashboard</h1>

        {/* Form Tambah User */}
        <form onSubmit={handleAddUser} style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Tambah User</h2>
          {['id', 'nama', 'email', 'password'].map((field, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <input
                type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>
          ))}
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Tambah User</button>
        </form>

        {/* Tabel Data User */}
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Data Pengguna</h2>
        <div className="table-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Nama</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Password</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList.map((user, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{user.id}</td>
                    <td style={tdStyle}>{user.nama}</td>
                    <td style={tdStyle}>{user.email}</td>
                    <td style={tdStyle}>{user.password}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={tdStyle} colSpan="4" align="center">Tidak ada data pengguna</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;
