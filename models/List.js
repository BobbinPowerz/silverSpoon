module.exports = function(sequelize, DataTypes) {
	const List = sequelize.define("List", {
		title:{
			type:DataTypes.STRING,
			allowNull: false,
			defaultValue:"Special Occasion"
		},
		occasion:{
			type:DataTypes.STRING,
			allowNull: false,
			defaultValue:"Special Occasion"
		},
		description:{type:DataTypes.STRING,
					defaultValue:null
					},
		items:DataTypes.STRING
		
	});
	
	List.associate = models => {
		List.hasMany(models.Item, {as:"listItems"})
	};
		
		return List;
	};
	
