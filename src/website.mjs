import express from 'express';

const website = express();

website.get('/', (_request, response) => {
    response.send('<h1>Hi there 👋</h1>');
});

export { website };
