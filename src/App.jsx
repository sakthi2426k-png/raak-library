import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Absolute verified intact secure token injection parameters match logic
const supabaseUrl = 'https://tpqlngnuxrlsmvmcwgaa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwcWxuZ251eHJsc212bWN3Z2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNzkyNTksImV4cCI6MjA5NDg1NTI1OX0.HWKNCHJ3SIzNz8aYmF6p_KAC0sTc00g7tMMvtxAVuow';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [books, setBooks] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [showTakeModal, setShowTakeModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [addForm, setAddForm] = useState({ title: '', author: '', serial_number: '' });
  const [takeForm, setTakeForm] = useState({ book_serial: '', student_name: '', department: '' });
  const [returnForm, setReturnForm] = useState({ book_serial: '' });

  // Sync with your uppercase structural Supabase schema definitions
  const fetchData = async () => {
    try {
      const { data: booksData, error: bError } = await supabase.from('BOOKS').select('*').order('id', { ascending: false });
      if (bError) console.error("Books Fetch Error:", bError);
      if (booksData) setBooks(booksData);

      const { data: historyData, error: hError } = await supabase.from('history').select('*').order('id', { ascending: false });
      if (hError) console.error("History Fetch Error:", hError);
      if (historyData) setHistory(historyData);
    } catch (err) {
      console.error("System connection failure:", err);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleAddBookSubmit = async (e) => {
    e.preventDefault();
    // Maps seamlessly into 'BOOKS' with initial status state constraint
    const { data, error } = await supabase
      .from('BOOKS')
      .insert([{ 
        title: addForm.title, 
        author: addForm.author, 
        serial_number: addForm.serial_number, 
        status: 'Available' 
      }]);
    
    if (error) {
      console.error("Supabase Operation Failed:", error);
      alert("Database Error Context: " + error.message);
      return;
    }
    
    alert("🚀 Book Identity Added Successfully Into RAAK Hub Stack!");
    setAddForm({ title: '', author: '', serial_number: '' });
    setShowAddModal(false);
    fetchData();
  };

  const handleTakeBookSubmit = async (e) => {
    e.preventDefault();
    const book = books.find(b => b.serial_number.toLowerCase() === takeForm.book_serial.toLowerCase());
    if (!book || book.status !== 'Available') return alert("Verification Error: Check Serial ID or Availability Status!");
    
    const { error: updateError } = await supabase.from('BOOKS').update({ status: 'Borrowed' }).eq('serial_number', book.serial_number);
    if (updateError) return alert("Update Query Dropped: " + updateError.message);

    const { error: insertError } = await supabase.from('history').insert([{ ...takeForm, action_type: 'Borrowed', timestamp: new Date().toLocaleString() }]);
    if (insertError) return alert("System Logging Registry Failed: " + insertError.message);

    alert("✅ Allocation Complete: Book Issued Successfully!");
    setTakeForm({ book_serial: '', student_name: '', department: '' });
    setShowTakeModal(false);
    fetchData();
  };

  const handleReturnBookSubmit = async (e) => {
    e.preventDefault();
    const book = books.find(b => b.serial_number.toLowerCase() === returnForm.book_serial.toLowerCase());
    if (!book || book.status !== 'Borrowed') return alert("Asset Matching Mismatch: Book not currently registered under borrow schema!");
    
    const { error: updateError } = await supabase.from('BOOKS').update({ status: 'Available' }).eq('serial_number', book.serial_number);
    if (updateError) return alert("Status Core Conversion Dropped: " + updateError.message);

    const { error: insertError } = await supabase.from('history').insert([{
      book_serial: book.serial_number,
      student_name: 'Library Return Counter',
      department: 'Admin',
      action_type: 'Returned',
      timestamp: new Date().toLocaleString()
    }]);
    if (insertError) return alert("Log History Write Exception: " + insertError.message);

    alert("🔄 Deposition Processed: Asset Status Restored Successfully!");
    setReturnForm({ book_serial: '' });
    setShowReturnModal(false);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500">
      
      {/* Inline Keyframe Control Layout Block Rendering Engine */}
      <style>{`
        @keyframes dynamicHeaderScroll {
          0% { transform: translateX(5%); }
          100% { transform: translateX(-70%); }
        }
        .animate-branding-strip {
          display: inline-block;
          white-space: nowrap;
          animation: dynamicHeaderScroll 30s linear infinite;
        }
      `}</style>

      {/* College Identity Scrolling Moving Header */}
      <div className="bg-emerald-950/40 border-b border-emerald-800/30 text-emerald-400 py-2.5 overflow-hidden sticky top-0 z-[60] backdrop-blur-md">
        <div className="w-full overflow-hidden whitespace-nowrap">
          <span className="animate-branding-strip text-xs font-bold tracking-widest uppercase block">
            Raak Arts And Science College, The Autonomous Institution • Raak Arts And Science College, The Autonomous Institution • Raak Arts And Science College, The Autonomous Institution • Raak Arts And Science College, The Autonomous Institution
          </span>
        </div>
      </div>

      {/* Premium Glassmorphism Navbar Layer */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-[38px] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            RAAK LIBRARY HUB
          </h1>
          <button onClick={() => setShowAddModal(true)} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/20 transition-all active:scale-95">
            + Add New Book
          </button>
        </div>
      </nav>

      {/* Dashboard Core Control System Panels */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Search Engine Parameters Bar */}
        <div className="flex flex-col md:flex-row gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search library stock catalog by book title or serial identification..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowTakeModal(true)} className="px-6 py-3 bg-cyan-600/10 text-cyan-400 border border-cyan-600/30 rounded-xl text-sm font-bold hover:bg-cyan-600/20 transition-all active:scale-95">Issue Book</button>
            <button onClick={() => setShowReturnModal(true)} className="px-6 py-3 bg-amber-600/10 text-amber-400 border border-amber-600/30 rounded-xl text-sm font-bold hover:bg-amber-600/20 transition-all active:scale-95">Return Book</button>
          </div>
        </div>

        {/* Dashboard Dynamic Grid Framework Component Layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Inventory Books Showcase Display Component */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-fit">
            {books.length === 0 ? (
              <div className="col-span-full bg-slate-900/30 border border-dashed border-slate-800 p-12 text-center rounded-2xl text-slate-500 text-sm font-medium">
                No inventory matches found. Deploy "+ Add New Book" registry sequence token.
              </div>
            ) : (
              books.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.serial_number.toLowerCase().includes(searchQuery.toLowerCase())).map((book) => (
                <div key={book.id} className="group bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all shadow-xl flex flex-col justify-between min-h-[140px]">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-mono px-2 py-1 bg-slate-950 rounded-md text-slate-400 border border-slate-800 font-bold uppercase tracking-wider">{book.serial_number}</span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                        book.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {book.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2">{book.title}</h3>
                  </div>
                  <p className="text-slate-500 text-xs mt-2">by {book.author}</p>
                </div>
              ))
            )}
          </div>

          {/* Core System Logging Matrix Terminal Tracker */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-fit max-h-[600px] flex flex-col">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Tracking Counter Logs
            </h2>
            <div className="overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              {history.length === 0 ? (
                <p className="text-xs text-slate-600 text-center py-4">Database pipeline transaction logs clear</p>
              ) : (
                history.map((log) => (
                  <div key={log.id} className="p-4 bg-slate-950 rounded-xl border border-slate-900 space-y-2 hover:border-slate-800 transition-colors">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
                      <span className={log.action_type === 'Borrowed' ? 'text-cyan-400' : 'text-amber-400'}>{log.action_type}</span>
                      <span className="text-slate-600 font-normal">{log.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-semibold">Asset ID: <span className="text-emerald-400 font-mono font-bold">{log.book_serial}</span></p>
                    <p className="text-[10px] text-slate-500 font-medium">{log.student_name} • <span className="text-slate-400">{log.department}</span></p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>

      {/* MODAL WINDOW 1: WRITE BACKEND NEW BOOK REGISTRY ASSETS */}
      {showAddModal && (
        
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
          <form onSubmit={handleAddBookSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md space-y-5 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2">New Asset Registration</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Asset Serial ID</label>
                <input type="text" placeholder="e.g. B101" required value={addForm.serial_number} onChange={(e) => setAddForm({...addForm, serial_number: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none text-slate-200"/>
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Asset Book Title</label>
                <input type="text" placeholder="e.g. Core Java Volume 1" required value={addForm.title} onChange={(e) => setAddForm({...addForm, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none text-slate-200"/>
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Author Name Reference</label>
                <input type="text" placeholder="e.g. Cay S. Horstmann" required value={addForm.author} onChange={(e) => setAddForm({...addForm, author: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-emerald-500 outline-none text-slate-200"/>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-sm transition-colors">Cancel</button>
              <button type="submit" className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-sm text-white transition-colors">Commit Entry</button>
            </div>
          </form>
        </div>
      )}
      
      {/* MODAL WINDOW 2: TRANSITION DYNAMICS ALLOCATION RUNS */}
      {showTakeModal && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
         <form onSubmit={handleTakeBookSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md space-y-5 shadow-2xl">
           <h3 className="text-lg font-bold text-cyan-400 border-b border-slate-800 pb-2">Issue Asset Allocation</h3>
           <div className="space-y-4">
             <div>
               <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Asset Target Serial ID</label>
               <input type="text" placeholder="e.g. B101" required value={takeForm.book_serial} onChange={(e) => setTakeForm({...takeForm, book_serial: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-cyan-500 outline-none text-slate-200"/>
             </div>
             <div>
               <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Student / Scholar Name Identifier</label>
               <input type="text" placeholder="e.g. Sakthivel M" required value={takeForm.student_name} onChange={(e) => setTakeForm({...takeForm, student_name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-cyan-500 outline-none text-slate-200"/>
             </div>
             <div>
               <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Department Branch stream</label>
               <input type="text" placeholder="e.g. Computer Science / IT" required value={takeForm.department} onChange={(e) => setTakeForm({...takeForm, department: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-cyan-500 outline-none text-slate-200"/>
             </div>
           </div>
           <div className="flex gap-3 pt-2">
             <button type="button" onClick={() => setShowTakeModal(false)} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-sm transition-colors">Cancel</button>
             <button type="submit" className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-sm text-white transition-colors">Confirm Allocation</button>
           </div>
         </form>
       </div>
      )}

      {/* MODAL WINDOW 3: RETURN TRANSACTIONS DEPOSITION ENTRY RUN */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
        <form onSubmit={handleReturnBookSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md space-y-5 shadow-2xl">
          <h3 className="text-lg font-bold text-amber-400 border-b border-slate-800 pb-2">Return Asset Log Deposition</h3>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Scanned Asset Serial ID</label>
            <input type="text" placeholder="e.g. B101" required value={returnForm.book_serial} onChange={(e) => setReturnForm({...returnForm, book_serial: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-amber-500 outline-none text-slate-200"/>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowReturnModal(false)} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-sm transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold text-sm text-white transition-colors">Process Deposition</button>
          </div>
        </form>
      </div>
      )}

    </div>
  );
}