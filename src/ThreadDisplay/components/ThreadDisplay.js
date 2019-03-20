import React, {Component} from 'react';
import Post from '../../Post/components/Post';
import PostEditor from '../../PostEditor/components/PostEditor'
import ReactPlayer from 'react-player';

import processString from 'react-process-string';

class ThreadDisplay extends Component {
    constructor(props){
        super(props);
        this.state={
            posts: [],
        };

        this.addPost                      = this.addPost.bind(this);
        this.databaseRef = this.props.database.ref().child('post');
        this.updateLocalState = this.updateLocalState.bind(this);

    }

    componentWillMount() {
        const {updateLocalState} = this;
        this.databaseRef.on('child_added', snapshot => {
            const response = snapshot.val();
            updateLocalState(response);
        });
    }

    addPost(postBody){
        const postToSave = {postBody};
        this.databaseRef.push().set(postToSave);
    }

    updateLocalState(response){
        const posts = this.state.posts;
        let processedPost = response.postBody;
        let replaceURL = [{
            regex: /(https?:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+/,
            fn: (key, result) => <ReactPlayer url={result[0]}/>
        },{
            regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/gim,
            fn: (key, result) => <span key={key}>
                                     <a target="_blank" rel="noopener noreferrer" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>{result[2]}.{result[3]}{result[4]}</a>{result[5]}
                                 </span>
        }, {
            regex: /(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/gim,
            fn: (key, result) => <span key={key}>
                                     <a target="_blank" rel="noopener noreferrer" href={`http://${result[1]}.${result[2]}${result[3]}`}>{result[1]}.{result[2]}{result[3]}</a>{result[4]}
                                 </span>
        }];

        let replaceLineBreaks = [{
            regex:/(?:\r\n|\r|\n)/g,
            fn: (key,result) => <br key = {key}/>
        }];



        //replace linebreaks

        processedPost = processString(replaceLineBreaks)(processedPost);

        //add links to urls
        processedPost = processString(replaceURL)(processedPost);

        //replace
        posts.push(processedPost);
        this.setState({
            posts: posts,
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.posts.map((postBody, idx) => {
                            return (
                                <Post key={idx} postBody={postBody}/>
                            )
                        }
                    )
                }
                <PostEditor addPost={this.addPost}/>
            </div>
        )
    }
}

export default ThreadDisplay;