'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

class CommentBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			aaa
			</div>
		);
	}
}


var target = document.getElementById('amimoto-ninja-comment-list');
if ( target != null ) {
	var domain  = target.getAttribute('data-domain')
	var post_id = target.getAttribute('data-post-id')
	var interval = target.getAttribute('data-interval')
	ReactDOM.render(
		<CommentBox
			post_id={post_id}
			domain={domain}
			interval={interval}/>,
		target
	)
}
