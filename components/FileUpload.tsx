import React, { useCallback, useState } from 'react';
import { ArrowUpTrayIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
import { FileUploadProps } from '../types';

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full">
      <label
        htmlFor="file-upload"
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ease-in-out
          ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-800/50 border-slate-700' : 
            dragActive 
              ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' 
              : 'border-slate-600 bg-slate-800 hover:bg-slate-750 hover:border-slate-500'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={!disabled ? handleDrop : undefined}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
          <div className={`mb-4 p-4 rounded-full ${dragActive ? 'bg-blue-500/20' : 'bg-slate-700'}`}>
            {dragActive ? (
                <ArrowUpTrayIcon className="w-8 h-8 text-blue-400" />
            ) : (
                <MusicalNoteIcon className="w-8 h-8 text-slate-400" />
            )}
          </div>
          <p className="mb-2 text-lg font-medium text-slate-200">
            <span className="font-semibold text-blue-400">클릭하여 업로드</span> 또는 파일을 여기로 드래그하세요
          </p>
          <p className="text-sm text-slate-500">MP3, WAV, M4A, OGG (최대 20MB 권장)</p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="audio/*"
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
    </div>
  );
};

export default FileUpload;