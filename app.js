const express = require('express');
const http = require('http');
const path = require('path');
let app = express();
const ensureSecure = (req, res, next) => {
    if (
        req.get('X-Forwarded-Proto') == 'https' ||
        req.hostname == 'localhost'
    ) {
        next();
    } else if (
        req.get('X-Forwarded-Proto') != 'https' &&
        req.get('X-Forwarded-Port') != '443'
    ) {
        res.redirect('https://' + req.hostname + req.url);
    }
};
app.use(express.static(path.join(__dirname, 'build')), ensureSecure);
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
const port = process.env.PORT || '8080';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
