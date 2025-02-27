import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const User = sequelize.define('User', {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id_rol',
      },
      defaultValue: 2, // Establece por defecto el rol de Usuario común
    },
    foto_perfil: {
      type: DataTypes.STRING, 
      allowNull: true,        
      defaultValue: null,    
    },
    biografia: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    tableName: 'usuarios',
    timestamps: false,
});
  
export default User;