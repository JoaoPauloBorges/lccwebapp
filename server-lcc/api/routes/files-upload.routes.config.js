const express = require('express');
const router = express.Router();
// const methodOverride = require('method-override');
const fileUploadModel = require('../../models/files-upload.model');

// fileUploadModel.upload.single('file') MIDDLEWARE to parse the body param 'file'
//@route POST /files
router.post('/', fileUploadModel.upload.single('file'), (req, res) => {
    res.json({ id: req.file.id, filename: req.file.filename });
});

//@route GET /files
router.get('/', (req, res) => {
    fileUploadModel.gfs.files.find().toArray((err, files) => {
        //check if files exist
        if (!files || files.lenght === 0) {
            return res.status(404).json({
                err: 'no files exist'
            });
        }
        //Files exists
        return res.json(files);
    })
})

//@route GET /files/:filename
router.get('/:filename', (req, res) => {
    fileUploadModel.gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        //check if files exist
        if (!file || file.lenght === 0) {
            return res.status(404).json({
                err: 'File do not exists'
            });
        }
        return res.json(file);
    });
});

//@route GET /files/image/:filename
router.get('/image/:filename', (req, res) => {
    fileUploadModel.gfs.files.findOne({ filename: req.params.filename }, (err, file) => {

        if (!file || file.lenght === 0) {
            return res.status(404).json({
                err: 'File do not exists'
            });
        }
        //Check mimetype
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/gif') {
            const readStream = fileUploadModel.gfs.createReadStream(file.filename);
            readStream.pipe(res);
        } else {
            res.status(404).json({ err: 'Not an image' });
        }
    });
});

// @route DELETE /files/:filename
router.delete('/:filename', (req, resp) => {
    fileUploadModel.gfs.remove({ filename: req.params.filename, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }
        resp.status(200).send({status: req.params.filename + ' deleted successfully'})
    })
})

module.exports = router;