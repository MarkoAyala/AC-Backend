import {prop , getModelForClass} from '@typegoose/typegoose';


export class Images{
    @prop({required:true,trim:true})
    name:string

    @prop({requied:true})
    url:string
}

export const ImagesModel = getModelForClass(Images);