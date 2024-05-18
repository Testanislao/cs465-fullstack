/* GET travel page. */
const travel = (req, res) => {
    res.render('travel', { title: "Travlr Getaways", isTravel: true });
  };
  
  module.exports = {travel};