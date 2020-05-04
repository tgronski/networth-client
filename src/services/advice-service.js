import TokenService from '../services/token-service'
import config from '../config'

const AdviceApiService = {
  getAdvice() {
    return fetch(`${config.API_ENDPOINT}/api/advice`, {
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

export default AdviceApiService