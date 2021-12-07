import {Team} from "./team";
import {Person} from "./person";

export const calculateAttributesForTeams = (teams: Team[]) => {
    teams.forEach(t => {
        calculateAttributesForTeam(t);
    })
}

export const calculateAttributesForTeam = (team: Team) => {
    team.totalDefense = calculateDefenseForPlayers(team.members);
    team.totalOffense = calculateOffenseForPlayers(team.members);
    team.totalPhysis = calculatePhysisForPlayers(team.members);
}



const calculateDefenseForPlayers = (players: Person[]): number => {
    let defense = 0;
    players.forEach(p => {
        defense += p.defense;
    })
    return defense;
}

const calculateOffenseForPlayers = (players: Person[]): number => {
    let offense = 0;
    players.forEach(p => {
        offense += p.offense;
    })
    return offense;
}

const calculatePhysisForPlayers = (players: Person[]): number => {
    let physis = 0;
    players.forEach(p => {
        physis += p.physical;
    })
    return physis;
}