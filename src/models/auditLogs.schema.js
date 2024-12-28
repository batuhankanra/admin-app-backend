import mongoose from "mongoose";


const schema = new mongoose.Schema({
    level:String,
    email:String,
    location:String,
    proc_type:String,
    log:mongoose.SchemaTypes.Mixed
}, {
    versionKey: false,
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
class AuditLogs extends mongoose.Document{

}
schema.loadClass(AuditLogs);
export default mongoose.model('Audit_Logs', schema);