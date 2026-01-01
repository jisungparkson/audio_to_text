import React from 'react';
import { MicrophoneIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30">
          <MicrophoneIcon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        AI 음성 자막 변환기
      </h1>
      <p className="mt-2 text-slate-400">
        MP3 파일을 업로드하면 텍스트(TXT) 자막으로 자동 변환해 드립니다.
      </p>
    </header>
  );
};

export default Header;