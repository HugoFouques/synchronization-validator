import { Period } from './types';

export default function ReasonDisplay({
  apiReasons,
}: {
  apiReasons: Period[];
}) {
  const msg =
    'We have found some error during the file validation.\
               Please investigate the following periods:';
  return (
    <div>
      <div>{msg}</div>
      {apiReasons.map((p) => (
        <div key={p.startDate.toDateString()}>
          - {displayDate(p.startDate)} to {displayDate(p.endDate)}
        </div>
      ))}
    </div>
  );
}

const displayDate = (date: Date): String => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return [year, month, day].join('/');
};
