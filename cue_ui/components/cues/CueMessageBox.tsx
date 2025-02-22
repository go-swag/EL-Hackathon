import { useCues } from '@/context/CueContext';
import { HistoryCueFetchResponse } from '@/types/cue.types';
import { QuickPrompt } from '@/types/prompt.types';
import { cn } from '@/utils/classname.utils';
import { LoaderCircle } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';

const quickPrompts: QuickPrompt[] = [
  {
    id: 0,
    promptIdentifier: '1',
    text: 'This is a question',
  },
  {
    id: 1,
    promptIdentifier: '2',
    text: 'This is a question',
  },
];

const CueQuickPrompt: React.FC<{
  text: string;
}> = (): React.JSX.Element => {
  return (
    <button
      type="button"
      className="p-1 text-[.75rem] text-black bg-white/70 hover:bg-white/100 rounded"
    >
      This is a question
    </button>
  );
};

const CueQuickPromptList: React.FC = (): React.JSX.Element => {
  return (
    <ul className="flex flex-row items-center gap-2">
      {quickPrompts.map((qp) => (
        <li key={qp.id}>
          <CueQuickPrompt {...qp} />
        </li>
      ))}
    </ul>
  );
};

const CueMessageBox: React.FC = (): React.JSX.Element => {
  const { updateLocalMessages } = useCues();

  const [postQuestion, setPostQuestion] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const [postPending, setPostPending] = useState<boolean>(false);
  const [postError, setPostError] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    if (newValue !== null && newValue.trim()) {
      setPostQuestion(newValue);
    }
  };

  const handlePostMessage = async () => {
    setPostError(false);

    if (!postQuestion || !postQuestion?.trim().length) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }

    setPostPending(true);

    const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/submit-text`;
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: postQuestion,
        audio_file: null,
      }),
    });

    if (!response.ok) {
      setPostError(true);
    } else {
      const responseJson: HistoryCueFetchResponse = await response.json();
      updateLocalMessages(responseJson.cue_histories);
    }

    setPostQuestion('');
    setPostPending(false);
  };

  const inputClass = cn(
    'px-4 py-3 rounded border border-white/20 bg-black/20 outline-none grow text-sm',
    {
      'opacity-50 pointer-events-none': postPending,
    }
  );

  return (
    <div className="mt-auto flex flex-col gap-y-5">
      <CueQuickPromptList />
      {postError && (
        <span className="block text-red-800">Unable to generate response.</span>
      )}
      <div className="flex flex-row flex-wrap gap-4">
        <input
          type="text"
          className={inputClass}
          onChange={handleChange}
          ref={inputRef}
          value={postQuestion ?? ''}
        />
        <button
          type="button"
          className="rounded-lg flex justify-center items-center bg-white text-black px-4 py-2 text-sm hover:bg-white/85 cursor-pointer min-w-[140px] text-center"
          onClick={handlePostMessage}
        >
          {postPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </div>
  );
};

export default CueMessageBox;
