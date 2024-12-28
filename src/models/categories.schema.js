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
class Categories extends mongoose.Document{

}
schema.loadClass(Categories);
export default mongoose.model('Categories', schema);