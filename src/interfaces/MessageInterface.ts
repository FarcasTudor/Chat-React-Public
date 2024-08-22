export interface MessageInterface { 
    message: string;
    sender: string;
    receiver: string;
    group: string;
    ips?: string[];   
    isIncoming?: boolean;
}