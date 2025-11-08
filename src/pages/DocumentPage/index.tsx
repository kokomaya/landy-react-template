
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useParams } from "react-router-dom";
import ArViewerDocumentContent from "../../content/ArViewerDocumentContent.json";
import AutosarLLMDocumentContent from "../../content/AutosarLLMDocumentContent.json";
import ArxmlEditorDocumentContent from "../../content/ArxmlEditorDocumentContent.json";
import ContinueDocumentContent from "../../content/ContinueDocumentContent.json";
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
  // 字符串直接渲染为 Markdown
  if (typeof content === "string") {
    return <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>;
  }
  // 数组：递归渲染每个元素（支持字符串、对象、数组）
  if (Array.isArray(content)) {
    // 如果数组全是字符串，则合并为一个 markdown 块
    if (content.every((item) => typeof item === "string")) {
      return <ReactMarkdown components={markdownComponents}>{content.join("\n\n")}</ReactMarkdown>;
    }
    // 否则递归渲染每个元素
    return (
      <>
        {content.map((item: any, idx: number) => (
          <div key={idx}>{renderContent(item)}</div>
        ))}
      </>
    );
  }
  // 对象：分组或键值对
  if (typeof content === "object" && content !== null) {
    // 特殊处理页面与功能分组
    if (Object.values(content).length > 0 && typeof Object.values(content)[0] === "object" && !content.title && !content.description) {
      return Object.entries(content).map(([group, value]) => (
        <div key={group} style={{marginBottom: 32}}>
          <styles.DocMainTitle>{group}</styles.DocMainTitle>
          {renderContent(value)}
        </div>
      ));
    }
    // 普通对象（如 title/description）
    return (
      <>
        {content.title && <styles.CardTitle>{content.title}</styles.CardTitle>}
        {content.description && (Array.isArray(content.description)
          ? renderContent(content.description)
          : <ReactMarkdown components={markdownComponents}>{content.description}</ReactMarkdown>)}
        {Object.entries(content).map(([key, value]) => (
          key !== "title" && key !== "description" ? (
            <div key={key} style={{marginBottom: 16}}>
              <strong>{key}：</strong>
              {renderContent(value)}
            </div>
          ) : null
        ))}
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
