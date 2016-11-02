//benchmark 用于测试函数运行效率


var Benchmark = require('benchmark');
var colors = require('colors');
var suite = new Benchmark.Suite;
var timeRank = [];
var test1 = 'fnName';
var test2 = 'callee';

var param = 20;

var obj = {};

obj.fn = function popSort1(n){
    if(n==1||n==2)
        return 1;
    return obj.fn(n-1)+obj.fn(n-2);
}
function popSort2(n){
    if(n==1||n==2)
        return 1;
    return arguments.callee(n-1)+arguments.callee(n-2);
}

// 添加测试
// parseInt Number + 三种操作将数据转化为数值的效率
suite
    .add(test1, function() {
        obj.fn(param);
    })
    .add(test2, function() {
        popSort2(param);
    })
   
// 每个测试跑完后，输出信息
.on('cycle', function(event) {
        var info = String(event.target);
        var obj = {};
        console.log(info);
        obj.name = info.split(' x ')[0];
        obj.time = info.split(' x ')[1].split(' ops/sec')[0];
        timeRank.push(obj);
    })
    .on('complete', function() {
    	//运行时间排序
        for (var i = 0, len = timeRank.length; i < len; i++) {
            for (var j = 0; j < len - i - 1; j++) {
                //比较相邻元素
                if (+timeRank[j].time.replace(/,/g,'') < +timeRank[j + 1].time.replace(/,/g,'')) {
                    [timeRank[j].time, timeRank[j + 1].time] = [timeRank[j + 1].time, timeRank[j].time];
                    [timeRank[j].name, timeRank[j + 1].name] = [timeRank[j + 1].name, timeRank[j].name];
                }
            }
        }
        var label = [];
        timeRank.forEach((val)=>{
        	label.push(val.name + ' ' + val.time)
        })
        console.log(('Alltest : ' + this.filter('successful').map('name')).yellow);
        console.log(('Allrank : ' + label.join('\n          ')).blue);
        console.log(('Fastest : ' + this.filter('fastest').map('name')).green);
        console.log(('Slowest : ' + this.filter('slowest').map('name')).red);
    })
    // 这里的 async 不是 mocha 测试那个 async 的意思，这个选项与它的时间计算有关，默认勾上就好了。
    .run({ 'async': true });
