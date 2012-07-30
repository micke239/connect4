# connect 4

This repository contains my connect 4 server, and all of its clients.

## server

The server is written with node.js. As this is my first time with a node.js application, my goal is to develop an application with a great event-driven server architecture and design.

### dependencies

Currently (this WILL change a lot), the server uses the following dependencies:
 * Express for delivering static client files beutifully
 * Socket.io for websocket communication
 * Winston for logging

### tests

I have not started with any tests yet, but my goal is to learn a bit about unit-tests as well, as that was not part of my education.

## html5-client

The html5 client uses socket.io for communication and is highly dynamic. For layout, twitter's bootstrap is used. The goal here is to have a responsive web page that will work on cell phones, tablets and desktops.