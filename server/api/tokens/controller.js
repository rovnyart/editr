import { differenceInHours } from 'date-fns';

import db from '../../database';

const TOKEN_EXPIRE_INTERVAL = 1; // hours;

export async function check(req, res) {
  const { id } = req.params;
  const transaction = await db.sequelize.transaction();
  try {
    const token = await db.models.tokens.findByPk(id);
    if (!token) throw new Error('Invalid link');
    if (Math.abs(differenceInHours(token.createdAt, new Date())) > TOKEN_EXPIRE_INTERVAL) {
      throw new Error('Link expired');
    }
    if (token.action === 'registration') {
      const user = await db.models.users.findOne({ where: { email: token.payload.email } });
      if (!user) throw new Error('User not found o_O');
      await user.update({ isEmailConfirmed: true }, { transaction });
    }
    await token.destroy({ transaction });
    await transaction.commit();
    return res.status(200).json(token);
  } catch (error) {
    await transaction.rollback();
    return res.status(412).json({ message: error.message });
  }
}

export async function destroy(req, res) {
  const { id } = req.params;
  try {
    const token = await db.sequelize.models.tokens.findByPk(id);
    if (!token) throw new Error('Invalid link');
    await token.destroy();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(412).json({ message: error.message });
  }
}
