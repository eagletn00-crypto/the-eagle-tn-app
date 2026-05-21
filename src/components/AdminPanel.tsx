import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, CheckCircle, RotateCcw } from 'lucide-react';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const CORRECT_PIN = '1234'; // Change this to your desired PIN

  // Auto-check PIN when it reaches 4 digits
  useEffect(() => {
    if (pin.length === 4) {
      if (pin === CORRECT_PIN) {
        setIsVerified(true);
        setError('');
      } else {
        setError('Invalid PIN. Please try again.');
        setPin('');
      }
    }
  }, [pin]);

  const handleNumberClick = (num: number) => {
    if (pin.length < 6) {
      setPin(prev => prev + num);
      setError('');
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const handleClear = () => {
    setPin('');
    setIsVerified(false);
    setError('');
  };

  const keypadButtons = [
    { label: '1', value: 1, type: 'number' },
    { label: '2', value: 2, type: 'number' },
    { label: '3', value: 3, type: 'number' },
    { label: '4', value: 4, type: 'number' },
    { label: '5', value: 5, type: 'number' },
    { label: '6', value: 6, type: 'number' },
    { label: '7', value: 7, type: 'number' },
    { label: '8', value: 8, type: 'number' },
    { label: '9', value: 9, type: 'number' },
    { label: '0', value: 0, type: 'number' },
    { label: 'DEL', icon: Delete, type: 'delete' },
  ];

  // Success screen
  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Access Granted</h2>
                <p className="text-slate-400">Welcome to the Admin Panel</p>
              </div>

              <button
                onClick={handleClear}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-slate-400">Enter your PIN to continue</p>
          </div>

          {/* Display Field */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              PIN Code
            </label>
            <div className="bg-slate-900 border border-slate-600 rounded-lg p-4 focus-within:border-blue-500 transition-colors">
              <div className="flex items-center gap-3 min-h-12">
                <div className="flex gap-2 flex-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i < pin.length
                          ? 'bg-blue-500 scale-100'
                          : 'bg-slate-600 scale-75'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-500 text-sm font-mono">
                  {pin.length}/6
                </span>
              </div>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                ⚠️ {error}
              </p>
            )}
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {keypadButtons.map((btn, idx) => {
              if (btn.type === 'number') {
                return (
                  <button
                    key={idx}
                    onClick={() => handleNumberClick(btn.value)}
                    className="bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white font-semibold py-4 rounded-lg transition-all duration-150 transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {btn.label}
                  </button>
                );
              }

              if (btn.type === 'delete') {
                return (
                  <button
                    key={idx}
                    onClick={handleDelete}
                    disabled={pin.length === 0}
                    className="bg-red-600/80 hover:bg-red-600 active:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-all duration-150 transform hover:scale-105 active:scale-95 shadow-lg disabled:hover:scale-100 flex items-center justify-center"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                );
              }

              return null;
            })}
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleClear}
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white font-medium py-2 rounded-lg transition-colors duration-200 text-sm"
          >
            Clear All
          </button>

          {/* Footer Info */}
          <div className="mt-6 text-center text-xs text-slate-500">
            <p>Demo PIN: <span className="font-mono text-slate-400">1234</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
