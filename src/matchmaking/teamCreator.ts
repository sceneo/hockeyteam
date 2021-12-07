import {Pair} from "./pair";
import {Team} from "./team";
import {Person} from "./person";
import {calculateAttributesForTeams} from "./calculateAttributesForTeam";

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
    calculateAttributesForTeams(teams);
    return teams;
}

export const calculateTeams = (persons: Person[] | undefined, pairs: Pair[] | undefined): Team[] => {
    if (persons === undefined || pairs === undefined) {
        console.log("teams can not be created due to missing players or training")
        return [];
    }
    PAIRS = pairs;

    let teams: Team[] = randomlyCreateTeams(persons);

    // Stage 1: create random teams and try to permutate players
    console.log("Starting Stage 1");
    optimizeTeamsStage1(teams);
    calculateTeamIntegrationFactorForAllTeams(teams);
    calculateAttributesForTeams(teams);

    // Stage 2: exchange players in teams by reserve and reoptimize with stage 1
    console.log("Starting Stage 2");
    optimizeTeamsStage2(teams);
    optimizeTeamsStage1(teams);
    calculateTeamIntegrationFactorForAllTeams(teams);
    calculateAttributesForTeams(teams);

    // Stage 3: Redo stage 2 in case we have better options on the reserve bank
    console.log("Starting Stage 3");
    optimizeTeamsStage2(teams);
    optimizeTeamsStage1(teams);
    calculateTeamIntegrationFactorForAllTeams(teams);
    calculateAttributesForTeams(teams);

    return sortTeamsByBestIntegrationFactor(teams);
}

const sortTeamsByBestIntegrationFactor = (teams: Team[]) => {
    const reserveTeam = teams[3];
    const firstTeam: Team = getFirstTeam(teams);
    const secondTeam: Team = getSecondTeam(teams);
    const thirdTeam: Team = getThirdTeam(teams);

    firstTeam.teamName = "A-Team";
    secondTeam.teamName = "B-Team";
    thirdTeam.teamName = "C-Team";
    return [firstTeam, secondTeam, thirdTeam, reserveTeam]
}

const getFirstTeam = (teams: Team[]): Team => {
    let maxId = -1;
    let maxMatchingFactor = -1;
    for (let i = 0; i < 3; i++) {
        if (teams[i].matchingFactor > maxMatchingFactor) {
            maxMatchingFactor = teams[i].matchingFactor;
            maxId = i;
        }
    }
    return teams[maxId];
}

const getSecondTeam = (teams: Team[]): Team => {
    const firstTeamName = getFirstTeam(teams).teamName;
    const thirdTeamName = getThirdTeam(teams).teamName;
    for (let i = 0; i < 3; i++) {
        if (teams[i].teamName.match(firstTeamName) !== null) {
            continue;
        }
        if (teams[i].teamName.match(thirdTeamName) !== null) {
            continue;
        }
        return teams[i];
    }
    return createEmptyTeam("Team not found");
}

const getThirdTeam = (teams: Team[]): Team => {
    let minId = -1;
    let maxMatchingFactor = 1000000;
    for (let i = 0; i < 3; i++) {
        if (teams[i].matchingFactor < maxMatchingFactor) {
            maxMatchingFactor = teams[i].matchingFactor;
            minId = i;
        }
    }
    return teams[minId];
}

const optimizeTeamsStage2 = (teams: Team[]) => {
    const newTeams: Team[] = [];
    for (let i = 0; i < 3; i++) {
        newTeams.push(trySubstitutionsForTeam(teams[i], teams[3]));
    }
    newTeams.push(teams[3]);
    return newTeams;
}

const trySubstitutionsForTeam = (team: Team, substitutions: Team): Team => {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < substitutions.members.length; j++) {
            let testTeam: Team = createEmptyTeam("TestTeam");
            for (let u = 0; u < 5; u++) {
                if (u !== i) {
                    testTeam.members.push(team.members[u]);
                }
            }
            testTeam.members.push(substitutions.members[j]);
            const matchingFactorForTestTeam = calculateMatchingFactorForTeam(testTeam);
            if (matchingFactorForTestTeam > team.matchingFactor) {
                substitutePlayer(team, i, substitutions, j);
                calculateMatchingFactorForTeam(team);
                console.log("substitution perfomed");
                i = 0;
                j = 0;
            }
        }
    }
    calculateMatchingFactorForTeam(team);
    return team;
}

const substitutePlayer = (team: Team, i: number, substitution: Team, j: number) => {
    team.members.push(substitution.members[j]);
    substitution.members.push(team.members[i]);

    team.members.splice(i, 1);
    substitution.members.splice(j, 1);
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
    for (let i = 0; i < 2 * TEAM_SIZE; i++) {
        for (let j = i + 1; j < 3 * TEAM_SIZE; j++) {
            if (j < 5) {
                continue;
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
        matchingFactor: 0,
        totalPhysis: 0,
        totalOffense: 0,
        totalDefense: 0
    }
}

const createEmptyTeam = (name: string): Team => {
    return {
        teamName: name,
        members: [],
        matchingFactor: 0,
        totalDefense: 0,
        totalOffense: 0,
        totalPhysis: 0
    }
}

const getMatchingFactorFor = (personA: Person, personB: Person): number => {
    return getMatchingFactorByIdFor(personA.id, personB.id);
}

const getMatchingFactorByIdFor = (personA: number, personB: number): number => {
    let matchingfactor = 0;
    PAIRS.forEach(pair => {
        if (pair.person1 === personA && pair.person2 === personB) {
            matchingfactor = pair.matchingFactor;
        }
        if (pair.person2 === personA && pair.person1 === personB) {
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
    return matchingfactor;
}

const randomlyCreateTeams = (player: Person[]): Team[] => {
    let team1: Team = createEmptyTeam("Team 1");
    let team2: Team = createEmptyTeam("Team 2");
    let team3: Team = createEmptyTeam("Team 3");
    let teamReserve: Team = createEmptyTeam("Reserve");


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

    let remainingPlayers: Person[] = getRemainingPlayers(player, pickedMembers);
    remainingPlayers.forEach(player => {
        pickedMembers.push(player.id)
        teamReserve.members.push(player)
    })

    calculateMatchingFactorForTeam(team1);
    calculateMatchingFactorForTeam(team2);
    calculateMatchingFactorForTeam(team3);

    return [team1, team2, team3, teamReserve];
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