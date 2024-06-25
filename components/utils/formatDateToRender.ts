export function formatDateToRender(date: Date): string {
    return new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
      hour12: false,
      formatMatcher: 'basic'
    
    }).format(date);
  }