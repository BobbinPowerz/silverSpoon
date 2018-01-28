import axios from "axios";
const apiURL = window.location.origin + '/api';
export default {
	//Get Items from Amazon API

	getItems: function(term){
		
		return axios.get(apiURL+ "/aws?term=" + term.term)
	},
	
	findUser: function(name){
		console.log(name, "hi");
		return axios.get(apiURL+ "/db/users?userName=" + name);
	},
	
	getList: function(id){
		console.log("HI",id);
		return axios.get(apiURL+ "/db/list/" + id);
	},
	
	browse: function(){
		console.log("HI");
		return axios.get(apiURL+ "/db/lists");
	},
	
	saveItems: function(itemsData) {
		console.log(itemsData);

		return axios.post(apiURL+ "/db/list", itemsData);
	},
	
		
	getNotes: (data) => {
		console.log(data);
		return axios.get(apiURL+ "/db/notes?id=" + data.id);
	},
		
	addNote: function(note) {
		console.log(note);

		return axios.post(apiURL+ "/db/note", note);
	},
	
	
	
	
	
};
