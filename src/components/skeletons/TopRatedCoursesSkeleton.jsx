import React from "react";
import ContentLoader from "react-content-loader";

const TopRatedCoursesSkeleton = () => {
  const skeletonArray = Array(3).fill(0); // Generar 3 placeholders

  return (
    <div className="flex justify-between gap-4">
      {skeletonArray.map((_, index) => (
        <div
          key={index}
          className="w-[720px] h-[376px] bg-gray-200 overflow-hidden"
        >
          <ContentLoader
            speed={2}
            width="720"
            height="376"
            viewBox="0 0 720 376"
            backgroundColor="#ededed"
            foregroundColor="#d6d6d6"
          >
            {/* Placeholder completo */}
            <rect x="0" y="0" width="720" height="376" />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
};

export default TopRatedCoursesSkeleton;
