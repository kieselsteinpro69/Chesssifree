const board = document.getElementById("board");
const columns_sorted = ["a" , "b", "c", "d", "e", "f", "g", "h"];
const chess_default_position = [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"], // Reihe 8
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"], // Reihe 7
    [null, null, null, null, null, null, null, null], // Reihe 6
    [null, null, null, null, null, null, null, null], // Reihe 5
    [null, null, null, null, null, null, null, null], // Reihe 4
    [null, null, null, null, null, null, null, null], // Reihe 3
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"], // Reihe 2
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]  // Reihe 1
  ];
  const pieces = {
    wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
    bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "♟"
  };
let tile_Data = {};



create_board();
create_starting_position();





function create_starting_position(){ //Uses 2D Array to create starting position

    for (let row = 0; row < 8; row++){

        for (let col = 0; col < 8; col++){

            let current_tile = columns_sorted[col] + (8 - row);
            let current_piece = chess_default_position[row][col];
          
            

           if (pieces[current_piece]){

              document.getElementById(current_tile).innerText = pieces[current_piece];
              
              tile_Data[current_tile] = {
                piece: current_piece,
                occupied: true
              };

           }else{
            tile_Data[current_tile] = {
                piece: null,
                occupied: false         
            };
           }
          
        }
    }
    console.log(tile_Data);
}




function create_board(){//Create 8*8 grid with every 2nd tile being black

for (let row = 0; row < 8; row++){

    for (let col = 0; col < 8; col++){

        let tile = document.createElement("div");
        tile.classList.add("tile");
        

        if((row + col ) % 2 === 0){
            tile.classList.add("white_tile");
        }else{
            tile.classList.add("black_tile")
        }
           
        let get_tile_id = columns_sorted[col] + (8 - row); //Id for every column

        tile.id = get_tile_id;
  

    board.appendChild(tile);
    }
}


}