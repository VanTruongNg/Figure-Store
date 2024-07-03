const Image = ({
  imgSrc,
  className,
  alt
}: {
  imgSrc?: any;
  className: any;
  alt?: any
}) => {
  return <img className={className} src={imgSrc} alt={alt} />;
};

export default Image;
