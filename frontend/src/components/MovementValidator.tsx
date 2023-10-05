import { useRef, useState } from 'react';
import './MovementValidator.css';
import FileUploader from './FileUpload';
import FileValidator from './FileValidator';

export type ValidationStatus =
  | 'Validated'
  | 'Failed'
  | 'Processing'
  | 'Unchecked';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function FileUpload() {
  const [file, setFile] = useState<File>();
  const [IsValidated, setIsValidated] = useState<ValidationStatus>('Unchecked');

  const handleFileUpload = (files: FileList) => {
    setFile(files?.[0]);
    setIsValidated('Unchecked');
  };

  const handleFileValidation = async (file: File) => {
    setIsValidated('Processing');
    await delay(5000);
    await console.log(file);
    setIsValidated('Validated');
  };

  return (
    <div className="container">
      <FileUploader handleFileUpload={handleFileUpload} />
      {file && (
        <FileValidator
          file={file}
          status={IsValidated}
          validateFile={handleFileValidation}
        />
      )}
    </div>
  );
}
