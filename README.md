# echarts-package.js
echarts的二次封装，开发时可以更多的关注数据，用更少的代码实现图表。
<br>
<br>
<br>
## 引用

通过 ```<script src="echarts-package.js">``` 引用即可。

注意在引用 echarts-package.js 之前应该首先引用 echarts 。

通过 script 标签引入后，会生成全局变量 charts ， 如果变量冲突，可使用 charts 的方法 noConflict 解决变量冲突。  <br>
例如 ```var ch = charts.noConflict();``` 即可用 ch 代替 charts 变量，并使 charts 被释放。
<br>
<br>
<br>
## 设置默认选项

```charts.setDefault(type, public, component, data);```

1. type:图表类型
2. public:公共选项(可选)
3. component:组件选项(可选)
4. data:数据选项(可选)

public/component/data选项详见[echarts文档中的option](http://echarts.baidu.com/echarts2/doc/doc.html#Option)
<br>
<br>
<br>
## 更改默认选项

```charts.changeDefault(type, newItem);```

1. type:图表类型
2. newItem:新的选项

你可以通过changeDefault方法来增加和改变type类型图表的默认选项，使用该方法后，新的图表默认的选项就会改变。
<br>
<br>
<br>
## 克隆选项

```charts.cloneDefault(type, source);```

1. type:图表类型
2. source:被clone的目标

假设你使用bar类型的图表时设置了默认选项，现在你想写一个line类型的图表，但它的选项和bar类型有很多重复，你可以用cloneDefault的方法clone出line图表的默认选项，再用changeDefault方法改变某些选项。
<br>
<br>
<br>
## charts方法
charts的方法支持链式调用，例如：
<code><pre>
charts('bar', '#myCharts')
    .title('我的柱形图')
    .axis('xAxis', ['a', 'b', 'c', 'd', 'e'])
    .axis('yAxis', 'value')
    .series([{name:"abc",data:[5,4,6,8,30]}])
    .create();
</pre></code>

```charts(type, selector);```

1. type:图表类型
2. selector:css选择器

你需要通过charts方法初始化一个图表，指定图表的type类型并使用css选择器选择一个具有宽高的DOM元素。
***
```charts.title(text, config);```

1. type:图表类型
2. config:配置项(可选)

title方法用来设置图表标题，config用来配置默认选项的额外选项，比如你可以通过传入{subtext:'副标题'}来设置副标题。
***
```charts.legend(data, config);```

1. data:详见[echarts文档legend中的data](http://echarts.baidu.com/echarts2/doc/doc.html#Legend)
2. config:配置项(可选)

legend方法用来设置图例
***
```charts.axis(axis, data, config);```

1. axis:坐标轴类型，传入xAxis或yAxis
2. data:坐标轴的data，可以传入数组或坐标轴类型字符串
3. config:配置项(可选)

axis方法用来设置坐标轴数据。
***
```charts.series(series, config);```

1. series:详见[echarts文档中的series](http://echarts.baidu.com/echarts2/doc/doc.html#Series)
2. config:配置项(可选)

series方法用来设置数据。
***
```charts.create();```

create方法最后调用，无需传入参数，使用默认的配置选项和传入的数据创建图表。



