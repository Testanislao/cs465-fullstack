/* GET contact page. */
const contact = (req, res) => {
    res.render('contact', { title: "Travlr Getaways" });
  };
  
  module.exports = {contact};