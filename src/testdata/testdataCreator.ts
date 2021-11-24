import {Person} from "../matchmaking/person";
import {Pair} from "../matchmaking/pair";

const DUMMY_FIRST_NAMES = ['Heinz', 'Hans', 'Helmit', 'Klaus', 'Jeremias', 'Tobias', 'Peter', 'Klaas' , 'Jan', 'Daniel', 'Oliver', 'Elias', 'Urs','Melania','Donald','Track','Trick','Tick',];
const DUMMY_LAST_NAMES = ['Kunz','Müller','Meier','Degen','Utz','Uth','Mahr','Mahle','Fritz','Herr','Schweizer','Birenbaum','Herzog','Polster','Regal','Legat','Manna','Blehrt','Knufl','Jetzad','Alsbald','Neh'];
const MEMBER_SIZE = 15;

export const createTestPersonSet= (): Person[] => {
    var personList : Person[] = [];
    for(let i = 0; i < MEMBER_SIZE; i++){
        personList.push(createTestPerson(i));
    }
    return personList;
}

export const createTestPairs = (persons: Person[] | undefined): Pair[] => {
    if(persons === undefined){
        return []
    }
    var pairs : Pair[] = [];
    persons.forEach(p => {
        persons.forEach(q => {
            if(p.id !== q.id){
                pairs.push({
                    person1: p,
                    person2: q,
                    matchingFactor: Math.random() * 10.0
                    }
                )
            }
        })
    })
    return pairs;
}

const createTestPerson = (id: number): Person => {
    return {
        id: id,
        firstname: getFirstName(),
        lastname: getLastName(),
        teamintegration: 0,
    }
}

const getFirstName = (): string => {
    return DUMMY_FIRST_NAMES[Math.floor(Math.random() * DUMMY_FIRST_NAMES.length)];
}

const getLastName = (): string => {
    return DUMMY_LAST_NAMES[Math.floor(Math.random() * DUMMY_LAST_NAMES.length)];
}