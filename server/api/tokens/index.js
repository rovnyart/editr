import { Router } from 'express';

import * as controller from './controller';

const router = new Router();

router.get('/:id', controller.check);
router.delete('/:id', controller.destroy);

export default router;
