'use client';

import { useCues } from '@/context/CueContext';
import { ChevronRight } from 'lucide-react';

const CueSnippetList: React.FC = (): React.JSX.Element => {
  const { setSelectedCue, data } = useCues();

  return (
    <div className="pt-6 flex flex-col gap-y-4">
      {data.messages.map((entry, ix) => (
        <div key={`${entry.question}-${ix}`}>
          <button
            type="button"
            className="w-full flex flex-row items-center justify-between group cursor-pointer px-4 py-6 rounded-md border border-white/10 hover:border-white/20 duration-200"
            onClick={() => {
              setSelectedCue(entry);
            }}
          >
            {entry.question}
            <span className="group-hover:text-white text-white">
              <ChevronRight className="relative" />
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default CueSnippetList;
