
export const playMoveAction = (i, j) => ({
    type: 'PLAY_MOVE_ACTION',
    payload: {i: i, j: j}
});

export const cleanBoardAction = () => ({
    type: 'CLEAN_BOARD_ACTION',
    payload: {}
});

export const startGameAction = (nextPlayerIsBot) => ({
    type: 'START_GAME_ACTION',
    payload: {nextPlayerIsBot: nextPlayerIsBot}
});

export const setArenaAction = (mode, visible) => ({
    type: 'SET_ARENA_ACTION',
    payload: {mode: mode, arenaIsVisible: visible}
});

export const changeValuesOfStatesAction = (symbol, stateValPairs) => ({
    type: 'CHANGE_VALUES_OF_STATES_ACTION',
    payload: { symbol: symbol, stateValPairs: stateValPairs }
})