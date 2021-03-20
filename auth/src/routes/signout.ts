import { Router } from 'express';

const router = Router();

router.post('/api/users/signout', (req: any, res: any) => {
  req.session = null;
  res.status(200).json({});
});

export { router as signoutRouter };
