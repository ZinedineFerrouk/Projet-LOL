import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const EventsSkeleton = () => {

	return <>
        <div style={{ display: 'grid', gap: '8px' }}>
            <Skeleton className="event" baseColor="#212932" highlightColor="#000" width="100%" height="24px" borderRadius="8px" inline="true" />
            <Skeleton className="event" baseColor="#212932" highlightColor="#000" width="100%" height="24px" borderRadius="8px" inline="true" />
            <Skeleton className="event" baseColor="#212932" highlightColor="#000" width="100%" height="24px" borderRadius="8px" inline="true" />
            <Skeleton className="event" baseColor="#212932" highlightColor="#000" width="100%" height="24px" borderRadius="8px" inline="true" />
            <Skeleton className="event" baseColor="#212932" highlightColor="#000" width="100%" height="24px" borderRadius="8px" inline="true" />
        </div>
    </>;
};

export default EventsSkeleton;
