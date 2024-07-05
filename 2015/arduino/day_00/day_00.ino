#include <SD.h>
#include "lcd_screen.h"
#define BUF_LENGTH 3
File myFile;
char buffer[BUF_LENGTH + 1];
LCDScreen screen(16, 2);

void setup() {
  Serial.begin(9600);
  buffer[BUF_LENGTH] = '\0';
  if (!SD.begin(10)) {
    Serial.println("SD initialization failed!");
  }
  Serial.println("SD initialization done.");
  myFile = SD.open("input.txt");
  screen.write("Running...", TOP_LINE);
}

void loop() {
  if (myFile.available()) {
    myFile.read(buffer, BUF_LENGTH);
    Serial.print(buffer);
    screen.append(buffer, BOTTOM_LINE);
    delay(200);
  }
}
