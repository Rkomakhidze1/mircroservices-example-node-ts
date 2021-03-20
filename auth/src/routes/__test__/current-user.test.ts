import request from 'supertest';
import { app } from '../../app';
import { signup } from './helpers/signup';

it('should return 200 and set cookie after successful signin', async () => {
  const cookie = await signup();
  const resp = await request(app)
    .get('/api/users/currentUser')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

  expect(resp.body.currentUser.id).toBeDefined();
});

it('should return 401 unauthorized and currentUser null if cookie is not set', async () => {
  const resp = await request(app)
    .get('/api/users/currentUser')
    .send({})
    .expect(200);

  expect(resp.body.currentUser).toBeNull();
});
