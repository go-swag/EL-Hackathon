'use client';

import { HistoryCueFetchResponse } from '@/types/cue.types';
import { CueDetail, CueMessage } from '@types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type CueStyles = {
  fontSize?: string;
  color?: string;
};
interface CueContextType {
  data: CueDetail;
  selectedCue: CueMessage | null;
  setSelectedCue: (newCue: CueMessage) => void;
  updateHistory: () => void;
  updateLocalMessages: (messages: CueMessage[]) => void;
  styling: CueStyles;
  updateStyling: (newStyling: CueStyles) => void;
}

const defaultCtxValue: CueContextType = {
  data: {
    messages: [],
  },
  selectedCue: null,
  setSelectedCue(newCue) {},
  updateHistory() {},
  updateLocalMessages(newMessages) {},
  styling: {
    color: '#ffffff',
    fontSize: '64px',
  },
  updateStyling(newStyling) {},
};

const CueContext = createContext<CueContextType>(defaultCtxValue);

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const CueContextProvider: React.FC<{
  children?: Readonly<React.ReactNode>;
}> = ({ children }): React.JSX.Element => {
  const [allMessages, setAllMessages] = useState<CueMessage[]>([]);

  const [styling, setStyling] = useState<CueContextType['styling']>(
    defaultCtxValue['styling']
  );

  const [selectedCue, internal_setSelectedCue] = useState<CueMessage | null>(
    null
  );

  const setSelectedCue = useCallback((newCue: CueMessage) => {
    internal_setSelectedCue((prevVal) => newCue);
  }, []);

  const updateStyling = useCallback((newStyling: CueContextType['styling']) => {
    setStyling({
      ...newStyling,
    });
  }, []);

  const updateHistory = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/history`);
      const responseJson: HistoryCueFetchResponse = await response.json();
      setAllMessages(responseJson.cue_histories);
    } catch (e) {
      console.log("Fetch failed. Couldn't update history");
    }
  }, []);

  const updateLocalMessages = useCallback((newLocalMessages: CueMessage[]) => {
    setAllMessages(newLocalMessages);
  }, []);

  useEffect(() => {
    updateHistory();
  }, []);

  return (
    <CueContext.Provider
      value={{
        data: {
          messages: allMessages,
        },
        selectedCue: selectedCue,
        setSelectedCue,
        updateLocalMessages,
        updateHistory,
        styling,
        updateStyling,
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
