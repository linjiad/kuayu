var http=require('http'); //用来启服务
var urlTool = require('url'); // 解析url
//开启服务
var server=http.createServer(function(req,res){
    var pathname = urlTool.parse(req.url).pathname;// 获取请求路径
            // 跨域出现的问题
            if(pathname === "/a"){
                res.writeHeader(200,{
                    'content-type' : 'text/html;charset="utf-8"'
                });
                res.write("接收到了请求");//将index.html显示在客户端
                res.end();
            }
            // 用jsonp解决跨域问题
            else if (pathname === "/b"){
                // console.log(urlTool.parse(req.url).query); // 获取参数
                var data = urlTool.parse(req.url,true).query; // 转换参数类型
                // 返回前端一个方法方法名为前面传过来的callback123,参数为括号中的JSON.stringify(data)，返回到页面上会找页面是否有这个方法然后直接执行
                var str = data.callback123 + '(' + JSON.stringify(data) + ')';
                // console.log(str);
                res.write(str);
                res.end();
            }
            // 简单请求处理跨域问题
            else if (pathname === "/c"){
                // 设置可以跨域的ip地址
                res.setHeader('Access-Control-Allow-Origin', '*');
                // 设置可以跨域的方法，如果不设置DELETE会报错
                res.setHeader('Access-Control-Allow-Methods', 'GET');
                res.write(`返回了`);
                res.end();
            }
            // 复杂请求处理跨域问题
            else if (pathname === "/d"){
                // 设置可以跨域的ip地址
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', '*');
                // 设置允许跨域的请求头
                res.setHeader('Access-Control-Allow-Headers', 'linjiad');
                // 设置自检查的最大时间
                res.setHeader('Access-Control-Max-Age', '3600');
                res.write(`返回了`);
                res.end();
            }
            // 处理cookie
            else if (pathname === "/f"){
                // 查看cookie
                console.log(req.headers.cookie);
                // 获取客户端地址
                var origin = req.headers.origin;
                // 设置可以跨域的ip地址
                res.setHeader('Access-Control-Allow-Origin', origin);
                res.setHeader('Access-Control-Allow-Methods', '*');
                // 获取请求头
                var header = req.rawHeaders;
                // 设置允许跨域的请求头
                res.setHeader('Access-Control-Allow-Headers', header);
                // 设置自检查的最大时间
                res.setHeader('Access-Control-Max-Age', '3600');
                // 允许coolie跨域
                res.setHeader('Access-Control-Allow-Credentials', true);
                res.write(`返回了`);
                res.end();
            }
            // nginx配置header
            else if(pathname === "/g"){
                res.writeHeader(200,{
                    'content-type' : 'text/html;charset="utf-8"'
                });
                res.write("接收到了请求");//将index.html显示在客户端
                res.end();
            }
            else{
                res.write("404");//将index.html显示在客户端
                res.end();
            }
        });
server.listen(8888); //端口号
console.log('服务器开启成功')