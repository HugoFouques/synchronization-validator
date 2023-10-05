export type ValidationStatus =
  | 'Validated'
  | 'Failed'
  | 'Processing'
  | 'Unchecked';

export type Period = {
  startDate: Date;
  endDate: Date;
};
