import { lazy } from "react";
import AutosarLLM from "../../content/AutosarLLM.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import ArViewerContent from "../../content/ArViewerContent.json";
import Motivations from "../../content/Motivations.json";
import ContactContent from "../../content/ContactContent.json";
import ArxmlEditorContent from "../../content/ArxmlEditorContent.json";
import ContinueContent from "../../content/ContinueContent.json";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const Home = () => {
  const handleMiddleBlockClick = () => {
    window.location.href = "/document";
  };
  return (
    <Container>
      <ScrollToTop />

      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
        video={MiddleBlockContent.video}
        direction="right"
        onButtonClick={handleMiddleBlockClick}
      />

      <ContentBlock
        direction="left"
        title={ArViewerContent.title}
        content={ArViewerContent.text}
        button={ArViewerContent.button}
        icon="developer.svg"
        id="arviewer"
      />

      <ContentBlock
        direction="right"
        title={AutosarLLM.title}
        content={AutosarLLM.text}
        button={AutosarLLM.button}
        icon="product-launch.svg"
        id="autosarllm"
      />

      <ContentBlock
        direction="left"
        title={ArxmlEditorContent.title}
        content={ArxmlEditorContent.text}
        button={ArxmlEditorContent.button}
        icon="robot-come-out-with-pad.svg"
        id="arxmleditor"
      />

      <ContentBlock
        direction="right"
        title={ContinueContent.title}
        content={ContinueContent.text}
        button={ContinueContent.button}
        icon="people-doing-leisure-activities.svg"
        id="continue"
      />

      <ContentBlock
        direction="left"
        title={Motivations.title}
        content={Motivations.text}
        section={Motivations.section}
        icon="waving.svg"
        id="product"
      />
      <ContentBlock
        direction="right"
        title={AboutContent.title}
        content={AboutContent.text}
        icon="graphs.svg"
        id="about"
      />
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  );
};

export default Home;
