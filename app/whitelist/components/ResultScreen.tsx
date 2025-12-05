import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  onRetry,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 60;

  // Grant whitelist role when user passes
  useEffect(() => {
    if (passed) {
      const grantRole = async () => {
        try {
          const response = await fetch('/api/whitelist/grant-role', {
            method: 'POST',
          })
          if (!response.ok) {
            console.error('Failed to grant whitelist role')
          } else {
            console.log('Whitelist role granted successfully')
            // Redirect to login page after 2 seconds
            setTimeout(() => {
              window.location.href = '/'
            }, 2000)
          }
        } catch (error) {
          console.error('Error granting role:', error)
        }
      }
      grantRole()
    }
  }, [passed])

  return (
    <div className="max-w-xl mx-auto bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-10 shadow-2xl text-center">
      <div className="flex justify-center mb-6">
        {passed ? (
          <div className="bg-emerald-500/20 p-4 rounded-full animate-bounce">
            <CheckCircle className="w-20 h-20 text-emerald-400" />
          </div>
        ) : (
          <div className="bg-red-500/20 p-4 rounded-full">
            <XCircle className="w-20 h-20 text-red-400" />
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold text-white mb-2">
        {passed ? "Application Approved" : "Application Rejected"}
      </h2>
      
      <p className={`text-xl font-medium mb-8 ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
        {passed 
          ? "Congratulations! You have passed the whitelist exam." 
          : "You did not meet the requirements this time."}
      </p>

      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Final Score</div>
        <div className="text-5xl font-black text-white">
          {score} <span className="text-2xl text-gray-500 font-normal">/ {totalQuestions}</span>
        </div>
        <div className="mt-2 text-gray-400">
          {percentage.toFixed(0)}% Accuracy
        </div>
        <div className="mt-1 text-xs text-gray-500">
        </div>
      </div>

      {!passed && (
        <div className="mb-8 p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-200 text-sm">
          Please review the server rules carefully before attempting again.
        </div>
      )}

      {!passed && (
        <Button
          onClick={onRetry}
          className="bg-[#3b9eff] hover:bg-[#2d8be8] text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
        >
          Try Again
        </Button>
      )}
      
      {passed && (
        <p className="text-gray-400 text-sm mt-4">
          Redirecting to login page...
        </p>
      )}
    </div>
  );
};

export default ResultScreen;