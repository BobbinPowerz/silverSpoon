import React from "react";

export const ListItem = props =>
<li className="list-group-item">
	<img src={props.img} alt={props.title}/>
	<a href={props.link} target="_blank">
		<strong className="title">
			{props.title}
		</strong>
	
	</a>
	{props.children}
</li>;
