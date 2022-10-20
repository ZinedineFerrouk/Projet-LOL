import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MatchesSkeleton = () => {
    return (
        <ul className="matchs loading">
            <li className="match">
                <div className="match-info">
                    <h3 className="gametype"><Skeleton baseColor="#212932" highlightColor="#000" width="220px" /></h3>
                    <p className="duration"><Skeleton baseColor="#212932" highlightColor="#000" width="190px" /></p>
                </div>
                <div className="teams">
                    <div className="team team-winner">
                        <div className="player player-winner">
                            <div className="champion-icon">
                                <Skeleton className="img-loader" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
                            </div>
                            <div className="player-info">
                                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="140px" /></p>
                                <p className="champion-name"><Skeleton baseColor="#212932" highlightColor="#000" width="115px" /></p>
                                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" borderRadius="100px" />
                            </div>
                        </div>
                        <div className="player player-winner">
                            <div className="champion-icon">
                                <Skeleton className="img-loader" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
                            </div>
                            <div className="player-info">
                                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="140px" /></p>
                                <p className="champion-name"><Skeleton baseColor="#212932" highlightColor="#000" width="115px" /></p>
                                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" borderRadius="100px" />
                            </div>
                        </div>
                        <div className="player player-winner">
                            <div className="champion-icon">
                                <Skeleton className="img-loader" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
                            </div>
                            <div className="player-info">
                                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="140px" /></p>
                                <p className="champion-name"><Skeleton baseColor="#212932" highlightColor="#000" width="115px" /></p>
                                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" borderRadius="100px" />
                            </div>
                        </div>
                        <div className="player player-winner">
                            <div className="champion-icon">
                                <Skeleton className="img-loader" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
                            </div>
                            <div className="player-info">
                                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="140px" /></p>
                                <p className="champion-name"><Skeleton baseColor="#212932" highlightColor="#000" width="115px" /></p>
                                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" borderRadius="100px" />
                            </div>
                        </div>
                        <div className="player player-winner">
                            <div className="champion-icon">
                                <Skeleton className="img-loader" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
                            </div>
                            <div className="player-info">
                                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="140px" /></p>
                                <p className="champion-name"><Skeleton baseColor="#212932" highlightColor="#000" width="115px" /></p>
                                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" borderRadius="100px" />
                            </div>
                        </div>
                    </div>

                    <div className="separator versus">VS</div>

                    <div className="team team-loser">
                        <div className="player player-winner">
                            <div className="champion-icon">
                                <Skeleton className="img" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
                            </div>
                            <div className="player-info">
                                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="140px" /></p>
                                <p className="champion-name"><Skeleton baseColor="#212932" highlightColor="#000" width="115px" /></p>
                                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" borderRadius="100px" />
                            </div>
                        </div>
                        <div className="player player-winner">
                            <div className="champion-icon">
                                <Skeleton className="img" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
                            </div>
                            <div className="player-info">
                                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="140px" /></p>
                                <p className="champion-name"><Skeleton baseColor="#212932" highlightColor="#000" width="115px" /></p>
                                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" borderRadius="100px" />
                            </div>
                        </div>
                        <div className="player player-winner">
                            <div className="champion-icon">
                                <Skeleton className="img" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
                            </div>
                            <div className="player-info">
                                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="140px" /></p>
                                <p className="champion-name"><Skeleton baseColor="#212932" highlightColor="#000" width="115px" /></p>
                                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" borderRadius="100px" />
                            </div>
                        </div>
                        <div className="player player-winner">
                            <div className="champion-icon">
                                <Skeleton className="img" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
                            </div>
                            <div className="player-info">
                                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="140px" /></p>
                                <p className="champion-name"><Skeleton baseColor="#212932" highlightColor="#000" width="115px" /></p>
                                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" borderRadius="100px" />
                            </div>
                        </div>
                        <div className="player player-winner">
                            <div className="champion-icon">
                                <Skeleton className="img" baseColor="#212932" highlightColor="#000" width="100%" height="100%" borderRadius="50%" inline="true" />
                            </div>
                            <div className="player-info">
                                <p className="name"><Skeleton baseColor="#212932" highlightColor="#000" width="140px" /></p>
                                <p className="champion-name"><Skeleton baseColor="#212932" highlightColor="#000" width="115px" /></p>
                                <Skeleton baseColor="#212932" highlightColor="#000" width="80px" height="26px" borderRadius="100px" />
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default MatchesSkeleton;
