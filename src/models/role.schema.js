import mongoose from "mongoose";


const schema = new mongoose.Schema({
    role_name: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    versionKey: false,
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
class Role extends mongoose.Document{

}
schema.loadClass(Role);
export default mongoose.model('Role', schema);