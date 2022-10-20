import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PlayerSkeleton = () => {

    return (
        <div className="player-details loading">
            <div className="avatar">
                <Skeleton className="img" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
            </div>
            <div className="info">
                <h3 className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="150px" /></h3>
                <div className="tags">
                    <Skeleton baseColor="#212932" highlightColor="#000" width="55px" height="26px" inline="true" borderRadius="100px" />
                    <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" inline="true" borderRadius="100px" />
                </div>
            </div>
        </div>
    )
}

export default PlayerSkeleton;
