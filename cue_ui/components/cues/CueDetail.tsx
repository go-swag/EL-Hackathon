'use client';

import { useCues } from '@/context/CueContext';
import { CueMessage } from '@/cue_ui/types/cue.types';

const NoCueSelected: React.FC = (): React.JSX.Element => {
  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-gray-400">Select a snippet to view details</p>
    </div>
  );
};

const CueBreakdown: React.FC<CueMessage> = ({
  title,
  text,
}): React.JSX.Element => {
  return (
    <div className="py-6">
      <h2 className="text-white text-xl font-medium border-b border-b-white/10 pb-4 mb-6">
        {title}
      </h2>
      <div className="mt-6 text-white">{text}</div>
    </div>
  );
};

const CueDetail: React.FC = (): React.JSX.Element => {
  const { selectedCue } = useCues();

  return !selectedCue ? <NoCueSelected /> : <CueBreakdown {...selectedCue} />;
};

export default CueDetail;
