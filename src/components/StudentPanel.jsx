import React, { useState } from 'react';

function StudentPanel({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dummy Books Data for Visual Check
  const [books] = useState([
    { id: 'B001', title: 'Core Java Programming', author: 'E. Balagurusamy', dept: 'Computer Application', status: 'Available', rack: 'Rack A-3' },
    { id: 'B002', title: 'Database System Concepts', author: 'Korth', dept: 'Computer Application', status: 'Allocated', rack: 'Rack B-1' },
    { id: 'B003', title: 'Web Technologies', author: 'Achyut Godbole', dept: 'Information Technology', status: 'Available', rack: 'Rack C-2' },
    { id: 'B004', title: 'Software Engineering Essentials', author: 'Pressman', dept: 'Computer Science', status: 'Available', rack: 'Rack A-1' },
  ]);

  // Filter books based on search input
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '30px',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '20px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.3)'
    }}>
      
      {/* PANEL HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#00f2fe', fontSize: '28px', fontWeight: '700' }}>🧑‍🎓 Student Hub Portal</h2>
          <p style={{ margin: '5px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>Search books, check live allocations, and find rack pathways</p>
        </div>
        
        {/* BACK TO HOME BUTTON */}
        <button 
          onClick={onBack}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#ff007f'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        >
          ← Back to Gateway
        </button>
      </div>

      {/* SEARCH SYSTEM */}
      <div style={{ marginBottom: '30px' }}>
        <input 
          type="text"
          placeholder="🔍 Search by Book Title, Author Name, or Book ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '15px 20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: '#1e293b',
            color: '#fff',
            fontSize: '16px',
            boxSizing: 'border-box',
            outline: 'none',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
        />
      </div>

      {/* DYNAMIC CATALOG TABLE */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(0, 242, 254, 0.3)', color: '#00f2fe' }}>
              <th style={{ padding: '12px' }}>Book ID</th>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Author</th>
              <th style={{ padding: '12px' }}>Department Target</th>
              <th style={{ padding: '12px' }}>Location/Rack</th>
              <th style={{ padding: '12px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '15px 12px', fontWeight: 'bold', color: '#ff007f' }}>{book.id}</td>
                  <td style={{ padding: '15px 12px', color: '#fff', fontWeight: '600' }}>{book.title}</td>
                  <td style={{ padding: '15px 12px', color: '#cbd5e1' }}>{book.author}</td>
                  <td style={{ padding: '15px 12px', color: '#94a3b8' }}>{book.dept}</td>
                  <td style={{ padding: '15px 12px', color: '#00f2fe' }}>{book.rack}</td>
                  <td style={{ padding: '15px 12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: book.status === 'Available' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: book.status === 'Available' ? '#10b981' : '#ef4444',
                      border: book.status === 'Available' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)'
                    }}>
                      {book.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                  ❌ No matching books found in RAAK database stack!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default StudentPanel;