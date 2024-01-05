// config.js
const clientLocal = new Client({
    host: 'localhost',
    port: 5432,
    database: 'test',
    user: 'postgres',
    password: 'LoganTFE2023',
});
  
const clientVPS = new Client({
    host: 'db',
    port: 5432,
    database: 'test',
    user: 'loganAdmin',
    password: 'LoganTFE2023',
});


export default config;
  