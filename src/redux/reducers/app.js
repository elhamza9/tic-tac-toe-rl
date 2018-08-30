
import { checkGameOver, getStateHash, getStateWinnerMap, initStateValues } from './helpers';


const initialState = {
    arenaIsVisible: false,
    boardIsVisible: false,
    boardIsClickable: false,
    newGameBtnIsVisible: true,
    values: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    mode: 'HxH', // values: HxH (Human vs Human) or HxB (Human vs Bot),
    currentPlayer: 1,
    currentPlayerIsBot: false,
    gameOver: false,
    winner: 0, // 0: no winner, 1: player 1 (X), 2: player 2 (O)
    stateHistory: [],
    winnerToStates: getStateWinnerMap([[0,0,0],[0,0,0],[0,0,0]], 0, 0), // 1->[14,32,43](cross wins) , 2->[12,43,54](circle wins), 0->[1,4,4] (draw), -1->[12,13] (Not ended)
}

initialState.valueOfStatesFor1 = initStateValues(initialState.winnerToStates, 1);
initialState.valueOfStatesFor2 = initStateValues(initialState.winnerToStates, 2);

const appReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'PLAY_MOVE_ACTION':
            // Play Move
            let newValues = [ ...state.values ];
            newValues[action.payload.i][action.payload.j] = state.currentPlayer;
            // Add state to history
            let newStateHistory = [...state.stateHistory, getStateHash(newValues)];
            // Check if Game is over
            let res = checkGameOver(newValues);
            let gameOver = res[0];
            let winner = res[1];
            // Who's next to play
            let nextPlayer;
            let nextPlayerIsBot = false;
            if (!gameOver) {
                if (state.mode === 'HxB') {
                    nextPlayerIsBot = !state.currentPlayerIsBot
                } else if (state.mode === 'BxB') {
                    nextPlayerIsBot = true;
                }
                nextPlayer = state.currentPlayer === 1 ? 2 : 1;
            }
            // Return new state
            let newState = {
                ...state,
                values: newValues,
                currentPlayer: nextPlayer,
                currentPlayerIsBot: nextPlayerIsBot,
                boardIsClickable: gameOver ? false : !nextPlayerIsBot,
                gameOver: gameOver,
                winner: winner,
                stateHistory: newStateHistory,
                newGameBtnIsVisible: gameOver,
            };
            return newState;

        case 'START_GAME_ACTION':
            //console.log(state.winnerToStates)
            return {
                ...state,
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
                winner: 0,
                stateHistory: [],
            };
        
        case 'CHANGE_VALUES_OF_STATES_ACTION':
            if (action.payload.stateValPairs.length === 0) {
                if (action.payload.symbol === 1) {
                    return {
                        ...state,
                        stateHistory: [],
                        valueOfStatesFor1: initStateValues(initialState.winnerToStates, 1)
                    }
                } else if (action.payload.symbol === 2) {
                    return {
                        ...state,
                        stateHistory: [],
                        valueOfStatesFor2: initStateValues(initialState.winnerToStates, 2)
                    }
                }
            } else {
                let newValueOfStates = action.payload.symbol === 1 ? new Map(state.valueOfStatesFor1) : new Map(state.valueOfStatesFor2);
                for (let p of action.payload.stateValPairs) {
                    //console.log('setting ' + p[0] + ' to ' + p[1]);
                    newValueOfStates.set(p[0], p[1]);
                }
                if (action.payload.symbol === 1) {
                    return {
                        ...state,
                        stateHistory: [],
                        valueOfStatesFor1: newValueOfStates
                    }
                } else if (action.payload.symbol === 2) {
                    return {
                        ...state,
                        stateHistory: [],
                        valueOfStatesFor2: newValueOfStates
                    }
                }
            }
            break;

        case 'SET_ARENA_ACTION':
            return {
                ...state,
                arenaIsVisible: action.payload.arenaIsVisible,
                mode: action.payload.mode,
                boardIsVisible: false,
                newGameBtnIsVisible: true,
            };
        
        default:
            return state;
    }
};



export default appReducer;