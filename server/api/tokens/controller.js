import db from '../../database';

export async function check(req, res) {
  const { id } = req.params;
  try {
    const token = await db.models.tokens.findByPk(id);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(412).json({ message: error.message });
  }
}
