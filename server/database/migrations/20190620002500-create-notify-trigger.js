export default {
  up: ({ sequelize }) => sequelize.query(`
    CREATE OR REPLACE FUNCTION public.notes_update_notify()
      RETURNS trigger
      LANGUAGE plpgsql
    AS $function$
    BEGIN
      PERFORM pg_notify('notes_update', row_to_json(NEW)::text);
      RETURN NULL;
    END;
    $function$;

    CREATE TRIGGER notes_updated AFTER UPDATE ON notes FOR EACH ROW EXECUTE PROCEDURE notes_update_notify();
  `),
  down: ({ sequelize }) => sequelize.query(`
    DROP TRIGGER notes_updated ON notes;
  `),
};
