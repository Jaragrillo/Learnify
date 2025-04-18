import React from "react";
import ContentLoader from "react-content-loader";

const CourseClassesSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width="100%"
        height={900} 
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6"
        {...props}
    >
        {/* Título de la página */}
        <rect x="40" y="30" rx="4" ry="4" width="40%" height="40" />

        {/* Descripción de la página */}
        <rect x="40" y="90" rx="4" ry="4" width="80%" height="20" />
        <rect x="40" y="120" rx="4" ry="4" width="70%" height="20" />

        {/* Clases del curso */}
        <rect x="40" y="200" rx="4" ry="4" width="20%" height="20" />
        <rect x="100" y="250" rx="4" ry="4" width="320" height="180" />
        <rect x="100" y="450" rx="4" ry="4" width="320" height="180" />
        <rect x="100" y="650" rx="4" ry="4" width="320" height="180" />

    </ContentLoader>
);

export default CourseClassesSkeleton;