import React from 'react';
import { Tabs } from 'antd';
const MenuBar = () => (
  <Tabs
  defaultActiveKey="1"
  centered
  items={new Array(3).fill(null).map((_, i) => {
    const id = String(i + 1);
    const tabNames = ["Home", "Login", "About us"];
    return {
      label: tabNames[i],
      key: id,
      // children: `Content of Tab Pane ${id}`,
    };
  })}
/>
);
export default MenuBar;