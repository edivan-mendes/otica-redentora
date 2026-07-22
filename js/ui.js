/* =============================================================
   Ótica Redentora — Ícones (SVG inline) + componentes + utilidades
   ============================================================= */
const ICONS = {
  'layout-dashboard':'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  'users':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'stethoscope':'<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.3.3 0 1 0 .2.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
  'glasses':'<circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/><path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2"/>',
  'package':'<path d="M16.5 9.4 7.5 4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.29 7 12 12l8.71-5"/><path d="M12 22V12"/>',
  'shopping-cart':'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  'clipboard-list':'<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  'flask':'<path d="M14 2v6a2 2 0 0 0 .24.96l5.5 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.74-2.96l5.5-10.08A2 2 0 0 0 10 8V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
  'wallet':'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
  'receipt':'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/>',
  'megaphone':'<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  'calendar':'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  'bar-chart-3':'<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  'pie-chart':'<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  'sparkles':'<path d="M12 3l1.6 4.5L18 9l-4.4 1.5L12 15l-1.6-4.5L6 9l4.4-1.5z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/><path d="M5 4l.6 1.6L7 6l-1.4.4L5 8l-.6-1.6L3 6l1.4-.4z"/>',
  'settings':'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  'search':'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  'bell':'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  'sun':'<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  'moon':'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  'menu':'<path d="M3 12h18M3 6h18M3 18h18"/>',
  'x':'<path d="M18 6 6 18M6 6l12 12"/>',
  'chevron-right':'<path d="m9 18 6-6-6-6"/>',
  'chevron-down':'<path d="m6 9 6 6 6-6"/>',
  'chevron-left':'<path d="m15 18-6-6 6-6"/>',
  'chevron-up':'<path d="m18 15-6-6-6 6"/>',
  'plus':'<path d="M12 5v14M5 12h14"/>',
  'minus':'<path d="M5 12h14"/>',
  'filter':'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  'sliders':'<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  'download':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  'more-horizontal':'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  'more-vertical':'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
  'trending-up':'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  'trending-down':'<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
  'arrow-up-right':'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  'arrow-down-right':'<path d="M7 7v10h10"/><path d="M17 17 7 7"/>',
  'arrow-right':'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'check':'<path d="M20 6 9 17l-5-5"/>',
  'check-circle':'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  'alert-triangle':'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'clock':'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  'info':'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  'star':'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>',
  'shield':'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  'phone':'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'mail':'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'message-circle':'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  'map-pin':'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  'eye':'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  'edit':'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  'trash':'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  'printer':'<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  'credit-card':'<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>',
  'dollar-sign':'<path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  'percent':'<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  'repeat':'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  'award':'<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
  'layers':'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  'archive':'<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  'building':'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  'file-text':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8M16 17H8M10 9H8"/>',
  'user-plus':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
  'shopping-bag':'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  'camera':'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  'image':'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  'tag':'<path d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.41l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
  'truck':'<path d="M14 18V6a2 2 0 0 0-2-2H2v13"/><path d="M14 9h4l4 4v5h-6"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/>',
  'zap':'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'target':'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  'activity':'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  'grid':'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  'refresh-cw':'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/>',
  'log-out':'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  'help-circle':'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  'gift':'<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  'qr-code':'<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><path d="M15 15h2v2M21 15v.01M15 21h6M18 18v3"/>',
  'scan':'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/>',
  'heart':'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  'bookmark':'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  'box':'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.29 7 12 12l8.71-5"/><path d="M12 22V12"/>',
  'trophy':'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  'eye-off':'<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>',
  'send':'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  'smile':'<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>',
  'cpu':'<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>',
  'droplet':'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  'circle':'<circle cx="12" cy="12" r="10"/>',
  'external-link':'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  'phone-call':'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'chevrons-left':'<path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/>'
};
function icon(name, {size=null, cls=''}={}){
  const p = ICONS[name] || ICONS['circle'];
  const st = size?`width:${size}px;height:${size}px`:'';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}" style="${st}">${p}</svg>`;
}

