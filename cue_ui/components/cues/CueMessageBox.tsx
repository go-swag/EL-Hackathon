import { useCues } from '@/context/CueContext';
import { HistoryCueFetchResponse } from '@/types/cue.types';
import { cn } from '@/utils/classname.utils';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';

const fetchUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/submit-text`;

const quickPromptText: string = `Hi there! I'm really interested in the 330e M Sport. Can you tell me
        more about its safety features?`;

const CueQuickPrompt: React.FC<{
  setError: (error: boolean) => void;
}> = ({ setError }): React.JSX.Element => {
  const [play] = useSound('/audio/el-prompt.mp3');
  const { updateLocalMessages, setSelectedCue } = useCues();

  const timeoutIdRef = useRef<number | null>(null);

  const handleClick = async () => {
    play();

    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: quickPromptText,
        audio_file: null,
      }),
    });

    if (!response.ok) {
      setError(true);
      return;
    }

    const responseJson: HistoryCueFetchResponse = await response.json();

    if (timeoutIdRef.current) window.clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = window.setTimeout(() => {
      if (responseJson.cue_histories) {
        updateLocalMessages(responseJson.cue_histories);
        setSelectedCue(responseJson.cue_histories[0]);
      }
    }, 4500);
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) window.clearTimeout(timeoutIdRef.current);
    };
  }, []);

  return (
    <div>
      <button
        type="button"
        className="p-1 text-[.75rem] text-black bg-white/70 hover:bg-white/100 rounded cursor-pointer"
        onClick={handleClick}
      >
        {quickPromptText}
      </button>
    </div>
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
    <div className="mt-auto flex flex-col gap-y-5 px-6">
      <div className="py-6">
        <ul className="flex flex-row items-center gap-2 mb-4">
          <li>
            <CueQuickPrompt setError={() => setPostError(true)} />
          </li>
        </ul>
        {postError && (
          <span className="block text-red-800">
            Unable to generate response.
          </span>
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
    </div>
  );
};

export default CueMessageBox;
