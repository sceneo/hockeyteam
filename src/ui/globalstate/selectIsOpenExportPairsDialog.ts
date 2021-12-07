import {GlobalStateInterface} from "./GlobalStateProvider";

export const selectIsOpenExportPairsDialog = (state: Partial<GlobalStateInterface>): boolean => {
    return state.isOpenExportTrainingDialog === undefined ? false : state.isOpenExportTrainingDialog;
}