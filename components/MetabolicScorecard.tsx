"use client";
import React, { useState } from 'react';

// British units with (US equivalents)
const QUESTIONS = [
  { id: 'sleep', domain: 'Recovery', q: 'Average hours of deep, quality sleep?', options: [{v:25, l:'7-9 hours'}, {v:15, l:'6 hours'}, {v:5, l:'<6 hours'}] },
  { id: 'fasting', domain: 'Metabolic', q: 'Daily fasting window (no calories)?', options: [{v:25, l:'16+ hours'}, {v:15, l:'12-16 hours'}, {v:5, l:'<12 hours'}] },
  { id: 'strength', domain: 'Structural', q: 'Weekly strength/resistance sessions?', options: [{v:25, l:'3+ times'}, {v:15, l:'1-2 times'}, {v:0, l:'None'}] },
  { id: 'sugar', domain: 'Metabolic', q: 'Weekly intake of ultra-processed sugar?', options: [{v:25, l:'Rarely'}, {v:15, l:'Occasionally'}, {v:0, l:'Daily'}] },
  { id: 'hba1c', domain: 'Metabolic', q: 'HbA1c level (mmol/mol)', options: [{v:25, l:'< 39 (< 5.7%)'}, {v:15, l:'39–47 (5.7–6.4%)'}, {v:0, l:'≥ 48 (≥ 6.5%)'}] },
];

export default function MetabolicScorecard() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    const domainScores = {
      Recovery: answers.sleep || 0,
      Metabolic: ((answers.fasting || 0) + (answers.sugar || 0) + (answers.hba1c || 0)) / 3,
      Structural: answers.strength || 0,
    };
    setResults({ total, domainScores });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border border-gray-100 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Metabolic Health Scorecard</h3>
      {!results ? (
        <div className="space-y-6">
          {QUESTIONS.map(q => (
            <div key={q.id}>
              <label className="block text-sm font-medium mb-3 text-gray-700">{q.q}</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {q.options.map(opt => (
                  <button key={opt.l} onClick={() => setAnswers({...answers, [q.id]: opt.v})} 
                    className={`p-3 rounded-xl border text-sm transition-all ${answers[q.id] === opt.v ? 'bg-green-900 text-white border-green-900' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={calculate} className="w-full py-4 bg-green-900 text-white font-bold rounded-xl hover:bg-green-800 transition-colors mt-4">
            Calculate Score
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center p-6 bg-gray-50 rounded-2xl">
            <p className="text-sm text-gray-600 mb-2">Your Overall Metabolic Score</p>
            <div className="text-5xl font-extrabold text-green-900">{results.total}/100</div>
          </div>
          <div className="space-y-4">
            {Object.entries(results.domainScores).map(([domain, score]) => (
              <div key={domain}>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  <span>{domain}</span>
                  <span>{Math.round(Number(score))}%</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-900 transition-all duration-1000" style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setResults(null)} className="w-full py-2 text-gray-500 underline text-sm">Retake Assessment</button>
        </div>
      )}
    </div>
  );
}
