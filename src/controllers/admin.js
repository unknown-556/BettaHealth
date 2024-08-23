import User from '../models/userModel.js';
import Admin from '../models/adminModel.js';

export const adminSignIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const hashedPassword = hashValue(password);
      if (hashedPassword !== admin.password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      res.status(200).json({ message: 'Admin login successful' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        if (!allUsers) {
        res.status(400).json({message: 'No users found in database'})
    }   else {
        res.status(200).json({message: 'Users found successfully', allUsers})
    }
    }   catch (error) {
        console.error('Error while getting all users:',error);
        res.status(500).json({message: error.messaage})
    }
}


export const getUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(`User ID: ${user._id}, User Data: ${JSON.stringify(user)}`);
        return res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Internal server error:', error);
    }
};


export const toggleStatus = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newStatus = user.status === 'Inactive' ? 'Active' : 'Inactive';

        user.status = newStatus;
        await user.save();

        return res.json({ status: user.status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const checkUserStatus = (allowedStatuses) => {
    return (req, res, next) => {
        console.log('req.user:', req.user); 
  
      if (!req.user) {
        return res.status(401).json({ msg: 'User not authenticated' });
      }
  
      if (!req.user.status) {
        return res.status(403).json({ msg: 'User status not defined' });
      }
        if (!allowedStatuses.includes(req.user.status)) {
            return res.status(403).json({ msg: 'Your account is not active' });
        }
        next();
    };
};


export const freezeAccount = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isFrozen = true;
        await user.save();
        await frozenAccountTemplate(user.email, user.userName);
        res.status(200).json({ message: 'Account frozen successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const unfreezeAccount = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isFrozen = false;
        await user.save();
        await unfrozenAccountTemplate(user.email, user.userName);
        res.status(200).json({ message: 'Account unfrozen successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
    
