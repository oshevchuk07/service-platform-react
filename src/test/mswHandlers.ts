import { http, HttpResponse } from 'msw';

const API_URL = 'http://localhost:3000';

export const handlers = [
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'test@test.com' && body.password === '123456') {
      return HttpResponse.json({
        access_token: 'mock-token',
        user: { id: 1, email: 'test@test.com', firstName: 'Test', lastName: 'User', role: 'USER' },
      });
    }

    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }),
];
