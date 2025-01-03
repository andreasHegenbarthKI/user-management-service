import request from 'supertest';
import app from '../src/app';
import User from '../src/models/user.model';

beforeAll(async () => {
  await User.deleteMany({});
});

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: '123456', role: 'student' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});