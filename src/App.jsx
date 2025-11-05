import React, { useMemo, useState } from 'react';
import HeroLanding from './components/HeroLanding';
import AuthCard from './components/AuthCard';
import ModulesGrid from './components/ModulesGrid';
import IncomeTaxDashboard from './components/IncomeTaxDashboard';

function App() {
  const [view, setView] = useState('landing'); // landing | auth | modules | dashboard
  const [user, setUser] = useState(null);

  const goAuth = () => setView('auth');
  const handleAuth = (u) => { setUser(u); setView('modules'); };
  const openIncomeTax = () => setView('dashboard');

  return (
    <div className="font-inter antialiased min-h-screen bg-gray-900 text-white">
      {view === 'landing' && <HeroLanding onGetStarted={goAuth} />}
      {view === 'auth' && <AuthCard onContinue={handleAuth} />}
      {view === 'modules' && <ModulesGrid onOpenIncomeTax={openIncomeTax} />}
      {view === 'dashboard' && <IncomeTaxDashboard user={user} />}

      {/* Floating Chatbot (golden smiling cloud) */}
      <Chatbot />
    </div>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m your golden cloud. Ask anything about your taxes.' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    // Very basic contextual reply for demo
    let ans = 'Got it! I will help you with that.';
    if (/salary|hra|basic/i.test(q)) ans = 'For Salary, ensure HRA exemption is optimised and standard deduction applied.';
    if (/old|new|regime/i.test(q)) ans = 'We compare both regimes automatically and highlight the lower tax.';
    if (/advance|tds|tcs/i.test(q)) ans = 'Check the “Advance Tax, TDS & TCS” section for calculators and rates.';
    setTimeout(() => setMessages((m) => [...m, { role: 'bot', text: ans }]), 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-[320px] rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/60 shadow-[16px_16px_32px_#0b0f19,-16px_-16px_32px_#1f2937] overflow-hidden">
          <div className="px-4 py-3 flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 text-gray-900 font-semibold">
            😊 Golden Cloud
          </div>
          <div className="max-h-64 overflow-auto px-4 py-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm ${m.role==='bot' ? 'text-yellow-300' : 'text-gray-200'} `}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-700/60 flex items-center gap-2">
            <input
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              onKeyDown={(e)=>e.key==='Enter' && send()}
              placeholder="Ask about taxes..."
              className="flex-1 rounded-xl bg-gray-800/80 border border-gray-700 px-3 py-2 text-gray-100"
            />
            <button onClick={send} className="px-3 py-2 rounded-xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-200 text-gray-900 font-semibold">Send</button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        title="Chat with ABC"
        className="group relative h-14 w-14 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-200 text-gray-900 shadow-[10px_10px_20px_#0b0f19,-10px_-10px_20px_#1f2937] hover:brightness-110 transition"
      >
        <span className="text-2xl">😊</span>
        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-yellow-300 text-gray-900 text-xs font-bold flex items-center justify-center">AI</span>
      </button>
    </div>
  );
}

export default App;
