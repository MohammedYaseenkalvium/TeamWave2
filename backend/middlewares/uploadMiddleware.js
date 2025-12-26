const multer = require('multer');


// Configure multer storage
const storage  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination directory
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Specify the file name
    },
});

// File filter
const fileFilter = (req,file,cb)=>{
    const allowedTypes = ['image/jpeg','image/png','image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Only .jpeg, .jpg and .png files are allowed'),false);
    }
};

const upload = multer({storage,fileFilter});

module.exports = upload;