module.exports = function(sequelize, DataTypes) {
	const Note = sequelize.define("Note", {
		userName:DataTypes.STRING,
		body:DataTypes.TEXT,
		time:{
			type:DataTypes.STRING
		}
	});

		Note.associate = models =>{
			Note.belongsTo(models.List, {
				foreignKey:{
					allowNull:false
				}
			});
		};
	return Note;
};