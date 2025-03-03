import React from "react";
import ContentLoader from "react-content-loader";

const EditCourseSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width="100%"
        height={600} // Ajusta la altura según sea necesario
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6"
        {...props}
    >
        {/* Columna izquierda (campos de texto) */}
        <rect x="5%" y="20" rx="4" ry="4" width="30%" height="40" /> {/* Titulo */}
        <rect x="5%" y="70" rx="4" ry="4" width="30%" height="48" /> {/* input Titulo */}

        <rect x="5%" y="130" rx="4" ry="4" width="30%" height="40" /> {/* Descripcion */}
        <rect x="5%" y="180" rx="4" ry="4" width="30%" height="80" /> {/* textarea Descripcion */}

        <rect x="5%" y="270" rx="4" ry="4" width="30%" height="40" /> {/* Categoria */}
        <rect x="5%" y="320" rx="4" ry="4" width="30%" height="48" /> {/* Select Categoria */}

        <rect x="5%" y="380" rx="4" ry="4" width="30%" height="40" /> {/* Precio */}
        <rect x="5%" y="430" rx="4" ry="4" width="30%" height="48" /> {/* Input precio */}

        {/* Columna derecha (imagen y botones) */}
        <rect x="60%" y="20" rx="4" ry="4" width="30%" height="40" /> {/* Portada */}
        <rect x="60%" y="70" rx="4" ry="4" width="30%" height="250" /> {/* Imagen Portada */}

        <rect x="80%" y="500" rx="4" ry="4" width="10%" height="32" /> {/* Boton volver */}
        <rect x="70%" y="500" rx="4" ry="4" width="10%" height="32" /> {/* Boton clases */}
        <rect x="60%" y="500" rx="4" ry="4" width="10%" height="32" /> {/* Boton guardar cambios */}

    </ContentLoader>
);

export default EditCourseSkeleton;