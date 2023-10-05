import { useRef } from 'react';
import './FileUpload.css';

export default function FileUploader({
  handleFileUpload,
}: {
  handleFileUpload: (files: FileList) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      handleFileUpload(files);
    }
  };

  return (
    <div className="file-upload">
      Upload a file to validate the data :
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        accept=".json"
      />
      <button onClick={() => fileInputRef.current?.click()}>Import File</button>
    </div>
  );
}
