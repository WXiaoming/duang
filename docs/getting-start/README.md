这篇文档中我们会从零开始，一步一步搭建一个订单管理 CMS 系统。

Duang 的配置文件主要由以下几部分组成：

#### [Schemes](https://github.com/eleme/duang/blob/master/docs/api.md#doc-schemes)

`Schemes` 对应数据库表，这个集合中的表都会展现在 Duang 中并根据配置对接口发送对目标表增删查改的操作，假设我们的业务现在包含 `User` 和 `Order` 两张表，对应的配置就可能是下面这样：

```javascript
{
  "schemes": [
    {
      "key": "users",
      "title": "用户列表",
      "module": "list",
      "fields": [
        { "key": "id", "title": "id" },
        { "key": "name", "title": "昵称" },
        { "key": "email", "title": "邮箱" }
      ]
    },
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "fields": [
        { "key": "id", "title": "id" },
        { "key": "title", "title": "订单名称" },
        {
          "key": "createdAt",
          "title": "创建日期",
          "args": {
            "component": "DateTime"
          }
        }
      ],
      "operations": [
        { "title": "创建", "method": "create", "target": "dialog" }
      ],
      "actions": [
        { "title": "编辑", "method": "edit", "target": "dialog" },
        {
          "title": "删除",
          "method": "delete",
          "confirm": {
            "title": "确认删除？",
            "text": "记录删除后不可恢复",
            "cancel": { "text": "再考虑考虑" },
            "yes": { "text": "删除" }
          }
        }
      ],
      "inputs": [
        { "key": "title", "title": "订单名称" },
        {
          "key": "createdAt",
          "title": "创建日期",
          "component": "DateTime"
        }
      ],
      "filters": [
        {
          "key": "created_at_from",
          "title": "创建时间从",
          "component": "Date"
        },
        {
          "key": "created_at_to",
          "title": "创建时间到",
          "component": "Date",
          "args": { "offset": 864E5 }
        }
      ]
    }
  ]
}
```

上面的配置就是我们订单管理 CMS 最终的样子，其中的 `Operations`、`Inputs`、`Actions` 等配置接下来我们会逐一讲解，现在我们只需要关注 `schemes` 的配置。

我们尝试使用上面的配置作为 `duang.json`，我们会发现，虽然前端可以看到用户和订单的展示界面，但是表格里却没有数据。这是因为 duang 会基于这个配置往 `/users` 和 `/orders` 发送一个 `get` 请求获取数据以展示。API 相对链接基于 `Scheme::key` 的配置，这就是我们前面提到的基于约定的 API 设计规范。

#### [Schemes::inputs](https://github.com/eleme/duang/blob/master/docs/api.md#doc-scheme-inputs)

`Inputs` 用来接受用户的输入以提交给后端接口，通常在对表记录的新建、更新、删除等操作时使用。让我们为订单管理模块增加编辑的功能：

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "inputs": [
        { "key": "title": "title": "订单名称" },
        {
          "key": "createdAt",
          "title": "创建日期".
          "args": {
            "component": "DateTime"
          }
        }
      ]
    }
  ]
}
```

现在，我们配置好了编辑记录时需要的字段，但是界面上还没有提供对应操作的入口，我们还需要配置 `Actions` 才可以对记录进行操作。

#### [Schemes::actions](https://github.com/eleme/duang/blob/master/docs/api.md#doc-scheme-inputs)

`Actions` 用来配置记录的操作，如编辑、删除。其中可供编辑的字段会根据 `Inputs` 展示在表格中供用户填写，这意味着接口返回的 `item<List>` 数据中必须有 `id` 字段，这样 duang 会往 `/:scheme/:id` 发送一个请求获取对应记录的数据。

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "inputs": [
        { "key": "title": "title": "订单名称" },
        {
          "key": "createdAt",
          "title": "创建日期".
          "args": {
            "component": "DateTime"
          }
        }
      ],
      "actions": [
        { "title": "编辑", "method": "edit", "target": "dialog" },
        {
          "title": "删除",
          "method": "delete",
          "confirm": {
            "title": "确认删除？",
            "text": "记录删除后不可恢复",
            "cancel": { "text": "再考虑考虑" },
            "yes": { "text": "删除" }
          }
        }
      ]
    }
  ]
}
```

现在我们之前配置的 `Inputs` 在编辑记录的时候起作用了，之前提到 `Inputs` 还有一个作用是在对表进行操作的时候，比如新建记录。接下来让我们看下如何通过配置 `Operations` 为我们的订单管理系统增加一个创建订单记录的功能

#### [Schemes::operations](https://github.com/eleme/duang/blob/master/docs/api.md#doc-scheme-operations)

