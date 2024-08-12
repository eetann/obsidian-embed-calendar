# Day view
Date fixed "2024-08-01"

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
    defaultView: "day",
  }
}
```
