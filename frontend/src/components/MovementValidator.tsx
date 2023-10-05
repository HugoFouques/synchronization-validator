import { useState } from 'react';
import './MovementValidator.css';
import FileUploader from './FileUpload';
import FileValidator from './FileValidator';
import ReasonDisplay from './ReasonDisplay';
import { Period, ValidationStatus } from './types';

export default function FileUpload() {
  const [file, setFile] = useState<File>();
  const [IsValidated, setIsValidated] = useState<ValidationStatus>('Unchecked');
  const [apiReasons, setApiReasons] = useState<Period[]>([]);

  const handleFileUpload = (files: FileList) => {
    setFile(files?.[0]);
    setIsValidated('Unchecked');
  };

  const handleFileValidation = async (file: File) => {
    setIsValidated('Processing');

    const fileContent = await file.text();

    try {
      const response = await fetch(
        'http://localhost:3000/movements/validation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: fileContent,
        },
      );

      const data = await response.json();

      if (200 < response.status && response.status < 300) {
        setIsValidated('Validated');
        setApiReasons([]);
      } else if (response.status === 418) {
        setIsValidated('Failed');

        const periodsArray: Period[] = data?.reason?.invalidPeriods?.map(
          (item: any) => ({
            startDate: new Date(item.startDate),
            endDate: new Date(item.endDate),
          }),
        );

        setApiReasons(periodsArray);
      } else {
        setIsValidated('Failed');
        setApiReasons([]);
      }
    } catch {
      setIsValidated('Failed');
      setApiReasons([]);
    }
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
      {IsValidated === 'Failed' && apiReasons.length > 0 && (
        <ReasonDisplay apiReasons={apiReasons} />
      )}
    </div>
  );
}
