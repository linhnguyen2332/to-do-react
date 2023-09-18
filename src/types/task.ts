export interface Tasks {
    _id: string;
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface NewTask {
    name: string;
}