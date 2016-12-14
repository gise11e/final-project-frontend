const express = require('express');
const app     = express();
const port    = process.env.PORT || 8000;

app.use(express.static(`${__dirname}/public`));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/*', (req, res) =>  res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express started on port: ${port}`));
