<<<<<<< HEAD
# How to run
 
 You need 2 parts to run this: the API and the client. Run the api first.
 
## Dependencies

You will need some things before doing this. First off, you need an up to date NodeJS. Second, you need NPM (usually bundled with node). To check the versions run the following:

```sh
node -v
npm -v
```

## How to run the API

 1. Go into the API folder. Once in there, open a console/terminal etc, so that the console is in the folder as well
	 1. Alternatively, route through you file system using `cd` & `ls/dir`
 2. Run the following command to install the needed node modules: `npm install`
	 - Once this is done, a new folder "node_modules" should be made
 3. Once that is done, run `npm start`

## How to run the Client

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

## Interaction with client

The client is available at `localhost:{whatever you but after -l option in the previous step}`, defaults to `localhost:3000`. There let it load a bit, and once messages have loaded, you can safely interact. 

## Database

I have to mention, that since this is connected to a database, I have provided credentials. These credentials are monitored using certain tools, making them practically impossible to leak.

=======
# school-node-messager-app
This is to help new students get a feeling of 'belonging'
>>>>>>> 356d37c84a8fb75e3e1708282cbe1dc05093076a
