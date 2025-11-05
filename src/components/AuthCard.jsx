import React, { useState } from 'react';

const AuthCard = ({ onContinue }) => {
  const [pan, setPan] = useState('');
  const [password, setPassword] = useState('');
  const [useQuick, setUseQuick] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = useQuick
      ? { pan: 'ILOVE1432U', name: 'Shankaran Pillai' }
      : { pan: pan || 'ILOVE1432U', name: 'Shankaran Pillai' };
    onContinue(data);
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-16">
      <div className="w-full max-w-xl rounded-3xl p-8 md:p-10 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/60 shadow-[20px_20px_40px_#0b0f19,-20px_-20px_40px_#1f2937]">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-gray-200">
          Welcome to ABC
        </h2>
        <p className="mt-1 text-sm text-gray-300">
          Sign in with your PAN and Income Tax Portal password or continue instantly.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="flex items-center gap-3">
            <input
              id="quick"
              type="checkbox"
              checked={useQuick}
              onChange={(e) => setUseQuick(e.target.checked)}
              className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-yellow-400 focus:ring-yellow-300"
            />
            <label htmlFor="quick" className="text-sm text-gray-300">
              Login/Signup with any or details (Quick access)
            </label>
          </div>

          {!useQuick && (
            <>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">PAN Number</label>
                <input
                  type="text"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  placeholder="ABCDE1234F"
                  className="w-full rounded-xl bg-gray-800/80 border border-gray-700 px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Income Tax Portal Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-gray-800/80 border border-gray-700 px-4 py-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </>
          )}

          <p className="text-[12px] text-gray-400">
            We extract basic and relevant information from your income tax profile for enhanced experience.
          </p>

          <button
            type="submit"
            className="w-full mt-2 px-6 py-3 rounded-2xl text-gray-900 font-semibold bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-200 shadow-[10px_10px_20px_#0b0f19,-10px_-10px_20px_#1f2937] hover:brightness-110 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

export default AuthCard;
