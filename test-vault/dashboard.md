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
		dateFormat: "YYYY-MM-DDTHH:mm:ss",
    startKey: "startDateTime",
    endKey: "endDateTime",
    newNoteFolder: "inbox",
    newNoteNameType: {type: "date", format:"YYYYMMDDHHmmss"},
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
			metadata: "<p style='background-color:olive'>&#x1f977;Ninja</p>",
      allDay: true
    })),
	options: {
		dateFormat: "YYYY-MM-DD",
		startKey: "startDate",
		endKey: "endDate",
		endKey: "endDate",
		newNoteFolder: "zettelkasten",
		calendarHeight: 700,
		eventFontSize: "lg",
		eventRowType: {type: "manual"},
		defaultDate: {type: "fixed", date: "2024-08-01"},
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
