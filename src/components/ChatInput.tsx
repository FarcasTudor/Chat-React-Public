import { FC, useState } from 'react';
import { MessageInterface } from '../interfaces/MessageInterface';
import { EMPTY_STRING, TYPE_MESSAGE } from '../constants/Constants';
import { useAppSelector } from '../redux/storage/store';

interface ChatInputProps {
    webSocket: WebSocket;
    onSendMessage: (message: string, isIncoming: boolean) => void;
    resetCommand: () => void;
    teamName: string;
}

export const ChatInput: FC<ChatInputProps> = ({ webSocket, onSendMessage, resetCommand, teamName}) => {
    const username = useAppSelector((state) => state.userDetailsReducer.username);
    console.log("USERNAME: " + username);
    const command = useAppSelector((state) => state.commandsReducer.activeCommand);
    const [inputValue, setInputValue] = useState<string>(EMPTY_STRING);
    const handleSendMessage = () => {
        console.log(inputValue)
        const messageObj: MessageInterface = {
            message: command === EMPTY_STRING ? inputValue : command,
            sender: username,
            receiver: teamName,
            group: EMPTY_STRING,
        };

        console.log(messageObj);

        webSocket.send(JSON.stringify(messageObj));
        onSendMessage(`[${messageObj.sender}] sent ${messageObj.message} to ${messageObj.receiver}`, false);
        setInputValue(EMPTY_STRING);
        resetCommand();
    };

    return (
        <div className="chat-input">
            <input
                type="text"
                className="textfield"
                placeholder={TYPE_MESSAGE}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="chat-button" onClick={handleSendMessage}>Send</button>
        </div>
    );
};
