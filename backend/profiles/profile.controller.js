const { createProfileService } = require('./profile.service');

const createProfile = async (req, res) => {
  const data = req.body;
  const userId = req.user.id;

  try {
    const createdProfile = await createProfileService(userId, data);

    res.status(201).json(createdProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Profile creation failed' });
  }
};

module.exports = { createProfile };
