# Day view
Date fixed "2024-08-01"

```dataviewjs
renderCalendar(
  this.container,
  dv.pages('"inbox"').map((p) => ({
    file: p.file,
    title: p.file.name,
    allDay: false,
  })),
  {
    defaultDateType: { type: "fixed", date: "2024-08-01" },
    defaultView: "day",
    dateFormat: "YYYY-MM-DDTHH:mm:ss",
    startKey: "startDateTime",
    endKey: "endDateTime",
    newNoteFolder: "inbox",
  },
);
```
