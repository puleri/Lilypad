# Lilypad Express
Lilypad Express uses Express.js and MongoDB to create the GET, POST, PATCH,
and DELETE requests that make up Lilypad Client's token authentication process
and its notes resources.
Requests to change, view, or add notes must be made by a signed in user and said
user must be the owner of any notes they wish to view, edit, or delete.

## Planning and execution
Prior to coding the API came studying personal notes and information on W3.
A schedule was then created for the genesis of the Express side of Lilypad.
The user and notes routes were set up within 2 days and then what work followed
was done on the client side for the following two days. More information on this
can be seen in the client repository which is linked below.

## Technologies used
Express.js, MongoDB, ATOM, and Macbook Pro

## Future of the project
The user routes currently allow the user to index their notes after logging in.
In a future iteration, the user would benefit from having the user notes
automatically index upon logging in.

### Entity relationship diagram
<https://imgur.com/a/RRy6YO1>

#### Links to deployed client and client repository

Link to Lilypad Client side <https://puleri.github.io/Lilypad-Client/>
<br>
Link to Lilypad Client repo <https://github.com/puleri/Lilypad-Client>
