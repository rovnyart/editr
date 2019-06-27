import fs from 'fs';

import { format } from 'date-fns';

const content = `
  export default {
    up: ({ sequelize }) => {},
    down: ({ sequelize }) => {}
  }
`;

const filename = `server/database/migrations/${format(new Date(), 'YYYYMMDDhhmmss')}-${process.argv[2]}.js`;
// eslint-disable-next-line no-console
fs.writeFile(filename, content, (err) => console.log(err));
