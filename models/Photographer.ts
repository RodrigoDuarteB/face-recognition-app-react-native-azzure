import { User } from "./User";

export interface Photographer {
    contractCost: number
    digitalCost: number
    printedCost: number
    user?: User
}