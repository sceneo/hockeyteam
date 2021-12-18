import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {Pair} from "../../../matchmaking/pair";
import {Person} from "../../../matchmaking/person";
import {Team} from "../../../matchmaking/team";

export interface GlobalStateInterface {
    players: Person[];
    teams: Team[];
    pairs: Pair[];
    currentPlayerId: number;
    currentPlayerAvailable: boolean;
    isOpenLoadPlayerDialog: boolean;
    isOpenLoadTrainingDialog: boolean;
    isOpenExportPlayerDialog: boolean;
    isOpenExportTrainingDialog: boolean;
    isOpenExportTeamsDialog: boolean;
}

const GlobalStateContext = createContext({
    state: {} as Partial<GlobalStateInterface>,
    setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
});

const GlobalStateProvider = ({
                                 children,
                                 value = {} as GlobalStateInterface,
                             }: {
    children: React.ReactNode;
    value?: Partial<GlobalStateInterface>;
}) => {
    const [state, setState] = useState(value);
    return (
        <GlobalStateContext.Provider value={{state, setState}}>
            {children}
        </GlobalStateContext.Provider>
    );
};

const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateContext");
    }
    return context;
};

export { GlobalStateProvider, useGlobalState };