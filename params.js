

module.exports = {

  get : function(){

    var
    path = document.URL,
    hasParams = /\?(.+?\=.+){1}/;

    var params;

    if (hasParams.test(path)) {

      params = {};

      path.split('?')[1].split('&').forEach(function(both){
        var e = both.split('=');
        params[e[0]] = e[1];
      });

      return params;

    } else {
      return null;
    }

  }

}
