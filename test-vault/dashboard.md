# with Time
```dataviewjs
renderCalendar(
  this.container,
  dv.pages('"inbox"').map((p) => ({
    file: p.file,
    title: p.file.name,
    allDay: false,
  })),
  {
    dateFormat: "YYYY-MM-DDTHH:mm:ss",
    startKey: "startDateTime",
    endKey: "endDateTime",
    newNoteFolder: "inbox",
    newNoteNameType: { type: "date", format: "YYYYMMDDHHmmss" },
    defaultDateType: { type: "fixed", date: "2024-08-01" },
    eventRowType: { type: "auto", rowNumber: 2 },
    language: "ja",
  },
);
```
# without Time
```dataviewjs
renderCalendar(
  this.container,
  dv.pages('"zettelkasten"').map((p) => ({
    file: p.file,
    title: `${p.file.frontmatter.title}\nself new line`,
    metadata: "<p style='background-color:olive'>&#x1f977;Ninja</p>",
    allDay: true,
  })),
  {
    dateFormat: "YYYY-MM-DD",
    startKey: "startDate",
    endKey: "endDate",
    endKey: "endDate",
    newNoteFolder: "zettelkasten",
    calendarHeight: 700,
    eventFontSize: "lg",
    eventRowType: { type: "manual" },
    defaultDateType: { type: "fixed", date: "2024-08-01" },
  },
);
```

# show Error
`Error: Failed to parse options`
```dataviewjs
renderCalendar(
  this.container,
  [],
  {}, // <- without comma
);
```
