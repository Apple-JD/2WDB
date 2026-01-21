/**
*SPA Library
*Version 2.0.0
*Author Enminvithaigal
*Last Updated Jun 14, 2024
*Last Updated Jan 28, 2025
*/
window.onload = initiateState();
var routingFlag = false;
function initiateState(){
    var hash = window.location.hash;
    if(hash == ''){
        var path = "/";
    }else{
        var path = hash.replace("#", "");
    }
    var stateObj = {"page": path};
    window.history.replaceState(stateObj, "Index", "#"+path);
    loadState(stateObj);
}
function loadState(state){
    var page = state.page;
    window.sessionStorage.setItem("page", page);
    if(routes[page]){
        $("#body").load(routes[page], function(response, status, xhr){
            if(status == "error"){
                throw Error("Error on loading template...", routes[page]);
            }
        });
    } else {
        throw Error("Template not registered in route")
    }
}
$(document).on('click', 'a', function(e) {
    var target = $(this).attr("target");
    if(target == "_blank"){
        return true;
    }else{
        var href = $(this).attr("href");
        if(href == "#"){
          return true;
        }else{
          e.preventDefault();
          var path = href;
          routing(path);
        }
    }
});
function routing(path){
    routingFlag = true;
    stateObj = {"page": path};
    window.history.replaceState(stateObj, path, "#"+path);
    var popStateEvent = new PopStateEvent('popstate',{ state: stateObj});
    window.dispatchEvent(popStateEvent);
}
window.addEventListener('popstate', function(event) {
    // console.log("popstate event fired...", event);
    loadState(event.state);
});
