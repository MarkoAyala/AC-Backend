import {prop , getModelForClass, modelOptions} from '@typegoose/typegoose';
import {Product} from './Product';

@modelOptions({
    schemaOptions:{
        timestamps:true,
    }
})
export class User{
    @prop({required:true, default:"Incomplete"})
    firstName:string;

    @prop({required:true, default:"Incomplete"})
    lastName:string;

    @prop({required:true})
    nickname:string;

    @prop({required:true, trim:true})
    email:string;

    @prop({required:true})
    picture:string;

/*     @prop({required:true})
    password:string; */

    @prop({required:true, default:0})
    role:number;

    @prop({required:true , default:'Incomplete'})
    country:string;

    @prop({ type: ()=> [Product], ref:()=> Product, required:true , default:[]})
    shoppingCart?:Product[];
}

export const UserModel = getModelForClass(User);