var conn = new Mongo('localhost:27017');
var db = conn.getDB('node-blog');

// Drop existing collections if existing
db.categories.drop();
db.posts.drop();

// Create collections
db.posts.insert({
    title: 'Sample Blog Post 1',
    category: 'Technology',
    author: 'Guy Incognito',
    date: ISODate(),
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis rutrum enim. Etiam eu orci mi. Curabitur tincidunt lectus urna. Praesent volutpat blandit sem nec suscipit. Phasellus justo diam, consequat non ex vitae, efficitur mattis risus. Suspendisse at sapien nisi. Vestibulum sed faucibus odio. Ut velit nunc, sodales at libero venenatis, scelerisque rutrum est.'
});

db.posts.insert({
    title: 'Sample Blog Post 2',
    category: 'Internet',
    author: 'Guy Incognito',
    date: ISODate(),
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis rutrum enim. Etiam eu orci mi. Curabitur tincidunt lectus urna. Praesent volutpat blandit sem nec suscipit. Phasellus justo diam, consequat non ex vitae, efficitur mattis risus. Suspendisse at sapien nisi. Vestibulum sed faucibus odio. Ut velit nunc, sodales at libero venenatis, scelerisque rutrum est.'
});