//Import axios to do axios calls to the test api.
const axios = require('axios');
//import mongoose models for post
const Post = require('../models/post');
module.exports = {
    readPost: (req, res) => {
        //destruct the id from the request params.
        const { id } = req.params;
        //Get current post
        axios.get('https://jsonplaceholder.typicode.com/posts/'+ id).then(result => {
            let post = result.data;
            //Get all the users 
            axios.get('https://jsonplaceholder.typicode.com/users/' + result.data.userId).then(result2 => {
                //Set the name of the post's name property so the name is displayed in teh post page.
                post.name = result2.data.name;
                console.log('post---------------', post)
                res.status(200).json({post});
            }).catch(err => console.log('GEt users Error---------', err));
        }).catch(err => console.log('Backend Posts Error---------', err))
    },
    readPosts: (req, res) => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(result => {
            res.status(200).json({posts: result.data});
        }).catch(err => console.log('Backend Posts Error---------', err))
    },
    readUserPosts: (req, res) => {
        const { id } = req.session.user;
        axios.get('https://jsonplaceholder.typicode.com/posts?userId=' + id).then(result => {
            res.status(200).json({posts: result.data});
        }).catch(err => console.log('Backend Posts Error---------', err))    
    },
    createPosts: (req, res) => {
        const { id } = req.session.user;
        const { title, description } = req.body;
        console.log(req.body);
        axios.post('https://jsonplaceholder.typicode.com/posts', { userId: id, title, body: description}).then(result => {
            console.log('result----------', result.data);
            res.status(200).json({post: result.data});
        }).catch(err => console.log('Backend Create Posts Error----------', err));
        
    },
    updatePosts: (req, res) => {
        const { id, title, description } = req.body;
        axios.put('https://jsonplaceholder.typicode.com/posts/' + id, { id, title, body: description }).then(result => {
            res.status(200).json({posts: result.data});
        }).catch(err => console.log('Backend Update Posts Error------------', err));
    },
    deletePosts: (req, res) => {
        const { id } = req.body;
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + id).then(result => {
            res.status(200).json({message: 'Post Deleted!', posts: result.data});
        }).catch(err => console.log('Backend Update Posts Error------------', err));
    }
}