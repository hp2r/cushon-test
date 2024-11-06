import { TransactionHistory } from "./history";

export interface User {
    name: string;
    balance: number;
    products: UserProduct[];
    history: TransactionHistory[];
}

export type UserProduct = {
    id: string;
    name: string;
    unitsHeld: number;
};
  