import TokenService from '../services/token-service'
import config from '../config'

const CalculationApiService = {
  getCalculations() {
    console.log(`${TokenService.getAuthToken()}`)
    return fetch(`${config.API_ENDPOINT}/api/calculations`, {
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
  postCalculations(calculationsid, total, total_value, calculationsdate ) {
    return fetch(`${config.API_ENDPOINT}/api/calculations`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        calculationsid,  total, total_value, calculationsdate
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default CalculationApiService