export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
}
