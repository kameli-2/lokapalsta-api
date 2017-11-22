const { Client } = require('pg')

class Api {
    __constructor() {}

    /**
     * Fetch posts
     * 
     * @param id {int}    Post id - if not provided, will return all posts
     * @return {object}   Post data, or array of posts if no post id is provided
     */
    fetchPosts(id) {
        if (typeof id === 'number') {
            return this._queryDb('SELECT * FROM posts WHERE id = ' + id + ';');
        }
        else {
            return this._queryDb('SELECT * FROM posts;');
        }
    }

    /**
     * Make a db query
     * 
     * @param {string} query    SQL query string
     * @return {object}         For a SELECT query, db rows as an array of objects
     */
    _queryDb(query) {
        let dbResult = null;

        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true,
        });

        client.connect();

        client.query(query, (err, res) => {
            if (err) throw err;
            dbResult = res.rows;
            client.end();
        });

        /*
        const pool = new pg.Pool({
            host: '',
            user: ''
        })

        // connection using created pool
        pool.connect(function (err, client, done) {
            if (err) {
                console.log(err);
                return false;
            }
            
            client.query(query, function (err, result) {
                done();
                if (err) {
                    // TODO: error handling
                    console.error(err);
                    return false;
                }
                
                dbResult = result.rows;
            });
        })

        // pool shutdown
        pool.end()
        */

        return dbResult;
    }
};

module.exports = Api;
