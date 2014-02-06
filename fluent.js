(function fluent(f) {
  f.map = function() {
    var a = arguments, f = this;
    return function() {
      var r = f.apply(this, arguments);
      for (var i=0; i<a.length; i++) r = a[i].apply(this, push([r], arguments));
      return r;
    };
  };
  f.get = function() {
    var a = arguments, f = this;
    return function() {
      var r = f.apply(this, arguments);
      for (var i=0; i<a.length; i++) r = r && r[a[i]];
      return r;
    };
  };
  f.add = function() {
    var a = arguments, f = this;
    return function() {
      var r = f.apply(this, arguments);
      for (var i=0; i<a.length; i++) 
        if (typeof a[i] == "function")
          r = (r || r == 0 || r == '') && r + a[i].apply(this, arguments);
        else r = (r || r == 0 || r == '') && r + a[i];
      return r;
    };
  };
  
  function push(obj, args) {
    return obj.push.apply(obj, args) >= 0 && obj;
  };
})(Function.prototype);
