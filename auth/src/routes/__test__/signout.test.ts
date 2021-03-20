import request from 'supertest';
import { app } from '../../app';
import { signup } from './helpers/signup';

it('should return 200 and set cookie after successful signin', async () => {
  const cookie = await signup();

  const resp = await request(app)
    .post('/api/users/signout')
    .set('Cookie', cookie)
    .expect(200);

  expect(resp.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
