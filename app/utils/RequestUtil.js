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
                if (response.status === 200) {
                    return response.json();
                } else {
                    if (response.status === 401) {
                        console.log('401,全局处理');
                    } else if (response.status === 500) {
                        console.log('500,全局处理');
                    }
                    return Promise.resolve(response);
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
                reject(error);
            });
    });
};

export default {
    request
};