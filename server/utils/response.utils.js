function sendSuccessResponse(res, data, message = "Success", status = 200) {
  res.json({
    status: status,
    message: message,
    data: data,
  });
}

function sendErrorResponse(res, error, message = "Error", status = 500) {
  if (error.code) {
    status = error.code;
  }
  if (error.message) {
    message = error.message;
  }

  res.status(status).json({
    status: status,
    message: message,
    error: JSON.stringify(error),
  });
}

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
