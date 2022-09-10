module.exports.get_404 = (req, res, next) =>
  res.status(404).render("404", { title: "Not Found" });
