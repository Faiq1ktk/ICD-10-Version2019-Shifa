import { Tree } from "antd";
import "antd/dist/reset.css";

import indexData from "./data/icd10-2019/index.json";
import chapterData from "./data/icd10-2019/chapters/chapter-01/chapter.json";
import a00Data from "./data/icd10-2019/chapters/chapter-01/blocks/a00-a09/categories/a00.json";
import a01Data from "./data/icd10-2019/chapters/chapter-01/blocks/a00-a09/categories/a01.json";
import a02Data from "./data/icd10-2019/chapters/chapter-01/blocks/a00-a09/categories/a02.json";

import "./styles/icd/icd.css";

function App() {
  const categoryMap = {
    "category-a00": a00Data,
    "category-a01": a01Data,
    "category-a02": a02Data,
  };

  const blockNodes = chapterData.children.map((block) => {
    if (block.id === "block-a00-a09") {
      const categories = Object.values(categoryMap);

      return {
        title: `${block.code} ${block.title}`,
        key: block.id,
        children: categories.map((category) => ({
          title: `${category.code} ${category.title}`,
          key: category.id,
          children: category.children.map((item) => ({
            title: `${item.code} ${item.title}`,
            key: item.id,
            isLeaf: true,
          })),
        })),
      };
    }

    return {
      title: `${block.code} ${block.title}`,
      key: block.id,
      children: [],
    };
  });

  const treeData = [
    {
      title: indexData.title,
      key: indexData.id,
      children: [
        {
          title: `${chapterData.code} ${chapterData.title}`,
          key: chapterData.id,
          children: blockNodes,
        },
      ],
    },
  ];

  return (
    <div className="icd-page">
      <div className="icd-header">
        <h1>ICD-10 Version:2019</h1>

        <div className="icd-search">
          <span>Search</span>
          <input />
        </div>
      </div>

      <div className="icd-body">
        <div className="icd-sidebar">
          <Tree showLine treeData={treeData} />
        </div>

        <div className="icd-detail">
          <p>
            International Statistical Classification of Diseases and Related
            Health Problems
          </p>
          <h2>Chapter {chapterData.code}</h2>
          <h2>{chapterData.title}</h2>
          <h2>(A00-B99)</h2>
        </div>
      </div>
    </div>
  );
}

export default App;