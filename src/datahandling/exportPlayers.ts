import {Person} from "../matchmaking/person";

export const exportPlayers = (players: Person[]): string[] => {
    const listOfStrings:  string[] = []

    players.forEach(p => {
        listOfStrings.push(p.id + "," + p.firstname + "," + p.lastname + "," + p.defense + "," + p.offense + "," + p.physical);
    })
    return listOfStrings;
}