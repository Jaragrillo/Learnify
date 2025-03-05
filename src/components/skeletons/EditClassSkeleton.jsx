import React from "react";
import ContentLoader from "react-content-loader";

const EditClassSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width="100%"
        height={630} 
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6"
        {...props}
    >
        {/* Columna izquierda (campos de texto) */}
        <rect x="5" y="5" rx="4" ry="4" width="10%" height="40" /> {/* Titulo */}
        <rect x="5" y="55" rx="4" ry="4" width="40%" height="48" /> {/* input Titulo */}

        <rect x="5" y="155" rx="4" ry="4" width="10%" height="40" /> {/* Descripcion */}
        <rect x="5" y="205" rx="4" ry="4" width="40%" height="80" /> {/* textarea Descripcion */}

        {/* Columna derecha (imagen y botones) */}
        <rect x="50%" y="5" rx="4" ry="4" width="10%" height="40" /> {/* Portada */}
        <rect x="50%" y="55" rx="4" ry="4" width="50%" height="320" /> {/* Imagen Portada */}

        <rect x="90%" y="500" rx="4" ry="4" width="10%" height="40" /> {/* Boton clases */}
        <rect x="80%" y="550" rx="4" ry="4" width="20%" height="40" /> {/* Boton guardar cambios */}

    </ContentLoader>
);

export default EditClassSkeleton;