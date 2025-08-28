import React from 'react';
import Sidebar from '../components/Sidebar';

const DashboardAdmin = () => {
  // Data void seperti sebelumnya
  const voidData = [
    {
      voidTime: '17 Dec 2019 13:39',
      orderId: '6ZTLK67',
      itemName: 'Black Coffee',
      quantity: 1,
      voidReason: 'Out of Stock',
      executedBy: 'Ira Rahmahdani',
      totalPrice: 48000
    },
    {
      voidTime: '17 Dec 2019 13:39',
      orderId: '6ZTLK67',
      itemName: 'Latte Macchiato',
      quantity: 1,
      voidReason: 'Out of Stock',
      executedBy: 'Ira Rahmahdani',
      totalPrice: 55000
    },
    {
      voidTime: '16 Dec 2019 18:19',
      orderId: '5GJK767',
      itemName: 'Affogato',
      quantity: 3,
      voidReason: 'Waiting too long',
      executedBy: 'Febryan Sianipar',
      totalPrice: 165000
    },
    {
      voidTime: '10 Dec 2019 16:43',
      orderId: '47&JUJ0',
      itemName: 'Cafe au Lait',
      quantity: 1,
      voidReason: 'Entry Error',
      executedBy: 'Jordy Timothy',
      totalPrice: 65000
    }
  ];

  // Dummy data transaksi berhasil
  const transactionData = [
    {
      transactionTime: '18 Dec 2019 10:15',
      orderId: '9FJH767',
      itemName: 'Espresso',
      quantity: 2,
      totalPrice: 90000
    },
    {
      transactionTime: '18 Dec 2019 11:00',
      orderId: '8DKL564',
      itemName: 'Cappuccino',
      quantity: 1,
      totalPrice: 50000
    },
    {
      transactionTime: '17 Dec 2019 14:00',
      orderId: '6ZTLK67',
      itemName: 'Mocha',
      quantity: 1,
      totalPrice: 60000
    }
  ];

  // Hitung total omset dari transaksi berhasil
  const totalOmset = transactionData.reduce((sum, item) => sum + item.totalPrice, 0);

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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: '2rem',
          backgroundColor: '#f8fafc',
          marginLeft: '250px', // <-- margin supaya gak ketutupan sidebar
          minWidth: 0 // agar child flex bisa shrink
        }}
      >
        <h1 style={{ marginBottom: '1rem' }}>Admin Dashboard</h1>

        {/* Omset Section */}
        <div
          style={{
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '300px'
          }}
        >
          <h2>Omset Hari Ini</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Rp. {totalOmset.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Void Transactions */}
        <h2 style={{ marginBottom: '0.5rem' }}>Void Transactions</h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '3rem'
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Void Time</th>
              <th style={thStyle}>Order Id</th>
              <th style={thStyle}>Item Name</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Void Reason</th>
              <th style={thStyle}>Executed by</th>
              <th style={thStyle}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {voidData.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.voidTime}</td>
                <td style={tdStyle}>{item.orderId}</td>
                <td style={tdStyle}>{item.itemName}</td>
                <td style={tdStyle}>{item.quantity}</td>
                <td style={tdStyle}>{item.voidReason}</td>
                <td style={tdStyle}>{item.executedBy}</td>
                <td style={tdStyle}>Rp. {item.totalPrice.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Transaction History */}
        <h2 style={{ marginBottom: '0.5rem' }}>Riwayat Transaksi</h2>
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
              <th style={thStyle}>Transaction Time</th>
              <th style={thStyle}>Order Id</th>
              <th style={thStyle}>Item Name</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.transactionTime}</td>
                <td style={tdStyle}>{item.orderId}</td>
                <td style={tdStyle}>{item.itemName}</td>
                <td style={tdStyle}>{item.quantity}</td>
                <td style={tdStyle}>Rp. {item.totalPrice.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAdmin;
