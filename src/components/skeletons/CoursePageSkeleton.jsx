import React from "react";
import ContentLoader from "react-content-loader";

const CoursePageSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width="100%"
        height={1700} 
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6"
        {...props}
    >
        {/* Título del curso */}
        <rect x="40" y="30" rx="4" ry="4" width="60%" height="40" />

        {/* Descripción del curso */}
        <rect x="40" y="90" rx="4" ry="4" width="80%" height="20" />
        <rect x="40" y="120" rx="4" ry="4" width="70%" height="20" />

        {/* Información del curso (Valoración, Estudiantes, Categoría, Precio) */}
        <rect x="40" y="200" rx="4" ry="4" width="25%" height="40" />
        <rect x="40" y="260" rx="4" ry="4" width="265" height="315" />
        <rect x="440" y="260" rx="4" ry="4" width="265" height="315" />
        <rect x="800" y="260" rx="4" ry="4" width="265" height="315" />
        <rect x="1200" y="260" rx="4" ry="4" width="265" height="315" />

        {/* Creador del curso */}
        <rect x="40" y="650" rx="4" ry="4" width="30%" height="30" />
        <circle cx="400" cy="900" r="125" />
        <rect x="600" y="850" rx="4" ry="4" width="40%" height="30" />
        <rect x="600" y="900" rx="4" ry="4" width="30%" height="20" />
        <rect x="600" y="930" rx="4" ry="4" width="25%" height="20" />

        {/* Clases del curso (Carrusel) */}
        <rect x="40" y="1100" rx="4" ry="4" width="30%" height="30" />
        <rect x="40" y="1200" rx="4" ry="4" width="320" height="385" />
        <rect x="380" y="1200" rx="4" ry="4" width="320" height="385" />
        <rect x="720" y="1200" rx="4" ry="4" width="320" height="385" />
        <rect x="1060" y="1200" rx="4" ry="4" width="320" height="385" />

    </ContentLoader>
);

export default CoursePageSkeleton;