import db from '../../database';

export async function create(req, res) {
  const { email, password } = req.body;
  try {
    const existing = await db.models.users.findOne({ where: { email } });
    if (existing) throw new Error('User already exists');

    const user = await db.models.users.create({ email, password });

    return res.status(200).json(user.profile);
  } catch (error) {
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
