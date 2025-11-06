

import styled from "styled-components";

export const Outer = styled.div`
  background: #f5f6fa;
  min-height: 100vh;
`;

export const TopBar = styled.div`
  width: 100%;
  height: 64px;
  background: #18216d;
  display: flex;
  align-items: center;
  padding: 0 32px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(24, 33, 109, 0.08);
`;

export const TopBarTitle = styled.h1`
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
`;

export const DocLayout = styled.div`
  display: flex;
  width: 100%;
  margin-top: 32px;
  background: #fff;
  border-radius: 0 12px 12px 0;
  box-shadow: 0 2px 16px rgba(24, 33, 109, 0.06);
  min-height: 600px;
`;

export const DocSidebar = styled.aside`
  width: 260px;
  min-width: 220px;
  background: #18216d;
  border-right: 1px solid #eaeaea;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  border-radius: 12px 0 0 12px;
  position: relative;
  left: 0;
  top: 0;
  height: auto;
`;

export const DocSidebarTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  padding: 0 32px 16px 32px;
`;

export const DocSidebarItem = styled.div<{active?: boolean}>`
  padding: 16px 32px;
  cursor: pointer;
  color: ${({active}) => (active ? "#fff" : "#bfc8e6")};
  font-weight: ${({active}) => (active ? 700 : 500)};
  background: ${({active}) => (active ? "#2531a9" : "transparent")};
  border-left: ${({active}) => (active ? "4px solid #fff" : "4px solid transparent")};
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #2531a9;
    color: #fff;
  }
`;

export const DocMain = styled.main`
  flex: 1;
  padding: 40px 48px;
  background: #fff;
  min-height: 600px;
  border-radius: 0 12px 12px 0;
`;

export const DocMainTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #18216d;
  margin-bottom: 24px;
`;

export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
`;

export const Card = styled.div`
  background: #f5f6fa;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(24, 33, 109, 0.04);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #18216d;
  margin-bottom: 12px;
`;

export const CardDesc = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0;
`;
