import {Pair} from "../matchmaking/pair";
import {Person} from "../matchmaking/person";

export const importPairs = async (players: Person[] | undefined): Promise<Pair[]> => {
    if (players === undefined) {
        console.log("no players found. how can you do a matching?")
        return [];
    }
    let pairs: Pair[] = [];
    await fetch('./pairs.txt')
        .then(response => response.text())
        .then(responseText => {
            pairs = processTextFile(responseText, players)
        })

    return pairs;
};

export const importPairsFromString = (players: Person[] | undefined, input: string): Pair[] => {
    if (players === undefined) {
        console.log("no players found. how can you do a matching?")
        return [];
    }
    return processTextFile(input, players)
};

const getPersonById = (id: number, players: Person[]) => {
    let foundPlayer: Person | undefined = undefined;
    players.forEach(p => {
        if (p.id == id) {
            foundPlayer = p;
        }
    })
    return foundPlayer === undefined ? getDummyPlayer() : foundPlayer;
}

const getDummyPlayer = (): Person => {
    return {
        id: -1,
        firstname: "not",
        lastname: "found",
        teamintegration: 0,
    }
}

const processTextFile = (input: string, players: Person[]): Pair[] => {
    const pairs: Pair[] = [];

    var lines = input.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].split(',');
        for (var j = 0; j < 3; j++) {
            pairs.push({
                person1: getPersonById(parseInt(line[0]), players),
                person2: getPersonById(parseInt(line[1]), players),
                matchingFactor: parseFloat(line[2])
            })
        }
    }
    return pairs;
}