# with Time
```embed-calendar
{
  events: dv.pages('"inbox"')
    .map(p => ({
      title: p.file.name,
      link: p.file.path,
			start: p.file.frontmatter.startDateTime,
			end: p.file.frontmatter.endDateTime,
      allDay: false
    })),
  options: {
    start: {key: "startDateTime"},
    end: {key: "endDateTime"},
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
      title: p.file.frontmatter.title,
      link: p.file.path,
			start: p.file.frontmatter.startDate,
      end: p.file.frontmatter.endDate,
      allDay: true
    })),
	options: {
		start: {key: "startDate"},
		end: {key: "endDate"},
		calendarHeight: 700,
		eventFontSize: "lg"
		eventRowType: {type: "manual"},
	}
}
```
