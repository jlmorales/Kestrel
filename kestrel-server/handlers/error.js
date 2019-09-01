function errorhandler(error, request, response, next){
    return response.status(error.status || 500).json({
        error : {
            message: error.message || "There was an error"
        }
    });
}
module.exports = errorhandler;