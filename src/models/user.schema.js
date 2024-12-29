import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    first_name:{
        type: String
    },
    last_name:{
        type: String
    },
    phone:{
        type: String
    },
    is_active:{
        type: Boolean,
        default: true
    },
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
}, {
    versionKey: false,
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
class User extends mongoose.Document{
    
}
schema.loadClass(User);
export default mongoose.model('User', schema);