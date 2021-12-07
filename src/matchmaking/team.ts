import {Person} from "./person";

export interface Team {
    teamName: string;
    members: Person[];
    matchingFactor: number;
    totalOffense: number;
    totalDefense: number;
    totalPhysis: number;
}