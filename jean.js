// Jean's javascript goes here

var h1 = null;
var letters = null;
var spans = null;
var cnt = 0;
var walkInterval;

$( document ).ready( function() {
    h1 = $( '.developer-card.jean h1' );
    letters = h1.lettering();
    spans = letters[ 0 ].children;
    // setInterval( blink, 1000 );
    walkInterval = setInterval( walk( 5 ), 1000 );
    jump();
    add();
});

function blink( item ) {
    $( item ).addClass( 'red' )
        .fadeTo( 'slow', 0.5 )
        .fadeTo( 'slow', 1.0 );
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
function walk( distance ) {
    cnt = cnt + 1;
    if ( cnt === 20 ) {
        clearInterval( walkInterval );
        return;
    }
    console.log( 'counter: ', cnt );
    $.each( spans, function( i, val ) {
        if ( typeof parseInt( i ) !== NaN ) {
            $( spans[ i ] ).animate( { left: '-' + ( cnt * distance ) + 'px' } );
        }
    });
}