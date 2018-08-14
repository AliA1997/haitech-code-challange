//import axios to communicate with api.
const axios = require('axios');
let comments = [];
module.exports = {
    readComments: (req, res) => {
        const { id } = req.params;
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then(result => {
            comments = result.data;
            res.status(200).json({comments});
        }).catch(err => console.log('GEt Comments Error---------', err));
    },
    createComments: (req, res) => {
        const { id } = req.params;
        //Destruct properties in req.session.user 
        const { name, username, email } = req.session.user;
        //Destruct body from props.
        const { body } = req.body;
        axios.post(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, { postId: id, body, name, username, email })
        .then(result => {
            comments.push(result.data);
            res.json({comments});
        }).catch(err => console.log('GEt Comments Error---------', err));
    },
    updateComments: (req, res) => {
        const { id, comment_id } = req.params;
        //Destruct properties in req.session.user 
        const { name, username, email } = req.session.user;
        //Destruct body from props.
        const { editBody } = req.body;
        axios.put(`https://jsonplaceholder.typicode.com/comments/${comment_id}?postId=${id}`,
         { id: comment_id, postId: id, body: editBody, name, username, email })
        .then(result => {
            let filteredCommentIndex = comments.filter(comment => comment.id === comment_id);
            comments[filteredCommentIndex] = result.data;
            res.status(200).json({comments});
        }).catch(err => console.log('GEt Comments Error---------', err));
    },
    deleteComments: (req, res) => {
        const { id, comment_id } = req.params;

        axios.put(`https://jsonplaceholder.typicode.com/comments/${comment_id}?postId=${id}`)
        .then(result => {
            let filteredCommentIndex = comments.filter(comment => comment.id === comment_id);
            comments.splice(filteredCommentIndex, 1);
            res.status(200).json({comments});
        }).catch(err => console.log('GEt Comments Error---------', err));
    }

}