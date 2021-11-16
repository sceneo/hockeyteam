import {Person} from "../person/person";

export interface Team {
    teamName: string;
    members: Person[];
    matchingFactor: number;
}