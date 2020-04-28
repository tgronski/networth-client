import TokenService from '../services/token-service'
import config from '../config'

const WalletsApiService = {
  getWallets() {
    console.log(`${TokenService.getAuthToken()}`)
    return fetch(`${config.API_ENDPOINT}/api/wallets`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

}

export default WalletsApiService