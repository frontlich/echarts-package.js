/**
 *based on echarts3.4.0
 *author:frontlich
 */
(function(window, ec, undefined){

    var _charts = window.charts;

    var option = {};

    //Object.assign()   ES2015
    //该方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    if (typeof Object.assign != 'function') {
      Object.assign = function(target) {
        'use strict';
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source != null) {
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      };
    };

    function clone(target){          //克隆对象
        
        if(typeof target != 'object' || target == null){
            return target
        };

        if(target instanceof Array){
            var newArr = [];
            for(var i = 0; i < target.length; i++){
                newArr.push(clone(target[i]));
            }
            return newArr;
        };

        var newObj = new Object();
        
        for(var i in target){
            newObj[i] = clone(target[i]);
        }
        
        return newObj;
    };
    
    var Charts = function(type, selector){

        this.option = clone(option[type] || {});

        this.title = function(text, config){         //设置标题

            var oTitle = this.option.title || {};

            this.option.title = config ? Object.assign(oTitle, config) : oTitle;

            this.option.title.text = text;
            
            return this;
        };

        this.legend = function(data, config){     //设置图例

            var oLegend = this.option.legend || {};

            this.option.legend = config ? Object.assign(oLegend, config) : oLegend;

            this.option.legend.data = data;

            return this;
        };

        this.axis = function(axis, data, config){    //设置坐标轴

            var oAxis = this.option[axis] || {};

            this.option[axis] = config ? Object.assign(oAxis, config) : oAxis;

            if(typeof data === 'string'){
                this.option[axis].type = data;
                this.option[axis].data = [];
            }else if(typeof data === 'object'){
                this.option[axis].type = 'category';
                this.option[axis].data = data;
            }else{
                console.log('The first parameter is error');
            }

            return this;
        };

        this.series = function(series, config){          //type:类型， series:同ehcarts的series

            var oSeries = clone(this.option.series || [{}]);

            this.option.series = clone(config ? [Object.assign(oSeries[0], config)] : oSeries);

            for(var i = 0; i < series.length; i++){
                this.option.series[i] = Object.assign({type:type}, oSeries[0], series[i]);
            };

            return this;
        };
        
        this.create = function(){              //创建图表
            var oChart = ec.init(document.querySelector(selector));
            //console.log(this.option);
            oChart.setOption(this.option);
        };
    };


    var charts = function(type, selector){
        return new Charts(type, selector);
    };

    charts.setDefault = function(type, public, component, data){   //设置所有图表默认设置

        option[type] = Object.assign(public || {}, component || {}, data || {});

    };

    charts.changeDefault = function(type, newItem){       //只能添加和更改默认设置项，不能删除

        function change(option, newItem){
            for(var j in newItem){
                if(option.hasOwnProperty(j)){
                    if(typeof newItem[j] != 'object' || newItem[j] == null || newItem[j] instanceof Array){
                        option = Object.assign(option, newItem);
                    }else{
                        change(option[j], newItem[j]);
                    }
                }else{
                    option[j] = newItem[j];
                }
            }
        };

        change(option[type], newItem);
    };

    charts.cloneDefault = function(type, source){
        option[type] = clone(option[source]);
    };

    charts.noConflict = function(){       //解决变量冲突

        if(window.charts === charts){
            window.charts = _charts;
        };

        return charts;
    };

    window.charts = charts;
    //module.exports = charts;

})(window, echarts);