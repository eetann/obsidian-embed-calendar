# with Time
```embed-calendar
{
  events: dv.pages('"inbox"')
    .map(p => ({
      file: p.file,
      title: p.file.name,
      allDay: false
    })),
  options: {
		dateFormat: "YYYY-MM-DD",
    startKey: "startDateTime",
    endKey: "endDateTime",
    defaultDate: {type: "fixed", date: "2024-08-01"},
		eventRowType: {type: "auto", rowNumber: 2},
		language: "ja",
  }
}
```
# without Time
```embed-calendar
{
  events: dv.pages('"zettelkasten"')
    .map(p => ({
      file: p.file,
      title: p.file.frontmatter.title,
      allDay: true
    })),
	options: {
		dateFormat: "YYYY-MM-DD",
    startKey: "startDateTime",
    endKey: "endDateTime",
		calendarHeight: 700,
		eventFontSize: "lg",
		eventRowType: {type: "manual"},
	}
}
```

# show Error
```embed-calendar
{
  events: [] // <- without comma
  options: {}
}
```
