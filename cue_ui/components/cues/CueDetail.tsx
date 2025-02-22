'use client';

import { useCues } from '@/context/CueContext';
import { CueMessage } from '@types';
import CueMessageBox from './CueMessageBox';

import ReactMarkdown from 'react-markdown';
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
  return (
    <div className="py-6">
      <h2 className="text-white text-xl font-medium border-b border-b-white/10 pb-4 mb-6">
        {question}
      </h2>
      <div className="mt-6 text-white">
        <div className="markdown">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

const CueDetail: React.FC = (): React.JSX.Element => {
  const { selectedCue } = useCues();

  return (
    <div className="flex flex-col h-full">
      {!selectedCue ? <NoCueSelected /> : <CueBreakdown {...selectedCue} />}
      <CueMessageBox />
    </div>
  );
};

export default CueDetail;
