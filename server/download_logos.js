const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function download(abbr) {

    const url = `http://www.nba.com/assets/logos/teams/secondary/web/${abbr}.svg`
    const pathLogos = path.join(__dirname, '../', 'assets/logos');
    const path2 = path.resolve(pathLogos, `${abbr}.svg`)
    const writer = fs.createWriteStream(path2);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    })
}

// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', () => {
//     TeamID.find().then(team => console.log(team.abbreviation));
// })

// TeamID.findOne().then(team => console.log(team.abbreviation));
module.exports = { download };