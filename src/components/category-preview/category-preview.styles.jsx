import styled from "styled-components";
import { Link } from "react-router-dom";

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const CategoryTitleContainer = styled.h2`
  text-align: center;
  margin: 50px 0 30px;
`;

export const CategoryTitle = styled(Link)`
  font-size: 40px;
  font-weight: 300;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const PreviewMap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`;
