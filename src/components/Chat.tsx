import React, { useEffect, useState } from 'react';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { Header } from './Header';
import { MessageInterface } from '../interfaces/MessageInterface';
import { GroupCreation } from './GroupCreation';
import { GroupList } from './GroupList';
import { EMPTY_STRING, GROUP_COMMAND, WEB_SOCKET_URL } from '../constants/Constants';
import { CommandList } from './CommandList';
import { TeamInput } from './TeamInput';
import { useAppDispatch, useAppSelector } from '../redux/storage/store';
import { addMessage } from '../redux/slices/messageListSlice';
import { setActiveCommand } from '../redux/slices/commandSlice';



export const Chat: React.FC = () => {
    const [groups, setGroups] = useState<string[]>([]);
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [teamName, setTeamName] = useState<string>('');

    const dispatch = useAppDispatch();
    const messages: MessageInterface[] = useAppSelector((state) => state.messagesReducer.messages);
    const userName = useAppSelector((state) => state.userDetailsReducer.username);

    function initializeWebSocket() {
        const websocket = new WebSocket(WEB_SOCKET_URL);
        setWebSocket(websocket);
        return websocket;
    }

    useEffect(() => {
        const websocket = initializeWebSocket();

        websocket.addEventListener('message', (event) => {
            const processIncomingMessage = () => {
                dispatch(
                    addMessage({
                        ...messageObj,
                        message: `[${messageObj.sender}] sent ${messageObj.message} to ${messageObj.receiver}`,
                        isIncoming: true,
                    })
                );
            }

            console.log(event.data);
            const messageObj: MessageInterface = JSON.parse(event.data);
            messageObj.message !== GROUP_COMMAND 
                ? processIncomingMessage()
                : setGroups(prevGroups => [...prevGroups, messageObj.group]);
            
        });
    }, []);

    const handleSendMessage = (message: string, isIncoming: boolean): void => {
        //setMessages(previousMessages => [...previousMessages, { message, isIncoming }]);
        dispatch(addMessage({ 
            message, 
            sender: userName,
            receiver: EMPTY_STRING,
            group: EMPTY_STRING,
            ips: [],
            isIncoming
        }));
    };

    const resetCommand = (): void => {
        dispatch(setActiveCommand(EMPTY_STRING));
    };

    const formattedMessages = messages.map((msg: MessageInterface) => ({
        message: msg.message,
        isIncoming: msg.isIncoming ?? false
    }));

    return (
        <div className="main-container">
            <div className="commands-container">
                <CommandList />
                <TeamInput teamName={teamName} setTeamName={setTeamName} />
            </div>
            <div className="chat-container">
                <div className="chat-content">
                    <Header />
                    <ChatMessages messages={formattedMessages} />
                    {webSocket && (
                        <ChatInput
                            webSocket={webSocket}
                            onSendMessage={handleSendMessage}
                            resetCommand={resetCommand}
                            teamName={teamName}
                        />
                    )}
                </div>
            </div>
            <div className="right-side-container">
                {webSocket && <GroupCreation webSocket={webSocket} />}
                <GroupList groups={groups} />
            </div>
        </div>
    );
};
