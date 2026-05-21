import React, { useState } from 'react';

function StaffPanel({ onLogout }) {
  // Initial Books List State
  const [books, setBooks] = useState([
    { id: 'B001', title: 'Core Java Programming', author: 'E. Balagurusamy', copies: 5, status: 'Active' },
    { id: 'B002', title: 'Database System Concepts', author: 'Korth', copies: 2, status: 'Active' },
    { id: 'B003', title: 'Web Technologies', author: 'Achyut Godbole', copies: 4, status: 'Active' },
  ]);

  // Student Book Allocation & Fine Tracking State
  const [allocations, setAllocations] = useState([
    { rollNo: '24MCA01', studentName: 'Sakthi', bookId: 'B002', bookTitle: 'Database System Concepts', dueDate: '2026-05-15', fine: 40 },
    { rollNo: '24MCA15', studentName: 'Prakash', bookId: 'B001', bookTitle: 'Core Java Programming', dueDate: '2026-06-01', fine: 0 },
  ]);

  // Form States for Adding New Book
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newId, setNewId] = useState('');
  const [newCopies, setNewCopies] = useState('');

  // Handle Add Book Action
  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newId || !newCopies) {
      alert('⚠️ All fields are mandatory bro!');
      return;
    }

    const newBook = {
      id: newId,
      title: newTitle,
      author: newAuthor,
      copies: parseInt(newCopies),
      status: 'Active'
    };

    setBooks([...books, newBook]);
    setNewId('');
    setNewTitle('');
    setNewAuthor('');
    setNewCopies('');
    alert('🎉 Book Added Successfully!');
  };

  // 1. DELETE BOOK OPTION
  const handleDeleteBook = (bookId, bookTitle) => {
    const confirmDelete = window.confirm(`Bro, "${bookTitle}" புக்கை டேட்டாபேஸ்ல இருந்து டெலீட் பண்ணிடலாமா?`);
    if (confirmDelete) {
      setBooks(books.filter(book => book.id !== bookId));
      alert('🗑️ Book Deleted Successfully!');
    }
  };

  // 2. RENEWAL OPTION
  const handleRenewal = (rollNo, bookId) => {
    setAllocations(allocations.map(alloc => {
      if (alloc.rollNo === rollNo && alloc.bookId === bookId) {
        const current零件 = new Date(alloc.dueDate);
        current零件.setDate(current零件.getDate() + 14); 
        const newDueDate = current零件.toISOString().split('T')[0];
        alert(`🔄 Book Renewed! New Due Date: ${newDueDate}`);
        return { ...alloc, dueDate: newDueDate, fine: 0 }; 
      }
      return alloc;
    }));
  };

  // 3. UPDATE FINE OPTION
  const handleUpdateFine = (rollNo, bookId) => {
    const currentAlloc = allocations.find(a => a.rollNo === rollNo && a.bookId === bookId);
    const newFine = prompt(`Enter new Fine Amount for ${currentAlloc.studentName} (Current: ₹${currentAlloc.fine}):`, currentAlloc.fine);
    
    if (newFine !== null) {
      const fineAmount = parseInt(newFine);
      if (isNaN(fineAmount) || fineAmount < 0) {
        alert('⚠️ Proper number போடுங்க bro!');
        return;
      }
      setAllocations(allocations.map(alloc => {
        if (alloc.rollNo === rollNo && alloc.bookId === bookId) {
          return { ...alloc, fine: fineAmount };
        }
        return alloc;
      }));
      alert('💰 Fine Amount Updated Successfully!');
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '30px',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '20px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
      fontFamily: '"Segoe UI", sans-serif'
    }}>
      
      {/* 👑 HEADER SECTION WITH WORKING BACK / LOGOUT ACTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#8e2de2', fontSize: '28px', fontWeight: '700' }}>👨‍🏫 Staff Audit Dashboard</h2>
          <p style={{ margin: '5px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>Manage stock entries, track student renewals, fines, and remove old data</p>
        </div>
        
        {/* 🔥 FIXED ACTION BUTTON - CLICK PANNA HOME-KU AUTOMATIC-AH POGUM 🔥 */}
        <button 
          onClick={onLogout}
          style={{
            background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            boxShadow: '0 4px 15px rgba(255,65,108,0.4)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ← Logout & Go Back Home
        </button>
      </div>

      {/* TOP INVENTORY ENTRY SPLIT SECTION */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '40px' }}>
        
        {/* ADD BOOK INPUT CONTAINER */}
        <div style={{ flex: '1', minWidth: '300px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#00f2fe', fontSize: '18px' }}>➕ Add New Book Stock</h3>
          <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" placeholder="Book ID (e.g., B005)" value={newId} onChange={(e) => setNewId(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: '#fff', outline: 'none' }} />
            <input type="text" placeholder="Book Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: '#fff', outline: 'none' }} />
            <input type="text" placeholder="Author Name" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: '#fff', outline: 'none' }} />
            <input type="number" placeholder="Total Copies Count" value={newCopies} onChange={(e) => setNewCopies(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: '#fff', outline: 'none' }} />
            <button type="submit" style={{ background: 'linear-gradient(45deg, #00c6ff, #0072ff)', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Push Entry to Inventory</button>
          </form>
        </div>

        {/* REGISTRY INVENTORY TABLE GRID VIEW */}
        <div style={{ flex: '2', minWidth: '400px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#fff', fontSize: '18px' }}>📋 Current Stock Registry</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(142, 45, 226, 0.3)', color: '#8e2de2' }}>
                  <th style={{ padding: '10px' }}>ID</th>
                  <th style={{ padding: '10px' }}>Book Title</th>
                  <th style={{ padding: '10px' }}>Author</th>
                  <th style={{ padding: '10px' }}>Copies</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#00f2fe' }}>{book.id}</td>
                    <td style={{ padding: '12px 10px', color: '#fff', fontWeight: '600' }}>{book.title}</td>
                    <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>{book.author}</td>
                    <td style={{ padding: '12px 10px', color: '#fff' }}>{book.copies} Units</td>
                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleDeleteBook(book.id, book.title)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.4)',
                          padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />

      {/* STUDENT CONTROL MANAGEMENT BLOCKS (RENEWAL & FINE GRID VIEW) */}
      <div>
        <h3 style={{ margin: '0 0 20px 0', color: '#ff007f', fontSize: '20px' }}>🔄 Student Book Control (Renewal & Fine Section)</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(0, 242, 254, 0.3)', color: '#00f2fe' }}>
                <th style={{ padding: '10px' }}>Roll No</th>
                <th style={{ padding: '10px' }}>Student Name</th>
                <th style={{ padding: '10px' }}>Book Allocated</th>
                <th style={{ padding: '10px' }}>Due Date</th>
                <th style={{ padding: '10px' }}>Fine Amount</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Management Actions</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((alloc, index) => (
                <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold', color: '#fff' }}>{alloc.rollNo}</td>
                  <td style={{ padding: '15px 10px', color: '#cbd5e1' }}>{alloc.studentName}</td>
                  <td style={{ padding: '15px 10px', color: '#fff', fontWeight: '500' }}>{alloc.bookTitle} <span style={{fontSize:'11px', color:'#94a3b8'}}>({alloc.bookId})</span></td>
                  <td style={{ padding: '15px 10px', color: '#ff007f', fontWeight: '600' }}>{alloc.dueDate}</td>
                  <td style={{ padding: '15px 10px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                      background: alloc.fine > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: alloc.fine > 0 ? '#ef4444' : '#10b981'
                    }}>
                      ₹{alloc.fine}
                    </span>
                  </td>
                  <td style={{ padding: '15px 10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button 
                      onClick={() => handleRenewal(alloc.rollNo, alloc.bookId)}
                      style={{ background: '#00c6ff', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                    >
                      🔄 Renew (14 Days)
                    </button>
                    <button 
                      onClick={() => handleUpdateFine(alloc.rollNo, alloc.bookId)}
                      style={{ background: '#eab308', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                    >
                      💰 Update Fine
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default StaffPanel;