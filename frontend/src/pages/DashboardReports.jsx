// pages/DashboardReports.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const DashboardReports = () => {
  const [dailyOmset, setDailyOmset] = useState({});
  const [transactionData, setTransactionData] = useState([]);

  const todayKey = new Date().toISOString().slice(0, 10);
  const yesterdayKey = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // Load data dari localStorage
  const loadData = () => {
    try {
      const savedOmset = localStorage.getItem('dailyOmset');
      const savedTrans = localStorage.getItem('transactionData');

      if (savedOmset) setDailyOmset(JSON.parse(savedOmset));
      if (savedTrans) setTransactionData(JSON.parse(savedTrans));
    } catch (err) {
      console.error('Gagal memuat data laporan:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Event listener untuk update real-time saat ada perubahan di tab lain
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'dailyOmset' || e.key === 'transactionData') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Hitung data omset
  const todayOmset = dailyOmset[todayKey] || 0;
  const yesterdayOmsetValue = dailyOmset[yesterdayKey] || 0;
  const totalOmsetAllTime = Object.values(dailyOmset).reduce((a, b) => a + b, 0);

  // Hitung jumlah transaksi per hari dari transactionData
  const totalTransactions = transactionData.length;
  const newCustomers = transactionData.filter((t) => new Date(t.transactionTime) >= new Date().setHours(0, 0, 0, 0) - 7 * 86400000) // 7 hari terakhir
    .map(t => t.customerId || t.orderId)
    .filter((value, index, self) => self.indexOf(value) === index)
    .length;

  const productsSold = transactionData.flatMap(t => t.items || []).reduce((sum, item) => sum + item.quantity, 0);

  // Data ringkasan
  const reportData = [
    { title: 'Omset Hari Ini', value: `Rp ${todayOmset.toLocaleString('id-ID')}`, color: '#059669' },
    { title: 'Omset Kemarin', value: `Rp ${yesterdayOmsetValue.toLocaleString('id-ID')}`, color: '#2563eb' },
    { title: 'Total Omset Keseluruhan', value: `Rp ${totalOmsetAllTime.toLocaleString('id-ID')}`, color: '#d97706' },
    { title: 'Jumlah Transaksi', value: totalTransactions.toLocaleString('id-ID'), color: '#7c3aed' },
    { title: 'Pelanggan Baru (7 Hari)', value: newCustomers, color: '#0891b2' },
    { title: 'Produk Terjual', value: productsSold.toLocaleString('id-ID'), color: '#ea580c' },
  ];

  // Tabel: riwayat omset harian dari dailyOmset
  const dailyReportList = Object.entries(dailyOmset)
    .map(([date, omset]) => ({
      tanggal: date,
      penjualan: omset,
      transaksi: transactionData.filter(t => t.transactionTime.startsWith(date)).length,
    }))
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal)); // Terbaru di atas

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
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Laporan Keuangan & Penjualan</h1>

        {/* Ringkasan Data */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {reportData.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ color: '#64748b', fontSize: '0.9rem' }}>{item.title}</h3>
              <p
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: item.color,
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Grafik Placeholder */}
        <div
          style={{
            height: '250px',
            backgroundColor: '#e2e8f0',
            borderRadius: '8px',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            fontSize: '1rem',
          }}
        >
          📊 Grafik Omset Harian (Bisa di-extend dengan Chart.js nanti)
        </div>

        {/* Tabel Laporan Omset Harian */}
        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Riwayat Omset Harian</h2>
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
              <th style={thStyle}>Tanggal</th>
              <th style={thStyle}>Total Penjualan</th>
              <th style={thStyle}>Jumlah Transaksi</th>
            </tr>
          </thead>
          <tbody>
            {dailyReportList.length > 0 ? (
              dailyReportList.map((row, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{row.tanggal}</td>
                  <td style={tdStyle}>Rp {row.penjualan.toLocaleString('id-ID')}</td>
                  <td style={tdStyle}>{row.transaksi}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ ...tdStyle, textAlign: 'center', color: '#64748b' }}>
                  Belum ada data transaksi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardReports;