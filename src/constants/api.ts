export const requestStatuses = {
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed',
} as const;

export type RequestStatus = typeof requestStatuses[keyof typeof requestStatuses];

export const requestStatusCodes = {
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  forbidden: 403,
  conflict: 409,
  serverError: 500,
} as const;

export type RequestStatusCode = typeof requestStatusCodes[keyof typeof requestStatusCodes];

export const statusesToThunkMapping: { [key in RequestStatus]: string } = {
  [requestStatuses.succeeded]: 'fulfilled',
  [requestStatuses.pending]: 'pending',
  [requestStatuses.failed]: 'rejected',
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
  pageSize: 7,
};
