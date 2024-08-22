import React from 'react';

interface TeamInputProps {
    teamName: string;
    setTeamName: (name: string) => void;
}

export const TeamInput: React.FC<TeamInputProps> = ({ teamName, setTeamName }) => {
    return (
        <div className="team-input-container">
            <h3>Team Name</h3>
            <input
                type="text"
                className="team-name-input"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />
        </div>
    );
};
