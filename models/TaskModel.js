import {Schema,model,models} from "mongoose";

const taskSchema= new Schema({
    username:{
        type:String,
        required:true,
    },
secret:{
    type:String,
    required:true,
},

})

const Username= models.Username|| model("Username",taskSchema)

export default Username;