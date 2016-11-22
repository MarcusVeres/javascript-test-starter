'use strict';

(function() {
    
    var game = {
        classes : {} , 
    };

    // 
    var settings = game.settings = {

        totalMoles : 6 , 
        difficulty : 10 , 

        moleWidth : 100 , 
        moleHeight : 80 , 
        moleColor : '#CCC' , 
        moleHoleColor : '#222' , 
        moleClickedColor : '#CC0000' , 
        moleGraphic : 'http://placehold.it/200/200' , 

        totalPrizes : 6 , 
        prizeWidth : 100 , 
        prizeHeight : 80 , 

    }

    // 
    var data = game.data = {
        currentScore : 0 , 
        moleArray : [] , 
        prizeArray : [] ,
    }

    // DOM elements
    var canvasElement;
    var canvas;
    var hud;
    
    game.init = function() {

        // console.log( "all systems go" ); 

        canvasElement = document.getElementById( 'canvas-element' );
        canvas = canvasElement.getContext( '2d' );
        hud = document.getElementById( 'hud' );

        // vars for storage
        var canvasHeight = canvasElement.height;
        var canvasWidth = canvasElement.width;
        
        // reset content
        data.currentScore = 0;
        data.moleArray = [];
        data.prizeArray = [];
    };
   
    // -------------------------------------
    // the Prize class

    function Prize( data = {} )
    {
        this.active = false;

        this.height = settings.prizeHeight;
        this.width = settings.prizeWidth; 
        this.color = settings.moleColor;
        this.image = data.image || 'http://placehold.it/100/100'; 
        this.x = data.x || 0;
        this.y = data.y || 0;

        return this;
    }
    game.classes.Prize = Prize;

    Prize.prototype.activate = function()
    {
        this.active = true;
    }

    Prize.prototype.render = function()
    {
        canvas.fillStyle = this.color;
        canvas.fillRect( this.x , this.y , this.width , this.height ); 

        canvas.strokeStyle = tileBorderColor;
        canvas.strokeRect( this.x , this.y , this.width , this.height ); 

        // if( clicked ) should display its surrounding tiles
        if( this.label !== 0 )
        {
            renderTileLabel( this , this.label );
                // console.log( "this tile has a label" );
        }
    }

    var generatePrizeArray = game.generatePrizeArray = function()
    {
        for( var i = 0 ; i < settings.totalPrizes ; i++ )
        {
            var prize = new Prize();
            data.prizeArray.push( prize );
        }
    }

    // -------------------------------------
    // the Mole class
    function Mole( object = {} )
    {
        this.img = new Image();
        this.img.src = object.img || settings.moleGraphic;
        this.width = object.width || settings.moleWidth; 
        this.height = object.height || settings.moleHeight; 
        this.color = object.color || settings.moleColor; 
        this.clickedColor = object.clickedColor || settings.moleClickedColor; 

        // update the moleArray
        data.moleArray.push( this );
    }
    game.classes.Mole = Mole;

    Mole.prototype.animate = function()
    {
        // the mole will play the "rising" animation when active, and "falling" animation when inactive
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


    // -------------------------------------
    // old functions
 
    var getIntById = function(id) {
        return parseInt(document.getElementById(id).value, 10);
    };


    var calculate = function() {
        var sum = getIntById('x') + getIntById('y');
        document.getElementById('result').innerHTML = isNaN(sum) ? 0 : sum;
    };

    // 

    // bind the game object to the window if it does not exist 
    window.game = window.game || game;

})();

