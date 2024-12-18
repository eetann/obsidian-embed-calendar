# Single Metadata
```dataviewjs
const { fieldModifier: f } = MetadataMenu.api;
renderCalendar(
  this.container,
  dv.pages('"metadata-menu"').map((p) => ({
    file: p.file,
    title: p.file.name,
    metadata: f(dv, p, "check"),
    allDay: false,
  })),
  {
    dateFormat: "YYYY-MM-DD",
    startKey: "date",
    newNoteFolder: "metadata-menu",
    newNoteNameType: { type: "date", format: "YYYY-MM-DD" },
    defaultDateType: { type: "fixed", date: "2024-09-23" },
    idForKeepDate: "test-id",
    eventRowType: { type: "manual" },
  },
);
```

# Multiple Metadata
```dataviewjs
const { fieldModifier: f } = MetadataMenu.api;
renderCalendar(
  this.container,
  dv.pages('"metadata-menu"').map((p) => {
    const metaDiv = dv.el("div", "");
    metaDiv.appendChild(f(dv, p, "check"));
    metaDiv.appendChild(f(dv, p, "status"));
    return {
      file: p.file,
      title: p.file.name,
      metadata: metaDiv,
      allDay: false,
    };
  }),
  {
    dateFormat: "YYYY-MM-DD",
    startKey: "date",
    newNoteFolder: "metadata-menu",
    newNoteNameType: { type: "date", format: "YYYY-MM-DD" },
    defaultDateType: { type: "fixed", date: "2024-09-23" },
    eventRowType: { type: "manual" },
    eventFontSize: "sm",
  },
);
```
