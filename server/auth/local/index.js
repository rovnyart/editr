import express from 'express';

import { login } from '../auth.service';

const router = express.Router();

router.post('/', login, (req, res) => res.json(req.user.profile));

router.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.sendStatus(200);
});

export default router;
