import React from "react";
import ContentLoader from "react-content-loader";

const EditCourseSkeleton = (props) => (
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

        <rect x="5" y="305" rx="4" ry="4" width="10%" height="40" /> {/* Categoria */}
        <rect x="5" y="355" rx="4" ry="4" width="40%" height="48" /> {/* Select Categoria */}

        <rect x="5" y="455" rx="4" ry="4" width="10%" height="40" /> {/* Precio */}
        <rect x="5" y="505" rx="4" ry="4" width="40%" height="48" /> {/* Input precio */}

        {/* Columna derecha (imagen y botones) */}
        <rect x="50%" y="5" rx="4" ry="4" width="10%" height="40" /> {/* Portada */}
        <rect x="50%" y="55" rx="4" ry="4" width="50%" height="320" /> {/* Imagen Portada */}

        <rect x="90%" y="450" rx="4" ry="4" width="10%" height="40" /> {/* Boton volver */}
        <rect x="90%" y="500" rx="4" ry="4" width="10%" height="40" /> {/* Boton clases */}
        <rect x="80%" y="550" rx="4" ry="4" width="20%" height="40" /> {/* Boton guardar cambios */}

    </ContentLoader>
);

export default EditCourseSkeleton;