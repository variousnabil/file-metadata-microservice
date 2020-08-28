const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.use(fileUpload());

app.listen(8000, () => console.log('listening on port 8000'));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const theFile = req.files.upfile;

    res.status(200).json({
        name: theFile.name,
        type: theFile.mimetype,
        size: theFile.size
    });
});
