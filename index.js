function EventFactory() {
  this.ALL_LISTENERS = "ALL_LISTENERS";
  this.events = {};
}

// Internal methods
EventFactory.prototype.addEventListener = function (name, handler) {
  if (this.events.hasOwnProperty(name)) this.events[name].push(handler);
  else this.events[name] = [handler];
};

EventFactory.prototype.removeEventListener = function (name, handler) {
  if (!this.events.hasOwnProperty(name)) return;

  var index = this.events[name].indexOf(handler);
  if (index != -1) this.events[name].splice(index, 1);
};

EventFactory.prototype.removeAllEventListeners = function (name) {
  if (!this.events.hasOwnProperty(name)) return false;
  this.events[name] = [];
  return true;
};

EventFactory.prototype.argumentError = function (
  argumentNumber,
  expected,
  actual
) {
  return new Error({
    errorCode: "argumentError",
    argument: argumentNumber,
    expected: expected,
    actual: actual,
  });
};

// API methods
EventFactory.prototype.enable = function (target) {
  var i,
    len,
    methods = Object.keys(EventFactory.prototype);
  target = target || {};
  target.events = {};
  for (i = 0, len = methods.length; i < len; i = i + 1) {
    target[methods[i]] = this[methods[i]];
  }
  return target;
};

EventFactory.prototype.on = function (eventName, callback) {
  if (typeof eventName !== "string") {
    throw this.argumentError(1, "string", typeof eventName);
  }
  if (typeof callback !== "function") {
    throw this.argumentError(2, "function", typeof callback);
  }

  this.addEventListener(eventName, callback);

  return this;
};

EventFactory.prototype.off = function (eventName, callback) {
  if (typeof eventName !== "string") {
    throw this.argumentError(1, "string", typeof eventName);
  }
  if (typeof callback !== "function" && callback !== this.ALL_LISTENERS) {
    throw this.argumentError(2, "function", typeof callback);
  }

  if (typeof callback == "function") {
    this.removeEventListener(eventName, callback);
  } else if (callback === this.ALL_LISTENERS) {
    this.removeAllEventListeners(eventName);
  }

  return this;
};

EventFactory.prototype.emit = function (eventName, payload) {
  if (typeof eventName !== "string") {
    throw this.argumentError(1, "string", typeof eventName);
  }

  if (!this.events.hasOwnProperty(eventName)) return;

  var evs = this.events[eventName],
    l = evs.length;

  for (var i = 0; i < l; i++) {
    if (typeof evs[i] === "function") evs[i].call(null, payload);
  }

  return this;
};

if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = EventFactory;
} else {
  window.EventFactory = EventFactory;
}
