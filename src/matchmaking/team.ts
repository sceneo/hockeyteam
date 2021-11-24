import {Person} from "./person";

export interface Team {
    teamName: string;
    members: Person[];
    matchingFactor: number;
}