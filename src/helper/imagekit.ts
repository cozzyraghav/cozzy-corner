export const convertS3ToImageKit = (s3Url: string): string => {
  console.log(s3Url);
  return s3Url.replace("https://s3.ap-south-1.amazonaws.com/cozzy.corner/", "");
};

// https://ik.imagekit.io/ashishbishnoi/booble-dr-strange/1000114773.png

// https://s3.ap-south-1.amazonaws.com/cozzy.corner/booble-dr-strange/1000114773.png
