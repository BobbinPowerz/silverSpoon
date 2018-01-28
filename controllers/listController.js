const db = require("../models");

// Defining methods for the booksController
module.exports = {

	findUser: (req, res) =>{
		let name = req.query.userName;
		console.log("===============",name);
		db.User.findOne({
			where: {name: name}
		})
			.then(user => {
			console.log(user.dataValues.id);
			let userId= user.dataValues.id;

			db.List.findOne({
				where: {UserId: userId}
			})		
				.then(list => {
				console.log("hello====22")
				console.log(list.dataValues.id)
				let listId = list.dataValues.id;
				res.send(String(listId));
			})
		})
	},

	browseLists: (req, res) =>{
		db.List.findAll({ limit: 3 })
			.then(lists => {

			let listsArray = []
			for( let j = 0; j < lists.length; j++){
//				console.log("outerloop=====")
				xlist = lists[j];
				listsArray.push(function(xlist){
					console.log("innerloop====")
					let listIds = list[j].items.split(",");
					var promises = [];
					for (let i = 0; i < listIds.length; i++){
						promises.push(getAllStuff(listIds[i]));
					}
					Promise.all(promises)
						.then(function(data) {

						resolve(data);

					})
						.catch(function(err) {
						console.log(err);
					})

				})

			}
			Promise.all(listsArray)
				.then(array =>{
				res.send(array)
			})


		})
			.catch(err => res.status(422).json(err));


	},


	findAllNotes: (req, res) =>{
		console.log(req.query.id)
		db.Note.findAll({
			where: {
				ListId: req.query.id
			}
		})
			.then(function(dbList) {
			res.json(dbList);
		})
			.catch(err => res.status(422).json(err));
	},

	findById: function(req, res){

		db.List.findById(req.params.id)
			.then(list => {
			console.log("hello====22")
			console.log(list.items)

			let listIds = list.items.split(",");
			var promises = [];
			for (let i = 0; i < listIds.length; i++){
				promises.push(getAllStuff(listIds[i]));
			}
			Promise.all(promises)
				.then(function(data) {
				res.send(data);
			})
				.catch(function(err) {
				console.log(err);
			});

		})

	},

	create: function(req, res) {
		db.Item
			.bulkCreate(req.body.items)
			.then(itemData => {
			console.log("good")
			console.log(req.body)
			console.log("good")

			db.List.create({
				title: req.body.title,
				occasion: req.body.occasion,
				description: req.body.description,
				items: req.body.itemsIds,
				UserId: req.body.userId
			})
				.then(function(dbItem) {
				console.log("good====63")
				res.json(dbItem);
			})
				.catch(err => res.status(422).json(err));
		})
			.catch(err => {res.status(422).json(err)
			console.log(err)
						  })

	},

	// POST route for saving a new Comment

	createNote: (req, res) =>{
		console.log(req.body,"======73");
		db.Note.create(req.body)
			.then(dbNote =>{
			console.log(dbNote,"======75")
			res.json(dbNote)
		})
			.catch(err => res.status(422).json(err));
	},

};


//function makeObject(list) {
//	return new Promise(resolve => {
//		
//		console.log("innerloop====")
//		let listIds = list[j].items.split(",");
//		var promises = [];
//		for (let i = 0; i < listIds.length; i++){
//			promises.push(getAllStuff(listIds[i]));
//		}
//		Promise.all(promises)
//			.then(function(data) {
//			
//			resolve(data);
//
//		})
//			.catch(function(err) {
//			console.log(err);
//		})
//	})
//
//};



function getAllStuff(id) {
	return new Promise(resolve => {
		db.Item.findOne({
			where: {itemId: id}
		}).then(item => {
			resolve(item);
		});
	})
};





