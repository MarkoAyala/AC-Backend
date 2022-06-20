import {prop , getModelForClass} from '@typegoose/typegoose';

class User{
    @prop({required:true})
    firstName:string

    @prop({required:true})
    lastName:string

    @prop({required:true})
    userName:string

    @prop({required:true, trim:true})
    email:string

    @prop({required:true})
    password:string

    @prop({required:true})
    role:number

    @prop({required:true})
    country:string
}

const UserModel = getModelForClass(User);
export default UserModel;