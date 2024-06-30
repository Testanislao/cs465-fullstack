/* GET contact page. */
const contact = (req, res) => {
    res.render('contact', { title: "Travlr Getaways", isContact: true });
  };
  
  module.exports = {contact};