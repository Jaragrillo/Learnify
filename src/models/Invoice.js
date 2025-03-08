import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db.js';

const Invoice = sequelize.define('Invoice', {
    id_factura: {
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
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha_factura: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
          model: 'usuarios',
          key: 'id_usuario',
      },
    }
  }, {
    tableName: 'facturas',
    timestamps: false,
  });
  
export default Invoice;  