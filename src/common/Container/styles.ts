// src/common/Container/styles.ts
import styled from "styled-components";

export const StyledContainer = styled.div<{ border?: boolean }>`
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 60px;
  position: relative;

  border-top: ${(p) => (p.border ? "1px solid #CDD1D4" : "none")};

  @media (max-width: 1024px) {
    padding-inline: 30px;
  }
  @media (max-width: 768px) {
    padding-inline: 18px;
  }
`;
