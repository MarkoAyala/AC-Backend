import {prop , getModelForClass} from '@typegoose/typegoose';


export class Images{
    @prop({required:true,trim:true})
    name:string

    @prop({requied:true})
    url:string

    @prop({requied:true})
    public_id:string

}

export const ImagesModel = getModelForClass(Images);