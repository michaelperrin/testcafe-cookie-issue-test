const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

const renderHtml = body => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="content">
        ${body}
        <a href="/" id="reload-page">Reload page</a>
    </div>
</body>
</html>
`;

const sessionTime = 3000;
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: sessionTime,
    },
}))

app.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write(
            renderHtml(`
                <div id="text">Has session</div>
                <div id="views-number">Views: ${req.session.views}</div>
            `)
        );
        res.end()
    } else {
        req.session.views = 1
        res.write(
            renderHtml(`
                <div id="text">Starting session!</div>
            `)
        );
        res.end();
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
