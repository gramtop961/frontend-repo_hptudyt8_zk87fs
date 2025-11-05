import React from 'react';

const modules = [
  { key: 'financial', label: 'Financial Statements' },
  { key: 'mis', label: 'MIS Reports' },
  { key: 'ratios', label: 'Financial Ratios' },
  { key: 'mca', label: 'MCA' },
  { key: 'gst', label: 'GST' },
  { key: 'audit', label: 'Audit' },
  { key: 'income_tax', label: 'Income Tax' },
];

const ModulesGrid = ({ onOpenIncomeTax }) => {
  return (
    <section id="modules" className="min-h-[70vh] bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-gray-200">
          Modules
        </h3>
        <p className="mt-2 text-gray-300">Tap a module to explore. Income Tax is live, others are coming soon.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, idx) => {
            const live = m.key === 'income_tax';
            return (
              <button
                key={m.key}
                onClick={() => live && onOpenIncomeTax()}
                className={`relative group rounded-3xl p-6 text-left transition transform hover:-translate-y-0.5 focus:outline-none ${
                  live
                    ? 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-100 text-gray-900'
                    : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200'
                } shadow-[16px_16px_32px_#0b0f19,-16px_-16px_32px_#1f2937]`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${live ? 'text-gray-900' : 'text-gray-100'}`}>{idx + 1}. {m.label}</span>
                  {!live && (
                    <span className="text-[10px] px-2 py-1 rounded-full bg-gray-700/70 text-gray-200 border border-gray-600">
                      Coming Soon
                    </span>
                  )}
                </div>
                <div className={`mt-3 text-sm ${live ? 'text-gray-800' : 'text-gray-400'}`}>
                  {live ? 'Start your tax journey here' : 'Launching shortly'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModulesGrid;
