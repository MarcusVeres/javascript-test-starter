/*
 * Unit tests for src/whack-a-mole.js
 */

describe( 'Whack a Mole' , function() {

    // in order to test html code, we need to load it into javascript using something called a "fixture"
    beforeEach(function() {

        // load HTML/DOM elements to test against
        fixture.base = 'test/fixtures';
        var html_fixtures = fixture.load( 'whack-a-mole.fixture.html' );

        // init js src
        window.game.init(); 

    });

    afterEach(function() {
        // remove the html fixture from the DOM
        fixture.cleanup();
    });
 
    //  
    describe( "Canvas Tests" , function() {

        it( 'should find the html canvas' , function() {
            var canvasElement = document.getElementById( 'canvas-element' );
            expect( canvasElement ).not.toBe( null );
        });

        it( 'should not throw an error when asked to find the canvas context' , function() {
            var canvasElement = document.getElementById( 'canvas-element' );
            var canvas = canvasElement.getContext( '2d' );
            expect( canvas ).not.toBe( null );
        });

    });

    //
    describe( "Rendering Engine" , function() {
        
        it( 'should have a main render() function calling requestAnimationFrame()' , function() {
            // 
        });

        it( 'should clear the canvas before rendering any content' , function() {
            // how the fuck do I test this? 
        });

    });

    // 
    describe( "Prize Tests" , function() {

        it( 'should be able to create a prize with default settings' , function() { 
            var myPrize = new game.classes.Prize();
            expect( myPrize.height ).toBe( game.settings.prizeHeight );
            expect( myPrize.width ).toBe( game.settings.prizeWidth );
        });

        it( 'should be able to activate a prize' , function() {
            var myPrize = new game.classes.Prize();
            myPrize.activate();
            expect( myPrize.active ).toBe( true );
        });

        it( 'should populate the prizeArray with the totalPrizes number of prizes' , function() {
            game.generatePrizeArray();
            expect( game.data.prizeArray.length ).toBe( game.settings.totalPrizes );
        });

    });

    //
    describe( "Mole Tests" , function() {

        it( 'should create a mole object' , function() {
            var mole = new game.classes.Mole();
            expect( mole ).not.toBe( null );
        });

        it( 'should have an image property set to the default mole graphic' , function() {
            var mole = new game.classes.Mole();
            expect( mole.img.src ).toBe( game.settings.moleGraphic );
        });

        it( 'should add a mole to the moleArray when it is created' , function() {
            var mole = new game.classes.Mole();
            expect( game.data.moleArray.length ).toBe( 1 );
        });

        it( 'should override default settings if a the data object has properties, and default to settings if not' , function() {
            var mole = new game.classes.Mole({
                height: 200 ,
                color: 'blue' ,
            });
            expect( mole.height ).toBe( 200 );
            expect( mole.color ).toBe( 'blue' );
            expect( mole.width ).toBe( game.settings.moleWidth );
            expect( mole.clickedColor ).toBe( game.settings.moleClickedColor );
        });

        it( 'should render an image and a clipping mask' , function() {

        });

        it( 'should have a working animate() prototype function' , function() {

        });

        it( 'should have a working moveImage function to move the image up and down' , function() {
            // not sure how to test this, either
        });

    });

});

