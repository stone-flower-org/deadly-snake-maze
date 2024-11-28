import { DefaultBodyType, HttpResponse, ResponseResolver, StrictRequest } from 'msw';

export const isAuthed = (request: StrictRequest<DefaultBodyType>) => {
  const authHeader = request.headers.get('Authorization') || '';
  return !!authHeader.replace('Bearer', '').trim();
};

export const makeUnauthedResponse = () => HttpResponse.text('', { status: 401 });

export const withAuth =
  (resolver: ResponseResolver): ResponseResolver =>
  (input) => {
    const { request } = input;
    if (!isAuthed(request)) return makeUnauthedResponse();
    return resolver(input);
  };
