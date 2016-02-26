// Jean's javascript goes here
console.log( 'hello!' );

$( document ).ready( function() {
    setInterval( blink, 1000 );
});

function blink() {
    $( '.developer-card.jean h1' )
        .addClass( 'red' )
        .fadeTo( 'slow', 0.5 )
        .fadeTo( 'slow', 1.0 );
}