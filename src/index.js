'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

class Comment extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var comments = this.props.comments
		var date = new Date( comments.date ).toLocaleString()
		return (
			<li>
				<div dangerouslySetInnerHTML={{__html: comments.content.rendered}}></div>
				<p>
					<small>By: </small>
					<span>{comments.author_name}</span><br/>
					<small>{date}</small>
				</p>
			</li>
		)
	}
}

class CommentBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			comments: []
		}
	}

	loadCommentsFromServer( self ) {
		var domain  = target.getAttribute('data-domain')
		var post_id = target.getAttribute('data-post-id')
		var api = domain + '/wp-json/wp/v2/comments?post=' + post_id;
		fetch(api)
			.then(function(res){
				return res.json();
			}).then(function(json){
				console.log(json)
				self.setState({
					comments: json
				})
			});
	}

	componentDidMount() {
		this.loadCommentsFromServer( this );
		setInterval( () => { this.loadCommentsFromServer( this )}, this.props.interval );
	}

	render() {
		var commentList = this.state.comments.map( ( comments ) => {
			return (
				<Comment comments={comments} />
			);
		});
		return (
			<ul>{commentList}</ul>
		);
	}
}


var target = document.getElementById('amimoto-ninja-comment-list');
if ( target != null ) {
	var interval = target.getAttribute('data-interval')
	ReactDOM.render(
		<CommentBox
			interval={interval}/>,
		target
	)
}
