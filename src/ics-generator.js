export default function (event) {
  const startDate = new Date(event.startDate);
  let endDate;
  if (event.endDate)
    endDate = new Date(event.endDate);
  return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//HFT App//DE
X-WR-CALNAME:Hochschultermine
X-WR-TIMEZONE:Europe/Berlin
BEGIN:VEVENT
${endDate ?
    `DTEND:${endDate.getFullYear()}${(endDate.getMonth() + 1).toString().padStart(2, '0')}${
      endDate.getDate().toString().padStart(2, '0')}T235959` : ''}
DTSTART:${startDate.getFullYear()}${(startDate.getMonth() + 1).toString().padStart(2, '0')}${
    startDate.getDate().toString().padStart(2, '0')}T000000
SUMMARY:${event.title}
END:VEVENT
END:VCALENDAR`
}
