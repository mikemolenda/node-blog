# node-blog
Simple blog system built with Node.js, Express.js, and Mongo.db

## MongoDB server startup options
Create directories `${mongo_path}/data/db` and `${mongo_path}/log`, then run:

`$ mongod --directoryperdb --dbpath ${mongo_path}/data/db/ --logpath ${mongo_path}/log/mongodb.log --logappend --rest`

Where `${mongo_path}` is something like `/usr/local/opt/mongodb`. 

## Notes
- Bootstrap template modified from Start Bootstrap - Blog Home (https://github.com/BlackrockDigital/startbootstrap-blog-home) and Start Bootstrap - Blog Post (https://github.com/BlackrockDigital/startbootstrap-blog-post)
- File upload buttons created with Bootstrap FileStyle(http://markusslima.github.io/bootstrap-filestyle/)