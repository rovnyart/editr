import express from 'express';

import db from '../database';

const router = express.Router();

require('./local/passport').setup(db.models);

router.use('/', require('./local').default);

export default router;
