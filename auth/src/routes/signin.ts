import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '@ticket-store/common';
import { validateRequest } from '@ticket-store/common';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('email is invalid'),
    body('password').isLength({ min: 5 }).withMessage('password is too short'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const match = await Password.compare(user.password, password);

    if (!match) {
      throw new BadRequestError('Invalid credentials');
    }
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: token,
    };

    res.status(200).json({ user });
  }
);

export { router as signinRouter };
