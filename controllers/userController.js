
const User = require('../models/user.js');
const Booking = require('../models/booking.js'); 

exports.getUserDetails = async (req, res) => {
  try {
    const { username } = req.params;
    const { section = 'account' } = req.query; // Default to 'account' if no section specified

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const bookings = await Booking.find({ user: user._id })
      .populate('listing', 'image.url title location country');

    res.render('profile', {
      user,
      bookings,
      maskedPassword: '***',
      section  // Pass the section to the view
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


exports.updateUserPhoto = async (req, res) => {
    try {
      const { username } = req.params;

      if (!req.file) {
        return res.status(400).send('No photo uploaded.');
      }

      const user = await User.findOneAndUpdate(
        { username },
        { photo: req.file.path }, // Save the file path in the database
        { new: true }
      );
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      res.redirect(`/profile/${username}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }

  };

