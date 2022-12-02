import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PlayersSkeleton = () => {
    
    return <>
        <li className="result loading">
            <div className="player-icon">
                <Skeleton className="img" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
            </div>
            <div className="player-content">
                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="24px" borderRadius="100px" />
                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="80px" /></p>
                <span className="separator">•</span>
                <p className="level"><Skeleton baseColor="#212932" highlightColor="#000" width="60px" /></p>
            </div>
        </li>
        <li className="result loading">
            <div className="player-icon">
                <Skeleton className="img" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
            </div>
            <div className="player-content">
                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="24px" borderRadius="100px" />
                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="80px" /></p>
                <span className="separator">•</span>
                <p className="level"><Skeleton baseColor="#212932" highlightColor="#000" width="60px" /></p>
            </div>
        </li>
        <li className="result loading">
            <div className="player-icon">
                <Skeleton className="img" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
            </div>
            <div className="player-content">
                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="24px" borderRadius="100px" />
                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="80px" /></p>
                <span className="separator">•</span>
                <p className="level"><Skeleton baseColor="#212932" highlightColor="#000" width="60px" /></p>
            </div>
        </li>
    </>;
};

export default PlayersSkeleton;
