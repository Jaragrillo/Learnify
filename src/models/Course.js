import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';
import User from './User.js';
import CourseContent from './CourseContent.js';

const Course = sequelize.define('Course', {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_portada: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estudiantes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    id_autor: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id_usuario',
      },
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categorias',
        key: 'id_categoria',
      },
    },
  }, {
    tableName: 'cursos',
    timestamps: false,
  });

  Course.belongsTo(User, { as: 'autor', foreignKey: 'id_autor' });
  Course.hasMany(CourseContent, { as: 'clases', foreignKey: 'id_curso' });

  
export default Course;  