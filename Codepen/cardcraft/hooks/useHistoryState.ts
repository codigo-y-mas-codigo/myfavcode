
import { useState, useCallback } from 'react';

export interface HistoryState<T> {
  state: T;
  setState: (newState: T, clearHistory?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function useHistoryState<T,>(initialState: T): HistoryState<T> {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const state = history[currentIndex];
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const setState = useCallback((newState: T, clearHistory: boolean = false) => {
    if (clearHistory) {
        setHistory([newState]);
        setCurrentIndex(0);
    } else {
        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push(newState);
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
    }
  }, [currentIndex, history]);

  const undo = useCallback(() => {
    if (canUndo) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [canUndo, currentIndex]);

  const redo = useCallback(() => {
    if (canRedo) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [canRedo, currentIndex]);

  return { state, setState, undo, redo, canUndo, canRedo };
}
