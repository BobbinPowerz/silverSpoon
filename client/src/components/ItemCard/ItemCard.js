import React from "react";
import "./ItemCard.css";

const ItemCard = props => 

<div className={"card " + props.class}  id= {props.id}>
	<img className="card-img-top cardImg" src={props.img} alt={props.title} ></img>
	<div className="card-block">
	<a href={props.link} target="_blank">	<h4 className="card-title">{props.title}</h4></a>
		<button className="btn add" onClick={() => props.handleClick(props.title, props.img, props.link, props.id)} > {props.functionality}</button>
	</div>
</div>

export default ItemCard;

