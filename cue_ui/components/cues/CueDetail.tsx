'use client';

import { useCues } from '@/context/CueContext';
import { CueMessage } from '@types';
import CueMessageBox from './CueMessageBox';

import ReactMarkdown from 'react-markdown';
import StyleAdjuster from '../ui/StyleAdjuster';
import './markdown.css';

const NoCueSelected: React.FC = (): React.JSX.Element => {
  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-gray-400">Select a snippet to view details</p>
    </div>
  );
};

const CueBreakdown: React.FC<CueMessage> = ({
  question,
  answer,
}): React.JSX.Element => {
  const { styling } = useCues();
  return (
    <div className="p-6">
      <h2 className="text-white text-3xl font-medium pb-4 mb-6">{question}</h2>
      <div className="mt-6 text-white">
        <div
          className="markdown"
          style={
            {
              ...styling,
            } as React.CSSProperties
          }
        >
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

const CueDetail: React.FC = (): React.JSX.Element => {
  const { selectedCue } = useCues();

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      {selectedCue && <StyleAdjuster />}
      <div className="max-h-screen flex flex-col h-full">
        <div className="flex flex-col h-full">
          {!selectedCue ? <NoCueSelected /> : <CueBreakdown {...selectedCue} />}
          <CueMessageBox />
        </div>
      </div>
    </div>
  );
};

export default CueDetail;
