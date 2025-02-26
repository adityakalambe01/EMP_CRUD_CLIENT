export class DateConverter {
  constructor() {}

  convertToISO8601(dateStr: string): string {
    if (!dateStr || typeof dateStr !== 'string') {
      throw new Error(
        'Invalid date input. Expected a string in MM/DD/YYYY format.'
      );
    }

    const parts: number[] = dateStr.split('/').map((num) => parseInt(num, 10));

    if (parts.length !== 3) {
      throw new Error('Invalid date format. Expected MM/DD/YYYY.');
    }

    const [month, day, year] = parts;

    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      throw new Error('Invalid date values. Ensure the format is MM/DD/YYYY.');
    }

    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid Date');
    }

    return date.toISOString();
  }

  getFormattedDate(date: Date): string {
    const inputDate = new Date(date);
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // +1 as getMonth() returns 0-11
    const day = inputDate.getDate().toString().padStart(2, '0');
    const year = inputDate.getFullYear();
    return `${month}/${day}/${year}`;
  }
}
