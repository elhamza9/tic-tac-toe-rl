const initialState = {
    arenaIsVisible: false,
    boardIsVisible: false,
    newGameBtnIsVisible: true,
    values: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    mode: 'HxH', // values: HxH (Human vs Human) or HxB (Human vs Bot),
    currentPlayer: 1,
    currentPlayerIsBot: false,
    boardIsClickable: false,
    gameOver: false,
}

const appReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'PLAY_MOVE_ACTION':
            console.log(state)
            // Play Move
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

            // Check if Game is over
            let gameOver = checkGameOver(newValues);
            // Who's next to play
            let nextPlayer = state.currentPlayer === 1 ? 2 : 1;
            let nextPlayerIsBot = false;
            if (state.mode === 'HxB') {
                nextPlayerIsBot = !state.currentPlayerIsBot
            } else if (state.mode === 'BxB') {
                nextPlayerIsBot = true;
            }
            // Return new state
            let newState = {
                ... state,
                values: newValues,
                currentPlayer: nextPlayer,
                currentPlayerIsBot: nextPlayerIsBot,
                boardIsClickable: gameOver ? false : !nextPlayerIsBot,
                gameOver: gameOver,
                newGameBtnIsVisible: gameOver,
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
                boardIsVisible: true,
                currentPlayerIsBot: action.payload.nextPlayerIsBot,
                gameOver: false,
                newGameBtnIsVisible: false,
            };

        case 'SET_ARENA_ACTION':
        console.log(action.payload.mode)
            return {
                ... state,
                arenaIsVisible: action.payload.arenaIsVisible,
                mode: action.payload.mode,
                boardIsVisible: false,
                newGameBtnIsVisible: true,
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

const checkGameOver = (vals) => {

    // Check rows
    for ( let r of vals ) {
        if ( r[0] === r[1] && r[1] === r[2] && (r[1] === 1 || r[1] === 2) ) {
            return true;
        }
    }

    // Check Columns
    for ( let i = 0 ; i < 3 ; i++ ) {
        if (vals[0][i] === vals[1][i] && vals[1][i] === vals[2][i] && (vals[1][i] === 1 || vals[1][i] === 2)) {
            return true;
        }
    }

    // Check Diagonals
    let winOndiagonalLeftToRight = (vals[0][0] === vals[1][1] && vals[1][1] === vals[2][2] && (vals[2][2] === 1 || vals[2][2] === 2));
    let winOndiagonalRightToLeft = (vals[0][2] === vals[1][1] && vals[1][1] === vals[2][0] && (vals[2][2] === 1 || vals[2][2] === 2));
    if ( winOndiagonalLeftToRight || winOndiagonalRightToLeft ) {
        return true;
    }

    // Check all board is full
    let isFull = true;
    for ( let r of vals ) {
        for ( let e of r ) {
            if (e === 0) {
                isFull = false;
                break;
            }
        }
    }
    if (isFull) {
        return true;
    }

    return false;
};

export default appReducer;