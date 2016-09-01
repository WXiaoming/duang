## 配置说明

* Duang
  * [logo](#duanglogo)
  * [webcome](#duangwebcome)
  * [session](#duangsession)
    * [authorize](#duangsessionauthorize)
    * [signin](#duangsessionsignin)
    * [method](#duangsessionmethod)
  * [const](#duangconst)
  * [schemes](#duangschemes)
* [Scheme](#scheme)
  * [operations](#schemeoperations)
  * [inputs](#schemeinputs)
  * [filters](#schemefilters)
  * [fields](#schemefields)
  * [caption](#schemecaption)
  * [actions](#schemeactions)
  * [captionType](#schemecaptionType)
  * [key](#schemekey)
  * [title](#schemetitle)
  * [pageSize](#schemepagesize)
  * [where](#schemewhere)
* [Input](#input)
  * [key](#inputkey)
  * [title](#inputtitle)
  * [component](#inputcomponent)
  * [args](#inputargs)
* [Output](#output)
  * [key](#outputkey)
  * [title](#outputtitle)
  * [component](#outputcomponent)
  * [args](#outputargs)
* [Action](#action)
  * [title](#actiontitle)
  * [method](#actionmethod)
  * [target](#actiontarget)
  * [key](#actionkey)
  * [module](#actionmodule)
  * [params](#actionparams)
  * [where](#actionwhere)

###### Duang::logo

类型：`Output`

描述：显示在页面左上角，默认显示「Duang」。

###### Duang::webcome

类型：`Output`

描述：当页菜单没有任何项被选中时显示在页面中心部分，默认显示一个超大的「Duang!!!」。

###### Duang::session

类型：`dict`

描述：页面鉴权配置

###### Duang::session::authorize

类型：`string`

描述：鉴权接口，默认不鉴权

###### Duang::session::method

类型：`string`

描述：鉴权接口对应的 HTTP 方法，默认 GET


###### Duang::session::signin

类型：`string`

描述：鉴权失败后跳转的登陆页面

###### Duang::session::const

类型：`dict`

描述：一些页面提示字符的 i18n 字典


###### Duang::session::schemes

类型：`list`

描述：一个 `Scheme` 对象的数组，配置这个系统的所有表

###### Scheme

类型：`dict`

描述：每个 `Scheme` 表示一个表，里面配置里对这张表的所有操作

###### Scheme::operations

类型：`list`

描述：一个 `Action` 类型的数组，配置表级别的操作，比如新增，清空

###### Scheme::actions

类型：`list`

描述：一个 `Action` 类型的数组，配置行级别的操作，比如编辑、删除

###### Scheme::inputs

类型：`list`

描述：一个 `Input` 类型的数组，配置记录添加和编辑时需要的表单

###### Scheme::filters

类型：`list`

描述：一个 `Input` 类型的数组，配置列表的可用筛选条件

###### Scheme::fields

类型：`list`

描述：一个 `Output` 类型的数组，配置列表需要展示的字段

###### Scheme::caption

类型：`list`

描述：一个 `Output` 类型的数组，配置列表页的表头

###### Scheme::captionType

类型：`string`

取值：table control

描述：`Scheme::caption` 的显示类型

###### Scheme::key

类型：`string`

描述：这张表对应的接口

###### Scheme::title

类型：`string`

描述：这张表在左侧菜单上显示的名称

###### Scheme::where

类型：`dict`

描述：进入这张表的默认查询条件

###### Scheme::pageSize

类型：`number`

描述：列表页每页显示的条数，默认显示所有

##### Input

类型：`dict`

描述：定义一个输入控件

##### Input::Key

类型：`string`

描述：对应的字段名

##### Input::title

类型：`string`

描述：字段的文字描述

##### Input::component

类型：`string`

描述：控件名

##### Input::args

类型：`dict`

描述：控件的参数

##### Output

类型：`dict`

描述：定义一个输入控件

##### Output::Key

类型：`string`

描述：对应的字段名

##### Output::title

类型：`string`

描述：字段的文字描述

##### Output::component

类型：`string`

描述：控件名

##### Output::args

类型：`dict`

描述：控件的参数

##### Action

类型：`dict`

描述：定义一个操作（按钮）

##### Action::title

类型：`string`

描述：按钮文字

##### Action::method

类型：`string`

描述：行为名称

##### Action::target

类型：`string`

描述：打开方式

取值：

  * _blank 打开新页面
  * _self 当前页面跳转（默认）
  * dialog 对话框方式打开

##### Action::key

类型：`string`

描述：对应的接口

##### Action::module

类型：`string`

描述：打开的页面类型

取值：

  * editor 编辑
  * list 列表

##### Action::params

类型：`dict`

描述：打开的页面参数

##### Action::where

类型：`dict`

描述：打开的页面筛选条件
