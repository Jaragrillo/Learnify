// models/index.js (define las relaciones aquí)
import User from './User.js';
import Role from './Role.js';
import Course from './Course.js';
import CourseContent from './CourseContent.js';
import Rating from './Rating.js';

// Relación entre modelos
User.belongsTo(Role, { foreignKey: 'id_rol', as: 'rol' });
Role.hasMany(User, { foreignKey: 'id_rol' });
User.hasMany(Course, { as: 'cursos', foreignKey: 'id_autor' });
Course.belongsTo(User, { as: 'autor', foreignKey: 'id_autor' });
Course.hasMany(CourseContent, { as: 'clases', foreignKey: 'id_curso' });
CourseContent.belongsTo(Course, { foreignKey: 'id_curso' });
Course.hasMany(Rating, { foreignKey: 'id_curso', as: 'valoraciones' });
Rating.belongsTo(Course, { foreignKey: 'id_curso' });



export { User, Role, Course, CourseContent, Rating };
