import React from "react";
import "./Comment.css";


const Comment = props =>
	<div>
		<h3>{props.author}</h3>
		<h5>{props.body}</h5>
		<p style={{float: "right"}}>Created At: {props.date}</p>
		<br />
		<hr />

	</div>

export default Comment;