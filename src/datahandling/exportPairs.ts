import {Pair} from "../matchmaking/pair";

export const exportPairs = (pairs: Pair[] | undefined): string[] => {
    const listOfStrings:  string[] = []
    if(pairs === undefined){
        return listOfStrings;
    }

    pairs.forEach(p => {
        listOfStrings.push(p.person1 + "," + p.person2 + "," + p.matchingFactor);
    })
    return listOfStrings;
}