import {GlobalStateInterface} from "../state/GlobalStateProvider";


export const selectIsOpenLoadPlayerDialog = (state: Partial<GlobalStateInterface>): boolean => {
    return state.isOpenLoadPlayerDialog === undefined ? false : state.isOpenLoadPlayerDialog;
}