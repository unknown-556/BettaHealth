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
    type: String
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

  role: {
    type: String,
    enum: ['Reader', 'Writer'],
    default: 'Reader',
}


  
},
{
  timeStamps: true
}
);




const User = mongoose.model('User',userSchema)
export default User