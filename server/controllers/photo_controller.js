///import axios responsible communicating to api. 
const axios = require('axios');
module.exports = {
    readAlbums: (req, res) => {
        axios.get(`https://jsonplaceholder.typicode.com/albums`).then(result => {
            res.status(200).json({albums: result.data})
        }).catch(err => console.log("Get ALbums Error-------", err));
    },
    readPhoto: (req, res) => {
        axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`).then(result => {
            res.status(200).json({photo: result.data});
        }).catch(err => console.log('Read Photo Error--------', err));
    },
    readPhotos: (req, res) => {
        const { album_id } = req.params;
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${album_id}`).then(result => {
            let photos = {};
            photos.photos = result.data;
            axios.get(`https://jsonplaceholder.typicode.com/albums/${album_id}`).then(result2 => {
                photos.album = result2.data;
                res.status(200).json({photos: photos.photos, album: photos.album});
             }).catch(err => console.log('Get ALbum data error------', err));
        }).catch(err => console.log('Read Photos Error---------', err));
    },
    //Not tested ////////////////////////
    createPhoto: (req, res) => {
        const { album_id } = req.params;
        axios.post(`https://jsonplaceholder.typicode.com/photos?albumId=${album_id}`, {title, url: url, thumbnailUrl: url})
        .then(result => {
            res.status(200).json({photo: result.data});
        }).catch(err => console.log('Create Photo Error--------', err));
    },
    updatePhoto: (req, res) => {
        const { album_id, id } = req.params;
        axios.put(`https://jsonplaceholder.typicode.com/photos/${id}?albumId=${album_id}`,
         {title, url: url, thumbnailUrl: url})
        .then(result => {
            res.status(200).json({photo: result.data});
        }).catch(err => console.log('Create Photo Error--------', err));
    },
    deletePhoto: (req, res) => {
        const { album_id, id } = req.params;
        axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}?albumId=${album_id}`)
        .then(result => {
            res.status(200).json({photo: result.data});
        }).catch(err => console.log('Create Photo Error--------', err));
    }
    ////////////////////////////////////////
}