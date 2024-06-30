/* GET meals page. */
const meals = (req, res) => {
    res.render('meals', { title: "Travlr Getaways", isMeals: true });
  };
  
  module.exports = {meals};