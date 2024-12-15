import { Skeleton } from "primereact/skeleton";
import React from "react";

const UsersSkeleton = () => {
  return (
    <div className="flex flex-column gap-2">
      <div className="flex gap-4">
        <Skeleton width="14rem" height="4rem" borderRadius="16px"></Skeleton>
        <Skeleton width="100%" height="4rem" borderRadius="16px"></Skeleton>
      </div>
      <Skeleton width="100%" height="4rem" borderRadius="16px"></Skeleton>

      <Skeleton width="100%" height="14rem" borderRadius="16px"></Skeleton>
      <Skeleton width="100%" height="4rem" borderRadius="16px"></Skeleton>
    </div>
  );
};

export default UsersSkeleton;
