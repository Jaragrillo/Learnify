import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

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
        model: 'Usuarios',
        key: 'id_usuario',
      },
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categorias',
        key: 'id_categoria',
      },
    },
  }, {
    tableName: 'cursos',
    timestamps: false,
  });
  
export default Course;  