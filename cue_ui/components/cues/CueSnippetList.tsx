'use client';

import { useCues } from '@/context/CueContext';
import { CueDetail } from '@/cue_ui/types';
import { ChevronRight } from 'lucide-react';

const exampleData: CueDetail = {
  messages: [
    {
      id: '0',
      title: 'What is the RTTI service?',
      text: 'nothing',
    },
    {
      id: '1',
      title: 'Whats the best performance for cost BMW model?',
      text: 'all of em ',
    },
  ],
};

const CueSnippetList: React.FC = (): React.JSX.Element => {
  const { setSelectedCue } = useCues();

  return (
    <div className="pt-6 flex flex-col gap-y-4">
      {exampleData.messages.map((entry) => (
        <div
          className="px-4 py-6 rounded-md border border-white/10 hover:border-white/20 duration-200"
          key={entry.id}
        >
          <button
            type="button"
            className="w-full flex flex-row items-center justify-between group cursor-pointer"
            onClick={() => {
              setSelectedCue(entry);
            }}
          >
            {entry.title}
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
