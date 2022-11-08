export type requestStatus = 'idle' | 'loading...' | 'succeeded (:' | 'failed :(';

export interface requestError {
  statusCode?: number;
  message: string;
}
