import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MapSkeleton = () => {
	return (
        <div>
            <Skeleton className="event" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="8px" />
        </div>
    );
};

export default MapSkeleton;
