import {GlobalStateInterface} from "../state/GlobalStateProvider";

export const selectIsOpenExportTeamsDialog = (state: Partial<GlobalStateInterface>): boolean => {
    return state.isOpenExportTeamsDialog === undefined ? false : state.isOpenExportTeamsDialog;
}