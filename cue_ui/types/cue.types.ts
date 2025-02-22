export interface CueMessage {
  question: string;
  answer: string;
}

export interface CueDetail {
  messages: CueMessage[];
}

export type HistoryCueFetchResponse = {
  cue_histories: CueMessage[];
};
