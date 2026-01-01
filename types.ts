export enum AppStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface TranscriptionResult {
  text: string;
  fileName: string;
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

export interface ResultDisplayProps {
  result: TranscriptionResult | null;
  onReset: () => void;
}
