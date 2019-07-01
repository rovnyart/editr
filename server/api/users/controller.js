import db from '../../database';
import mailer from '../../libs/mailer';

export async function create(req, res) {
  const { email, password } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const existing = await db.models.users.findOne({ where: { email } });
    if (existing) throw new Error('User already exists');

    const user = await db.models.users.create({ email, password }, { transaction });


    const token = await db.models.tokens.create({ action: 'registration', payload: { email } }, { transaction });
    const confirm = `http://${process.env.NODE_ENV === 'production' ? 'eddtr.space' : 'localhost:8888'}/token/${token.id}/confirm`; // eslint-disable-line max-len
    const destroy = `http://${process.env.NODE_ENV === 'production' ? 'eddtr.space' : 'localhost:8888'}/token/${token.id}/destroy`; // eslint-disable-line max-len
    const html = `
      Welcome to eddtr.space!<br />
      Your login is ${email}.<br />
      Please confirm your email by following link: <a href="${confirm}">${confirm}</a><br />
      If you didn't register, please follow this link: <a href="${destroy}">${destroy}</a><br />
      We will never bother you with any other letters.
    `;
    await mailer.sendMail({ to: email, html, subject: 'Eddtr.space registration' });

    await transaction.commit();
    return res.status(200).json(user.profile);
  } catch (error) {
    await transaction.rollback();
    return res.status(412).json({ message: error.message });
  }
}

export async function show(req, res) {
  try {
    return res.status(200).json(req.user.profile);
  } catch (error) {
    return res.status(412).json({ message: error.message });
  }
}
