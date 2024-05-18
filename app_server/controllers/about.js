/* GET about page. */
const about = (req, res) => {
    res.render('about', { title: "Travlr Getaways", isAbout: true });
  };
  
  module.exports = {about};