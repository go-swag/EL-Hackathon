import { useCues } from '@/context/CueContext';
import { HistoryCueFetchResponse } from '@/types/cue.types';
import { QuickPrompt } from '@/types/prompt.types';
import { cn } from '@/utils/classname.utils';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';

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
  const { updateLocalMessages, setSelectedCue } = useCues();

  const formRef = useRef<HTMLFormElement>(null);

  const [postPending, setPostPending] = useState<boolean>(false);
  const [postError, setPostError] = useState<boolean>(false);

  const handlePostMessage = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const question = formData.get('question') as string;

    setPostError(false);

    if (!question || !question?.trim().length) {
      if (formRef.current) {
        formRef.current.focus();
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
        question: question,
        audio_file: null,
      }),
    });

    if (!response.ok) {
      setPostError(true);
    } else {
      const responseJson: HistoryCueFetchResponse = await response.json();
      updateLocalMessages(responseJson.cue_histories);
      setSelectedCue(responseJson.cue_histories[0]);
    }

    formRef.current?.reset();
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
      <div>
        <form
          className="flex flex-row flex-wrap gap-4"
          onSubmit={handlePostMessage}
          ref={formRef}
        >
          <input type="text" className={inputClass} name="question" />
          <button
            type="submit"
            className="rounded-lg flex justify-center items-center bg-white text-black px-4 py-2 text-sm hover:bg-white/85 cursor-pointer min-w-[140px] text-center"
          >
            {postPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CueMessageBox;
