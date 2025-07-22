import { IKImage } from 'imagekitio-react';

const ImageKitWrapper = ({ src, className, w, h, alt}) => {
  return (
    <IKImage 
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        path={src}
        // src='https://ik.imagekit.io/MZIYAD/logo.png'
        className={className} 
        loading="lazy"
        lqip={{active: true, quality: 20}}
        alt={alt} 
        width={w}
        height={h}
        transformation={[
        {
          width: w,
          height: h,
        }
        ]}
        />
  )
}

export default ImageKitWrapper
