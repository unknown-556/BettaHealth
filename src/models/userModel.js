import mongoose from 'mongoose'



const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
      type: Date,
  },
  isFrozen: {
    type: Boolean,
    default: false
  },

  role: {
    type: String,
    enum: ['Reader', 'Writer'],
    default: 'Reader',
  },
  status: {
    type: String,
    enum: ['Inactive', 'Active'],
    default: 'Inactive'
  }


  
},
{
  timeStamps: true
}
);




const User = mongoose.model('User',userSchema)
export default User