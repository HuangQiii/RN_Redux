const request = (url, token, method = 'get', body) => {
    let header = {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": token
    };
    return new Promise((resolve, reject) => {
        fetch(url, {
            method,
            headers: header,
            body
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.error === 'invalid_token') {
                    console.log('invalid_token,should back to Login');
                } else if (responseData.error === undefined) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default {
    request
};