import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheets/font-awesome/font-awesome.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';

const ARTICLE_DETAIL = [{
  uuid: "1",
  imgurl: "https://ccviolett.github.io/images/avatar.jpg",
  title: "第二篇文章",
  author: {
    imgurl: "https://ccviolett.github.io/images/avatar.jpg",
    name: "Bob",
    level: 2
  },
  date: "2022年05月18日",
  context: "描述 2，测试测试测试",
  comment: [
    {
      uuid: "1",
      user: {
        imgurl: "https://ccviolett.github.io/images/avatar.jpg",
        name: "Bob",
        level: 2
      },
      context: "评论一下aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      v2list: null
    }, {
      user: {
        imgurl: "https://ccviolett.github.io/images/avatar.jpg",
        name: "Car",
        level: 2
      },
      context: "测试",
      v2list: [
        {
          uuid: "3",
          user: {
            imgurl: "https://ccviolett.github.io/images/avatar.jpg",
            name: "Alice",
            level: 2
          },
          context: "二级测试"
        }, {
          uuid: "4",
          user: {
            imgurl: "https://ccviolett.github.io/images/avatar.jpg",
            name: "Alice",
            level: 2
          },
          context: "二级测试 2"
        }
      ]
    }
  ]
}];

const ARTICLE_LIST = [
  { uuid: "1",  author: "Alice", date: "1分钟前", tag: ["后端", "Java", "Nginx"], title: "第一篇文章", imgurl: null, abstract: "描述 1", action: { view: 5, vote: 3, comment: 2 }},
  { uuid: "2", author: "Bob", date: "3分钟前", tag: ["前端"], title: "第二篇文章", imgurl: "https://ccviolett.github.io/images/avatar.jpg", abstract: "描述 2", action: { view: 7, vote: 4, comment: 3}},
  { uuid: "3", author: "Bob", date: "3分钟前", tag: ["前端"], title: "第二篇文章", imgurl: "https://ccviolett.github.io/images/avatar.jpg", abstract: "描述 2", action: { view: 7, vote: 4, comment: 3}},
  { uuid: "4", author: "Bob", date: "3分钟前", tag: ["前端"], title: "第二篇文章", imgurl: "https://ccviolett.github.io/images/avatar.jpg", abstract: "描述 2", action: { view: 7, vote: 4, comment: 3}},
  { uuid: "5", author: "Bob", date: "3分钟前", tag: ["前端"], title: "第二篇文章", imgurl: "https://ccviolett.github.io/images/avatar.jpg", abstract: "描述 2", action: { view: 7, vote: 4, comment: 3}},
  { uuid: "6", author: "Bob", date: "3分钟前", tag: ["前端"], title: "第二篇文章", imgurl: "https://ccviolett.github.io/images/avatar.jpg", abstract: "描述 2", action: { view: 7, vote: 4, comment: 3}},
  { uuid: "7", author: "Bob", date: "3分钟前", tag: ["前端"], title: "第二篇文章", imgurl: "https://ccviolett.github.io/images/avatar.jpg", abstract: "描述 2", action: { view: 7, vote: 4, comment: 3}},
]

const TAB = [
  {v1: "推荐", v2: [ "全部", "Java", "Js" ]},
  {v1: "后端", v2: [ "全部", "后端", "Java"]},
  {v1: "前端", v2: [ "全部", "前端", "Js" ]}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App articleDetail={ARTICLE_DETAIL} articleList={ARTICLE_LIST} tab={TAB} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
