import React from 'react';
import { Play, AlertTriangle } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 shadow-2xl text-center shadow-[#3da8ff]/10">
      <div className="flex justify-center mb-6">
        <div className="bg-[#3da8ff]/20 p-4 rounded-full">
          <img 
            src="Logo.png" 
            alt="NOLIMITS INDIA Logo" 
            className="w-16 h-16 object-contain" 
          />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3da8ff] to-cyan-400 bg-clip-text text-transparent mb-4">
      Welcome to NOLIMITS INDIA!
      </h1>
      
      <p className="text-slate-400 text-lg mb-8">
        Get whitelisted in under 5 minutes! Start questions now!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="font-semibold text-white mb-1 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" /> 
            Time Limit
          </div>
          <p className="text-sm text-slate-400">You have exactly 30 seconds per question.</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="font-semibold text-white mb-1">Accuracy</div>
          <p className="text-sm text-slate-400">Review your answers carefully. Wrong answers may result in rejection.</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="font-semibold text-white mb-1">Focus</div>
          <p className="text-sm text-slate-400">Once started, you cannot pause the test.</p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-[#3da8ff] font-lg rounded-full hover:bg-[#2b8cdb] hover:shadow-lg hover:shadow-[#3da8ff]/30 hover:-translate-y-1 w-full md:w-auto"
      >
        <span>Start Application</span>
        <Play className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default StartScreen;