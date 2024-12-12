import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const Role = sequelize.define('Role', {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'roles',
    timestamps: false,
  });
  
export default Role;