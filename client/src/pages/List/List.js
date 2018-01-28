import React, { Component } from "react";
import API from "./../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import ResultsArea from "../../components/ResultsArea";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import Comment from "../../components/Comment";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Detail extends Component {

	state = {
		listId: "",
		name: "",
		comment: "",
		items: [],
		purchasedItems:[],
		userName:"",
		occasion: "",
		notes:[],

	};


componentDidMount() {
	this.getUrl();
}

getUrl= ()=>{
	let url = window.location.pathname.split("/");
	const listId= url[2];
	this.setState({listId: listId}, function () {
		console.log(this.state.listId);
		this.loadList();
		this.loadNotes();
	});
	console.log(listId)

}

loadList = () =>{
	let id = this.state.listId;
	API.getList(id)

		.then(res =>
			  //console.log("HI",res)
			  this.setState({ items:res.data })
			 )
		.catch(err => console.log(err));
}


loadNotes = () => {
	let listId = this.state.listId;
	API.getNotes({id:listId})
		.then(res =>
			  this.setState({ notes: res.data, name: " ", comment: " "})
			 )
		.catch(err => console.log(err));
};

handleInputChange = event => {
	const value = event.target.value;
	const name = event.target.name;
	this.setState({
		[name]: value
	});
};

saveNote = event => {
	event.preventDefault();
	//	let time = this.getDate();
	//	console.log(new Date().toLocaleString())
	if (this.state.name && this.state.comment) {
		API.addNote({
			userName: this.state.name,
			body: this.state.comment,
			time: new Date().toLocaleString(),
			ListId:this.state.listId
		})
			.then(res => this.loadNotes())
			.catch(err => console.log(err));
		this.setState({name: "", comment: ""})
	}
};

addItem = (title,img,link,itemId) => {
	this.setState({purchasedItems:this.state.purchasedItems.concat({title:title,img:img,link:link,itemId:itemId})})
	const items = this.state.items.filter(item => item.itemId !== itemId )

	this.setState({items:items })

};

removeItem = (title,img,link,itemId) =>{
	this.setState({items:this.state.items.concat({title:title,img:img,link:link,itemId:itemId})})
	const purchasedItems = this.state.purchasedItems.filter(item => item.itemId !== itemId )

	this.setState({purchasedItems:purchasedItems })
};


render() {
	return(
		<div className="dashboard">
			<Row>
				<Col size="md-2" ></Col>
				<Col size="md-8" >
					<Container fluid>

						<h1>User's List</h1>
						<br />


						<Row>
							<Col size="md-6">
								<ResultsArea class="listItems" >
									<h3>Items On The List</h3>
									<List>
										{this.state.items.map(item => (
											<ListItem key={item.itemId}
												link={item.link} title ={`${item.title.substring(0, 40)}...`} img= {item.img !== undefined ? item.img : "http://scotsbilliards.com/_imgstore/3/1349753/thumbnail/HkfGVAe_Rx52sMddVciACv4kR7Y.png" }>
												<AddBtn onClick={() => this.addItem(item.title,item.img,item.link,item.itemId)} />
											</ListItem>
										))}
									</List>
								</ResultsArea>
							</Col>

							<Col size="md-6">

								{this.state.purchasedItems.length ? (
									<ResultsArea class="listItems" >
										<h3>Purchased Items</h3>
										<List>
											{this.state.purchasedItems.map(item => (
												<ListItem key={item.itemId}

													link={item.link} title ={`${item.title.substring(0, 40)}...`} class="crossed" img= {item.img !== undefined ? item.img : "http://scotsbilliards.com/_imgstore/3/1349753/thumbnail/HkfGVAe_Rx52sMddVciACv4kR7Y.png" }>

													<del><DeleteBtn onClick={() => this.removeItem(item.title,item.img,item.link,item.itemId)} /></del>
												</ListItem>
											))}
										</List>

										<FormBtn onClick={this.saveList}>Save Changes</FormBtn>
									</ResultsArea>
								) : (

									<ResultsArea class="listItems" >
										<h3>Purchased Items</h3>
									</ResultsArea>
								)}

							</Col>
						</Row>

						<Row>
							<Col size="md-12">
								<br />
								<hr />

							</Col>
						</Row>
						<Row>
							<Col size="md-3">

							</Col>
							<Col size="md-6">
								<h3>Leave A Comment...</h3>

								<Input value={this.state.name} name="name" placeholder="Name" onChange={this.handleInputChange} />
								<TextArea value={this.state.comment} name="comment" placeholder="Add a Comment..." onChange={this.handleInputChange} />
								<FormBtn style={{backgroundColor: "#eb6864"}} onClick={this.saveNote}> Submit </FormBtn>
								{this.state.notes.map(note =>(
									<Comment key={note.id} author= {note.userName} body={note.body} date={note.time} />
								))}


							</Col>

						</Row>
						<Row>
							<Col size="md-12">
								<br />
								<hr />

							</Col>
						</Row>

					</Container>
				</Col>

			</Row>
		</div>
	)
}
}
export default Detail;
