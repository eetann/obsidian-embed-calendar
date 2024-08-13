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
    defaultDate: {type: "fixed", date: "2024-08-01"},
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
		eventFontSize: "lg"
	}
}
```
