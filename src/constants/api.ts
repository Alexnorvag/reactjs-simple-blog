export const apiUrl = 'http://localhost:5000';

export const loadingStatuses = {
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed',
} as const;

export type LoadingStatuses = typeof loadingStatuses[keyof typeof loadingStatuses];
