export const getErrorMessage = (
  { message }: Error,
): string => message.replace(/^\d+\s/, '');

export const getStatusCode = ({ message }: Error): number => parseInt(message, 10);

export const buildErrorMessage = (
  statusCode: number,
  message: string,
): string => `${statusCode} ${message}`;
