import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const DashboardUsers = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/db_user/user')
      .then(res => res.json())
      .then(data => setUserList(data)) // ⬅️ langsung pakai array dari backend
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const thStyle = {
    padding: '12px',
    fontWeight: 'bold',
    borderBottom: '1px solid #e2e8f0',
    textAlign: 'left',
    backgroundColor: '#f1f5f9'
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #e2e8f0',
    color: '#334155'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: '#f8fafc',
          marginLeft: '250px'
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          User Dashboard
        </h1>

        {/* Tabel Data User */}
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
          Data Pengguna
        </h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nama</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Password</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.nama}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUsers;
