//benchmark 用于测试函数运行效率


var Benchmark = require('benchmark');
var colors = require('colors');
var suite = new Benchmark.Suite;
var timeRank = [];
var test1 = 'popsort';
var test2 = 'updatesort';
var test3 = 'select';
var test4 = 'insert';
var test5 = 'quickSort';
var param = [];
for(var i =0;i<1000;i++){
	param.push(Math.floor(Math.random()*10000));
}
//冒泡
//记录最后交换数据的位置，减小时间复杂度

function popSort1(arr) {

    for (var i = 0, len = arr.length; i < len; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            //比较相邻元素
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    //arr.reduce
    return arr;
};
function popSort2(arr) {
    var i = arr.length - 1; //初始时,最后位置保持不变
    while (i > 0) {
        var pos = 0; //每趟开始时,无记录交换
        for (var j = 0; j < i; j++)
            if (arr[j] > arr[j + 1]) {
                pos = j; //记录交换的位置
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        i = pos; //为下一趟排序作准备
    }
    return arr
}

function popSort3(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        var min = i;
        //中待排序数组中 最小值得下标
        for (j = i + 1; j < len; j++) {
            arr[min] > arr[j] && (min = j)
        }
        [arr[min], arr[i]] = [arr[i], arr[min]]
    }
    return arr
}

function popSort4(arr) {
    var len = arr.length
    var max;
    for (var i = 1; i < len; i++) {
        var newArr = arr.splice(i, 1)[0];
        for (var j = i - 1; j >= 0; j--) {
            if (arr[j] > newArr) {
                max = j;
            }
        }
        arr.splice(max, 0, newArr)
    };
    return arr;
}

function popSort5(arr) {
    if (arr.length <= 1) {
        return arr;
    }　　
    var pivotIndex = Math.floor(arr.length / 2);　　
    var pivot = arr.splice(pivotIndex, 1)[0];　　
    var left = [];　　
    var right = [];　　
    for (var i = 0; i < arr.length; i++) {　　　　
        if (arr[i] < pivot) {　　　　　　
            left.push(arr[i]);　　　　
        } else {　　　　　　
            right.push(arr[i]);　　　　
        }　　
    }　　
    return popSort5(left).concat([pivot], popSort5(right));
};

// 添加测试
// parseInt Number + 三种操作将数据转化为数值的效率
suite
    .add(test1, function() {
        popSort1(param);
    })
    .add(test2, function() {
        popSort2(param);
    })
    .add(test3, function () {
        popSort3(param);
    })
    .add(test4, function () {
        popSort4(param);
    })
    .add(test5, function () {
        popSort5(param);
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
