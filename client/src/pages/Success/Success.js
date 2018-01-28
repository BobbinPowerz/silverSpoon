import React, { Component } from "react";
import "./Success.css";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { FacebookButton, TwitterTweetButton, TumblrPostButton } from 'react-social-sharebuttons';
import { Input} from "../../components/Form";

class Success  extends Component  {
	//		this.props.history.push(`/users/${id}`);

	state = {
		url: ""
	}

	componentDidMount(){
		this.getUrl()
	}
getUrl(){
	let url = window.location.search.split("=");
	const location = window.location.hostname + `/users/${url[1]}`;

	this.setState({url:location})
	console.log( this.state.url)
}

render() {

	return (
		<Container fluid>
			<Row>
				<Col size="md-12">
					<Jumbotron>
						<h1>You Have Successfully Created A List</h1>
						<h3>

						</h3>
					</Jumbotron>
				</Col>
			</Row>

			<Row>
				<Col size="md-3"></Col>
				<Col size="md-6">
					<h3>Share Your List With Your Friends!!!</h3>

					<Input name="url" value={this.state.url} />
					<div className="social" >
						<FacebookButton url={this.state.url} share={true} layout={"button"} />
					</div>
					<div className="social" >
						<TwitterTweetButton url={this.state.url} text={"I would like to share my wish list with you!!!"} />
					</div>

					<div className="social" > 
						<TumblrPostButton notes={"I would like to share my wish list with you!!!"} color={"blue"} />
					</div>
				</Col>
			</Row>


		</Container>
	);
}}
export default Success;
