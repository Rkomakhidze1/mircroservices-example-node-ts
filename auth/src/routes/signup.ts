import { Router, Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@ticket-store/common';
import { validateRequest } from '@ticket-store/common';
import { User } from '../models/user';

const router = Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('email is invalid'),
    body('password').isLength({ min: 5 }).withMessage('password is too short'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new BadRequestError('user already exists');
    } else {
      const user = User.build({
        email: email,
        password: password,
      });

      await user.save();

      const token = jwt.sign(
        { email: user.email, id: user.id },
        process.env.JWT_KEY!,
        {
          expiresIn: 15 * 60,
        }
      );
      req.session = {
        jwt: token,
      };

      res.status(201).json({ user });
    }
  }
);

export { router as signupRouter };
