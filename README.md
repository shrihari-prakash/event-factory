## Event Factory

##### A pluggable event broker for Browser

This package provides a event broker similar to Node JS's `EventEmitter` API on the browser.

EventFactory opens a wide number of possibilities for frontend modules to interact with each other.

#### Installation

`npm i event-factory --save`

#### Usage

```
import EventFactory from 'event-factory';

const eventFactory = new EventFactory();
eventFactory.on("message", function (payload) {
    console.log(payload);
});

eventFactory.emit(
    "message",
    { messsage: "Hello, world!" }
)
```

You can turn off events using the `off` function:

```
import EventFactory from 'event-factory';

const eventFactory = new EventFactory();
const handler = function (payload) {
    console.log(payload);
};

eventFactory.on("message", handler);

eventFactory.emit(
    "message",
    { messsage: "Hello, world!" }
)

// Turns off the event associated only with the handler
eventFactory.off("message", handler);

// Turns off all callbacks associated with the event
eventFactory.on("message");
```

It is also possible to chain functions together:

```
const eventFactory = new EventFactory();
eventFactory.on("message", function (payload) {
    console.log(payload);
});

eventFactory
    .emit("message", { messsage: "Hello, world!" }).emit("message",{ messsage: "Hello, world!" });
)
```

Or extend an existing object to add event factory capabilities to it:

```
const myObj = {};
const eventFactory = new EventFactory();

eventFactory.enable(obj);

myObj
  .on("message", function (payload) {
    console.log(payload);
  })

myObj
  .emit("connection", { messsage: "Hello, world!" });
```

#### Usage with vanilla JavaScript

```
<body>
  <script src="/path-to-ef/event-facroty.js"></script>
  <script>
    const eventFactory = new window.EventFactory();

    eventFactory
      .on("message", function (payload) {
        console.log(payload);
    })

    eventFactory
      .emit("connection", { messsage: "Hello, world!");
  </script>
</body>
```
