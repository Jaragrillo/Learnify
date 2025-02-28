import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const Rating = sequelize.define('Rating', {
    id_valoracion: {
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
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id_usuario',
      },
    },
    puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'valoraciones',
    timestamps: false,
  });
  
export default Rating;  