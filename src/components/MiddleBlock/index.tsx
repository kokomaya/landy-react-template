import { Row, Col } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";

interface MiddleBlockProps {
  title: string;
  content: string;
  button: { title: string; link: string };
  t: TFunction;
  onButtonClick?: () => void;
  video?: string;
  direction?: 'left' | 'right';
}

const MiddleBlock = ({ title, content, button, t, onButtonClick, video, direction = 'right' }: MiddleBlockProps) => {
  //   const scrollTo = (id: string) => {
  //   const element = document.getElementById(id) as HTMLDivElement;
  //   element.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // };
  return (
    <MiddleBlockSection>
      <Slide direction="up" triggerOnce>
        <Row justify="center" align="middle">
          <ContentWrapper style={{ display: 'flex', alignItems: 'center', gap: '10rem', justifyContent: 'center' }}>
            {video && direction === 'left' && (
              <div style={{ flex: 1, minWidth: 480, maxWidth: 640 }}>
                <video src={video} controls style={{ width: '100%', height: '340px', borderRadius: 16, boxShadow: '0 4px 24px rgba(24,33,109,0.12)' }} />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              {button && (
                <Button name="submit" onClick={() => window.open(button.link, '_blank')}>
                  {t(button.title)}
                </Button>
              )}
            </div>
            {video && direction === 'right' && (
              <div style={{ flex: 1, minWidth: 480, maxWidth: 640 }}>
                <video src={video} controls style={{ width: '100%', height: '340px', borderRadius: 16, boxShadow: '0 4px 24px rgba(24,33,109,0.12)' }} />
              </div>
            )}
          </ContentWrapper>
        </Row>
      </Slide>
    </MiddleBlockSection>
  );
};

export default withTranslation()(MiddleBlock);
