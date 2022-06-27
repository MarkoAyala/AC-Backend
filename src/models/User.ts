import {prop , getModelForClass, modelOptions, Ref} from '@typegoose/typegoose';
import {Product} from './Product';

@modelOptions({
    schemaOptions:{
        timestamps:true,
    }
})
export class User{
    @prop({required:true})
    firstName:string;

    @prop({required:true})
    lastName:string;

    @prop({required:true})
    userName:string;

    @prop({required:true, trim:true})
    email:string;

    @prop({required:true})
    password:string;

    @prop({required:true})
    role:number;

    @prop({required:true})
    country:string;

    @prop({ type: ()=> [Product], ref:()=> Product, required:true , default:[]})
    shoppingCart?:Array<Ref<Product>>;
}

export const UserModel = getModelForClass(User);