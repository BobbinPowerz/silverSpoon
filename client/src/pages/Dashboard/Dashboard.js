import React, { Component } from "react";
import "./Dashboard.css";
import { withRouter} from 'react-router-dom'; 	
import API from "./../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Col, Row, Container } from "../../components/Grid";
import ItemCard from "../../components/ItemCard";
import ResultsArea from "../../components/ResultsArea";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
var style = {
     marginTop:5, backgroundColor: "#eb6864"
    };
class Dashboard extends Component {

	state = {
		term: "",
		title: "",
		occasion: "",
		description: "",
		isLoading: false,
		items:[],
		listItems:[],
		listItemsIds:[],
		msg:""
	};


componentDidMount(){
	console.log(this.props.history)
}

loadList = () =>{
	//	API.getItems()
	//
	//		.then(res =>
	//			  this.setState({ savedArticles: res.data, term: "", startDate: "", endDate: "" })
	//			 )
	//		.catch(err => console.log(err));
}

handleInputChange = event => {
	const value = event.target.value;
	const name = event.target.name;
	this.setState({
		[name]: value
	});
};


//Fetching related items from amazone API
handleSubmit = event => {

	event.preventDefault();

	if (this.state.term){

		this.setState({msg:""})

		this.setState({isLoading: true})
		let obj = {
			term: this.state.term
		}
		API.getItems(obj)
			.then(data=> {
			console.log('data', data);

			if (data.data.ItemSearchResponse.Items.Item){
				this.setState({
					items: data.data.ItemSearchResponse.Items.Item,
					isLoading: false,
					moreResultsUrl:data.data.ItemSearchResponse.Items.MoreSearchResultsUrl
				})
			}else{
				this.setState({msg:"Please insert item name or description to look for!!",isLoading:false })
			}
		})
			.catch(err => {
			console.error(err)
			this.setState({
				isLoading: false
			})
		})
	}else{
		this.setState({msg:"Please insert item name or description to look for!!"})
	}


};


//Function to add items to the list 
addItem= (title,img,link,itemId) => {
	this.setState({listItems:this.state.listItems.concat({title:title,img:img,link:link,itemId:itemId}), listItemsIds:this.state.listItemsIds.concat(itemId) } )
}


//Function to remove items from the list 
removeItem = (id) =>{
	const items = this.state.listItems.filter(item => item.itemId !== id )
	const itemsIds = this.state.listItemsIds.filter(itemId => itemId !== id )

	this.setState({listItems:items, listItemsIds:itemsIds })
}


//Function to save all list items

saveList = () =>{
	let listObj = {
		items:this.state.listItems,
		itemsIds:this.state.listItemsIds.join(","),
		title:this.state.title,
		occasion:this.state.occasion,
		description:this.state.description,
		userId:"1"
	}

	API.saveItems(listObj)
		.then(res => 
			  {	
		console.log(res.data.id, "=====116")

		const id = res.data.id;


		this.props.history.push("/success?id=" + id);
	}
			 )
		.catch(err => console.log(err));
}


render (){
	return (
		<div className="dashboard">
			<Row>
				<Col size="md-2" ></Col>
				<Col size="md-8" >
					<Container fluid> 

						<h1>Create New List</h1>
						<br />
						<Row>

							<Col size="md-6">
								<Input name="title" placeholder="List Title (required)" onChange={this.handleInputChange} />
								<Input name="occasion" placeholder="Occasion (required)" onChange={this.handleInputChange} />
							</Col>
							<Col size="md-6">
								<TextArea name="description" placeholder="Description (Optional)" onChange={this.handleInputChange} />
							</Col>
							<Col size="md-6">
								<div className="input-group">
									<Input name="term" placeholder="Search Amazon" onChange={this.handleInputChange} />

									{this.state.isLoading ? 'Loading...' :
										<span className="input-group-btn">
										<FormBtn
											disabled={!(this.state.title && this.state.occasion)}
											onClick={this.handleSubmit}
											> Find Items
										</FormBtn>
									</span>
									}
								</div>


								<h6> {this.state.msg} </h6>
							</Col>
						</Row>
						<br /> 
						<Row>
							<Col size="md-6">
							{this.state.items.length ? (
								<ResultsArea class="searchResults" >
								<h3 style={{width: "100%"}}>Search Results</h3>
									{this.state.items.map( item =>(
										<ItemCard 
											link={item.DetailPageURL}
											img= { item.MediumImage !== undefined ? item.MediumImage.URL: "http://scotsbilliards.com/_imgstore/3/1349753/thumbnail/HkfGVAe_Rx52sMddVciACv4kR7Y.png"}
											title ={`${item.ItemAttributes.Title.substring(0, 50)}...`}
											id= {item.ASIN}
											functionality="Add To List"
											handleClick = {this.addItem}
											key={item.ASIN}
											/>
									))}

								</ResultsArea>
									) : (
									null

								)}
							</Col>
							<Col size="md-6">

								{this.state.listItems.length ? (
									<ResultsArea class="listItems" >
										<h3>Items Added To Your List</h3>
										<List>
											{this.state.listItems.map(item => (
												<ListItem key={item.itemId}
													link={item.link} title ={`${item.title.substring(0, 40)}...`} img= {item.img !== undefined ? item.img : "http://scotsbilliards.com/_imgstore/3/1349753/thumbnail/HkfGVAe_Rx52sMddVciACv4kR7Y.png" }>
													<DeleteBtn onClick={() => this.removeItem(item.itemId)} />
												</ListItem>
											))}
										</List>
										<FormBtn style={style} onClick={this.saveList}>Save List</FormBtn>
									</ResultsArea>
								) : (
									null

								)}


							</Col>
						</Row>

					</Container>
				</Col>

			</Row>
		</div>
	)
}


}

export default withRouter(Dashboard);

