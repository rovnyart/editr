import db from '../../database';

export async function read(req, res) {
  const { id } = req.params;
  try {
    let note;
    let notFound;
    note = await db.models.notes.findByPk(id);
    if (!note) {
      notFound = true;
      note = await db.models.notes.create({ id });
    }
    return res.status(200).json({ note, notFound });
  } catch (error) {
    return res.status(412).json({ message: error.message });
  }
}

export async function update(req, res) {
  const { id } = req.params;
  try {
    const note = await db.models.notes.findByPk(id);
    if (!note) throw new Error('Note not found');
    await note.update(req.body);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(412).json({ message: error.message });
  }
}
