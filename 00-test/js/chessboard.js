console.warn("Chessboard start here 👇🏼");

let board;
let i = 0;
let white = true;

while (i < 8) {
    white = !white

    if (white) {
        board = '# # # # ';
    } else {
        board = ' # # # #';
    }
    i++
    console.log(board)
}