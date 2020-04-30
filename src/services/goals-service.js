import TokenService from '../services/token-service'
import config from '../config'

const GoalsApiService = {
  getGoals() {
    return fetch(`${config.API_ENDPOINT}/api/goals`, {
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
  postGoals(goal_name,goal_value  ) {
    return fetch(`${config.API_ENDPOINT}/api/goals`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        goal_name,goal_value 
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteGoals(id){
    return fetch(`${config.API_ENDPOINT}/api/goals/${id}`, {
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



export default GoalsApiService