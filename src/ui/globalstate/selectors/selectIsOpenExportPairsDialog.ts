import {GlobalStateInterface} from "../state/GlobalStateProvider";

export const selectIsOpenExportPairsDialog = (state: Partial<GlobalStateInterface>): boolean => {
    return state.isOpenExportTrainingDialog === undefined ? false : state.isOpenExportTrainingDialog;
}