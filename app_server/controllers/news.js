/* GET news page. */
const news = (req, res) => {
    res.render('news', { title: "Travlr Getaways", isNews: true });
  };
  
  module.exports = {news};