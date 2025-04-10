import { NextRequest } from 'next/server';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  const body = await request.json();

  let URLs: any = [];

  const URL_EXPIRATION_SECONDS = 30000;

  AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: 'ap-south-1',
  });

  const s3 = new AWS.S3();

  const getUploadURL = async () => {
    try {
      // const randomID = Math.floor(Math.random() * 10000000);
      const uuid = uuidv4();
      const Key = `${uuid}.jpg`;

      const s3Params = {
        Bucket: 'cozzy.corner',
        Key: `allProducts/${Key}`,
        Expires: URL_EXPIRATION_SECONDS,
        ContentType: 'image/jpeg',
      };

      const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
      URLs.push(uploadURL);
    } catch (error) {
      console.error('Error generating upload URL:', error);
      throw error;
    }
  };

  try {
    for (let i = 0; i < body.count; i++) {
      await getUploadURL();
    }
  } catch (error) {
    console.error('Error uploading files:', error);
  }

  return new Response(JSON.stringify(URLs), {
    status: 200,
  });
}
