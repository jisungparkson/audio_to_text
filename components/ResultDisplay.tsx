import React from 'react';
import { ArrowDownTrayIcon, ArrowPathIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { ResultDisplayProps } from '../types';

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  if (!result) return null;

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result.text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${result.fileName.split('.')[0]}_transcript.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fadeIn">
      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
        <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-300">
            <DocumentTextIcon className="w-5 h-5" />
            <span className="font-medium truncate max-w-[200px]">{result.fileName}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
            >
              <ArrowPathIcon className="w-4 h-4" />
              처음으로
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              .txt 다운로드
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <textarea
            readOnly
            value={result.text}
            className="w-full h-96 bg-slate-900/50 text-slate-200 p-4 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none font-mono text-sm leading-relaxed custom-scrollbar"
          />
        </div>
        
        <div className="bg-slate-800 p-4 border-t border-slate-700 text-center">
            <p className="text-xs text-slate-500">
                Gemini 3 Flash 모델에 의해 생성되었습니다. 결과가 100% 정확하지 않을 수 있습니다.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;