import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const articleSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    auto: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '', 
  },
  category: {
    type: String,
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      postedBy: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ],
});


const dataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    ref: "User",
    required: true,
  },
  lastName: {
    type: String,
    ref: "User",
    required: true,
  },
  dateOfBirth: {
    type: String,
  },  
  gender: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
    ref: "User",
    required: true,
  },  
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  profilePictureUrl: {
    type: String,
    default: '',
  },
  jobType: {
    type: String,
    default: '',
  },
  primarySpecialty: {
    type: String,
  },
  subSpecialty: {
    type: String,
  },
  medicalSchool: {
    type: String,
  },
  degreeObtained: [{
    course: {
      type: String,
    },
    degree: {
      type: String,
    },
    institution: {
      type: String,
    },
    year: {
      type: String,
    },
  }],
  yearOfGraduation: {
    type: String,
  },
  currentOrganization: {
    type: String,
  },
  currentOrganizationCountry: {
    type: String,
  },
  currentOrganizationState: {
    type: String,
  },
  yearsOfExperience: {
    type: String,
  },
  mdcnLicenseNo: {
    type: String,
  },
  mdcnRegistrationNo: {
    type: String,
  },
  articles: [articleSchema],
});

const Application = mongoose.model("Application", dataSchema);

export default Application;
