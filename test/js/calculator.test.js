/*
 * Unit tests for src/calculator.js
 */

describe( 'Calculator' , function() {

    // in order to test html code, we need to load it into javascript using something called a "fixture"
    beforeEach(function() {

        fixture.base = 'test/fixtures';
        // var json_fixtures = fixture.load( 'sample-data.fixture.json' );
        var html_fixtures = fixture.load( 'calculator.fixture.html' );

        // init js src
        window.calculator.init();

    });

    // remove the html fixture from the DOM
    afterEach(function() {
        fixture.cleanup();
    });
 
    //  

    it('should return 3 for 1 + 2', function() {
        document.getElementById('x').value = 1;
        document.getElementById('y').value = 2;
        document.getElementById('add').click();
        expect(document.getElementById('result').innerHTML).toBe('3');
    });

    it('should calculate zero for invalid x value', function() {
        document.getElementById('x').value = 'hello';
        document.getElementById('y').value = 2;
        document.getElementById('add').click();
        expect(document.getElementById('result').innerHTML).toBe('0');
    });

    it('should calculate zero for invalid y value', function() {
        document.getElementById('x').value = 1;
        document.getElementById('y').value = 'goodbye';
        document.getElementById('add').click();
        expect(document.getElementById('result').innerHTML).toBe('0');
    });

});

