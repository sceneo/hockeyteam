import {Person} from "../person/person";

export interface Pair {
    person1: Person;
    person2: Person;
    matchingFactor: number;
}