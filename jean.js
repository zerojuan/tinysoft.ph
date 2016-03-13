// Jean's javascript goes here

var header = null;
var h1 = null;
var letters = null;
var spans = null;
var cnt = 0;
var outside = false;
var walkInterval = setInterval( walk, 1000 );

$( document ).ready( function() {
    h1 = $( '.developer-card.jean h1' );
    header = $( '.header h1' );
    letters = h1.lettering();
    spans = letters[ 0 ].children;
    // setInterval( blink, 1000 );
    walkInterval;
    jump();
    add();
});

function blink( item ) {
    $( item ).addClass( 'red' )
        .fadeTo( 'slow', 0.5 )
        .fadeTo( 'slow', 1.0 );

    $( header ).fadeOut( 500 )
        .fadeIn( 500 );
}

function jump() {
    $.each( spans, function( i, val ) {
        if ( typeof parseInt( i ) !== NaN ) {
            $( spans[ i ] ).delay( 300 * i ).queue( function( next ) {
                $( this ).addClass( 'jump' );
                setInterval( blink( this ), 1000 );
                next();
            });
        }
    });
}

function add() {
    var svg = d3.select( 'svg' )
        .attr( 'width', $( window ).width() - 100 )
        .attr( 'height', 200 )
    .append( 'g' )
        .attr( 'transform', 'translate( 20, 20 )' )
        .style( 'fill', 'red' );

    var data = [ 32, 54, 152, 705 ]

    setInterval( function() {
        var circles = svg.selectAll( '.dots')
            .data( data.map( function( elm ) {
                return elm + (Math.random() * 100);
            }));
        dance( circles );
    }, 1000 );
}
// TODO: change position of current circle
function dance( circles ) {
    circles.enter().append( 'circle' )
        .attr( 'class', 'dots');

    circles.transition().attr( 'cy', function( d, i) {
            return Math.random() * i;
        })
        .attr( 'cx', function( d, i ) {
            return Math.random() * d;
        })
        .attr( 'r', function( d ) {
            return Math.sqrt( d * Math.random() );
        });
}
// TODO: make the letters walk
function walk() {
    var width = $( window ).width();

    cnt = cnt + 1;
    console.log( 'counter: ', cnt );
    $.each( spans, function( i, val ) {
        if ( typeof parseInt( i ) !== NaN ) {
            $( spans[ i ] ).animate( { left: '-' + ( cnt * 10 ) + 'px' } );
        }

        if ( i === spans.length - 1 && $( spans[ i ] ).offset().left < -10 ) {
            outside = true;
        }

        if ( outside && i === spans.length - 1 ) {
            cnt = 0;
            outside = false;
            $( spans ).animate( { left: ( width - 200 ) + 'px' }, 'slow' );
            colorize();
        }
    });
}

function colorize() {
    var color = getRandomColor() + ',' + getRandomColor() + ',' + getRandomColor();
    $( 'body' ).css( 'background-color', 'rgb(' + color + ')');
}

function getRandomColor() {
    return Math.floor( Math.random() * 256 );
}