var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}

//Initialize function
var init = function () {
    // register once
    if ( backEventListener !== null ) {
        return;
    }
    
    // TODO:: Do your initialization job
    console.log("init() called");
    
    var backEvent = function(e) {
        if ( e.keyName == "back" ) {
            try {
                if ( $.mobile.urlHistory.activeIndex <= 0 ) {
                    // if first page, terminate app
                    unregister();
                } else {
                    // move previous page
                    $.mobile.urlHistory.activeIndex -= 1;
                    $.mobile.urlHistory.clearForward();
                    window.history.back();
                }
            } catch( ex ) {
                unregister();
            }
        }
    }
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
};

$(document).bind( 'pageinit', init );
$(document).unload( unregister );
$(document).ready(function(){
	function getQuote(){
		$.ajax({
			type:'GET',
			url:'http://quotes.stormconsultancy.co.uk/random.json',
			success:function(data){
				
				var randomQuote = data.quote;
				var randomAuthor = data.author;
				$(".quotes").css("border-style","solid");
				$(".quote").text(randomQuote);
				$(".author").text(randomAuthor);
				
			},
			error:function(data){
				console.error(data);
			}
			
			
		});
		
	}
	
$(".btn").on("click",function(){
	getQuote();
});
	
});
