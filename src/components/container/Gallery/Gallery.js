import React, { Component } from 'react';
import Loader from '../../presentational/Loader/Loader';
//import material-ui components.
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//import withRouter from react-router-dom 
import { withRouter } from 'react-router-dom';
//import axios to communicate with backend
import axios from 'axios';
//import css file for styling
import './Gallery.css';

let colors = ["#7df092","#b3abfb","#0381a8","#1906b7","#ac9e4d","#64815f","#7dd10e","#884bd2","#66def1","#2e543b"];
class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            albums: [], 
            loading: true
        }
    }
    componentDidMount() {
        axios.get('/api/albums').then(res => {
            this.setState({albums: res.data.albums, loading: false});
        }).catch(err => console.log("Get ALbums Error----------", err));
    }
    linkFunc(path) {
        this.props.history.push(path);
    }
    render() {
        const { albums, loading } = this.state;
        //If the data is not recieved return the component else return the loading indicator. 
        if(!loading) {
            return (
                <div className='gallery container'> 
                    <div className='gallery-card-div'>
                    {albums.length ? albums.map(album => <Card className='gallery-card' onClick={() => this.linkFunc(`/gallery/${album.id}`)}
                                                        key={album.id} style={{background: colors[Math.floor(Math.random() * colors.length)]}}>
                                                            <CardContent>
                                                                <Typography>{album.title}</Typography>
                                                            </CardContent>
                                                        </Card>) : null}
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }
}

export default withRouter(Gallery);