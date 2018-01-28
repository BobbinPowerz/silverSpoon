import React, { Component } from "react";
import "./Home.css";
import API from "./../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import {Link } from 'react-router-dom';
import logo from "./logoFinal.png";
class  Home extends Component{

	state = {
		name:"",

	};

handleInputChange = event => {
	const value = event.target.value;
	const name = event.target.name;
	this.setState({
		[name]: value
	});
};

handleSubmit = () =>{
	let name = this.state.name.toLowerCase();
	console.log(name);
	API.findUser(name)
		.then(res =>
			  {
		console.log(res.data);
		const id = res.data
		this.props.history.push("/users/" + id);
	})
		.catch(err => console.log(err));
};

browseAll = () =>{
	console.log("here37")

	API.browse()
			.then(data =>
				  {
				console.log(data)
		})
			.catch(err => console.log(err));
}


render(){ 
	return(

		<div className="home">
			<Container fluid>
				<Row>
					<Col size="md-12">
						<div style={{height: "55vh"}}>

					<img className="logo" src={logo} alt={logo} />
						</div>
					</Col>
				</Row>
				<Row>
				<Col size= "md-12"> 
				
				
				</Col>
				
					<Col size="md-4"></Col>
					<Col size="md-2">

						<Link className="btn homeBtn" to="/Dashboard" role="button">Create Your Wish List</Link>

					</Col>

					<Col size="md-2">

						<Link className="btn  homeBtn" to="#" role="button" onClick= {() => this.browseAll()}>Browse Existing Lists </Link>

					</Col>
				</Row>
				<Row>
					<Col size="md-12"><br /></Col>
				</Row>
				<Row>
					<Col size="md-4">
						<br />

					</Col>

					<Col size="md-4">

						<div className="input-group">
							<input name="name" className="form-control" placeholder="Find List By Name" onChange={this.handleInputChange} />
							<span className="input-group-btn">
								<button className="btn homeBtn" type="submit" onClick={() => this.handleSubmit()} >Go!</button>
							</span>
						</div>

					</Col>
				</Row>
			</Container>
		</div>
	)}
}
export default Home;
