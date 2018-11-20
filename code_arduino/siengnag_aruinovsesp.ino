

#include <ArduinoJson.h>
int quang_duong = 0;
int lit_xang = 40;
int toc_do = 0;
void Wifi_output()
{
   int toc_do = random(60,70);
 
  //StaticJsonBuffer<100> jsonBuffer;
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();// tao json object => {}
  root["quang_duong"] = quang_duong;
  root["lit_xang"] = 12;
  root["do_mo_buom_ga"] = 2;
  root["toc_do"] = toc_do;
  // root = {"quang_duong":12, "lit_xang": 12, "do_mo_buom_ga":12, "toc_do": 12}
  root.printTo(Serial1); // "{"quang_duong":12, "lit_xang": 12, "do_mo_buom_ga":12, "toc_do": 12}"
  root.printTo(Serial);
  quang_duong += 500;
//  
}

void setup() {
  //Serial.begin(9600); // Khoi tao giao tiep module wifi ESP8266
  Serial1.begin(115200);
  Serial.begin(9600);
}

// vi du ham nay la xe dung lai
//void break(){
//  toc_do = 0;
//  Wifi_output(); 
//}
// vi du ham nay la xe dang chay
//void xeChay(){
//  toc_do = random(45,60);
//  Wifi_output(); 
//}

void loop() {
  Wifi_output();   // Gui du lieu len webserver
  //Serial.println(quang_duong);
  delay (100);
}
