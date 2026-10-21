
import React from 'react';

const iconProps = {
  width: "1.2em",
  height: "1.2em",
  viewBox: "0 0 24 24",
};

export const PublishIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM10 20.9C5.9 20.4 2.6 17.1 2.1 13H5v-2H2.1C2.6 7 5.9 3.6 10 3.1v17.8zM12 3.1c4.1.5 7.4 3.8 7.9 8H15v2h4.9c-.5 4.1-3.8 7.4-7.9 7.9V3.1z" />
    </svg>
);
export const MenuIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
    </svg>
);
export const ProfileIcon = () => (
  <svg {...iconProps} fill="currentColor">
    <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4z" />
  </svg>
);
export const TemplateIcon = () => (
  <svg {...iconProps} fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 4h9v6H4V4zm0 8h9v10H4V12zm11 10h5V4h-5v18z" />
  </svg>
);
export const AiIcon = () => (
  <svg {...iconProps} fill="currentColor">
    <path d="M13 10h-2V3h2v7zm-5-3h2V3H8v4zm10 0h-2V3h2v4zM12 21a8.995 8.995 0 0 1-8.778-10.29L12 3l8.778 7.71A8.995 8.995 0 0 1 12 21z" />
  </svg>
);
export const DesignsIcon = () => (
  <svg {...iconProps} fill="currentColor">
    <path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14zM10 17h4v-2h-4v2z" />
  </svg>
);
export const SaveIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3zm3-10H5V5h10v4z" />
    </svg>
);
export const DownloadIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M5 20h14v-2H5v2zm14-9h-4V3H9v8H5l7 7l7-7z" />
    </svg>
);
export const UndoIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
    </svg>
);
export const RedoIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5c1.96 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
    </svg>
);
export const PrintIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM16 19H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1zM18 3H6v4h12V3z" />
    </svg>
);
export const HorizontalIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M21 6H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1zm-1 10H4V8h16v8z" />
    </svg>
);
export const VerticalIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M18 2H6c-.55 0-1 .45-1 1v18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 18H7V4h10v16z" />
    </svg>
);
export const UploadIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M9 16h6v-6h4l-7-7l-7 7h4v6zm-4 2h14v2H5v-2z" />
    </svg>
);
export const TrashIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
);

// Alignment Icons
export const AlignLeftIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M4 22H2V2h2v20zM22 7H6v3h16V7zm-8 7H6v3h8v-3z" />
    </svg>
);
export const AlignHorizontalCenterIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M11 2h2v5h-2V2zm-7 7v3h16v-3H4zm7 5h2v5h-2v-5z" />
    </svg>
);
export const AlignRightIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M20 2v20h2V2h-2zM2 10h16V7H2v3zm8 7h8v-3h-8v3z" />
    </svg>
);
export const AlignTopIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M22 2v2H2V2h20zM10 22V6h3v16h-3zm7-10V6h-3v6h3z" />
    </svg>
);
export const AlignVerticalCenterIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M22 11v2H2v-2h20zM7 20V4h3v16H7zm10-4V8h-3v8h3z" />
    </svg>
);
export const AlignBottomIcon = () => (
    <svg {...iconProps} fill="currentColor">
        <path d="M22 20v2H2v-2h20zM10 18V2h3v16h-3zm-3-7V2h3v9H7z" />
    </svg>
);

// Layering Icons
export const BringToFrontIcon = () => (
    <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.9 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"/>
    </svg>
);
export const SendToBackIcon = () => (
    <svg {...iconProps} fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H9zm10 12H9V5h10v10zM5 7H3v2h2V7zm0 4H3v2h2v-2zm0-8H3v2h2V3zM3 15h2v-2H3v2zM3 1h2V0H3c-1.1 0-2 .9-2 2v2h2V1z"/>
    </svg>
);