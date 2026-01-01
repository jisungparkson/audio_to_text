import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ProcessingState from './components/ProcessingState';
import ResultDisplay from './components/ResultDisplay';
import { transcribeAudio } from './services/geminiService';
import { AppStatus, TranscriptionResult } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    // Basic validation
    if (!file.type.startsWith('audio/')) {
      setErrorMessage("오디오 파일만 업로드할 수 있습니다.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) { // 20MB limit warning
        const confirmLarge = window.confirm("파일 크기가 20MB를 초과합니다. 처리 시간이 오래 걸리거나 브라우저 메모리 문제로 실패할 수 있습니다. 계속하시겠습니까?");
        if (!confirmLarge) return;
    }

    setStatus(AppStatus.PROCESSING);
    setErrorMessage(null);

    try {
      const text = await transcribeAudio(file);
      setResult({
        text,
        fileName: file.name
      });
      setStatus(AppStatus.COMPLETED);
    } catch (error: any) {
      setStatus(AppStatus.ERROR);
      setErrorMessage(error.message || "알 수 없는 오류가 발생했습니다.");
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-4xl">
        <Header />

        <main className="mt-8 transition-all duration-500">
          {status === AppStatus.IDLE && (
            <div className="animate-fade-in-up">
              <FileUpload onFileSelect={handleFileSelect} disabled={false} />
              {errorMessage && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center text-sm">
                  {errorMessage}
                </div>
              )}
            </div>
          )}

          {status === AppStatus.PROCESSING && (
            <ProcessingState />
          )}

          {status === AppStatus.COMPLETED && (
            <ResultDisplay result={result} onReset={handleReset} />
          )}

          {status === AppStatus.ERROR && (
            <div className="text-center py-12">
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-red-400 mb-2">오류 발생</h3>
                <p className="text-slate-300 mb-6">{errorMessage}</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  다시 시도하기
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .reverse-spin {
            animation-direction: reverse;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(30, 41, 59, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(71, 85, 105, 0.8);
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(100, 116, 139, 1);
        }
      `}</style>
    </div>
  );
};

export default App;