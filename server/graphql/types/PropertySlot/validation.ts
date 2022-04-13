export function validateStartEndDate(starDate: moment.Moment, endDate: moment.Moment): boolean {
  return starDate.isBefore(endDate);
}

export function checkForEmptyList(length: number): boolean {
  return length === 0;
}
