import React from 'react';
import '../styles/post.css';

const Post = (props) =>(

    <div className='card card post-body'>
        <div className='card-body'>
            <div>{props.postBody}</div>
        </div>
    </div>
);

export default Post;

