const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const handlebars = require('express-handlebars');
// //Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

// //Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs',
    defaultLayout: 'index',
    partialDir: `${__dirname}/views/partials`

}));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', { layout: 'index', something: "test" });


});
app.post('/', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body)
    res.sendFile('planB.hbs', { root: path.join(__dirname, './views/layouts',) })

});
app.listen(port, () => console.log(`App listening to port ${port}`));