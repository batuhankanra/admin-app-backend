import Enum from "../config/Enum.js";
import auditLogsSchema from "../models/auditLogs.schema.js";

let instance=null
class AuditLogs {
    constaructor(){
        if(!instance){
            instance=this
        }
        return instance
    }
    info(email,location,proc_type,log){
        this.#saveToDB(Enum.LOG_LEVELS.INFO,email,location,proc_type,log)
    }
    debug(email,location,proc_type,log){
        this.#saveToDB(Enum.LOG_LEVELS.DEBUG,email,location,proc_type,log)
    }
    warn(email,location,proc_type,log){
        this.#saveToDB(Enum.LOG_LEVELS.WARN,email,location,proc_type,log)
    }
    error(email,location,proc_type,log){
        this.#saveToDB(Enum.LOG_LEVELS.ERROR,email,location,proc_type,log)
    }
    verbose(email,location,proc_type,log){
        this.#saveToDB(Enum.LOG_LEVELS.VERBOSE,email,location,proc_type,log)
    }
    http(email,location,proc_type,log){
        this.#saveToDB(Enum.LOG_LEVELS.HTTP,email,location,proc_type,log)
    }
    



    #saveToDB(level,email,location,proc_type,log){
        const auditLog=new auditLogsSchema({
            level,
            email,
            location,
            proc_type,
            log
        })
        auditLog.save()

    }
}
export default new AuditLogs()
