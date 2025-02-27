import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const CourseContent = sequelize.define('CourseContent', {
    id_clase: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_curso: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cursos',
        key: 'id_curso',
      },
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_video: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'contenido_curso',
    timestamps: false,
  });
  
export default CourseContent;