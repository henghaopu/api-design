import * as user from '../user';
// import { createNewUser } from '../user';

describe('user handler', () => {
  it('should create a new user', async () => {
    const req = { body: { userName: 'hello', password: 'hello' } };
    const res = {
      json({ token }) {
        console.log({ token });
        expect(token).toBeTruthy();
      },
    };

    await user.createNewUser(req, res, () => {});
  });
});
