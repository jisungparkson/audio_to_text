import React from 'react';

const ProcessingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-3 border-t-4 border-purple-500 border-solid rounded-full animate-spin reverse-spin opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-pulse">🎧</span>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">음성 분석 중...</h3>
      <p className="text-slate-400 text-center max-w-md">
        AI가 음성 내용을 텍스트로 변환하고 있습니다.<br/>
        파일 길이에 따라 시간이 조금 걸릴 수 있습니다.
      </p>
    </div>
  );
};

export default ProcessingState;