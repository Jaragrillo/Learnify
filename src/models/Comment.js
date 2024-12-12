import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const Comment = sequelize.define('Comment', {
    id_comentario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_curso: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cursos',
        key: 'id_curso',
      },
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'id_usuario',
      },
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_comentario: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'comentarios',
    timestamps: false,
  });
  
export default Comment;  