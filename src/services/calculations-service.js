import TokenService from '../services/token-service'
import config from '../config'

const CalculationApiService = {
  getCalculations() {
    return fetch(`${config.API_ENDPOINT}/api/calculations`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postCalculations(networth_total,networth_total_value , networth_investments, networth_loans, 
    networth_credits, networth_savings ) {
    return fetch(`${config.API_ENDPOINT}/api/calculations`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        networth_total,networth_total_value , networth_investments, networth_loans, networth_credits, networth_savings
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteCalculations(calculationsid){
    return fetch(`${config.API_ENDPOINT}/api/calculations/${calculationsid}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },

    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e));
      }
    })
      .catch(error => {
        console.error({ error });
      })

  },
};



export default CalculationApiService