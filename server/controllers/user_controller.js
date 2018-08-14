//import axios to make axios calls 
const axios = require('axios');
module.exports = {
    getUserData: (req, res) => {
        res.status(200).json({user: req.session.user});
    },
    login: (req, res) => {
        //Destruct the email from the request body.
        const { email } = req.body;
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            let filteredUser = response.data.filter(user => user.email === email);
            if(filteredUser.length) {
                res.status(200).json({message: 'Logged In successfully!', user: filteredUser[0]})
                req.session.user = filteredUser[0];
                req.session.save();
            } else {
                res.status(200).json({message: 'Wrong Email!'});
            }
        }).catch(err => console.log('Login Error---------------', err));
    },
    readUsers: (req, res) => {
        axios.get('https://jsonplaceholder.typicode.com/users').then(result => {
            res.status(200).json({users: result.data});
        }).catch(err => console.log('Get Users Error---------', err));
    },
    readUser: (req, res) => {
        const { id } = req.params;
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(result => {
            let userData = result.data;
            axios.get('https://jsonplaceholder.typicode.com/posts?userId=' + id).then(result2 => {
                userData.posts = result2.data;
                res.status(200).json({user: userData});
            }).catch(err => console.log('GEt Users Posts Error-----------', err));
        }).catch(err => console.log('Get Users Error---------', err));
    }
}