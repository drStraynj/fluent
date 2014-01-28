(function() {
  var f = Function.prototype;
  f.map = function() {
    var a = arguments, f = this;
    return function() {
      var r = f.apply(this, arguments);
      for (var i=0; i<a.length; i++) r = a[i].apply(this, push([r], arguments));
      return r;
    };
  };
  function unshift(obj, array) {
    array.unshift(obj); return array;
  };
  function push(obj, args) {
    return obj.push.apply(obj, args) >= 0 && obj;
  };
  function slice(obj, lo) {
    return args(obj).slice(lo);
  };
  function args(obj) {
    return Array.prototype.slice.call(obj);
  };
})();
