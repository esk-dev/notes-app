export function parseDateString(dateString: string) {
  const [date, time] = dateString.split('T');
  return `${date} ${time}:00`;
}
