
import { useState, useCallback } from 'react';

const useClipboard = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    });
  }, [timeout]);

  return { copy, copied };
};

export default useClipboard;
