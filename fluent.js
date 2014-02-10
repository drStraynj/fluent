(function(f) {
  f.__fluent__ = true;
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
  f.arg = function(num) {
    return function() { return arguments[num]; };
  };
  f.repeat = function(num) {
    var f = this;
    return function() {
      var r = f.apply(this, arguments);
      for (var i = 1; i < num; i++) r = r && f(r);
      return r;
    };
  };
  function push(obj, args) {
    return obj.push.apply(obj, args) >= 0 && obj;
  };
})(Function.prototype);

(function(a) {
  a.__fluent__ = true;
  var map = Array.prototype.map;
  a.map = function() {
    return prev(map.apply(this, arguments), this);
  };
  var filter = Array.prototype.filter;
  a.filter = function() {
    return prev(filter.apply(this, arguments), this);
  };
  a.method = function(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    return prev(this.map(function(d) {
      return d && d[name] && d[name].apply(d, args);
    }), this);
  };
  a.merge = function() {
    return prev(this.reduce(function(a, b) {
      return (b && a.concat(b)) || a;
    }), this);
  };
  a.back = function(num) {
    if (!arguments.length) return this._back || this;
    else if (num <= 0) return this;
    var result = this;
    for (var j = 0; j < num; j++) result = result.back();
    return result;
  };
  function prev(o, _) { return (o._back = _) && o; };
})(Array.prototype);

function Chain(_) {
  var self = this;
  self.__fluent__ = true;
  self._vars = {};
  self.var = function(name, def, cb) {
    self._vars[name] = def;
    self[name] = function(_) {
      if (!arguments.length) return self._vars[name];
      self._vars[name] = _;
      cb.apply(this, arguments);
      return self;
    };
  };
  if (_ && typeof _ == "function") _.call(self);
};
