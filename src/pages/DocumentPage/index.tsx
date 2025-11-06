
import React, { useState } from "react";
import DocumentContent from "../../content/DocumentContent.json";
import * as styles from "./styles";


const renderContent = (content: any) => {
  // 字符串直接渲染
  if (typeof content === "string") {
    return <styles.CardDesc>{content}</styles.CardDesc>;
  }
  // 数组：可能是命令列表或功能卡片
  if (Array.isArray(content)) {
    // 判断是否为功能卡片（对象数组）
    if (content.length > 0 && typeof content[0] === "object") {
      return (
        <styles.CardList>
          {content.map((item: any, idx: number) => (
            <styles.Card key={item.title || idx}>
              {item.title && <styles.CardTitle>{item.title}</styles.CardTitle>}
              {item.description && <styles.CardDesc>{item.description}</styles.CardDesc>}
              {!item.title && typeof item === "string" && <styles.CardDesc>{item}</styles.CardDesc>}
            </styles.Card>
          ))}
        </styles.CardList>
      );
    }
    // 普通字符串数组
    return (
      <ul>
        {content.map((item: string, idx: number) => (
          <li key={idx}><styles.CardDesc>{item}</styles.CardDesc></li>
        ))}
      </ul>
    );
  }
  // 对象：分组或键值对
  if (typeof content === "object") {
    // 特殊处理页面与功能分组
    if (Object.values(content).length > 0 && typeof Object.values(content)[0] === "object") {
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
        {content.description && <styles.CardDesc>{content.description}</styles.CardDesc>}
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

const DocumentPage = () => {
  const [selectedView, setSelectedView] = useState<keyof typeof DocumentContent>(Object.keys(DocumentContent)[0] as keyof typeof DocumentContent);
  const content = DocumentContent[selectedView];

  return (
    <styles.Outer>
      <styles.DocLayout>
        <styles.DocSidebar>
          <styles.DocSidebarTitle>目录</styles.DocSidebarTitle>
          {Object.keys(DocumentContent).map((view) => (
            <styles.DocSidebarItem
              key={view}
              active={selectedView === view}
              onClick={() => setSelectedView(view as keyof typeof DocumentContent)}
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
