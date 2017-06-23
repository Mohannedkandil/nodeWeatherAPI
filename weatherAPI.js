const profile = require('./profile.js');
const cn = process.argv.slice(2);
cn.forEach(profile.get);
