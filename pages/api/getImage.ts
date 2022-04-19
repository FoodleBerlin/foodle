import {s3} from '../../components/Create/Uploader'


export default async function handler(req: any, res: any) {

  try {
    let imageUrl:string = s3.getSignedUrl('getObject', {
        Bucket: 'foodle-bucket',
        Key: req.query.file,
    });
  return res.status(200).json({imageUrl}); 
  } catch (error) {
    console.log(error)
  }
}


  