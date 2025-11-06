
import React, { useState } from "react";
import DocumentContent from "../../content/DocumentContent.json";
import * as styles from "./styles";

const DocumentPage = () => {
  const [selectedView, setSelectedView] = useState<keyof typeof DocumentContent>(Object.keys(DocumentContent)[0] as keyof typeof DocumentContent);
  const features = DocumentContent[selectedView] || [];

  return (
    <styles.Outer>
      <styles.DocLayout>
        <styles.DocSidebar>
          <styles.DocSidebarTitle>功能分组</styles.DocSidebarTitle>
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
          <styles.CardList>
            {features.map((feature: { title: string; description: string }) => (
              <styles.Card key={feature.title}>
                <styles.CardTitle>{feature.title}</styles.CardTitle>
                <styles.CardDesc>{feature.description}</styles.CardDesc>
              </styles.Card>
            ))}
          </styles.CardList>
        </styles.DocMain>
      </styles.DocLayout>
    </styles.Outer>
  );
};

export default DocumentPage;
