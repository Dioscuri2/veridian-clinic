import { useState } from 'react';

export default function MetabolicScorecard() {
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState({});

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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Metabolic Health Scorecard</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">How many hours of quality sleep do you get?</label>
          <select onChange={(e) => setAnswers({...answers, sleep: e.target.value})} className="border p-2 w-full">
            <option value="">Select...</option>
            <option value="<6">Less than 6</option>
            <option value="7-9">7-9 hours</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Do you practice intermittent fasting?</label>
          <select onChange={(e) => setAnswers({...answers, fasting: e.target.value})} className="border p-2 w-full">
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button onClick={calculateScore} className="bg-green-700 text-white p-3 rounded w-full">
          Get Your Score
        </button>
        {score !== null && <p className="text-xl font-semibold mt-4">Your Score: {score}/100</p>}
      </div>
    </div>
  );
}
