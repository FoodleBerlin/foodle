function validateStartEndDate(starDate: moment.Moment, endDate: moment.Moment): boolean {
  return starDate.isBefore(endDate);
}

function checkForEmptyList(length: number): boolean {
  return length === 0;
}
