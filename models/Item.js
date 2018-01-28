module.exports = function(sequelize, DataTypes) {
	const Item = sequelize.define("Item", {
		title:DataTypes.STRING,
		img:DataTypes.STRING,
		link: DataTypes.STRING,
		itemId:DataTypes.STRING
	});
	return Item;
};