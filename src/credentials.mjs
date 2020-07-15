import fs from 'fs';

let privkey = process.env.PRIVKEY_PATH;
let fullchain = process.env.FULLCHAIN_PATH;

const credentials = {
    key: fs.readFileSync(`${privkey}`, 'utf8'),
    cert: fs.readFileSync(`${fullchain}`, 'utf8'),
};

export { credentials };
