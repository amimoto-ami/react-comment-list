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

	loadCommentsFromServer() {
		var self = this;

		fetch(this.props.api)
			.then(function(res){
				return res.json();
			}).then(function(json){
				self.setState({
					comments: json
				})
			});
	}

	componentDidMount() {
		this.loadCommentsFromServer();
		setInterval( this.loadCommentsFromServer, this.props.interval );
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
	var domain  = target.getAttribute('data-domain')
	var post_id = target.getAttribute('data-post-id')
	var interval = target.getAttribute('data-interval')
	var api = domain + '/wp-json/wp/v2/comments?post=' + post_id;
	ReactDOM.render(
		<CommentBox
			api={api}
			interval={interval}/>,
		target
	)
}
