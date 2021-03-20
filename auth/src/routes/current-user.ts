import { Router, Response, Request } from 'express';
import { currentUser } from '@ticket-store/common';

const router = Router();

router.get(
  '/api/users/currentUser',
  currentUser,
  (req: Request, res: Response) => {
    console.log(req.currentUser);
    res.status(200).json({ currentUser: req.currentUser });
  }
);

export { router as currentUserRouter };
