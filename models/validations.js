const validateURL = (req, res, next) => {
  if (
    req.body.url.substring(0, 7) === "http://" ||
    req.body.url.substring(0, 8) === "https://"
    // req.body.url.match(/https?:\/\//);
  ) {
    return next();
  } else {
    res
      .status(400)
      .send(`Oops, you forgot to start your url with http:// or https://`);
  }
};

// Another way to test for http or https:
// You could also use the JavaScript function .match(), which will test for a matching string. You can use a simple string or a regular expression
// req.body.url.match(/https?:\/\//);

module.exports = { validateURL };
