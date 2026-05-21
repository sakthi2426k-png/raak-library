import React, { useState } from 'react';

function StaffLogin({ onLoginSuccess, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple verification check - Neenga edhu venum naalum maathிக்கலாம் bro
    if (username === 'admin' && password === '1234') {
      setError('');
      onLoginSuccess();
    } else {
      setError('❌ Invalid Admin Credentials! Try again.');
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '40px 30px',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '20px',
      maxWidth: '400px',
      margin: '20px auto',
      boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
      textAlign: 'center'
    }}>
      <h2 style={{ margin: '0 0 10px 0', color: '#8e2de2', fontSize: '26px', fontWeight: '700' }}>👨‍🏫 Staff Verification</h2>
      <p style={{ margin: '0 0 25px 0', color: '#94a3b8', fontSize: '14px' }}>Secure gateway access for library administrators</p>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="👤 Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '12px 15px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.15)',
            background: '#1e293b',
            color: '#fff',
            outline: 'none'
          }}
        />
        <input 
          type="password" 
          placeholder="🔒 Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '12px 15px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.15)',
            background: '#1e293b',
            color: '#fff',
            outline: 'none'
          }}
        />

        {error && <p style={{ color: '#ef4444', fontSize: '13px', margin: '5px 0' }}>{error}</p>}

        <button 
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #8e2de2, #4a00e0)',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px',
            boxShadow: '0 4px 15px rgba(142, 45, 226, 0.3)'
          }}
        >
          Verify & Login
        </button>
      </form>

      <button 
        onClick={onBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#94a3b8',
          marginTop: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          textDecoration: 'underline'
        }}
      >
        ← Cancel and Go Back
      </button>
    </div>
  );
}

export default StaffLogin;