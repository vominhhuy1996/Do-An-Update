#include <ESP8266WiFi.h>
#include "SocketIOClient.h"
#include "ArduinoJson.h"
 
SocketIOClient client;
const char* ssid = "Minh Thu";          //Tên mạng Wifi mà Socket server của bạn đang kết nối
const char* password = "vominhhuy1996";  //Pass mạng wifi ahihi, anh em rãnh thì share pass cho mình với.
 
char host[] = "192.168.1.7";  //Địa chỉ IP dịch vụ   , hãy thay đổi nó theo địa chỉ IP Socket server của bạn.
int port = 3484;                  //Cổng dịch vụ socket server do chúng ta tạo!
char socket_namespace[] = "esp";
 
//từ khóa extern: dùng để #include các biến toàn cục ở một số thư viện khác. Trong thư viện SocketIOClient có hai biến toàn cục
// mà chúng ta cần quan tâm đó là
// RID: Tên hàm (tên sự kiện
// Rfull: Danh sách biến (được đóng gói lại là chuối JSON)
extern String RID;
extern String Rfull;
// 
 
//Một số biến dùng cho việc tạo một task
unsigned long previousMillis = 0;
long interval = 500;
 
void setup()
{
    //Bật baudrate ở mức 115200 để giao tiếp với máy tính qua Serial
    Serial.begin(115200);             // Debug message talking on baudrate 115200
    delay(10);
 
    //Việc đầu tiên cần làm là kết nối vào mạng Wifi
    Serial.print("Ket noi vao mang ");
    Serial.println(ssid);
 
    //Kết nối vào mạng Wifi
    WiFi.begin(ssid, password);
 
    //Chờ đến khi đã được kết nối
    while (WiFi.status() != WL_CONNECTED) { //Thoát ra khỏi vòng 
        delay(500);
        Serial.print('.');
    }
 
    Serial.println();
    Serial.println(F("Da ket noi WiFi"));
    Serial.println(F("Di chi IP cua ESP8266 (Socket Client ESP8266): "));
    Serial.println(WiFi.localIP());
 
    if (!client.connect(host, port, socket_namespace)) {
        Serial.println(F("Ket noi den socket server that bai!"));
        return;
    }
 
    //Khi đã kết nối thành công
    if (client.connected()) {
        //Thì gửi sự kiện ("connection") đến Socket server ahihi.
        client.send("connection", "message", "Connected !!!!");
    }
}
//int quang_duong = 0;
//float lit_xang = 30;

char input;
String output = "";
void loop()
{
  DynamicJsonBuffer jsonBuffer; // tạo bộ nhớ đệm động
  JsonObject& root = jsonBuffer.createObject();// tao json object => {}
  root["data"] = jsonBuffer.createObject(); // tao thuoc tinh data la json object de nhan data tu arduino;
  
  while(Serial.available()){ // Serial.available() return result != 0
    input = Serial.read(); // lay 1 ki tu tu chuoi json tu arduino gan vao input
    output+= input;
    if (input == '}'){ // ket thuc 1 json object
      // luc nay` output la json string => `{"quang_duong":12, "lit_xang": 12, "do_mo_buom_ga":12, "toc_do": 12`
      root["data"] = jsonBuffer.parseObject(output); // root['data'] = {"quang_duong":12, "lit_xang": 12, "do_mo_buom_ga":12, "toc_do": 12};
      client.send("atime", root["data"]);
      output = "";
    }
  }
 
    //Khi bắt được bất kỳ sự kiện nào thì chúng ta có hai tham số:
    //  +RID: Tên sự kiện
    //  +RFull: Danh sách tham số được nén thành chuỗi JSON!
    if (client.monitor()) {
        Serial.println(RID);
        Serial.println(Rfull);
    }
 
    //Kết nối lại!
    if (!client.connected()) {
      client.reconnect(host, port);
    }
    delay(500);
}
