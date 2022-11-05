const SERVER_DOMAIN = 'http://localhost:5000/api';

export const api = {

    get(endpoint, data, headers) {
        return api.request('GET', endpoint, data, headers);

    },

    post(endpoint, data, headers) {
        return api.request('POST', endpoint, data, headers);

    },

    put(endpoint, data, headers) {
        return api.request('PUT', endpoint, data, headers);

    },

    delete(endpoint, data, headers) {
        return api.request('DELETE', endpoint, data, headers);

    },

    request(method, endpoint, data, headers = {}) {
        const url = `${SERVER_DOMAIN}${endpoint}`;

        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },

            body: data ? JSON.stringify(data) : null

        })

            .then((response) => {
                if (response.status >= 200 && response.status < 500) {
                    return response.json()
                }
                throw new Error(`Failed to fetch with code ${response.status}`);
            })

            .then((json) => {
                if (json.error) {
                    throw new Error(json.error.message);
                }
                // console.log('+++json - ', json)
                return json;

            })

            .catch((error) => {

                throw new Error(error.message)

            });

    }

};

