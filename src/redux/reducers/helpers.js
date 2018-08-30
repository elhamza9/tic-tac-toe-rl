

export const checkGameOver = (vals) => {

    // Check rows
    for ( let r of vals ) {
        if ( r[0] === r[1] && r[1] === r[2] && (r[1] === 1 || r[1] === 2) ) {
            return [true, r[1]];
        }
    }

    // Check Columns
    for ( let i = 0 ; i < 3 ; i++ ) {
        if (vals[0][i] === vals[1][i] && vals[1][i] === vals[2][i] && (vals[1][i] === 1 || vals[1][i] === 2)) {
            return [true, vals[1][i]];
        }
    }

    // Check Diagonals
    let winOndiagonalLeftToRight = (vals[0][0] === vals[1][1] && vals[1][1] === vals[2][2] && (vals[2][2] === 1 || vals[2][2] === 2));
    let winOndiagonalRightToLeft = (vals[0][2] === vals[1][1] && vals[1][1] === vals[2][0] && (vals[1][1] === 1 || vals[1][1] === 2));
    if ( winOndiagonalLeftToRight || winOndiagonalRightToLeft ) {
        return [true,vals[1][1]];
    }

    // Check all board is full : DRAW ( because we checked for wins before )
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
        return [true,0];
    }

    return [false,0];
};

export const getStateHash = (matrix) => {
    let arr = [];
    for (let r of matrix) {
        for (let e of r) {
            arr.push(e);
        }
    }
    let res = 0;
    for (let i = 0 ; i < 9 ; i++) {
        res += arr[i]*(Math.pow(3,i));
    }
    return res;
};

export const getStateWinnerMap = (matrix, i, j) => {
    let mapRes = new Map();
    mapRes.set(-1, []);
    mapRes.set(0, []);
    mapRes.set(1, []);
    mapRes.set(2, []);
    for (let v of [0,1,2]) {
        matrix[i][j] = v;
        if (j === 2) {
            if (i === 2) {
                let ret = checkGameOver(matrix);
                mapRes.get(ret[0] ? ret[1] : -1).push(getStateHash(matrix));
            } else {
                let m = getStateWinnerMap(matrix, i+1, 0);
                mapRes.set(-1, mapRes.get(-1).concat(m.get(-1)));
				mapRes.set(0, mapRes.get(0).concat(m.get(0)));
				mapRes.set(1, mapRes.get(1).concat(m.get(1)));
				mapRes.set(2, mapRes.get(2).concat(m.get(2)));
            }
        } else {
            let m = getStateWinnerMap(matrix, i, j+1);
                mapRes.set(-1, mapRes.get(-1).concat(m.get(-1)));
				mapRes.set(0, mapRes.get(0).concat(m.get(0)));
				mapRes.set(1, mapRes.get(1).concat(m.get(1)));
				mapRes.set(2, mapRes.get(2).concat(m.get(2)));
        }
    }
    return mapRes;
};

export const initStateValues = (winnerToStates, symbol) => {
    let m = new Map();
    winnerToStates.forEach((val, key, map) => {
      if ( key === symbol ) {
        for (let e of val) {
          m.set(e, 1);
        }
      } else if ( key === (symbol === 1 ? 2 : 1) || key === 0 ) {
        for (let e of val) {
          m.set(e, 0);
        }
      } else if ( key === -1) {
        for (let e of val) {
          m.set(e, .5);
        }
      }
    });
    return m;
  }