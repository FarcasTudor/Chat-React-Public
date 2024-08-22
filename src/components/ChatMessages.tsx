import { FC } from 'react';

interface ChatMessagesProps {
    messages: { message: string, isIncoming: boolean }[];
}

export const ChatMessages: FC<ChatMessagesProps> = ({ messages }) => {
    return (
        <div className="chat-messages">
            {messages.map((msg, index) => (
                <p key={index} className={`chat-message ${msg.isIncoming ? 'incoming-message' : 'outgoing-message'}`}>
                    {msg.message}
                </p>
            ))}
        </div>
    );
};
