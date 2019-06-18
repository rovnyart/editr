import { Router } from 'express';

import * as controller from './controller';

const router = new Router();

router.get('/:id', controller.read);
router.put('/:id', controller.update);

export default router;
