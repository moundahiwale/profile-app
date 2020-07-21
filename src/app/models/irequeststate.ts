export interface IRequestState {
  loading?: boolean;
  saving?: boolean;
  error?: { error: boolean; message: string };
}
