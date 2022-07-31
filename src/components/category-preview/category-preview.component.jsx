import {
  CategoryPreviewContainer,
  CategoryTitleContainer,
  CategoryTitle,
  PreviewMap,
} from "./category-preview.styles.jsx";
import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <CategoryTitleContainer>
        <CategoryTitle to={title}>{title.toUpperCase()}</CategoryTitle>
      </CategoryTitleContainer>
      <PreviewMap>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </PreviewMap>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
