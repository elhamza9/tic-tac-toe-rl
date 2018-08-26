const initialState = {
    arenaIsVisible: false,
    values: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    mode: 'HxH', // values: HxH (Human vs Human) or HxB (Human vs Bot),
    currentPlayer: 1,
    currentPlayerIsBot: false,
    boardIsClickable: false
}

const appReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'PLAY_MOVE_ACTION':
            let newValues = [ ... state.values ];
            if (!state.currentPlayerIsBot) {
                newValues[action.payload.i][action.payload.j] = state.currentPlayer;
            } else {
                // Here the bot will play alone
            }
            let nextPlayer = state.currentPlayer == 1 ? 2 : 1;
            let nextPlayerIsBot = state.mode === 'HxB' ? !state.currentPlayerIsBot : false;
            let newState = {
                ... state,
                values: newValues,
                currentPlayer: nextPlayer,
                currentPlayerIsBot: nextPlayerIsBot,
                boardIsClickable: !nextPlayerIsBot
            };
            return newState;

        case 'CLEAN_BOARD_ACTION':
            return {
                ...state,
                values: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
                currentPlayer: 1,
                boardIsClickable: false
            };

        case 'START_GAME_ACTION':
            return {
                ... state,
                value: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
                boardIsClickable: true,
                nextPlayerIsBot: action.payload.nextPlayerIsBot
            };

        case 'SET_ARENA_ACTION':
            return {
                ... state,
                arenaIsVisible: action.payload.arenaIsVisible,
                mode: action.payload.mode
            };
        
        default:
            return state;
    }
};

export default appReducer;