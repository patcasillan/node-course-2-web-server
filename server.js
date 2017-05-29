const express = require('express');
const fs = require('fs');
var app = express();
const hbs = require('hbs');
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static( __dirname + '/public'));
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log',log + '\n');
    next();
});

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase(text);
});

app.get('/', (req, res) => {
    // // res.send('Hello Express!');
    // res.send({
    //     name: 'Patrick',
    //     letters: [
    //         'a',
    //         'b',
    //         'c',
    //         'd',
    //         'e'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome to this website!'
    });
});

app.get('/about', (req,res) => {
    // res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page Dynamic',
    });
});


app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
});
