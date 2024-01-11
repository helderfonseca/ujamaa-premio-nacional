module.exports = {
    port: 3000,
    jwtSecret: '!!CryptoCat@!!',
    jwtExpirationInSeconds: 60 * 60,
    roles: {
      USER: 'user',
      ADMIN: 'admin'
    },
    productPriceUnits: {
      DOLLAR: 'dollar',
      EURO: 'euro',
      INR: 'inr'
    }
}