import { sequelize, testConnection } from '../src/lib/db.js';

(async () => {
  try {
    await testConnection();
    console.log('Base de datos lista para usarse');
  } catch (error) {
    console.error('Error durante la inicialización:', error);
    if (error.message.includes('Please install pg package manually')) {
      console.error('Parece que hay un problema con el paquete pg.');
    }
  }
})();

// Cierra la conexión de Sequelize
// sequelize.close().then(() => {
//     console.log('Conexión a la base de datos cerrada correctamente');
// }).catch((err) => {
//     console.error('Error al cerrar la conexión:', err);
// });