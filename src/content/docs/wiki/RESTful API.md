---
title: RESTful API
description: RESTful API（Representational State Transfer API）是一种基于REST架构风格的应用程序接口设计方法，广泛用于Web服务和系统之间的数据交换。REST由Roy Fielding在2000年的博士论文中首次提出，强调无状态性、客户端-服务器分离、统一接口、可缓存性等原则。RESTful API的核心是通过HTTP协议进行资源的创建、读取、更新和删除操作（CRUD）。
---


# RESTful API
RESTful API（Representational State Transfer API）是一种基于REST架构风格的应用程序接口设计方法，广泛用于Web服务和系统之间的数据交换。REST由Roy Fielding在2000年的博士论文中首次提出，强调无状态性、客户端-服务器分离、统一接口、可缓存性等原则。RESTful API的核心是通过HTTP协议进行资源的创建、读取、更新和删除操作（CRUD）。

## RESTful API 的特点

- **无状态性**：每个请求都包含了所有必要的信息（如身份验证信息），服务器不会在请求之间保留客户端的状态。
- **客户端-服务器架构**：客户端负责用户界面和用户体验，服务器负责数据存储和业务逻辑，二者相互独立。
- **统一接口**：RESTful API使用标准的HTTP动词（GET、POST、PUT、DELETE等）进行操作，接口设计规范一致，易于理解和使用。
- **可缓存性**：响应数据可以被标记为可缓存，以提高性能和减少服务器负载。
- **分层系统**：通过中间层（如负载均衡器、代理服务器）提升系统的可伸缩性和安全性。
- **按需编码**：服务器可以将代码或脚本发送到客户端执行，以增强客户端功能。

## HTTP动词

- **GET**：用于读取资源，不会对服务器上的资源造成任何影响。
- **POST**：用于创建新资源或提交数据，服务器处理请求后创建新资源。
- **PUT**：用于更新现有资源，将客户端提供的数据覆盖服务器上的资源。
- **DELETE**：用于删除服务器上的资源。
- **PATCH**：用于部分更新资源，改变资源的部分内容。

## URL设计

RESTful API使用统一资源标识符（URI）来表示资源，每个资源有一个唯一的URL。资源之间的关系通过URL层级表示。

示例URL设计：

- `GET /books`：获取所有图书列表。
- `GET /books/{id}`：获取特定ID的图书。
- `POST /books`：创建新图书。
- `PUT /books/{id}`：更新特定ID的图书。
- `DELETE /books/{id}`：删除特定ID的图书。

## 响应状态码

RESTful API使用HTTP状态码来表示请求的处理结果：

- **200 OK**：请求成功，返回数据。
- **201 Created**：资源创建成功。
- **204 No Content**：请求成功，无返回内容。
- **400 Bad Request**：请求无效或格式错误。
- **401 Unauthorized**：请求未经授权。
- **404 Not Found**：请求的资源不存在。
- **500 Internal Server Error**：服务器内部错误。

## 示例

以下是一个简单的RESTful API示例，使用Node.js和Express框架创建一个书籍管理系统。

### 服务器代码（Node.js + Express）

javascript

```
const express = require('express');
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// 获取所有书籍
app.get('/books', (req, res) => {
  res.json(books);
});

// 获取特定书籍
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

// 创建新书籍
app.post('/books', (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(book);
  res.status(201).json(book);
});

// 更新书籍
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

// 删除书籍
app.delete('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  const index = books.indexOf(book);
  books.splice(index, 1);
  res.status(204).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

## 总结

RESTful API是一种简单、灵活、易于扩展的Web服务设计方法，通过标准的HTTP协议和动词进行操作，使得客户端和服务器之间的通信更加直观和高效。它适用于各种规模的Web应用程序，从小型项目到大型分布式系统。

:::tip[🎉 节点推荐]
- 🚀 [Cyberguard: 解锁Netflix/Hbo/Disney+/Dazn等流媒体,18.00元/月](https://www.cyberguard.best/#/register?code=XsreC0T5)<br>
- 🚀 [优信云：IEPL/IPLC 高速专线，￥15.00/月](https://www.优信云.com/#/register?code=JRtE5uIV)<br>
- 🚀 [尔湾云：最大峰值1000Mbps，全流媒体及ChatGPT解锁！最低12元/月](https://erwan6.net/auth/register?code=BoObCd)<br>
- 🚀 [TNTCloud：新开机场，季付30，每月低至￥10.00/月](https://haibing822.tntvipaff.cc/#/register?code=GtjJVgml)<br>
- 🚀 [魔戒：不限时，不限制使用人数，直至套餐流量用完，低至￥14.9/130G流量](https://mojie.app/#/register?code=sSdtPtLo)<br>
- 🚀 [宝可梦星云：新用户首单：9折优惠码：9999，低至5.9/月 ](https://a.suola.link/pokemon)<br>
- 🚀 [NanoCloud: 绑定TG机器人每天领取免费流量，月付最低1元/月](https://edu.uodoo.bid/auth/register?code=JMiOQDHf)<br>
- 🚀 [肥猫云：全专线中转隧道，高速大宽带不限设备数，低至6元/月（年付）](https://fchb1188.fcvipaff.cc/register?aff=X1vZd2wf)<br>
- 🚀 [疾风云：包年 6.9折 优惠码: jf2025](https://homes.tr25.cn?code=ReCm)<br>
- 🚀 [闪狐云：不限速，不限设备。高速专线。20元/月](https://inv02.ffaff.cc/register?aff=WQApz2pv)
:::

:::note[💬 交流群]

- 🫂 Telegram:[@jichang360](https://t.me/jichang360)

:::