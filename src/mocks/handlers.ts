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

  http.post(`${BACKEND_URL}/auth/sign-up`, async ({ request }) => {
    const { password, email, firstName, lastName } = await request.json();

    if (password === "password" && email === "test@example.com" && firstName === "Jane" && lastName === "Doe") {
      return HttpResponse.json({ message: 'User registered successfully!' }, {
        headers: {
          'set-cookie': 'authToken=mock-token; Path=/; HttpOnly',
        },
      });
    }

    if (email === "alreadyInUse@example.com") {
      return new HttpResponse(JSON.stringify({ message: 'Email is already in use!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }),


  http.post(`${BACKEND_URL}/journals`, async ({ request }) => {
    const { name, color } = await request.json();
  
    if (name === "fail" || !name || !color) {
      return new HttpResponse(
        JSON.stringify({ message: "Invalid journal data" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  
    return HttpResponse.json({
      id: "mock-journal-id",
      name,
      color,
      createdAt: new Date().toISOString(),
    });
  }),
  
];
