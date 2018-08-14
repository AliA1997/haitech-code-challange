import React, { Component } from 'react';
import Loader from '../../presentational/Loader/Loader';
//import material-ui components 
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
//import axios to communicate with backend.
import axios from 'axios';
//import css file for styling 
import './AlbumPage.css';

export default class AlbumPage extends Component {
    constructor() {
        super();
        this.state = {
            currentAlbum: '',
            currentPhoto: '',
            photos: [],
            showPhoto: false,
            loading: true
        }
    }
    componentDidMount() {
        axios.get(`/api/albums/${this.props.match.params.id}/photos`).then(res => {
            this.setState({photos: res.data.photos, currentAlbum: res.data.album, loading: false});
        }).catch(err => console.log('Get Album Photos Error-------', err));
    }
    displayPhoto(photo) {
        if(!this.state.showPhoto) {
            window.scrollTo(0, 0);
            this.setState({showPhoto: true, currentPhoto: photo})
        } else {
            this.setState({showPhoto: false, currentPhoto: photo});
        }
    }
    render() {
        const { currentAlbum, photos, showPhoto, currentPhoto, loading } = this.state;
        //If the data is not recieved return the component else return the loading indicator. 
        if(!loading) {
            return (
                <div className='album-page container'>
                    <Typography><b>{currentAlbum.title}</b></Typography>
                    <Link to="/create_photo">Create Photo For This Album</Link>
                    <div className='photos-div'>
                        {photos.length ? photos.map(photo => <Card key={photo.id} onClick={() => this.displayPhoto(photo.url)} 
                                                            style={{backgroundImage: `url("${photo.thumbnailUrl}")`, backgroundSize: 'cover', 
                                                            backgroundRepeat: 'no-repeat'}}>
                                                                <CardContent>
                                                                    <Typography>{photo.title}</Typography>
                                                                </CardContent>
                                                            </Card>) : null}
                        {showPhoto && currentPhoto ? <div className='popup-div'>
                                                        <img src={currentPhoto}  alt='popup'/>
                                                    </div> : null}
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }
}