import React, { Component } from 'react';
//import your components
import Comment from '../../presentational/Comment/Comment';
//import axios to communicate with backend
import axios from 'axios';

export default class CommentContainer extends Component {
    constructor() {
        super();
        this.state = {
            doEdit: false,
            editBody: ''
        }
    }
    handleEditBody = (val) => {
        this.setState({editBody: val});
    }
    editComment = () => {
        const { doEdit, editBody } = this.state;
        const { id, postId } = this.props;
        if(doEdit && editBody) {
            axios.put(`/api/posts/${postId}/comments/${id}`).then(res => {
                this.props.reRender();
                alert('Comment Edited');
                this.setState({doEdit: false, editBody: '' });
            }).catch(err => console.log("Comment Edited!!!", err));
        } else {
            this.setState({doEdit: !this.state.doEdit});
        }
    }
    deleteComment = () => {
        const { id, postId } = this.props;
        if(window.confirm('You sure you want to delete your comment?')) {
            axios.put(`/api/posts/${postId}/comments/${id}`).then(res => {
                this.props.reRender();
                alert('Comment Deleted');
            }).catch(err => console.log("Comment Edited!!!", err));
        }
    }
    render() {
        return <Comment handleChange={this.handleEditBody} {...this.props} {...this.state} editComment={this.editComment}
                deleteComment={this.deleteComment}/>
    }
}