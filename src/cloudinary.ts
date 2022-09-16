require('dotenv').config();
const cloudinary = require('cloudinary');

const {CLOUD_NAME, API_KEY, API_SECRET} = process.env

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true
});

export const destroyMultimedia = async(path:string)=>{
    if(!path) throw new Error('Path no existe rey')
    cloudinary.v2.uploader.destroy(path).catch(()=>console.log('delete cloudinary failed'));
}