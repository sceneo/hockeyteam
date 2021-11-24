import {GlobalStateInterface} from "./GlobalStateProvider";


export const selectIsOpenLoadPlayerDialog = (state: Partial<GlobalStateInterface>): boolean => {
    return state.isOpenLoadPlayerDialog === undefined ? false : state.isOpenLoadPlayerDialog;
}