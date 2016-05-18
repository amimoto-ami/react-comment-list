'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

class CommentList extends React.Component {

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
	ReactDOM.render(
		<CommentList post_id={post_id} domain={domain}/>,
		target
	)
}
