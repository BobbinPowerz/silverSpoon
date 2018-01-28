module.exports = function(sequelize, DataTypes) {
	const User = sequelize.define("User", {
		name:DataTypes.STRING,
		createdAt:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		updatedAt:{
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
	});

	// Associating User with Lists
	// When a User is deleted, also delete any associated List

	User.associate = models => {
		User.hasMany(models.List,
					 {as:"userLists"},
					 {onDelete:"cascade"
					 })
	};

	return User;
};