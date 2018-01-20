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
            .then((response) => {
                const status = response.status;
                if (status === 200) {
                    return response.json();
                } else {
                    switch (status) {
                        case 401: {
                            console.log('401 , invalid_token');
                            break;
                        }
                        case 403: {
                            console.log('403 , access_denied');
                            break;
                        }
                        case 404: {
                            console.log('404 , Not Found');
                            break;
                        }
                        case 500: {
                            console.log('500 , 服务器内部错误');
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    if (response.ok) {
                        return Promise.resolve(response);
                    } else {
                        return Promise.reject(response);
                    }
                }
            })
            .then((responseData) => {
                if (responseData.error === undefined) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                console.log('catch');
                reject(error);
            });
    });
};

export default {
    request
};
