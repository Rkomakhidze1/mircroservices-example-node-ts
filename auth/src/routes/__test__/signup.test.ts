import request from 'supertest';
import { app } from '../../app';

it('should return 201 after successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'rezo@test.com',
      password: 'password',
    })
    .expect(201);
});

it('should return 400 after invalid signup request', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'rtest.com',
      password: 'p',
    })
    .expect(400);
});

it('should return 400 if email or password is missing', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'rtest.com',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'rtecsa',
    })
    .expect(400);
});

it('should return 400 after registering with duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'rtest@test.com',
      password: 'pweafcaf',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'rtest@test.com',
      password: 'pweafcaf',
    })
    .expect(400);
});

it('should set cookie after successful signup', async () => {
  const resp = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'rtest@test.com',
      password: 'pweafcaf',
    })
    .expect(201);

  expect(resp.get('Set-Cookie')).toBeDefined();
});
