import {Person} from "../person/person";

export const processFileAndLoadPlayers = (filename: string): Person[] => {
    console.log("loading file from local storage, not the file you gave");
    const filename_test = "./players.txt";
    const file = require(filename_test);
    const reader = new FileReader();
    reader.readAsText(file);
    console.log(reader.result);


    return [];
}