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

    it( 'should find the html canvas' , function() {
        var canvasElement = document.getElementById( 'canvas-element' );
        expect( canvasElement ).not.toBe( null );
    });

    it( 'should not throw an error when asked to find the canvas context' , function() {
        var canvasElement = document.getElementById( 'canvas-element' );
        var canvas = canvasElement.getContext( '2d' );
        expect( canvas ).not.toBe( null );
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

    });

});

