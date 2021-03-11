# Node Messagin App

## Introduction

This is a messaging app I am building, not for production though I won't stop you, throught the use of react express & socket.io. The initial 'task' I was given was to create something that should bring students a sence of belonging when coming to a new school...

## Features

- Live messaging
- Friends w/ friend requests (disclaimer - doesn't give you irl friends)
- channels, support for group chats, and 'MGCs', which are like discord guilds/servers
- Has users technically
- Saves messages & their authors
- Similar API to discord

## TODO

- [ ] Use socket.io for friend requests
- [ ] Use socket.io for blocks
- [ ] Remove the /ws path for socket.io
- [ ] Add all the api parts for the front end
	- [ ] Add MGC for front-end
	- [ ] Add friend requests
	- [ ] Propper error handler
	- [ ] Dis allow messages to be sent from client (already not allowed by API)
	- [ ] etc
- [ ] Expand API
	- [ ] Pagination
- [ ] Add authentication n stuff
- [ ] Add ability to make new users
- [ ] Improve the looks of it...
- [ ] Docs


## How to run
 
 You need 2 parts to run this: the API and the client. Run the api first.
 
### Dependencies

You will need some things before doing this. First off, you need an up to date NodeJS. Second, you need NPM (usually bundled with node). You also need a mongodb database. To check the versions run the following:

```sh
node -v
npm -v
mongodb
```

### How to run the API

 1. Go into the API folder. Once in there, open a console/terminal etc, so that the console is in the folder as well
	 1. Alternatively, route through you file system using `cd` & `ls/dir`
 2. Run the following command to install the needed node modules: `npm install`
	 - Once this is done, a new folder "node_modules" should be made
 3. Once that is done, run `npm start`

### How to run the Client

1. Open a new terminal
2. Change directories (on the console) into the Client folder.
3. Once there, run `npm install`. This will be a longer install, since it has large modules in it
	- Folder "node_modules" should appear
4. run `npm run build`
5. After that is done, run the following commands:
```sh
(sudo?) npm install -g serve
serve -s build -l 3000
```
- This install globally the 'serve' module, and runs the optimized build server on port `3000`

### Interaction with client

The client is available at `localhost:{whatever you but after -l option in the previous step}`, defaults to `localhost:3000`. There let it load a bit, and once messages have loaded, you can safely interact. 
