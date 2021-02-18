export const apiUrl = 'http://localhost:5000';

export const loadingStatuses = {
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed',
} as const;

export type LoadingStatuses = typeof loadingStatuses[keyof typeof loadingStatuses];

export const statusesToThunkMapping: { [key in LoadingStatuses]: string } = {
  [loadingStatuses.succeeded]: 'fulfilled',
  [loadingStatuses.pending]: 'pending',
  [loadingStatuses.failed]: 'rejected',
};

const paginationDefaultSearchParams = {
  pageNumber: 1,
};

export const postsDefaultSearchParams = {
  ...paginationDefaultSearchParams,
  pageSize: 3,
};

export const usersDefaultSearchParams = {
  ...paginationDefaultSearchParams,
  pageSize: 5,
};
