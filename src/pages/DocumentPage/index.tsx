
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useParams } from "react-router-dom";
import ArViewerDocumentContent from "../../content/ArViewerDocumentContent.json";
import AutosarLLMDocumentContent from "../../content/AutosarLLMDocumentContent.json";
import ArxmlEditorDocumentContent from "../../content/ArxmlEditorDocumentContent.json";
import ContinueDocumentContent from "../../content/ContinueDocumentContent.json";
import ArxmlPreviewerDocumentContent from "../../content/ArxmlPreviewerDocumentContent.json"; 
import AutosarCodeGenDocumentContent from "../../content/AutosarCodeGenDocumentContent.json";
import * as styles from "./styles";


const markdownComponents = {
  p: styles.CardDesc,
  code({node, inline, className, children, ...props}: any) {
    // 支持无语言标记的代码块
    const match = /language-(\w+)/.exec(className || "");
    if (!inline) {
      return (
        <SyntaxHighlighter
          style={oneDark}
          language={match ? match[1] : undefined}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }
    return <code className={className} {...props}>{children}</code>;
  }
};

const renderContent = (content: any): React.ReactNode => {
  // ====== 1. 字符串处理：新增图片/视频解析 ======
  if (typeof content === "string") {
    const raw = content.trim();
    // image//: 开头 → 图片
    if (raw.startsWith("image//:")) {
      const realPath = raw.replace("image//:", "").trim();
      return (
        <img
          src={realPath}
          alt=""
          style={{ maxWidth: "100%", borderRadius: 8, margin: "12px 0" }}
        />
      );
    }

    // video//: 开头 → 视频
    if (raw.startsWith("video//:")) {
      const realPath = raw.replace("video//:", "").trim();
      return (
        <video
          src={realPath}
          controls
          style={{ width: "100%", borderRadius: 8, margin: "12px 0" }}
        />
      );
    }

    // 默认渲染 Markdown
    return <ReactMarkdown components={markdownComponents}>{raw}</ReactMarkdown>;
  }

  // ====== 2. 数组处理 ======
  if (Array.isArray(content)) {
    return (
      <>
        {content.map((item: any, idx: number) => {

          // 如果 item 是 ReactElement（如 <p>image//:xxx</p>）
          if (React.isValidElement(item)) {

            const element = item as React.ReactElement<any>;
            let texts: string[] = [];

            const extractText = (node: any) => {
              if (typeof node === "string") {
                texts.push(node);
              } else if (Array.isArray(node)) {
                node.forEach(extractText);
              } else if (node && node.props && node.props.children) {
                extractText(node.props.children);
              }
            };

            extractText(element.props.children);

            if (texts.length > 0) {
              return (
                <div key={idx}>
                  {texts.map((t, i) => (
                    <div key={i}>{renderContent(t)}</div>
                  ))}
                </div>
              );
            }
          }

          return <div key={idx}>{renderContent(item)}</div>;
        })}
      </>
    );
  }

  // ====== 3. 对象（分组/键值） ======
  if (typeof content === "object" && content !== null) {
    if (
      Object.values(content).length > 0 &&
      typeof Object.values(content)[0] === "object" &&
      !content.title &&
      !content.description
    ) {
      return Object.entries(content).map(([group, value]) => (
        <div key={group} style={{ marginBottom: 32 }}>
          <styles.DocMainTitle>{group}</styles.DocMainTitle>
          {renderContent(value)}
        </div>
      ));
    }

    return (
      <>
        {content.title && <styles.CardTitle>{content.title}</styles.CardTitle>}
        {content.description &&
          (Array.isArray(content.description)
            ? renderContent(content.description)
            : <ReactMarkdown components={markdownComponents}>{content.description}</ReactMarkdown>)}

        {Object.entries(content).map(([key, value]) =>
          key !== "title" && key !== "description" ? (
            <div key={key} style={{ marginBottom: 16 }}>
              <strong>{key}：</strong>
              {renderContent(value)}
            </div>
          ) : null
        )}
      </>
    );
  }

  return null;
};

const documentMap: Record<string, any> = {
  arviewer: ArViewerDocumentContent,
  autosarllm: AutosarLLMDocumentContent,
  arxmleditor: ArxmlEditorDocumentContent,
  continue: ContinueDocumentContent,
  arxmlpreviewer: ArxmlPreviewerDocumentContent,
  autosarcodegen: AutosarCodeGenDocumentContent,
};

const DocumentPage = () => {
  const { id } = useParams<{ id?: string }>();
  const docId = id ? id.toLowerCase() : "arviewer";
  const docContent = documentMap[docId] || ArViewerDocumentContent;
  //const [selectedView, setSelectedView] = useState<keyof typeof docContent>(Object.keys(docContent)[0] as keyof typeof docContent);
  const [selectedView, setSelectedView] = useState<string>(Object.keys(docContent)[0]);

  const content = docContent[selectedView];

  return (
    <styles.Outer>
      <styles.DocLayout>
        <styles.DocSidebar>
          <styles.DocSidebarTitle>目录</styles.DocSidebarTitle>
          {Object.keys(docContent).map((view) => (
            <styles.DocSidebarItem
              key={view}
              active={selectedView === view}
              onClick={() =>  setSelectedView(String(view))}
            >
              {view}
            </styles.DocSidebarItem>
          ))}
        </styles.DocSidebar>
        <styles.DocMain>
          <styles.DocMainTitle>{selectedView}</styles.DocMainTitle>
          {renderContent(content)}
        </styles.DocMain>
      </styles.DocLayout>
    </styles.Outer>
  );
};

export default DocumentPage;
