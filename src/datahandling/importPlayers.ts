import {Person} from "../matchmaking/person";

export const importPlayers = async (): Promise<Person[]> => {
    let players: Person[] = [];
    await fetch('./players.txt')
        .then(response => response.text())
        .then(responseText => {
            players = processText(responseText)
        })

    return players;
};

export const importPlayersFromString = (input: string): Person[] => {
    return processText(input)
};


const processText = (input: string): Person[] => {
    const players: Person[] = [];

    var lines = input.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].split(',');
        players.push({
            id: parseInt(line[0]),
            firstname: line[1],
            lastname: line[2],
            teamintegration: 0
        })

    }
    return players;
}