import multer from "multer"
// multer is a middleware used for handling multipart/form-data, which is primarily used for uploading files in Node.js applications.

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
        // The callback function in the multer.diskStorage() configuration is used to control the behavior of how files are stored. Specifically, it determines what the file's name or destination will be when saving the uploaded file.
        // null: Indicates that there is no error. If there’s an error, you would pass an error object instead of null. 
        // file.originalname: Sets the file name to the original name of the uploaded file. This is provided by the client in the file's metadata.
    }
})

// here storage configuration determines how and where the uploaded files will be stored.
// The filename function allows you to customize the name of the file being stored.

const upload = multer({storage});
// The upload variable is the configured multer middleware that can be used to handle file uploads in routes.

export default upload;