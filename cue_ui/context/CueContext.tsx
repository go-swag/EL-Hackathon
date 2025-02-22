'use client';

import { CueMessage } from '@/cue_ui/types/cue.types';
import { createContext, useCallback, useContext, useState } from 'react';

interface CueContextType {
  selectedCue: CueMessage | null;
  setSelectedCue: (newCue: CueMessage) => void;
}

const defaultCtxValue: CueContextType = {
  selectedCue: null,
  setSelectedCue(newCue) {},
};

const CueContext = createContext<CueContextType>(defaultCtxValue);

export const CueContextProvider: React.FC<{
  children?: Readonly<React.ReactNode>;
}> = ({ children }): React.JSX.Element => {
  const [selectedCue, internal_setSelectedCue] = useState<CueMessage | null>(
    null
  );

  const setSelectedCue = useCallback((newCue: CueMessage) => {
    internal_setSelectedCue((prevVal) => newCue);
  }, []);

  return (
    <CueContext.Provider
      value={{
        selectedCue: selectedCue,
        setSelectedCue,
      }}
    >
      {children}
    </CueContext.Provider>
  );
};

export const useCues = () => {
  const ctx = useContext(CueContext);
  if (!ctx) throw Error('useCues can only be used within the Context');
  return ctx;
};
