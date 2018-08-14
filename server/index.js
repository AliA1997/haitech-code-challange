//configure your env file. 
require('dotenv').config();
//configure your npm module imports 
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const PORT = 5000;
///import your controller files, that will be responsible for handling functionality for your endpoints. 
const userCtrl = require('./controllers/user_controller');
const cloudinaryCtrl = require('./controllers/cloudinary_controller');
const postCtrl = require('./controllers/post_controller');
const photoCtrl = require('./controllers/photo_controller');
const commentCtrl = require('./controllers/comment_controller');
//Middlewares
const checkUser = require('./middlewares/checkUser');
const app = express();

//Connects to database. 
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true }, (err) => {
    if(err) console.log('Database connection Error----------', err);
    console.log('Database Connected------------');
});
//Define your app level middleware 
//Use bodyParser to define the req.body unless undefined
app.use(bodyParser.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'adass;fasffafsaf;fdsa',
    cookie: {
        maxAge: 60 * 60 * 60 * 24 * 7
    }
}));

//CLoudinary Url, used for uploading to cloudinary database
app.get('/api/upload', cloudinaryCtrl.upload);

//Login Endpoint 
app.post('/api/login', userCtrl.login);
app.get('/api/users', userCtrl.readUsers);
app.get('/api/users/:id', userCtrl.readUser);

//Post Controller responsible for getting posts 
app.get('/api/posts/:id', postCtrl.readPost);
app.get('/api/posts', postCtrl.readPosts);
//Use request level middleware when you create a post. 
app.post('/api/posts', checkUser, postCtrl.createPosts);
app.put('/api/posts/:id', postCtrl.updatePosts);
app.delete('/api/posts/:id', postCtrl.deletePosts);

//Comments COntroller responsible for getting comments 
app.get('/api/posts/:id/comments', commentCtrl.readComments);
//Use request level middleware when you create a comment. 
app.post('/api/posts/:id/comments', checkUser, commentCtrl.createComments);
app.put('/api/posts/:id/comments/:comment_id', commentCtrl.updateComments);
app.delete('/api/posts/:id/comments/:comment_id', commentCtrl.deleteComments);

//Photos Controller responsible for getting photos
app.get('/api/albums', photoCtrl.readAlbums);
app.get('/api/albums/:album_id/photos/:id', photoCtrl.readPhoto);
app.get('/api/albums/:album_id/photos', photoCtrl.readPhotos);

//implemented if needed------------------
// app.post('/api/albums/:album_id/photos', photoCtrl.createPhoto);
// app.put('/api/albums/:album_id/photos/:id', photoCtrl.updatePhoto);
// app.delete('/api/albums/:album_id/photos/:id', photoCtrl.deletePhoto);


//Get User Posts Endpoint
app.get('/api/user_posts', postCtrl.readUserPosts);





app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));