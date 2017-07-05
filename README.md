# node-blog
Simple blog system built with Node.js, Express.js, and Mongo.db

## MongoDB server startup options
Create directories `${mongo_path}/data/db` and `${mongo_path}/log`, then run:

`$ mongod --directoryperdb --dbpath ${mongo_path}/data/db/ --logpath ${mongo_path}/log/mongodb.log --logappend --rest`

Where `${mongo_path}` is something like `/usr/local/opt/mongodb`. 

## Notes
- Bootstrap template modified from _Start Bootstrap - Blog Home_ and _Blog Post_  (https://github.com/BlackrockDigital)
- File upload buttons created with _Bootstrap FileStyle_ (http://markusslima.github.io/bootstrap-filestyle/)