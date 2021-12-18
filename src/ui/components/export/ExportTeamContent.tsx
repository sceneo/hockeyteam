import {Typography} from "@material-ui/core";
import React from "react";
import {exportPlayers} from "../../../datahandling/exportPlayers";
import {useGlobalState} from "../../globalstate/state/GlobalStateProvider";
import {Person} from "../../../matchmaking/person";


interface ExportTeamContentProps {
    teamId: number
}

export default function ExportTeamContent(props: ExportTeamContentProps) {
    const {state} = useGlobalState();

    const getTeamById = (teamId: number) => {
        return state.teams === undefined ? undefined : state.teams[teamId];
    }

    const getCurrentTeam = () => {
        return state.teams === undefined ? undefined : state.teams[props.teamId];
    }

    const isCurrentTeamAvailable = () : boolean => {
        return getCurrentTeam() !== undefined;
    }

    const exportPlayersIfAvailable = (members: Person[] | undefined) => {
        return members === undefined ? [] : exportPlayers(members)
    }


    const getOutputTextList = (): string[] => {
        return getTeamById(props.teamId) === undefined ? [] : exportPlayersIfAvailable(getTeamById(props.teamId)?.members);
    }

    const getTeamName = () => {
        return isCurrentTeamAvailable() ? getCurrentTeam()?.teamName : "Team not available yet"
    }

    const getMatchingFaktor = () => {
        return isCurrentTeamAvailable() ? getCurrentTeam()?.matchingFactor : "MatchingFaktor not available yet"
    }

    const getDefense = () => {
        return isCurrentTeamAvailable() ? getCurrentTeam()?.totalDefense : "Attribute not ready"
    }

    const getOffense = () => {
        return isCurrentTeamAvailable() ? getCurrentTeam()?.totalOffense: "Attribute not ready"
    }

    const getPhysis = () => {
        return isCurrentTeamAvailable() ? getCurrentTeam()?.totalPhysis: "Attribute not ready"
    }

    return (
        <div>
            <Typography>
                Name: {getTeamName()} <br/>
                MatchingFaktor: {getMatchingFaktor()} <br/>
                Defensive: {getDefense()} <br/>
                Offensive: {getOffense()} <br/>
                Physis: {getPhysis()} <br/>
                {getOutputTextList().map((item, index) => {
                    return (
                        <Typography>
                            {item}
                        </Typography>
                    )
                })}
                ---
            </Typography>
        </div>
    )
}