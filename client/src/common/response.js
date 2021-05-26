function response(success, message, data){
    const resObj = {
        success: success,
        message: message,
        data: data
    }
    return resObj;
}

module.exports = response;
