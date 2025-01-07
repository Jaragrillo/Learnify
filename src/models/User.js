import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';
import Role from './Role.js'

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
        model: 'Roles',
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

// Definición de las relaciones
User.belongsTo(Role, { foreignKey: 'id_rol', as: 'rol' });
Role.hasMany(User, { foreignKey: 'id_rol' });
  
export default User;