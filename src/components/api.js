const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
      authorization: '1b2a242c-7f61-4ba0-aed4-c12d821f37ad',
      'Content-Type': 'application/json'
    }
}
  
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export const editProfile = (nameValue, jobValue) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            name: nameValue,
            about: jobValue
        })
    })
      .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
}