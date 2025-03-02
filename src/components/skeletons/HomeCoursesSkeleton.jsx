import React from "react";
import ContentLoader from "react-content-loader";

const TopRatedCoursesSkeleton = () => {
  const skeletonArray = Array(4).fill(0); // Generar 2 placeholders

  return (
    <div className="flex justify-between gap-4 px-4 py-6">
      {skeletonArray.map((_, index) => (
        <div
          key={index}
          className="w-[328px] h-[384px] bg-gray-200 overflow-hidden"
        >
          <ContentLoader
            speed={2}
            width="328"
            height="384"
            viewBox="0 0 328 384"
            backgroundColor="#ededed"
            foregroundColor="#d6d6d6"
          >
            {/* Placeholder completo */}
            <rect x="0" y="0" width="328" height="384" />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
};

export default TopRatedCoursesSkeleton;
