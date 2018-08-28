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
    boardIsClickable: false,
    gameOver: true,
}

const appReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'PLAY_MOVE_ACTION':
            let newValues = [ ...state.values ];
            if (!state.currentPlayerIsBot) {
                newValues[action.payload.i][action.payload.j] = state.currentPlayer;
            } else {
                // Here the bot will play alone
                let pos = makeRandomBotMove(state.values);
                if (pos !== null) {
                    newValues[pos[0]][pos[1]] = state.currentPlayer;
                }
            }
            let nextPlayer = state.currentPlayer === 1 ? 2 : 1;
            let nextPlayerIsBot = state.mode === 'HxB' ? !state.currentPlayerIsBot : false;
            let newState = {
                ... state,
                values: newValues,
                currentPlayer: nextPlayer,
                currentPlayerIsBot: nextPlayerIsBot,
                boardIsClickable: !nextPlayerIsBot
            };
            return newState;

        case 'START_GAME_ACTION':
            return {
                ... state,
                values: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
                currentPlayer: 1,
                boardIsClickable: !action.payload.nextPlayerIsBot,
                currentPlayerIsBot: action.payload.nextPlayerIsBot,
                gameOver: false,

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

const makeRandomBotMove = (vals) => {
    let possiblePositions = Array();
    for ( let i = 0 ; i < 3 ; i++ ) {
        for ( let j = 0 ; j < 3 ; j++ ) {
            if ( vals[i][j] === 0 ) {
                possiblePositions.push([i,j]);
            }
        }
    }
    if (possiblePositions.length > 0) {
        let randPos = Math.floor(Math.random()*(possiblePositions.length-1));
        return possiblePositions[randPos];
    } else {
        return null;
    }
};

export default appReducer;