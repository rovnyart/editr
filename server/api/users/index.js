import { Router } from 'express';

import { isAuthenticated } from '../../auth/auth.service';

import * as controller from './controller';

const router = new Router();

router.get('/me', isAuthenticated, controller.show);
router.post('/', controller.create);

export default router;
