import { History } from "./history";

export interface User {
    name: string;
    balance: number;
    products: UserProduct[];
    history: History[];
}

export type UserProduct = {
    id: string;
    name: string;
    unitsHeld: number;
};
/*
export interface TableDataProps extends User {
    editButton: React.ReactNode;
    deleteButton: React.ReactNode;
}
*/
  