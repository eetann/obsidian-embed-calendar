
```dataviewjs
const {fieldModifier: f} = MetadataMenu.api;
renderCalendar(this.container,
  dv.pages('"metadata-menu"')
    .map(p => ({
      file: p.file,
      title: p.file.name,
      metadata: f(dv, p, "check"),
      allDay: false
    })),
  {
	dateFormat: "YYYY-MM-DD",
    startKey: "date",
    newNoteFolder: "metadata-menu",
    newNoteNameType: {type: "date", format:"YYYY-MM-DD"},
    defaultDate: {type: "fixed", date: "2024-09-23"},
	eventRowType: {type: "manual"},
	language: "ja",
  }
)
```