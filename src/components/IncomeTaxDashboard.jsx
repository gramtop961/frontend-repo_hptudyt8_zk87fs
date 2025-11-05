import React, { useMemo, useState } from 'react';

const PanelCard = ({ title, children, actions }) => (
  <div className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/60 p-5 md:p-6 shadow-[16px_16px_32px_#0b0f19,-16px_-16px_32px_#1f2937]">
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-semibold text-gray-100">{title}</h4>
      {actions}
    </div>
    <div className="text-gray-200 text-sm">
      {children}
    </div>
  </div>
);

const goldButton =
  'px-4 py-2 rounded-xl text-gray-900 font-semibold bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-200 shadow-[8px_8px_16px_#0b0f19,-8px_-8px_16px_#1f2937] hover:brightness-110 transition';
const silverButton =
  'px-4 py-2 rounded-xl font-semibold text-gray-100 bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 shadow-[8px_8px_16px_#0b0f19,-8px_-8px_16px_#1f2937] hover:brightness-110 transition';

const MoneyInput = ({ value, onChange, placeholder }) => (
  <input
    type="number"
    min="0"
    step="0.01"
    value={value}
    onChange={(e) => onChange(parseFloat(e.target.value || '0'))}
    placeholder={placeholder}
    className="w-full rounded-lg bg-gray-800/80 border border-gray-700 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
  />
);

const IncomeTaxDashboard = ({ user }) => {
  // Heads of Income state
  const [salary, setSalary] = useState({
    employer: '', tan: '', pan: '', address: '', nature: 'Private',
    rows: {
      Basic: { income: 0, exemption: 0 },
      HRA: { income: 0, exemption: 0 },
      Commission: { income: 0, exemption: 0 },
      DA: { income: 0, exemption: 0 },
      'Travel Allowance': { income: 0, exemption: 0 },
      ESOPs: { income: 0, exemption: 0 },
      Gift: { income: 0, exemption: 0 },
      Bonus: { income: 0, exemption: 0 },
      'Free Food': { income: 0, exemption: 0 },
    },
  });

  const [house, setHouse] = useState({ address: '', annualRent: 0, municipalTax: 0, interest: 0 });
  const standardDeductionHP = useMemo(() => Math.max(((house.annualRent - house.municipalTax) * 0.3), 0), [house]);
  const taxableRent = useMemo(() => Math.max(house.annualRent - house.municipalTax - standardDeductionHP - house.interest, 0), [house, standardDeductionHP]);

  const [os, setOs] = useState({ sb: 0, fd: 0, dividend: 0, other: 0 });
  const [bpType, setBpType] = useState('Presumptive');
  const [cgTab, setCgTab] = useState('Shares');

  // Deductions
  const [deductions, setDeductions] = useState({
    '80C': 0, '80CCD': 0, '80D': 0, '80E': 0, '80G': 0, '80GG': 0, '80JJAA': 0, '80U': 0,
    '80TTA': 0, '80TTB': 0, '80RRB': 0, '80EEB': 0, '80EEA': 0, '80DD': 0, '80DDB': 0, '80CCH': 0,
  });

  // Exempt income
  const [exempt, setExempt] = useState({
    Agricultural: 0,
    'Share of Profit (Partnership/HUF)': 0,
    'PPF Interest': 0,
    'Recognised PF': 0,
    'Compulsory Acquisition': 0,
    'Income of a Sikkihmise Individual': 0,
  });

  // Computations
  const salaryTaxable = useMemo(() => {
    return Object.values(salary.rows).reduce((acc, r) => acc + Math.max(r.income - r.exemption, 0), 0);
  }, [salary]);

  const hpTaxable = taxableRent;
  const osTotal = os.sb + os.fd + os.dividend + os.other;
  const bpTotal = 0; // placeholder for user input later if needed
  const cgTotal = 0; // placeholder tabs

  const grossTotalIncome = useMemo(() => salaryTaxable + hpTaxable + osTotal + bpTotal + cgTotal, [salaryTaxable, hpTaxable, osTotal, bpTotal, cgTotal]);

  const totalDeductions = useMemo(() => Object.values(deductions).reduce((a, b) => a + b, 0), [deductions]);
  const totalIncome = Math.max(grossTotalIncome - totalDeductions, 0);

  // Very simple tax calculator for comparison demo
  const simpleTax = (income, regime) => {
    let tax = 0;
    if (regime === 'New') {
      // illustration slabs (approx, demo only)
      const slabs = [
        [300000, 0.0], [300000, 0.05], [300000, 0.10], [300000, 0.15], [300000, 0.20], [Infinity, 0.30],
      ];
      let remaining = income;
      for (const [cap, rate] of slabs) {
        const amt = Math.min(remaining, cap);
        tax += amt * rate;
        remaining -= amt;
        if (remaining <= 0) break;
      }
    } else {
      const slabs = [ [250000, 0.0], [250000, 0.05], [500000, 0.20], [Infinity, 0.30] ];
      let remaining = income;
      for (const [cap, rate] of slabs) {
        const amt = Math.min(remaining, cap);
        tax += amt * rate;
        remaining -= amt;
        if (remaining <= 0) break;
      }
    }
    const cess = tax * 0.04;
    return { tax, cess, total: tax + cess };
  };

  const compNew = simpleTax(totalIncome, 'New');
  const compOld = simpleTax(totalIncome, 'Old');
  const better = compNew.total <= compOld.total ? 'New' : 'Old';

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white min-h-screen">
      <div className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-700/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-semibold">
            PAN: <span className="text-yellow-300">{user?.pan || 'ILOVE1432U'}</span> &nbsp; Name: <span className="text-yellow-300">Shankaran Pillai</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span className="hidden sm:inline">Previous Year ITRs:</span>
            <div className="flex gap-2 overflow-x-auto">
              {['FY 2025-26', 'FY 2024-25', 'FY 2023-24', 'FY 2022-23'].map((y) => (
                <span key={y} className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-200 whitespace-nowrap hover:brightness-110 cursor-default">
                  {y}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-gray-200">Heads of Income</h2>

        {/* Salary */}
        <PanelCard
          title="Salary"
          actions={<button className={goldButton}>Get Optimal Salary Structure</button>}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400">Employer Name</label>
                  <input value={salary.employer} onChange={(e)=>setSalary({...salary, employer: e.target.value})} className="w-full rounded-lg bg-gray-800/80 border border-gray-700 px-3 py-2 text-gray-100" />
                </div>
                <div>
                  <label className="text-xs text-gray-400">TAN</label>
                  <input value={salary.tan} onChange={(e)=>setSalary({...salary, tan: e.target.value})} className="w-full rounded-lg bg-gray-800/80 border border-gray-700 px-3 py-2 text-gray-100" />
                </div>
                <div>
                  <label className="text-xs text-gray-400">PAN</label>
                  <input value={salary.pan} onChange={(e)=>setSalary({...salary, pan: e.target.value})} className="w-full rounded-lg bg-gray-800/80 border border-gray-700 px-3 py-2 text-gray-100" />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Nature of Employment</label>
                  <select value={salary.nature} onChange={(e)=>setSalary({...salary, nature: e.target.value})} className="w-full rounded-lg bg-gray-800/80 border border-gray-700 px-3 py-2 text-gray-100">
                    <option>Govt</option>
                    <option>Private</option>
                    <option>Pension</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400">Address</label>
                <textarea value={salary.address} onChange={(e)=>setSalary({...salary, address: e.target.value})} rows={2} className="w-full rounded-lg bg-gray-800/80 border border-gray-700 px-3 py-2 text-gray-100" />
              </div>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-300">
                  <tr className="text-left">
                    <th className="py-2">Particulars</th>
                    <th className="py-2">Income</th>
                    <th className="py-2">Exemption</th>
                    <th className="py-2">Taxable Income</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/60">
                  {Object.entries(salary.rows).map(([k, v]) => (
                    <tr key={k}>
                      <td className="py-2 text-gray-200">{k}</td>
                      <td className="py-2"><MoneyInput value={v.income} onChange={(val)=>setSalary({ ...salary, rows: { ...salary.rows, [k]: { ...v, income: val }}})} /></td>
                      <td className="py-2"><MoneyInput value={v.exemption} onChange={(val)=>setSalary({ ...salary, rows: { ...salary.rows, [k]: { ...v, exemption: val }}})} /></td>
                      <td className="py-2 text-gray-100">{Math.max(v.income - v.exemption, 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="py-2 font-semibold text-gray-100">Total</td>
                    <td />
                    <td />
                    <td className="py-2 font-semibold text-yellow-300">{salaryTaxable.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </PanelCard>

        {/* House Property */}
        <PanelCard title="House Property (HP)">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400">Property Address</label>
                <textarea value={house.address} onChange={(e)=>setHouse({ ...house, address: e.target.value })} rows={2} className="w-full rounded-lg bg-gray-800/80 border border-gray-700 px-3 py-2 text-gray-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400">Annual Rent</label>
                  <MoneyInput value={house.annualRent} onChange={(v)=>setHouse({ ...house, annualRent: v })} />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Municipal Tax (MT)</label>
                  <MoneyInput value={house.municipalTax} onChange={(v)=>setHouse({ ...house, municipalTax: v })} />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Standard Deduction</label>
                  <input value={standardDeductionHP.toFixed(2)} readOnly className="w-full rounded-lg bg-gray-800/60 border border-gray-700 px-3 py-2 text-gray-100" />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Interest Paid</label>
                  <MoneyInput value={house.interest} onChange={(v)=>setHouse({ ...house, interest: v })} />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Taxable Rent</label>
                  <input value={taxableRent.toFixed(2)} readOnly className="w-full rounded-lg bg-gray-800/60 border border-gray-700 px-3 py-2 text-gray-100" />
                </div>
              </div>
            </div>
          </div>
        </PanelCard>

        {/* Other Sources */}
        <PanelCard title="Other Sources (OS)">
          <div className="grid md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-gray-400">Bank SB Interest</label>
              <MoneyInput value={os.sb} onChange={(v)=>setOs({ ...os, sb: v })} />
            </div>
            <div>
              <label className="text-xs text-gray-400">Bank FD Interest</label>
              <MoneyInput value={os.fd} onChange={(v)=>setOs({ ...os, fd: v })} />
            </div>
            <div>
              <label className="text-xs text-gray-400">Dividend</label>
              <MoneyInput value={os.dividend} onChange={(v)=>setOs({ ...os, dividend: v })} />
            </div>
            <div>
              <label className="text-xs text-gray-400">Other Income</label>
              <MoneyInput value={os.other} onChange={(v)=>setOs({ ...os, other: v })} />
            </div>
          </div>
        </PanelCard>

        {/* Business & Profession */}
        <PanelCard title="Business & Profession (PGBP)">
          <div className="flex gap-3 mb-4">
            {['Presumptive', 'Regular'].map((t) => (
              <button key={t} onClick={()=>setBpType(t)} className={`${bpType===t?goldButton:silverButton}`}>{t} Taxation</button>
            ))}
          </div>
          <p className="text-gray-300 text-sm">Enter turnover, profit and other details in the next update.</p>
        </PanelCard>

        {/* Capital Gains */}
        <PanelCard title="Capital Gains (CG)">
          <div className="flex gap-3 mb-4">
            {['Shares','Mutual Fund','Land/House','Crypto'].map((t)=>(
              <button key={t} onClick={()=>setCgTab(t)} className={`${cgTab===t?goldButton:silverButton}`}>{t}</button>
            ))}
          </div>
          <p className="text-gray-300 text-sm">Record transactions under {cgTab}. Detailed calculators coming soon.</p>
        </PanelCard>

        {/* Summary and tools */}
        <PanelCard title="Gross Total Income">
          <div className="text-2xl font-bold text-yellow-300">₹ {grossTotalIncome.toFixed(2)}</div>
        </PanelCard>

        <PanelCard title="Deductions">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-300">
                <tr className="text-left">
                  <th className="py-2">Section</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Max Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/60">
                {Object.keys(deductions).sort().map((sec) => (
                  <tr key={sec}>
                    <td className="py-2 text-gray-200">{sec}</td>
                    <td className="py-2"><MoneyInput value={deductions[sec]} onChange={(v)=>setDeductions({ ...deductions, [sec]: v })} /></td>
                    <td className="py-2 text-gray-400">As per law</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelCard>

        <PanelCard title="Exempt Income">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-300">
                <tr className="text-left">
                  <th className="py-2">Income</th>
                  <th className="py-2">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/60">
                {Object.keys(exempt).map((k) => (
                  <tr key={k}>
                    <td className="py-2 text-gray-200">{k}</td>
                    <td className="py-2"><MoneyInput value={exempt[k]} onChange={(v)=>setExempt({ ...exempt, [k]: v })} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelCard>

        <PanelCard title="Compare Old and New Tax Regimes">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-300">
                <tr className="text-left">
                  <th className="py-2">Particulars</th>
                  <th className="py-2">New</th>
                  <th className="py-2">Old</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/60">
                <tr>
                  <td className="py-2 text-gray-200">Gross Total Income</td>
                  <td className="py-2">₹ {grossTotalIncome.toFixed(2)}</td>
                  <td className="py-2">₹ {grossTotalIncome.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-200">Deduction</td>
                  <td className="py-2">₹ {totalDeductions.toFixed(2)}</td>
                  <td className="py-2">₹ {totalDeductions.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-200">Total Income</td>
                  <td className="py-2">₹ {totalIncome.toFixed(2)}</td>
                  <td className="py-2">₹ {totalIncome.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-200">Slabs of Tax</td>
                  <td className="py-2">As per New</td>
                  <td className="py-2">As per Old</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-200">Cess 4%</td>
                  <td className="py-2">₹ {compNew.cess.toFixed(2)}</td>
                  <td className="py-2">₹ {compOld.cess.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-200">Total</td>
                  <td className="py-2">₹ {compNew.tax.toFixed(2)}</td>
                  <td className="py-2">₹ {compOld.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-200">Surcharge</td>
                  <td className="py-2">-</td>
                  <td className="py-2">-</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-gray-100">Total Tax</td>
                  <td className={`py-2 font-semibold ${better==='New' ? 'text-yellow-300' : 'text-gray-200'}`}>₹ {compNew.total.toFixed(2)}</td>
                  <td className={`py-2 font-semibold ${better==='Old' ? 'text-yellow-300' : 'text-gray-200'}`}>₹ {compOld.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </PanelCard>

        <PanelCard title="Compare Income and Tax with previous year">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-300">
                <tr className="text-left">
                  <th className="py-2">Particulars</th>
                  <th className="py-2">Year-1</th>
                  <th className="py-2">Year-2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/60">
                {['Heads of Income','GTI','Deductions','TI','TDS','TCS','Adv Tax','Regime used'].map((p)=> (
                  <tr key={p}>
                    <td className="py-2 text-gray-200">{p}</td>
                    <td className="py-2 text-gray-400">-</td>
                    <td className="py-2 text-gray-400">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelCard>

        <PanelCard title="Advance Tax, TDS and TCS">
          <div className="flex gap-3 mb-4">
            <a href="https://eportal.incometax.gov.in/iec/foservices/#/TaxCalc/calculator" target="_blank" rel="noreferrer" className={goldButton}>Advance Tax Calculator</a>
            <button className={silverButton}>TDS Rates & Limits</button>
            <button className={silverButton}>TCS Rates & Limits</button>
          </div>
          <div className="text-sm text-gray-300">Summary of prepared taxes will appear here.</div>
        </PanelCard>

        <PanelCard title="Total Income and Tax">
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="rounded-2xl p-4 bg-gray-800/80 border border-gray-700">
              <div className="text-gray-400">Heads of Income</div>
              <div className="text-xl font-bold text-yellow-300">₹ {grossTotalIncome.toFixed(2)}</div>
            </div>
            <div className="rounded-2xl p-4 bg-gray-800/80 border border-gray-700">
              <div className="text-gray-400">Deductions</div>
              <div className="text-xl font-bold text-yellow-300">₹ {totalDeductions.toFixed(2)}</div>
            </div>
            <div className="rounded-2xl p-4 bg-gray-800/80 border border-gray-700">
              <div className="text-gray-400">Total Income</div>
              <div className="text-xl font-bold text-yellow-300">₹ {totalIncome.toFixed(2)}</div>
            </div>
            <div className="rounded-2xl p-4 bg-gray-800/80 border border-gray-700">
              <div className="text-gray-400">Tax (est.)</div>
              <div className="text-xl font-bold text-yellow-300">₹ {Math.min(compNew.total, compOld.total).toFixed(2)}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button className={`${goldButton} animate-pulse`}>How to save tax - on this same income next year</button>
            <button className={silverButton}>Download Summary</button>
          </div>
        </PanelCard>
      </div>
    </section>
  );
};

export default IncomeTaxDashboard;
