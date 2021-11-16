import {Pair} from "./pair";
import {Team} from "./team";
import {Person} from "../person/person";

const TEAM_SIZE = 5;
const MAX_ATTEMPTS = 1000;
let attempt = 0;
let PAIRS: Pair[] = [];


export const calculateTeams = (persons: Person[], pairs: Pair[]): Team[] => {
    PAIRS = pairs;

    console.log("initially setup teams")
    let teams = initiallySetupTeams(persons);

    return optimizeTeams(teams);
}

const optimizeTeams = (teams: Team[]): Team[] => {
    let iterationCounter = 0;
    for (let i = 0; i < 2 * TEAM_SIZE; i++) {
        for (let j = TEAM_SIZE; j < 3 * TEAM_SIZE; j++) {
            iterationCounter++;
            if (iterationCounter % 10 === 0) {
                console.log("Iteration: " + iterationCounter);
            }
            if (validateAndPerformExchangeIfSuitable(i, j, teams)) {
                i = 0;
                j = TEAM_SIZE;
            }
        }
    }
    return teams;
}

const validateAndPerformExchangeIfSuitable = (i: number, j: number, teams: Team[]): boolean => {
    let teamA = i < TEAM_SIZE ? teams[0] : teams[1];
    let teamB = j < 2 * TEAM_SIZE ? teams[1] : teams[2];
    let iteratorForA = i < TEAM_SIZE ? i : i - TEAM_SIZE
    let iteratorForB = j < 2 * TEAM_SIZE ? j - TEAM_SIZE : j - 2 * TEAM_SIZE;

    const initialMatchmakingFactorTeamA = teamA.matchingFactor;
    const initialMatchmakingFactorTeamB = teamB.matchingFactor;


    let virtualTeamA: Team = createFromTeamWithout(teamA, iteratorForA);
    virtualTeamA.members.push(teamB.members[iteratorForB])

    let virtualTeamB: Team = createFromTeamWithout(teamB, iteratorForB);
    virtualTeamB.members.push(teamA.members[iteratorForA])

    calculateMatchingFactorForTeam(virtualTeamA);
    calculateMatchingFactorForTeam(virtualTeamB);

    let netImprovement = calculateNetImprovement(initialMatchmakingFactorTeamA, virtualTeamA.matchingFactor, initialMatchmakingFactorTeamB, virtualTeamB.matchingFactor)

    if (netImprovement > 0) {
        console.log("Improvement found: " + netImprovement);
        permuteTeamMember(teamA, teamB, iteratorForA, iteratorForB);
        if (attempt < MAX_ATTEMPTS) {
            attempt++;
            return true;
        }
    }


    return false;
}

const permuteTeamMember = (teamA: Team, teamB: Team, iteratorA: number, iteratorB: number) => {
    teamA.members.push(teamB.members[iteratorB]);
    teamB.members.push(teamA.members[iteratorA]);

    teamA.members.splice(iteratorA, 1);
    teamB.members.splice(iteratorB, 1);

    calculateMatchingFactorForTeam(teamA);
    calculateMatchingFactorForTeam(teamB);
}

const calculateNetImprovement = (initialA: number, afterA: number, initialB: number, afterB: number): number => {
    let outcomeA = afterA - initialA;
    let outcomeB = afterB - initialB;

    return outcomeA + outcomeB;
}

const createFromTeamWithout = (team: Team, position: number): Team => {
    let members: Person[] = [];
    for (let i = 0; i < TEAM_SIZE; i++) {
        if (i !== position) {
            members.push(team.members[i])
        }
    }
    return {
        teamName: team.teamName,
        members,
        matchingFactor: 0
    }
}

const initiallySetupTeams = (persons: Person[]): Team[] => {

    let team1: Team = createEmptyTeam("Team 1");
    let team2: Team = createEmptyTeam("Team 2");
    let team3: Team = createEmptyTeam("Team 3");

    let counter = 0;
    persons.forEach(p => {
            if (counter < TEAM_SIZE) {
                team1.members.push(p);
            } else if (counter < 2 * TEAM_SIZE) {
                team2.members.push(p);
            } else if (counter < 3 * TEAM_SIZE) {
                team3.members.push(p);
            }
            counter++;
        }
    )
    calculateMatchingFactorForTeam(team1);
    calculateMatchingFactorForTeam(team2);
    calculateMatchingFactorForTeam(team3);

    console.log(team1, team2, team3);
    return [team1, team2, team3];
}

const createEmptyTeam = (name: string): Team => {
    return {
        teamName: name,
        members: [],
        matchingFactor: 0
    }
}

const getMatchingFactorFor = (personA: Person, personB: Person): number => {
    let matchingfactor = 0;
    PAIRS.forEach(pair => {
        if (pair.person1.id === personA.id && pair.person2.id === personB.id) {
            matchingfactor = pair.matchingFactor;
        }
        if (pair.person2.id === personA.id && pair.person1.id === personB.id) {
            matchingfactor = pair.matchingFactor;
        }
    })
    return matchingfactor;
}

const calculateMatchingFactorForTeam = (team: Team): number => {
    let matchingfactor = 0;
    team.members.forEach(memberA => {
        team.members.forEach(memberB => {
            if (memberA.id !== memberB.id) {
                matchingfactor += getMatchingFactorFor(memberA, memberB);
            }
        })
    })
    team.matchingFactor = matchingfactor;
    return 1;
}