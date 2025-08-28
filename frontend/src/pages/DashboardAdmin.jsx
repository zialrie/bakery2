import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const DashboardAdmin = () => {
  const [adminName, setAdminName] = useState('Admin');

  const defaultTransactionData = [{}];
  const [transactionData, setTransactionData] = useState([]);
  const [dailyOmset, setDailyOmset] = useState({});

  const todayKey = new Date().toISOString().slice(0, 10);

  // Ambil nama admin dari localStorage
  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminData');
    if (savedAdmin) {
      try {
        const parsed = JSON.parse(savedAdmin);
        if (parsed.nama) {
          setAdminName(parsed.nama);
        }
      } catch (err) {
        console.error('Gagal parsing adminData:', err);
      }
    }
  }, []);

  const flattenedTransactions = transactionData.flatMap((trans) =>
    (trans.items || []).map((item) => ({
      transactionTime: trans.transactionTime,
      orderId: trans.orderId,
      itemName: item.itemName,
      quantity: item.quantity,
      totalPrice: item.quantity * item.price,
    }))
  );

  const todayOmset = transactionData.reduce((sum, t) => sum + t.totalPrice, 0);

  const loadData = () => {
    const load = (key, defaultValue) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    };

    setTransactionData(load('transactionData', defaultTransactionData));
    setDailyOmset(load('dailyOmset', {}));
  };

  const updateDailyOmset = () => {
    setDailyOmset((prev) => {
      const updated = { ...prev, [todayKey]: todayOmset };
      localStorage.setItem('dailyOmset', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'transactionData' || e.key === 'dailyOmset') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
      updateDailyOmset();
    }, 3000);

    return () => clearInterval(interval);
  }, [todayOmset]);

  const yesterdayKey = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const yesterdayOmset = dailyOmset[yesterdayKey] || 0;
  const totalOmsetAllTime = Object.values(dailyOmset).reduce((a, b) => a + b, 0);

  const thStyle = {
    padding: '12px',
    fontWeight: 'bold',
    borderBottom: '1px solid #e2e8f0',
    textAlign: 'left',
    backgroundColor: '#f1f5f9',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #e2e8f0',
    color: '#334155',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: '#f8fafc',
          marginLeft: '250px',
        }}
      >
        {/* 🟢 Sapa Admin */}
        <div style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#1e293b' }}>
          👋 Selamat datang, <strong>{adminName}</strong>!
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Admin Dashboard</h1>

        {/* Total Omset All Time */}
        <div
          style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '350px',
          }}
        >
          <h2 style={{ color: '#64748b' }}>Total Omset Keseluruhan</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>
            Rp {totalOmsetAllTime.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Tabel Riwayat Transaksi */}
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Riwayat Transaksi</h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Waktu</th>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Item</th>
              <th style={thStyle}>Qty</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {flattenedTransactions.map((t, i) => (
              <tr key={i}>
                <td style={tdStyle}>{t.transactionTime}</td>
                <td style={tdStyle}>{t.orderId}</td>
                <td style={tdStyle}>{t.itemName}</td>
                <td style={tdStyle}>{t.quantity}</td>
                <td style={tdStyle}>Rp {t.totalPrice.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAdmin;
