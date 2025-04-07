const crypto = require('crypto');
const fs = require('fs');

const publicKey = fs.readFileSync('D:\\node_hw\\keys\\public.key', 'utf8');

const message = '!';

const signature = ' nh+bNQ7FzcRiA2bAmhtI80KWNiMuraaQFyM+b+9rhTlrV5aTXwBLuSHtUXt1vkpOFHYfuvV2vw1VEtXN+GPThugtvcnksAKeEJCdX/KKOUkBjNxtmEt8bDPKj8hBbgJG4rA305QeM97Xd3Y9WUGoOAq6zGGD+l4ljcfY363b9vX0MyNsoF6PUNhvbz02pDhILBHUoPzcGtOcgH+asjowweEX0OjKB5Zr2wDGgE6eoILAov4SIgSEjQU1Y/RhGfUaXx/UzXx0nNedgKbENPbYD0EuYpD1lyFNTtc3BMcnVN5kRK3V9NnT2ZofVVC4DinhqcShP/xzurvNs4uRoZhV9w==\n';

const verifier = crypto.createVerify('RSA-SHA256');
verifier.update(message);
const isVerified = verifier.verify(publicKey, signature, 'base64');

console.log('Signature confirmed:', isVerified);
