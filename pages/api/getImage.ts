import { GetServerSidePropsContext } from 'next'
import {s3} from './upload-image'
// export async function getServerSideProps({ req }: GetServerSidePropsContext) {
//   if (!req.cookies['jwt']) {
//     return {
//       props: {},
//       redirect: {
//         permanent: false,
//         destination: '/',
//       },
//     };
//   }
// }
export const getResourceUrl = async( fileName: string)=>{
  // console.log("HEEEEEEEEEEEEEYYYYYYYY")
  // const filename = encodeURIComponent(file ? file.name : '');
  const signedUrlRes = await fetch(`/api/getImage?file=${fileName}`);
  const signedUrlData = await signedUrlRes.json();
  return signedUrlData.imageUrl;
}

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


  