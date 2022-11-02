import { Helmet, HelmetData } from "react-helmet-async";

const ProductDetailHelmet = ({ title, metaDescription, imageUrl }) => {
  const helmetData = new HelmetData({});
  return (
    <Helmet helmetData={helmetData}>
      <title>{"ConsTrade: " + title}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" key="description" content={metaDescription} />
      <meta name="title" key="title" content={"ConsTrade: " + title} />
      <meta property="og:title" key="og:title" content={title} />
      <meta property="og:locale" key="og:locale" content="en_US" />
      <meta property="og:type" key="og:type" content="website" />
      <meta
        property="og:description"
        key="og:description"
        content={metaDescription}
      />
      <meta property="og:image" key="og:image" content={imageUrl} />
    </Helmet>
  );
};

export default ProductDetailHelmet;
