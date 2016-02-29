// Jean's javascript goes here

var h1 = null;
var letters = null;
var spans = null;

$( document ).ready( function() {
    h1 = $( '.developer-card.jean h1' );
    letters = h1.lettering();
    spans = letters[ 0 ].children;
    setInterval( blink, 1000 );
    jump();
    // add();
});

function blink() {
    h1.addClass( 'red' )
        .fadeTo( 'slow', 0.5 )
        .fadeTo( 'slow', 1.0 );
}

function jump() {
    $.each( spans, function( i, val ) {
        if ( typeof parseInt( i ) !== NaN ) {
            $( spans[ i ] ).delay( 300 * i ).queue( function( next ) {
                $( this ).addClass( 'jump' );
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

    var circles = svg.selectAll( 'circle' )
        .data( [ 32, 54, 152, 705 ] );

    setInterval( function() {
        dance( circles );
    }, 1000 );
}

function dance( circles ) {
    var circleGroup = circles.enter()
        .append( 'circle' );

    circleGroup.attr( 'cy', function( d, i) {
            return Math.random() * i;
        })
        .attr( 'cx', function( d, i ) {
            return Math.random() * d;
        })
        .attr( 'r', function( d ) {
            return Math.sqrt( d * Math.random() );
        });
}