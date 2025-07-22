import { http, HttpResponse } from 'msw';
import { BACKEND_URL } from '@/config';

export const handlers = [
  http.post(`${BACKEND_URL}/auth/login`, async ({ request }) => {
    const { username, password } = await request.json();

    if (username === 'test@example.com' && password === '123456') {
      return HttpResponse.json({ message: 'Login successful' }, {
        headers: {
          'set-cookie': 'authToken=mock-token; Path=/; HttpOnly',
        },
      });
    }

    return new HttpResponse(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];
