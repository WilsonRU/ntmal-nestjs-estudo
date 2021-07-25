import { Status } from "./status.enum";

export interface ITask {
    id?: number;
    status?: Status;
    description: string;
}