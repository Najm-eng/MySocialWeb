import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// Search users
export const getUsersByQuery = async (req, res) => {
  const { query } = req.query;
  try {
    let users;
    if (query.includes(' ')) {
      // Search by first name and last name
      const [firstName, lastName] = query.split(' ');
      users = await User.find({
        $or: [
          {
            firstName: { $regex: new RegExp(firstName, 'i') },
            lastName: { $regex: new RegExp(lastName, 'i') },
          },
          {
            firstName: { $regex: new RegExp(lastName, 'i') },
            lastName: { $regex: new RegExp(firstName, 'i') },
          },
        ],
      });
    } else {
      // Search by first name only
      users = await User.find({
        $or: [
          { firstName: { $regex: new RegExp(query, 'i') } },
          { lastName: { $regex: new RegExp(query, 'i') } },
        ],
      });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

/* UPDATE */
export const updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile picture path in the database
    user.picturePath = req.file.path;
    await user.save();

    res.status(200).json({ message: 'Profile picture updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSocialLinks = async (req, res) => {
  try {
    const { id } = req.params;
    const socialLinks = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's social links in the database
    user.socialLinks = socialLinks;
    await user.save();

    res.status(200).json(user.socialLinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
