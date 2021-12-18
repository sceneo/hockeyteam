import {GlobalStateInterface} from "../state/GlobalStateProvider";

export const selectIsOpenExportPlayerDialog = (state: Partial<GlobalStateInterface>): boolean => {
    return state.isOpenExportPlayerDialog === undefined ? false : state.isOpenExportPlayerDialog;
}