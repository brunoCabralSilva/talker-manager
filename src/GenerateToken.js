function GenerateToken() {
  let result1 = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i += 1) {
    result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result1;
}

module.exports = GenerateToken;