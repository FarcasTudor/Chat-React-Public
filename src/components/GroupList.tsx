import { FC } from 'react';

interface GroupListProps {
    groups: string[];
}

export const GroupList: FC<GroupListProps> = ({ groups }) => {
    return (
        <div className="groups-list-container">
            <h3>Your Groups</h3>
            <ul className="groups-list">
                {groups.map((group, index) => (
                    <li key={index} className="group-name">{group}</li>
                ))}
            </ul>
        </div>
    );
};
