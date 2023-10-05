import './FileValidator.css';
import { ValidationStatus } from './types';

export default function FileValidator({
  file,
  status,
  validateFile,
}: {
  file: File;
  status: ValidationStatus;
  validateFile: (file: File) => void;
}) {
  const Loader = () => {
    return <div className="loader"></div>;
  };

  const ValidateButton = () => {
    return (
      <div>
        <button onClick={() => validateFile(file)}>Tester le fichier</button>
      </div>
    );
  };

  const displayStatus = () => {
    const icon =
      status === 'Validated' ? '✓' : status === 'Failed' ? '✗' : 'Unchecked';

    return (
      <div>
        {status === 'Unchecked' ? (
          <ValidateButton />
        ) : status === 'Processing' ? (
          <Loader />
        ) : (
          <div>{icon}</div>
        )}
      </div>
    );
  };

  return (
    <div className="validator">
      <table>
        <tr>
          <th>File name</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>{file.name}</td>
          <td>{displayStatus()}</td>
        </tr>
      </table>
    </div>
  );
}
