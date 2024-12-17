import React from "react";
import ContentLoader from "react-content-loader";

const ProfileSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width="100%"
        height={800}
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6"
        {...props}
    >
        {/* Título Bienvenido */}
        <rect x="40" y="30" rx="4" ry="4" width="50%" height="40" />

        {/* Imagen de perfil */}
        <circle cx="110" cy="240" r="70" />

        {/* Nombre y correo */}
        <rect x="200" y="200" rx="4" ry="4" width="350" height="20" />
        <rect x="200" y="240" rx="4" ry="4" width="300" height="20" />

        {/* Formulario */}
        {/* Nombre */}
        <rect x="40" y="340" rx="4" ry="4" width="320" height="20" />
        <rect x="40" y="370" rx="4" ry="4" width="575" height="48" />

        {/* Apellidos */}
        <rect x="740" y="340" rx="4" ry="4" width="320" height="20" />
        <rect x="740" y="370" rx="4" ry="4" width="575" height="48" />

        {/* Fecha de nacimiento */}
        <rect x="40" y="450" rx="4" ry="4" width="320" height="20" />
        <rect x="40" y="480" rx="4" ry="4" width="575" height="48" />

        {/* Correo */}
        <rect x="740" y="450" rx="4" ry="4" width="320" height="20" />
        <rect x="740" y="480" rx="4" ry="4" width="575" height="48" />

        {/* Cursos creados */}
        <rect x="40" y="550" rx="4" ry="4" width="320" height="20" />
        <rect x="40" y="580" rx="4" ry="4" width="575" height="48" />
        <rect x="40" y="640" rx="4" ry="4" width="200" height="20" />

        {/* Cursos comprados */}
        <rect x="740" y="550" rx="4" ry="4" width="320" height="20" />
        <rect x="740" y="580" rx="4" ry="4" width="575" height="48" />
        <rect x="740" y="640" rx="4" ry="4" width="200" height="20" />

        {/* Botones Editar perfil y Cerrar sesión */}
        <rect x="40" y="730" rx="4" ry="4" width="200" height="32" />
        <rect x="40" y="690" rx="4" ry="4" width="200" height="32" />
    </ContentLoader>
);

export default ProfileSkeleton;