
import React from 'react';

interface GeneratedPreviewProps {
  htmlContent: string;
}

const GeneratedPreview: React.FC<GeneratedPreviewProps> = ({ htmlContent }) => {
  return (
    <iframe
      srcDoc={htmlContent}
      title="Generated Design Preview"
      className="w-full h-full border-0 rounded-lg"
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default GeneratedPreview;