/* ---------- Avatar ---------- */
function avatar(name, {sq=false, size=38}={}){
  return `<div class="av-circ ${sq?'av-sq':''}" style="width:${size}px;height:${size}px;background:${avatarColor(name)}">${initials(name)}</div>`;
}
/* ---------- Trend badge ---------- */
function trend(delta, {suffix='%'}={}){
  if(delta===0||delta==null) return `<span class="trend flat">—</span>`;
  const up=delta>0;
  const d=Number(delta).toLocaleString('pt-BR',{maximumFractionDigits:1});
  return `<span class="trend ${up?'up':'down'}">${icon(up?'trending-up':'trending-down')}${up?'+':''}${d}${suffix}</span>`;
}

/* ---------- number formatting by type (para count-up) ---------- */
function fmtByType(n,t){
  switch(t){
    case 'money0': return fmt.money(Math.round(n),0);
    case 'moneyk': return fmt.moneyK(Math.round(n));
    case 'int':    return fmt.num(Math.round(n));
    case 'pct1':   return fmt.dec(n)+'%';
    case 'decx':   return fmt.dec(n)+'x';
    case 'dec1':   return fmt.dec(n);
    default:       return String(Math.round(n));
  }
}
/* ---------- count-up animation ---------- */
function countUp(root){
  const scope = root && root.querySelectorAll ? root : document;
  scope.querySelectorAll('[data-count]').forEach(el=>{
    if(el.dataset.counted) return; el.dataset.counted='1';
    const to=parseFloat(el.dataset.count), t=el.dataset.fmt||'int', dur=900;
    const start=performance.now(), ease=x=>1-Math.pow(1-x,3);
    (function frame(now){ const p=Math.min((now-start)/dur,1);
      el.textContent=fmtByType(to*ease(p),t);
      if(p<1) requestAnimationFrame(frame); else el.textContent=fmtByType(to,t);
    })(start);
  });
}

/* ---------- semáforo (verde / amarelo / vermelho) ---------- */
function semaforo(level,label){
  const l={ok:'Excelente',warn:'Atenção',crit:'Crítico'};
  return `<span class="sem ${level}">${label||l[level]||''}</span>`;
}

/* ---------- banner de IA (espalhado pelo sistema) ---------- */
function aiBanner({text,cta='',route='',action='',tag='Redentora IA'}){
  const onclick = action || (route?`App.go('${route}')`:'');
  return `<div class="ai-banner reveal">
    <div class="abi">${icon('sparkles')}</div>
    <div style="flex:1;min-width:0"><div class="tag-ai">${icon('cpu')} ${tag}</div><p>${text}</p></div>
    ${cta?`<button class="btn soft sm" onclick="${onclick}">${cta} ${icon('arrow-right')}</button>`:''}</div>`;
}

/* ---------- star rating ---------- */
function stars(n){ let s=''; for(let i=1;i<=5;i++) s+=`<span class="${i<=n?'':'off'}">${icon('star')}</span>`; return `<span class="stars">${s}</span>`; }

/* ---------- KPI card ---------- */
function kpiCard({label,value,delta,icon:ic,tone='primary',spark=null,sub=null,fmt:f=(v)=>v,cfmt=null,sem=null}){
  const sparkHtml = spark&&spark.length ? `<div class="spark">${Charts.spark(spark,{color:`var(--${tone==='primary'?'primary':tone})`})}</div>` : '';
  const valHtml = cfmt
    ? `<span class="count" data-count="${value}" data-fmt="${cfmt}">${fmtByType(0,cfmt)}</span>`
    : f(value);
  const foot = sem
    ? semaforo(sem)
    : `${trend(delta)}${sub?`<span class="muted">${sub}</span>`:'<span class="muted">vs. período anterior</span>'}`;
  return `<div class="card kpi hover reveal">
    <div class="top">
      <div>
        <div class="label">${label}</div>
        <div class="value">${valHtml}</div>
        <div class="foot">${foot}</div>
      </div>
      <div class="ico t-${tone}">${icon(ic)}</div>
    </div>
    ${sparkHtml}</div>`;
}

