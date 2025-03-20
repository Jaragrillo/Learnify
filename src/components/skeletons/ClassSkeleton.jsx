import React from "react";
import ContentLoader from "react-content-loader";

const ClassSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width="100%"
        height={700} 
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6"
        {...props}
    >
        {/* Título de la clase */}
        <rect x="40" y="30" rx="4" ry="4" width="60%" height="40" />

        {/* Descripción de la clase */}
        <rect x="40" y="90" rx="4" ry="4" width="80%" height="20" />
        <rect x="40" y="120" rx="4" ry="4" width="70%" height="20" />
        <rect x="40" y="150" rx="4" ry="4" width="20%" height="20" />

        {/* Video de la clase */}
        <rect x="40" y="250" rx="4" ry="4" width="90%" height="400" />
    </ContentLoader>
);

export default ClassSkeleton;