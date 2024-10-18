export interface Campaign {
    id: number;
    user_id: number;
    name: string;
    phone_list: string;
    process_date: string;
    process_hour: string;
    process_status: number;
    message_text: string;
}

export interface Response {
    message: string;
    data: any[];
}