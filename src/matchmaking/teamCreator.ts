import {Pair} from "./pair";
import {Team} from "./team";
import {Person} from "./person";

const TEAM_SIZE = 5;
const MAX_ATTEMPTS = 1000;
let attempt = 0;
let PAIRS: Pair[] = [];

export const createRandomTeam = (persons: Person[] | undefined, pairs: Pair[] | undefined): Team[] => {
    if (persons === undefined || pairs === undefined) {
        console.log("teams can not be created due to missing players or training")
        return [];
    }
    PAIRS = pairs;

    let teams: Team[] = randomlyCreateTeams(persons);
    calculateTeamIntegrationFactorForAllTeams(teams);
    return teams;
}

export const calculateTeams = (persons: Person[] | undefined, pairs: Pair[] | undefined): Team[] => {
    if (persons === undefined || pairs === undefined) {
        console.log("teams can not be created due to missing players or training")
        return [];
    }
    PAIRS = pairs;

    let teams: Team[] = randomlyCreateTeams(persons);
    optimizeTeamsStage1(teams);
    calculateTeamIntegrationFactorForAllTeams(teams);
    return teams;
}

const calculateTeamIntegrationFactorForAllTeams = (teams: Team[]): Team[] => {
    teams.forEach(team => {
        calculateTeamIntegrationFactorsForEachTeamMember(team);
    })
    return teams;
}

const calculateTeamIntegrationFactorsForEachTeamMember = (team: Team): Team => {
    team.members.forEach(member => {
        member.teamintegration = calculateIntegrationFactorForMember(member.id, team.members);
    })
    return team;
}

const calculateIntegrationFactorForMember = (id: number, members: Person[]): number => {
    let integrationFactor = 0;
    members.forEach(member => {
        integrationFactor += getMatchingFactorByIdFor(id, member.id);
    })
    return integrationFactor;
}

const optimizeTeamsStage1 = (teams: Team[]): Team[] => {
    let iterationCounter = 0;
    for (let i = 0; i < 2 * TEAM_SIZE; i++) {
        for (let j = i + 1; j < 3 * TEAM_SIZE; j++) {
            if (j < 5) {
                continue;
            }
            iterationCounter++;
            if (iterationCounter % 10 === 0) {
                console.log("Iteration: " + iterationCounter);
            }
            if (validateAndPerformExchangeIfSuitable(i, j, teams)) {
                i = 0;
                j = 1;
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

const createEmptyTeam = (name: string): Team => {
    return {
        teamName: name,
        members: [],
        matchingFactor: 0
    }
}

const getMatchingFactorFor = (personA: Person, personB: Person): number => {
    return getMatchingFactorByIdFor(personA.id, personB.id);
}

const getMatchingFactorByIdFor = (personA: number, personB: number): number => {
    let matchingfactor = 0;
    PAIRS.forEach(pair => {
        if (pair.person1.id === personA && pair.person2.id === personB) {
            matchingfactor = pair.matchingFactor;
        }
        if (pair.person2.id === personA && pair.person1.id === personB) {
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

const randomlyCreateTeams = (player: Person[]): Team[] => {
    let team1: Team = createEmptyTeam("Team 1");
    let team2: Team = createEmptyTeam("Team 2");
    let team3: Team = createEmptyTeam("Team 3");


    let pickedMembers: number[] = [];


    for (let i = 0; i < TEAM_SIZE; i++) {
        let remainingPlayers: Person[] = getRemainingPlayers(player, pickedMembers);
        if (remainingPlayers.length === 0) {
            break;
        }
        let newPlayer = randomlySelectPlayer(remainingPlayers);
        pickedMembers.push(newPlayer.id);
        team1.members.push(newPlayer);
    }

    for (let i = 0; i < TEAM_SIZE; i++) {
        let remainingPlayers: Person[] = getRemainingPlayers(player, pickedMembers);
        if (remainingPlayers.length === 0) {
            break;
        }
        let newPlayer = randomlySelectPlayer(remainingPlayers);
        pickedMembers.push(newPlayer.id);
        team2.members.push(newPlayer);
    }

    for (let i = 0; i < TEAM_SIZE; i++) {
        let remainingPlayers: Person[] = getRemainingPlayers(player, pickedMembers);
        if (remainingPlayers.length === 0) {
            break;
        }
        let newPlayer = randomlySelectPlayer(remainingPlayers);
        pickedMembers.push(newPlayer.id);
        team3.members.push(newPlayer);
    }

    calculateMatchingFactorForTeam(team1);
    calculateMatchingFactorForTeam(team2);
    calculateMatchingFactorForTeam(team3);

    return [team1, team2, team3];
}

const randomlySelectPlayer = (players: Person[]): Person => {
    return players[Math.floor(Math.random() * players.length)];
}

const getRemainingPlayers = (allPlayers: Person[], pickedMembers: number[]) => {
    const remainingPlayers: Person[] = []

    allPlayers.forEach(player => {
        if (!isInArray(player.id, pickedMembers)) {
            remainingPlayers.push(player);
        }
    })
    return remainingPlayers;
}

const isInArray = (id: number, array: number[]): boolean => {
    let found = false;
    array.forEach(a => {
        if (a == id) {
            found = true;
        }
    })
    return found;
}