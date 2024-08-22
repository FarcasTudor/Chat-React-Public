import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/storage/store';
import { fetchAllCommands, setActiveCommand } from '../redux/slices/commandSlice';

export const CommandList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { commands, activeCommand } = useAppSelector((state) => state.commandsReducer);

    useEffect((): void => {
        dispatch(fetchAllCommands());
    }, []);

    const handleCommandClick = (command: string): void => {
        dispatch(setActiveCommand(command));
    }

    return (
        <div className="commands-list-container">
            <h3>Commands</h3>
            <ul className="commands-list">
                {commands.map((command, index) => (
                    <li 
                        key={index}
                        className={`command-item ${activeCommand === command ? 'active' : ''}`} 
                        onClick={() => handleCommandClick(command)}
                    >
                        {command}
                    </li>
                ))}
            </ul>
        </div>
    );
};