`Operations` 同 `Actions` 类似，区别在于它是用来配置对表的操作，如新增、清空等。

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "inputs": [
        { "key": "title": "title": "订单名称" },
        {
          "key": "createdAt",
          "title": "创建日期".
          "args": {
            "component": "DateTime"
          }
        }
      ],
      "actions": [
        { "title": "编辑", "method": "edit", "target": "dialog" },
        {
          "title": "删除",
          "method": "delete",
          "confirm": {
            "title": "确认删除？",
            "text": "记录删除后不可恢复",
            "cancel": { "text": "再考虑考虑" },
            "yes": { "text": "删除" }
          }
        }
      ]
    },
    "operations": [
      { "title": "创建", "method": "create", "target": "dialog" }
    ]
  ]
}
```

#### [Schemes::fields](https://github.com/eleme/duang/blob/master/docs/api.md#doc-scheme-fields)

通过前面的配置，Duang 现在应该可以为我们的订单管理系统提供订单的新增、编辑和删除功能了，但是没有搭建接口的话我们无法从 `/orders` 获取订单数据，从而也无法进行订单的增删查改，在了解 `Fields` 的作用之前，我们需要在本地搭建一个 API 服务让我们的订单管理系统真正的跑起来，这里以 nodejs 为例

```javascript
const app = require('koa')();
const router = require('koa-router')();

var orders = [];

router.get('/orders', function *next() {
  this.set('content-type', 'application/json');
  this.body = JSON.stringify(orders);
});
// index.html 和 duang.json 都放在 static 目录下
app.use(require('koa-static')('static'));
app.use(router.routes());
app.listen(3000);
```

保存退出后运行 `node index.js`，打开浏览器访问 `localhost:3000`，现在我们创建订单不会产生 `404` 的响应了，但是新建的订单仍然没有显示在前端，这是因为没有配置 `Fields`。

数据库记录中，通常我们并不会通过接口返回所有的字段，比如 `is_delete`、`updated_at`、`created_at` 等等，通过 配置 `Fields` 选择展现那些字段。并且仅当 `Fields` 配置不为空时，Duang 才会请求 `/:scheme` 获取列表数据

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "inputs": [
        { "key": "title": "title": "订单名称" },
        {
          "key": "createdAt",
          "title": "创建日期".
          "args": {
            "component": "DateTime"
          }
        }
      ],
      "actions": [
        { "title": "编辑", "method": "edit", "target": "dialog" },
        {
          "title": "删除",
          "method": "delete",
          "confirm": {
            "title": "确认删除？",
            "text": "记录删除后不可恢复",
            "cancel": { "text": "再考虑考虑" },
            "yes": { "text": "删除" }
          }
        }
      ]
    },
    "operations": [
      { "title": "创建", "method": "create", "target": "dialog" }
    ],
    "fields": [
      { "key": "id", "title": "id" },
      { "key": "name", "title": "订单名称" },
      { "key": "createdAt", "title": "创建日期" }
    ]
  ]
}
```

#### [Schemes::filters](https://github.com/eleme/duang/blob/master/docs/api.md#doc-scheme-filters)

最后一个配置项是 `Filters`，顾名思义 `Filters` 是用来对列表数据进行筛选，发送 `/orders/?where={"status":"success"}` 请求并更新视图，下面给我们的订单管理系统加一个根据日期范围筛选订单的功能

```javascript
{
  "schemes": [
    {
      "key": "orders",
      "title": "订单列表",
      "module": "list",
      "inputs": [
        { "key": "title": "title": "订单名称" },
        {
          "key": "createdAt",
          "title": "创建日期".
          "args": {
            "component": "DateTime"
          }
        }
      ],
      "actions": [
        { "title": "编辑", "method": "edit", "target": "dialog" },
        {
          "title": "删除",
          "method": "delete",
          "confirm": {
            "title": "确认删除？",
            "text": "记录删除后不可恢复",
            "cancel": { "text": "再考虑考虑" },
            "yes": { "text": "删除" }
          }
        }
      ]
    },
    "operations": [
      { "title": "创建", "method": "create", "target": "dialog" }
    ],
    "fields": [
      { "key": "id", "title": "id" },
      { "key": "name", "title": "订单名称" },
      { "key": "createdAt", "title": "创建日期" }
    ],
    "filters": [
      { "key": "created_at_from", "title": "创建日期从", "component": "DateTime" },
      {
        "key": "created_at_to",
        "title": "创建日期到",
        "component": "DateTime",
        "args": { "offset": 864E5 }
      }
    ]
  ]
}
```

至此，我们的订单管理系统搭建完成，如果你的系统需要更多的输入/输出控件和交互方式，查看 [Input](https://github.com/eleme/duang/blob/master/docs/components/Input.md) 和 [Output](https://github.com/eleme/duang/blob/master/docs/components/Output.md) 以及 [Action](https://github.com/eleme/duang/blob/master/docs/modules/action.md)，你的系统需要权限管理的话可以查看 [Permissions](https://github.com/eleme/duang/blob/master/docs/permissions.md)
