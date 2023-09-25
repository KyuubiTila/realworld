const db = require('../models');
const Profile = db.Profile;

const createProfileService = async (userId, data) => {
  const { bio, image } = data;
  const id = userId;

  try {
    const profileCreated = await Profile.create({
      userId: id,
      bio: bio,
      image: image,
      following: false,
    });

    return profileCreated;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw new Error('Profile creation failed');
  }
};

module.exports = { createProfileService };
