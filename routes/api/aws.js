const router = require("express").Router();
const {OperationHelper} = require('apac');


const opHelper = new OperationHelper({
	awsId:     process.env.awsId,
	awsSecret: process.env.awsSecret,
	assocId:   process.env.assocId
});


router.get("/", (req,res) => {

	let term = req.query.term;
	
	opHelper.execute('ItemSearch', {
	'SearchIndex': 'All',
	'Keywords': term,
	'ResponseGroup': 'ItemAttributes,Images'
}).then((response) => {

		res.send(response.result);
}).catch((err) => {
	console.error("Something went wrong! ", err);
});

		
});



module.exports = router;
