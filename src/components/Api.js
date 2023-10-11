export class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = {
        authorization: options.authorization,
        'Content-Type': 'application/json',
      };
    }
    _getRequest(url) {
      return fetch(url, {
        headers: this.headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Что-то пошло не так...');
        })
    }
    getUserInfo() {
      return this._getRequest(`${this.baseUrl}/users/me`);
    }

    getInitialCards() {
      return this._getRequest(`${this.baseUrl}/cards`);
    }

    editUserInfo(data) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Что-то пошло не так...');
        })
    }

    setAvatar(data) {
      return fetch(`${this.baseUrl}/users/me/avatar `, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Что-то пошло не так...');
        })
    }

    addCard(data) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Что-то пошло не так...');
        })
    }

    removeCard(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Что-то пошло не так...');
        })
    }

    likeCard(cardId) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this.headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Что-то пошло не так...');
        })
    }

    removeLike(cardId) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.headers,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Что-то пошло не так...');
        })
    }
  }
