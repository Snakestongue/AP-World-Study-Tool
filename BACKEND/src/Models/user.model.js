import mongoose, {Schema } from "mongoose"; //schema means structure
import validator from "validator"
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, //used for white spaces
        minLength: 1,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        //maxLength: 50,
        select: false
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, //used for white spaces
        validate: {
        validator: validator.isEmail,
        message: props =>`${props.value} is not a valid email!`
        }
    },
    notes: [{
        content: { 
            type: String, 
            required: true, 
            minlength: 1 
        },
        createdAt: { 
            date:{type: Date, default: Date.now} //documentation
        }
    }]
},
    {
        timestamps: true
    }
); //code version of strucutre of data

export const User = mongoose.model("User", userSchema);

// const newUSchema = new Schema({
//     newDevice:{
//         //tbd
//     }
// })

