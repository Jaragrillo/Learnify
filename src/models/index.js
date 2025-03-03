// models/index.js (define las relaciones aquí)
import User from './User.js';
import Role from './Role.js';
import Course from './Course.js';
import CourseContent from './CourseContent.js';
import Rating from './Rating.js';
import Comment from './Comment.js';
import Category from './Category.js';

// Relación entre modelos
User.belongsTo(Role, { foreignKey: 'id_rol', as: 'rol' });
Role.hasMany(User, { foreignKey: 'id_rol' });
User.hasMany(Course, { as: 'cursos', foreignKey: 'id_autor' });
Course.belongsTo(User, { as: 'autor', foreignKey: 'id_autor' });
Course.hasMany(CourseContent, { as: 'clases', foreignKey: 'id_curso' });
CourseContent.belongsTo(Course, { foreignKey: 'id_curso' });
Course.hasMany(Rating, { foreignKey: 'id_curso', as: 'valoraciones' });
Rating.belongsTo(Course, { foreignKey: 'id_curso' });
Course.hasMany(Comment, { foreignKey: 'id_curso', as: 'comentarios' });
Comment.belongsTo(Course, { foreignKey: 'id_curso' });
User.hasMany(Comment, { foreignKey: 'id_usuario', as: 'comentarios' });
Comment.belongsTo(User, { foreignKey: 'id_usuario', as: 'usuario' });
Course.belongsTo(Category, { foreignKey: 'id_categoria', as: 'categoria' });
Category.hasMany(Course, { foreignKey: 'id_categoria', as: 'cursos' });

export { User, Role, Course, CourseContent, Rating, Comment, Category };
