
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #f5f6fa;
  box-shadow: 0 8px 32px rgba(24,33,109,0.12);
  border-radius: 16px;
  min-width: 180px;
  z-index: 1000;
  margin-top: 12px;
  padding: 8px 0;
  animation: dropdownFadeIn 0.25s cubic-bezier(.4,0,.2,1);

  @keyframes dropdownFadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const DropdownMenuItem = styled.div`
  padding: 14px 32px;
  cursor: pointer;
  white-space: nowrap;
  color: #18216d;
  font-family: 'Motiva Sans Bold', serif;
  font-size: 1.08rem;
  font-weight: 600;
  border-bottom: 1px solid #eaeaea;
  border-radius: 10px;
  transition: background 0.18s, color 0.18s;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #e3f2fd;
    color: #2531a9;
  }
`;
export const HeaderSection = styled("header")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2000;
  background: #fff;
  box-shadow: 0 2px 8px rgba(24,33,109,0.06);
  padding: 1rem 0.5rem;

  .ant-row-space-between {
    align-items: center;
    text-align: center;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
`;

export const NavLink = styled("div")`
  display: inline-block;
  text-align: center;
`;

export const CustomNavLink = styled("div")`
  width: 203px;
  display: inline-block;

  @media only screen and (max-width: 411px) {
    width: 150px;
  }

  @media only screen and (max-width: 320px) {
    width: 118px;
  }
`;

export const Burger = styled("div")`
  @media only screen and (max-width: 890px) {
    display: block;
  }

  display: none;

  svg {
    fill: #2e186a;
  }
`;

export const NotHidden = styled("div")`
  @media only screen and (max-width: 890px) {
    display: none;
  }
`;

export const Menu = styled("h5")`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

export const CustomNavLinkSmall = styled(NavLink)`
  font-size: 1.2rem;
  color: #18216d;
  transition: color 0.2s ease-in;
  margin: 0.5rem 2rem;
  position: relative;
  cursor: pointer;
  user-select: none;
  z-index: 1010;

  @media only screen and (max-width: 768px) {
    margin: 1.25rem 2rem;
  }
`;

export const Label = styled("span")`
  font-weight: 500;
  color: #404041;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Outline = styled(MenuOutlined)`
  font-size: 22px;
`;

export const Span = styled("span")`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  user-select: none;

  &:hover,
  &:active,
  &:focus {
    color: rgb(255, 130, 92);
    text-underline-position: under;
    text-decoration: rgb(255, 130, 92) wavy underline;
  }
`;
