import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const Category = sequelize.define('Category', {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'categorias',
    timestamps: false,
  });
  
export default Category;