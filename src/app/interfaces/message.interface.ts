export interface Message {
  text: string;
  isGpt: boolean;
  role?: string;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
    correctedText: string
  },
  audioUrl?: string;
}
