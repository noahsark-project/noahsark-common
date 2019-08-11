const util = require('util');

function DuplicatedError(message){
    this.code = 804;
    this.message = message;
}

util.inherits(DuplicatedError,Error);

module.exports = DuplicatedError;