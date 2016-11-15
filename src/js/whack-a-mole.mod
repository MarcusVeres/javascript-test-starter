// init script 
(function() {

    // check if the canvas has been loaded > if not, odds are we're in a test environment 
    var canvasElement = document.getElementById( 'canvas-element' );

    // our test environment ( karma + jasmine ) creates a very shitty situation for us
    // on the one hand, it executes the javascript file and will throw errors if it can't find DOM elements
    // on the other hand, it doesn't fucking load the html elements (fixtures) until *after* it executes the script
    // so, the tests will have access to the HTML, but the main script won't! 
    // in order to get around this, we have to perform a test against our test runner...

    if( canvasElement === null ) {
        console.error( 'Could not find the canvas element: "canvas-element". Aborting...' );
        return;
    }

    console.log( "all systems go" ); 

    // create the main game object
    var game = {

        // grab the remaining DOM elements
        canvas : canvasElement.getContext( '2d' ) ,
        hud : document.getElementById( 'hud' ) ,

    };

    game.data = {

        // vars for storage
        canvasHeight : canvasElement.height ,
        canvasWidth : canvasElement.width ,

        currentScore : 0 ,

    }

    game.settings = {

        tileHeight : 40 ,
        tileWidth : 40 ,
        tileColor : "#EEE" ,
        tileFlipColor : "#CCC" ,
        tileBorderColor : "#BBB" ,
        moleColor : "#000" ,
        falseColor : "#CC0000" ,
        chanceOfMole : 10 ,          // percentage out of 100
        currentRandom : null ,

    }

    game.configure = function() {

        // set font properties for all fonts
        // NOTE: this may be risky if different font styles are used, but for our purposes we don't care
        game.canvas.font = "16px sans-serif";
        game.canvas.textBaseline = "middle";
        game.canvas.textAlign = "center";

    }

    return;

    // 
    function isMole()
    {
        currentRandom = Math.floor( Math.random() * 100 );

        if( currentRandom < chanceOfMole )
        {
            return true;
        }
        return false;
    }


    // -----------------------------------------------
    // Tile class

    function Tile( data )
    {
        this.height = tileHeight;
        this.width = tileWidth;

        this.flipped = false;
        this.mole = data.mole;
        this.x = data.x;
        this.y = data.y;
        this.col = data.col;
        this.row = data.row;
        this.color = tileColor;

        // if tile is interacted with or clicked, its label is set
        // TODO: maybe there's a better way to do this
        this.label = 0;

        return;

        if( this.mole ){
            this.color = moleColor;
        } else {
            this.color = tileColor;
        }
    }

    Tile.prototype.flip = function()
    {
        if( this.mole ){
            this.color = moleColor;
            loseGame();
        } 
        else 
        {
            this.color = tileFlipColor;
            addPoints();
        }
    }

    // draws a tile onto the canvas
    function renderTile( tile )
    {
        canvas.fillStyle = tile.color;
        canvas.fillRect( tile.x , tile.y , tile.width , tile.height ); 

        canvas.strokeStyle = tileBorderColor;
        canvas.strokeRect( tile.x , tile.y , tile.width , tile.height ); 

        // if( clicked ) should display its surrounding tiles
        if( tile.label !== 0 )
        {
            renderTileLabel( tile , tile.label );
                // console.log( "tile has a label" );
        }
    }

    // bind the Tile to the game object for testing
    game.classes.Tile = Tile;

    // draws text onto a tile
    function renderTileLabel( tile , value )
    {
        canvas.fillStyle = 'blue';
        canvas.fillText( value , tile.x + tile.width / 2 , tile.y + tile.height / 2 );
    }

    var tileGridArray = [];

    var rows = Math.floor( canvasHeight / tileHeight );
    var cols = Math.floor( canvasWidth / tileWidth );

    // create the tiles the first time
    function generateTileMap()
    {
        for( var y = 0; y < rows ; y++ )
        {
            // create an array row in the array
            tileGridArray[y] = [];

            for( var x = 0; x < cols ; x++ )
            {
                // create a new tile object
                var tile = new Tile({
                    'mole' : isMole(),
                    'x' : x * tileWidth,
                    'y' : y * tileHeight,
                    'row' : y,
                    'col' : x,
                });
                
                // push the tile to our tile array
                tileGridArray[y].push( tile );
                
                // draw the tile onto the screen
                renderTile( tile );
            } 
        }

        // check result
        console.log( tileGridArray );
    }

    // draw the tiles
    function drawTileMap()
    {
        // wipe the canvas
        canvas.clearRect( 0 , 0 , canvasWidth , canvasHeight );

        // redraw the canvas
        // TODO: there may be a more efficient way to do this
        for( var y = 0; y < rows ; y++ )
        {
            for( var x = 0; x < cols ; x++ )
            {
                // find the tile at this coordinate
                var tile = tileGridArray[ y ][ x ];
                
                // draw the tile onto the screen
                renderTile( tile );
            } 
        }

        return;
    }


    // ----------------------------------------------------------------------
    // gameplay

    function addPoints()
    {
        currentScore++;
        updateHud();
    }

    function winGame()
    {

    }

    function loseGame()
    {
        setHud( "you lose" );
    }


    // ----------------------------------------------------------------------
    // mouse functions

    var mouseX = null;
    var mouseY = null;
    var canvasRect = canvasElement.getBoundingClientRect();

    function getMousePosition()
    {
        var mouseEvent = arguments[0];

        mouseX = mouseEvent.clientX - canvasRect.left;
        mouseY = mouseEvent.clientY - canvasRect.top;
            // console.log( "mouse is at: " + mouseX + "," + mouseY );

        return {
            'x' : mouseX,
            'y' : mouseY
        }
    }

    function processMouseClick()
    {
        var clickedTile = getTileAtCoordinates({
            x : mouseX,
            y : mouseY
        }); 

        // flip the tile
        clickedTile.flip();

        // redraw the screen
        drawTileMap();
    }

    function getTileAtCoordinates( data )
    {
        console.log( "tile is: " , data ); 

        // figure out the row and column my dividing the mouse position by the tile width, rounding to lowest tile
        // REMEMBER : rows and columns start at 0
        var column = Math.floor( data.x / tileWidth );
        var row = Math.floor( data.y / tileHeight );
            // console.log( "row is: " , row , "column is: " , column );
       
        // now just pull the tile from the array of tiles
        var selectedTile = tileGridArray[ row ][ column ];
            // console.log( "the tile is: " , selectedTile );

        return selectedTile;
    }

    // listen for mouse 
    canvasElement.addEventListener( 'mousemove' , getMousePosition );
    canvasElement.addEventListener( 'mousedown' , processMouseClick );

    // test the function
    generateTileMap();


    // ----------------------------------------------------------------------
    // hud functions
    
    function setHud( message )
    {
        hud.innerHTML = message;
    }

    function updateHud()
    {
        // game logic-based updating
        setHud( currentScore );
    }


    // expose the game to the window object
    console.log( "binding game to the window" );
    window.game = game;

    // 
    return game;

})();

