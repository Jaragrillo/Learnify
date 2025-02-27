import React from "react";
import ContentLoader from "react-content-loader";

const CoursesSkeleton = () => {
  const skeletonArray = Array(6).fill(0); // Generar 6 placeholders (3 columnas x 2 filas)

  return (
    <div className="flex flex-wrap justify-between gap-6">
      {skeletonArray.map((_, index) => (
        <div
          key={index}
          className="w-[400px] h-[392px] bg-gray-200 overflow-hidden"
        >
          <ContentLoader
            speed={2}
            width="100%"
            height="100%"
            viewBox="0 0 400 392"
            backgroundColor="#ededed"
            foregroundColor="#d6d6d6"
          >
            {/* Placeholder completo */}
            <rect x="0" y="0" width="100%" height="100%" />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
};

export default CoursesSkeleton;
