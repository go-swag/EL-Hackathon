export interface CueMessage {
  id: string;
  title: string;
  text: string;
}

export interface CueDetail {
  messages: CueMessage[];
}
