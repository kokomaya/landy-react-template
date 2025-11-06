import { useState, useRef, useEffect } from "react";
import ProductMenu from "../../content/ProductMenu.json";
import { Row, Col, Drawer } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { DownOutlined } from "@ant-design/icons";
import { Button } from "../../common/Button";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
  DropdownMenu,
  DropdownMenuItem,
} from "./styles";

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);

  const toggleButton = () => {
    setVisibility(!visible);
  };

  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    if (!productMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (productMenuRef.current && !productMenuRef.current.contains(event.target as Node)) {
        setProductMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productMenuOpen]);
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({ behavior: "smooth" });
    setVisibility(false);
    setProductMenuOpen(false);
  };
  const handleProductClick = () => {
    setProductMenuOpen((open) => !open);
  };
  const handleMenuOptionClick = (key: string) => {
    setProductMenuOpen(false);
    // 示例：滚动到对应section
    scrollTo(key);
  };
  const MenuItem = () => (
    <>
      <CustomNavLinkSmall onClick={() => scrollTo("about")}> 
        <Span>{t("About")}</Span>
      </CustomNavLinkSmall>
      <CustomNavLinkSmall onClick={() => scrollTo("mission")}> 
        <Span>{t("Motivation")}</Span>
      </CustomNavLinkSmall>
      <div style={{ position: "relative", display: "inline-block" }} ref={productMenuRef}>
        <CustomNavLinkSmall onClick={handleProductClick} style={{ userSelect: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Span>
            {t("Product")}
            <DownOutlined style={{ fontSize: 12, marginLeft: 2, transition: "transform 0.2s", transform: productMenuOpen ? "rotate(180deg)" : "none" }} />
          </Span>
        </CustomNavLinkSmall>
        {productMenuOpen && (
          <DropdownMenu>
            {ProductMenu.options.map((opt: { key: string; label: string }) => (
              <DropdownMenuItem
                key={opt.key}
                onClick={() => handleMenuOptionClick(opt.key)}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
        )}
      </div>
      <CustomNavLinkSmall
        style={{ width: "180px" }}
        onClick={() => scrollTo("contact")}
      >
        <Span>
          <Button>{t("Contact")}</Button>
        </Span>
      </CustomNavLinkSmall>
    </>
  );

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" width="101px" height="64px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={toggleButton}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={toggleButton}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
