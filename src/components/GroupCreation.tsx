import { FC, useState } from 'react';
import { ALERT_GROUP_NAME, EMPTY_STRING, GROUP_COMMAND, GROUP_NAME } from '../constants/Constants';
import { MessageInterface } from '../interfaces/MessageInterface';
import { useAppSelector } from '../redux/storage/store';

interface GroupCreationProps {
    webSocket: WebSocket;
}

export const GroupCreation: FC<GroupCreationProps> = ({ webSocket }) => {
    const username = useAppSelector((state) => state.userDetailsReducer.username);
    const [groupName, setGroupName] = useState<string>(EMPTY_STRING);

    const handleCreateGroup = (): void => {
        if (groupName.trim()) {
            const messageObj: MessageInterface = {
                message: GROUP_COMMAND,
                sender: username,
                receiver: EMPTY_STRING,
                group: groupName,
            };
            webSocket.send(JSON.stringify(messageObj));
            setGroupName(EMPTY_STRING);
        } else {
            alert(ALERT_GROUP_NAME);
        }
    };

    return (
        <div className="group-creation-container">
            <h3>Create Group</h3>
            <input
                type="text"
                className="group-name-input"
                placeholder={GROUP_NAME}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
            />
            <button className="create-group-button" onClick={handleCreateGroup}>Create</button>
        </div>
    );
};
