import aws from 'aws-sdk'
export const s3 = new aws.S3({
  accessKeyId: process.env.APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.APP_AWS_SECRET_KEY,
  region: process.env.APP_AWS_REGION,
})

export const deleteResource = async(filename:string)=>{
    const res = await fetch(`/api/deleteImage?file=${filename}`);
    const data = await res.json();
}


export const getResourceUrl = async(file:File | null)=>{
  const signedUrlRes = await fetch(`/api/getImage?file=${file ? file.name : ''}`);
  const signedUrlData = await signedUrlRes.json();
  return signedUrlData.imageUrl;
}

export const uploadResource= async (file:File | null, filename: string)=>{
  const res = await fetch(`/api/uploadImage?file=${filename}`);
  const data = await res.json();
  const formData = new FormData();

  Object.entries({ ...data.fields, file }).forEach(([key, value]: any) => {
    formData.append(key, value);
  });
  await fetch(data.url, {
    method: 'POST',
    body: formData,
  });
  return await data;
}