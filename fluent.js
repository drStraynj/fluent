(function(f) {
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
(function(a) {
 a.method = function(name) {
   var args = Array.prototype.slice.call(arguments, 1);
   return args.length
     ? this.map(function(d) { return d[name] && d[name].apply(d, args); })
     : this.map(function(d) { return d[name] && d[name](); });
 };
 a.merge = function() {
   return this.reduce(function(a, b) { return (b && a.concat(b)) || a; });
 };
})(Array.prototype);
