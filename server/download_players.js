const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadPlayer(player_id) {

    const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player_id}.png`
    const pathLogos = path.join(__dirname, '../', 'assets/players');
    const path2 = path.resolve(pathLogos, `${player_id}.png`)
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

// downloadPlayer('203518');
module.exports = { downloadPlayer };
