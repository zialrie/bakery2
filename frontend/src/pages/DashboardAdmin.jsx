import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const DashboardAdmin = () => {

  const defaultTransactionData = [
    {
      transactionTime: '18 Dec 2019 10:15',
      orderId: '9FJH767',
      items: [{ itemName: 'Espresso', quantity: 2, price: 45000 }],
      totalPrice: 90000
    }
  ];

  const [transactionData, setTransactionData] = useState([]);

  // 🔁 SAFE version - fallback empty array
  const flattenedTransactions = transactionData.flatMap(trans =>
    (trans.items || []).map(item => ({
      transactionTime: trans.transactionTime,
      orderId: trans.orderId,
      itemName: item.itemName,
      quantity: item.quantity,
      totalPrice: item.quantity * item.price
    }))
  );

  const totalOmset = transactionData.reduce((sum, t) => sum + t.totalPrice, 0);

  const loadData = () => {
    const load = (key, defaultValue) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    };

    setTransactionData(load('transactionData', defaultTransactionData));
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'transactionData') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 3000);

    return () => clearInterval(interval);
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
          Admin Dashboard
        </h1>

        {/* Omset Hari Ini */}
        <div
          style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '300px'
          }}
        >
          <h2 style={{ color: '#64748b' }}>Omset Hari Ini</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
            Rp {totalOmset.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Riwayat Transaksi */}
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
          Riwayat Transaksi
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
