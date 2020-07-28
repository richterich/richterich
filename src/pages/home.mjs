import fs  from 'fs';

function renderHomePage(response) {
    let json = fs.readFileSync('./templates/index.json');
    let homePage = JSON.parse(json);
    response.render('index', homePage);
}

export { renderHomePage };
