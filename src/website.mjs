import express from 'express';
import { renderHomePage } from './pages/home.mjs';

const website = express();

website.use('/static', express.static('templates'));
website.set('views', './templates');
website.set('view engine', 'pug');

website.get('/', (_request, response) => {
    renderHomePage(response);
});

export { website };
