import request from 'supertest';
import { app } from '../../../app';

export const signup = async () => {
  const resp = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'rezo@test.com',
      password: 'password',
    })
    .expect(201);

  return resp.get('Set-Cookie');
};