/* ---------- Section card wrapper ---------- */
function panel({title,sub,icon:ic,tone='primary',actions='',body,pad=true,cls=''}){
  return `<div class="card ${cls} reveal">
    <div class="card-head">
      <div class="card-title-ico">
        ${ic?`<div class="ci t-${tone}">${icon(ic)}</div>`:''}
        <div><h3>${title}</h3>${sub?`<div class="sub">${sub}</div>`:''}</div>
      </div>
      <div class="row center gap-xs">${actions}</div>
    </div>
    <div class="${pad?'card-body':''}">${body}</div></div>`;
}

/* ---------- Status badge (OS / genérico) ---------- */
const STATUS_MAP = {
  'Ativo':'success','VIP':'violet','Inativo':'',
  'Produção':'primary','Montagem':'info','Qualidade':'warning','Pronto':'success','Entregue':'success',
  'Envio':'info','Aguardando':'', 'Atrasado':'danger',
  'Pago':'success','A vencer':'warning','Vencido':'danger',
  'Autorizada':'success','Cancelada':'danger','Pendente':'warning',
  'Ativa':'success','Concluída':'','alto':'danger','medio':'warning','médio':'warning','baixo':'success'
};
function statusBadge(s){ const c=STATUS_MAP[s]!==undefined?STATUS_MAP[s]:''; return `<span class="badge ${c} dot">${s}</span>`; }

/* ---------- Tooltip (charts) ---------- */
let _tt;
function initTooltip(){
  _tt=document.createElement('div'); _tt.className='chart-tt'; document.body.appendChild(_tt);
  document.addEventListener('mouseover',e=>{ const t=e.target.closest('[data-tt]'); if(!t) return;
    _tt.innerHTML=t.getAttribute('data-tt'); _tt.classList.add('show'); });
  document.addEventListener('mousemove',e=>{ if(!_tt.classList.contains('show'))return;
    let x=e.clientX+14, y=e.clientY-10;
    if(x+_tt.offsetWidth>window.innerWidth) x=e.clientX-_tt.offsetWidth-14;
    _tt.style.left=x+'px'; _tt.style.top=y+'px'; });
  document.addEventListener('mouseout',e=>{ if(e.target.closest('[data-tt]')) _tt.classList.remove('show'); });
}

/* ---------- Toast ---------- */
function toast(msg, type='success'){
  let w=document.querySelector('.toast-wrap'); if(!w){ w=document.createElement('div'); w.className='toast-wrap'; document.body.appendChild(w); }
  const ic={success:'check-circle',danger:'alert-triangle',info:'info',warning:'alert-triangle'}[type]||'info';
  const el=document.createElement('div'); el.className='toast';
  el.innerHTML=`<div class="ti t-${type==='success'?'success':type}">${icon(ic)}</div><span>${msg}</span>`;
  w.appendChild(el);
  setTimeout(()=>{ el.style.transition='all .4s'; el.style.opacity='0'; el.style.transform='translateX(30px)'; setTimeout(()=>el.remove(),400); }, 3200);
}

/* ---------- Modal / Drawer ---------- */
function openModal(html,{lg=false}={}){
  closeModal();
  const ov=document.createElement('div'); ov.className='overlay'; ov.id='modal-ov';
  ov.innerHTML=`<div class="modal ${lg?'lg':''}" role="dialog" aria-modal="true">${html}</div>`;
  ov.addEventListener('click',e=>{ if(e.target===ov) closeModal(); });
  document.body.appendChild(ov);
}
function closeModal(){ const m=document.getElementById('modal-ov'); if(m) m.remove(); const d=document.getElementById('drawer-ov'); if(d) d.remove(); }
function openDrawer(html){
  closeModal();
  const ov=document.createElement('div'); ov.className='overlay'; ov.id='drawer-ov'; ov.style.placeItems='stretch'; ov.style.justifyContent='flex-end'; ov.style.padding='0';
  ov.innerHTML=`<div class="drawer" role="dialog" aria-modal="true">${html}</div>`;
  ov.addEventListener('click',e=>{ if(e.target===ov) closeModal(); });
  document.body.appendChild(ov);
}

/* helpers exposed */
Object.assign(window,{icon,avatar,trend,kpiCard,panel,statusBadge,toast,openModal,closeModal,openDrawer,initTooltip,fmtByType,countUp,semaforo,aiBanner,stars});
