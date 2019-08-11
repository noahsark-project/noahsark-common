const crypto=require('crypto');

module.exports = {
    sha256(originString){
        const hash = crypto.createHash('sha256');
        hash.update(originString);
        return hash.digest('hex');
    },
    md5(originString){
        const hash = crypto.createHash('md5');
        hash.update(originString);
        return hash.digest('hex');
    }
}