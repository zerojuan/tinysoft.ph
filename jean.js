// Jean's javascript goes here

var h1 = null;

$( document ).ready( function() {
    h1 = $( '.developer-card.jean h1' );
    setInterval( blink, 1000 );
    jump();
});

function blink() {
    h1.addClass( 'red' )
        .fadeTo( 'slow', 0.5 )
        .fadeTo( 'slow', 1.0 );
}

function jump() {
    var letters = h1.lettering();
    var spans = letters[ 0 ].children;

    $.each( spans, function( i, val ) {
        if ( typeof parseInt( i ) !== NaN ) {
            $( spans[ i ] ).delay( 300 * i ).queue( function( next ) {
                $( this ).addClass( 'jump' );
                next();
            });
        }
    });
}