function checkBody(body, fields) {
  let isValid = true;

  for (let field of fields) {
    if (!body[field] || body[field] === "") {
      isValid = false;
    }
  }
  return isValid;
}

module.exports = { checkBody };
