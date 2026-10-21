// links-config.js
export const LINK_GROUPS = [
  {
    title: "Main navigation",
    items: [
      { key: "store",        label: "Store",                  placeholder: "https://school-store.example.com" },
      { key: "gradelink",    label: "GradeLink",              placeholder: "https://gradeLink.example.com/login" },
      { key: "utf",          label: "UTF",                    placeholder: "https://utf.example.edu" },
      { key: "mail_college", label: "Mail · College",         placeholder: "https://mail.google.com/..." },
      { key: "mail_highschool", label: "Mail · High school",  placeholder: "https://outlook.com/..." },
      { key: "mail_personal",  label: "Mail · Personal",      placeholder: "https://mail.google.com/..." },
    ],
  },
  {
    title: "Study platforms (per subject)",
    items: [
      { key: "study_math",     label: "Math platform",        placeholder: "https://yaymath.org or Derek Owens link" },
      { key: "study_science",  label: "Science platform",     placeholder: "https://..." },
      { key: "study_english",  label: "English platform",     placeholder: "https://..." },
      { key: "study_history",  label: "History platform",     placeholder: "https://..." },
      { key: "study_other",    label: "Other subject",        placeholder: "https://..." },
    ],
  },
  {
    title: "Assignment upload destinations (per subject)",
    items: [
      { key: "upload_math",    label: "Math upload",          placeholder: "mailto:teacher@school.edu or dropbox link" },
      { key: "upload_science", label: "Science upload",       placeholder: "mailto:teacher@school.edu or dropbox link" },
      { key: "upload_english", label: "English upload",       placeholder: "mailto:teacher@school.edu or dropbox link" },
      { key: "upload_history", label: "History upload",       placeholder: "mailto:teacher@school.edu or dropbox link" },
      { key: "upload_other",   label: "Other subject upload", placeholder: "mailto:teacher@school.edu or dropbox link" },
    ],
  },
];