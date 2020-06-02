const mongoose = require('../common/services/mongoose.service').mongoose;
const url = require('../common/services/mongoose.service').url;

const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');


const conn = mongoose.connection
let gfs;

conn.once('open', () => {
    //init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    exports.gfs = gfs;
})

//Create Storage engine
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        })
    }
});

// set storare for where the file will be send by multer
exports.upload = multer({ storage });



