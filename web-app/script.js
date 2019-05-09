(function(){
    $.ajax({url: "https://jsonblob.com/api/jsonBlob/6766327f-607d-11e9-95ef-9bcb815ba4a4", success: function(result){
        stripeHeader.set(result)
    }});
}());
