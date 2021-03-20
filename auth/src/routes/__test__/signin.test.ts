import request from 'supertest';
import { app } from '../../app';
import { signup } from './helpers/signup';

it('should return 200 and set cookie after successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'rezo@test.com',
      password: 'password',
    })
    .expect(201);

  const resp = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'rezo@test.com',
      password: 'password',
    })
    .expect(200);

  expect(resp.get('Set-Cookie')[0]).toBeDefined();
});
