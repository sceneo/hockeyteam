import {GlobalStateInterface} from "./GlobalStateProvider";


export const selectIsOpenLoadTrainingDialog = (state: Partial<GlobalStateInterface>): boolean => {
    return state.isOpenLoadTrainingDialog === undefined ? false : state.isOpenLoadTrainingDialog;
}