
//benchmark 用于测试函数运行效率


var Benchmark = require('benchmark');
var colors = require('colors');
var suite = new Benchmark.Suite;
var number = '100';

var int1 = function (str) {
  return +str;
};

var int2 = function (str) {
  return parseInt(str, 10);
};

var int3 = function (str) {
  return Number(str);
};
// 添加测试
// parseInt Number + 三种操作将数据转化为数值的效率
suite
.add('[]', function() {
	var a = [];
})
.add('parseInt', function() {
	var a = new Array();
})

// 每个测试跑完后，输出信息
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log(('Alltest : ' + this.filter('successful').map('name')).yellow);
  console.log(('Fastest : ' + this.filter('fastest').map('name')).green);
  console.log(('Slowest : ' + this.filter('slowest').map('name')).red);
})
// 这里的 async 不是 mocha 测试那个 async 的意思，这个选项与它的时间计算有关，默认勾上就好了。
.run({ 'async': true });