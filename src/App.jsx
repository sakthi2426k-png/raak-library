import React, { useState } from 'react';
import StudentPanel from './components/StudentPanel';
import StaffLogin from './components/StaffLogin';
import StaffPanel from './components/StaffPanel';

function App() {
  // Navigation State: 'home', 'student', 'staff-login', 'staff-panel'
  const [screen, setScreen] = useState('home');
  const [showDevModal, setShowDevModal] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      color: '#ffffff',
      padding: '20px',
      fontFamily: '"Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box'
    }}>
      
      {/* 🌟 GLOBAL HEADER */}
      <header style={{ textAlign: 'center', marginBottom: '40px', marginTop: '10px' }}>
        <h1 style={{ margin: 0, fontSize: '38px', fontWeight: '800', letterSpacing: '1px', background: 'linear-gradient(90deg, #00f2fe, #4facfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          📚 RAAK Library Hub
        </h1>
        <p style={{ margin: '8px 0 0 0', color: '#94a3b8', fontSize: '16px' }}>
          AUTONOMOUS INSTITUTION
        </p>
      </header>

      {/* 🎛️ DYNAMIC SCREEN ROUTER */}
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* SCREEN 1: HOME SCREEN GATEWAY */}
        {screen === 'home' && (
          <div>
            <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
              
              {/* STUDENT PORTAL CARD */}
              <div 
                onClick={() => setScreen('student')}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(0, 242, 254, 0.2)',
                  padding: '40px 30px',
                  borderRadius: '20px',
                  width: '280px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(0, 242, 254, 0.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
              >
                <div style={{ fontSize: '50px', marginBottom: '15px' }}>🧑‍🎓</div>
                <h3 style={{ margin: '0 0 10px 0', color: '#00f2fe', fontSize: '22px' }}>Student Hub</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>Search book catalog, pathway racks, and check availability lines.</p>
              </div>

              {/* STAFF PORTAL CARD */}
              <div 
                onClick={() => setScreen('staff-login')}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(142, 45, 226, 0.2)',
                  padding: '40px 30px',
                  borderRadius: '20px',
                  width: '280px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(142, 45, 226, 0.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
              >
                <div style={{ fontSize: '50px', marginBottom: '15px' }}>👨‍🏫</div>
                <h3 style={{ margin: '0 0 10px 0', color: '#8e2de2', fontSize: '22px' }}>Staff Portal</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>Database entry, modify audit stocks, renewals and student fine logs.</p>
              </div>

            </div>

            {/* DEVELOPER CORNER ACTIVATOR BUTTON */}
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button 
                onClick={() => setShowDevModal(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#94a3b8',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#ff007f'; e.currentTarget.style.color = '#fff'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#94a3b8'; }}
              >
                🚀 Meet the Developer
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: STUDENT HUB PANEL */}
        {screen === 'student' && (
          <StudentPanel onBack={() => setScreen('home')} />
        )}

        {/* SCREEN 3: STAFF LOGIN SECURE GATE */}
        {screen === 'staff-login' && (
          <StaffLogin 
            onLoginSuccess={() => setScreen('staff-panel')} 
            onBack={() => setScreen('home')} 
          />
        )}

        {/* SCREEN 4: STAFF MANAGEMENT CORE DASHBOARD */}
        {screen === 'staff-panel' && (
          <StaffPanel onLogout={() => setScreen('home')} />
        )}

      </main>

      {/* 🚨 DEVELOPER OVERLAY POPUP MODAL */}
      {showDevModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 2000, backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: '#1e293b', padding: '35px', borderRadius: '20px',
            width: '400px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '10px' }}>🤖</div>
            <h3 style={{ margin: '10px 0 5px 0', color: '#ff007f', fontSize: '24px' }}>Sakthikannan Prakash</h3>
            <p style={{ margin: '0 0 20px 0', color: '#94a3b8', fontSize: '14px' }}>Lead Full-Stack Developer</p>
            
            {/* 🔥 UPDATED TO BCA HERE BRO 🔥 */}
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '10px', textAlign: 'left', fontSize: '14px', marginBottom: '25px', color: '#cbd5e1' }}>
              <strong>📌 Dept:</strong> Computer Application (BCA)<br/>
              <strong>🏫 Campus:</strong> RAAK Autonomous Institution<br/>
              <strong>💻 Tech Stack:</strong> React.js, Vite, Node, CSS Core
            </div>

            <button 
              onClick={() => setShowDevModal(false)}
              style={{
                background: '#ff007f', color: 'white', border: 'none',
                padding: '10px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
              }}
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;