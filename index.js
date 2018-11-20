const PORT = 3484;									//Đặt địa chỉ Port được mở ra để tạo ra chương trình mạng Socket Server
 
var http = require('http') 							//#include thư viện http - Tìm thêm về từ khóa http nodejs trên google nếu bạn muốn tìm hiểu thêm. Nhưng theo kinh nghiệm của mình, Javascript trong môi trường NodeJS cực kỳ rộng lớn, khi bạn bí thì nên tìm hiểu không nên ngồi đọc và cố gắng học thuộc hết cái reference (Tài liêu tham khảo) của nodejs làm gì. Vỡ não đó!
var socketio = require('socket.io')				//#include thư viện socketio
 
var ip = require('ip');

require("./database/mongoose");
const Model = require("mongoose").model("Model");

var express =require("express");
var expressApp = new express();
var bodyParser = require('body-parser');

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({extended:true}))
expressApp.use(require('./router'));

var app = http.createServer(expressApp);					//#Khởi tạo một chương trình mạng (app)
expressApp.use(express.static('webapp'));
app.listen(PORT);										// Cho socket server (chương trình mạng) lắng nghe ở port 3484
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)

var io = socketio(app);								//#Phải khởi tạo io sau khi tạo app!
var espNamespace = io.of('/esp'); // socket lang nghe từ esp
var webNamespace = io.of('/web'); // socket lang nghe tu webapp

var middleware = require('socketio-wildcard')();		//Để có thể bắt toàn bộ lệnh!
espNamespace.use(middleware);									//Khi esp8266 emit bất kỳ lệnh gì lên thì sẽ bị bắt
webNamespace.use(middleware);									//Khi webapp emit bất kỳ lệnh gì lên thì sẽ bị bắt

//giải nén chuỗi JSON thành các OBJECT
function ParseJson(jsondata) { // jsondata phai la string
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}
 
webNamespace.on("connection",(socket)=>{ // lang nghe socket connect tu webapp
    console.log("Webapp connected!"); // xuat thong bao conneted!
})
//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
// io.on('connection', function(socket) {	//'connection' (1) này khác gì với 'connection' (2)
// 	//hàm console.log giống như hàm Serial.println trên Arduino
//     console.log("Connected"); //In ra màn hình console là đã có một Socket Client kết nối thành công.
	
// 	//Gửi đi lệnh 'welcome' với một tham số là một biến JSON. Trong biến JSON này có một tham số và tham số đó tên là message. Kiểu dữ liệu của tham số là một chuối.
//     socket.emit('welcome', {
//         message: 'Connected !!!!'
//     });
	
// 	//Khi lắng nghe được lệnh "connection" với một tham số, và chúng ta đặt tên tham số là message. Mình thích gì thì mình đặt thôi.
// 	//'connection' (2)
//     socket.on('connection', function(message) {
//         console.log(message);
//     });
	
// 	//khi lắng nghe được lệnh "atime" với một tham số, và chúng ta đặt tên tham số đó là data. Mình thích thì mình đặt thôi
//     socket.on('atime', function(data) {
//         sendTime();
//         console.log(data);
//     });
	
// 	socket.on('arduino', function (data) {
// 	  io.sockets.emit('arduino', { message: 'R0' });
//       console.log(data);
//     });
// });

espNamespace.on('connection', function(socket) { // socket lang nghe connection tu esp
	//hàm console.log giống như hàm Serial.println trên Arduino
    console.log("Esp connected!"); //In ra màn hình console là đã có một Socket Client kết nối thành công.

	//Khi lắng nghe được lệnh "connection" với một tham số, và chúng ta đặt tên tham số là message. Mình thích gì thì mình đặt thôi.
    // socket.on('connection', function(message) {
    //     console.log(message);
    // });

	//khi lắng nghe được lệnh "atime" với một tham số, và chúng ta đặt tên tham số đó là data
    socket.on('atime', async function(result) { 
    
        if (Model){ // check Model mongoose not null
            console.log(result); // xuat ra console data nhan duoc tu esp
            let model = new Model(); //tao moi model
            model.setObject(result); // set thuoc tinh nhan duoc tu data esp
            await model.create(); // save model to mongodb
            webNamespace.emit("info", result); // gui data nhan duoc tu esp len web app with eventName 'info'
        }
    });
});