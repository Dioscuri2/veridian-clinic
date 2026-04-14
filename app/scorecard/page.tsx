"use client";
import { useState } from 'react';

type Answers = {
  sleep?: string;
  fasting?: string;
  sugar?: string;
  exercise?: string;
};

export default function MetabolicScorecard() {
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answers>({});

  const calculateScore = () => {
    // Basic logic for MVP scorecard
    let points = 0;
    if (answers.sleep === '7-9') points += 20;
    if (answers.fasting === 'yes') points += 30;
    if (answers.sugar === 'low') points += 30;
    if (answers.exercise === 'daily') points += 20;
    setScore(points);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center font-display">Metabolic Health Scorecard</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">How many hours of quality sleep do you get?</label>
          <select onChange={(e) => setAnswers({...answers, sleep: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition-all">
            <option value="">Select...</option>
            <option value="<6">Less than 6 hours</option>
            <option value="6-7">6-7 hours</option>
            <option value="7-9">7-9 hours</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Do you practice intermittent fasting?</label>
          <select onChange={(e) => setAnswers({...answers, fasting: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition-all">
            <option value="">Select...</option>
            <option value="yes">Yes, regularly</option>
            <option value="no">No</option>
          </select>
        </div>
        <button onClick={calculateScore} className="w-full py-4 bg-green-900 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors shadow-lg shadow-green-900/20">
          Calculate My Score
        </button>
        {score !== null && (
          <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-center">
            <p className="text-sm text-green-800 font-medium">Your Metabolic Health Score</p>
            <p className="text-4xl font-bold text-green-900">{score}/100</p>
          </div>
        )}
      </div>
    </div>
  );
}
