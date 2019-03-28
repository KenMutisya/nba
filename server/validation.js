const { check } = require('express-validator/check');
const Team = require('./model/Team');
const Player = require('./model/Player');

const teamValidation = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Team must have a name!')
        .custom(value => Team.findOne({ name: value }).then(team => {
            if (team) {
                throw new Error('Team already exists');
            }
        }))
];


const playerValidation = [
    check('full_name')
        .not()
        .isEmpty()
        .withMessage('player must have a name!')
        .custom(value => Player.findOne({ full_name: value }).then(player => {
            if (player) {
                throw new Error('Team already exists');
            }
        }))
];

module.exports = { teamValidation, playerValidation };