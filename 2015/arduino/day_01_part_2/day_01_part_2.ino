#include <SD.h>
#include "lcd_screen.h"
#define BUF_LENGTH 100

File myFile;
LCDScreen screen(16, 2);
char buffer[BUF_LENGTH + 1];

void setup() {
  Serial.begin(9600);
  buffer[BUF_LENGTH] = '\0';
  if (!SD.begin(10)) {
    Serial.println("SD initialization failed!");
  }
  Serial.println("SD initialization done.");
  myFile = SD.open("input.txt");

  run();
}

void run() {
  bool done = false;
  int current_floor = 0;
  int read_count;
  int result = 0;
  unsigned long startTime;
  unsigned long endTime;

  screen.write("Running...", TOP_LINE);
  startTime = millis();
  while (!done) {
    if (myFile.available()) {
      read_count = myFile.read(buffer, BUF_LENGTH);
      for (int i = 0; i < read_count && !done; i++) {
        if (buffer[i] == '(')
          current_floor++;
        else if (buffer[i] == ')')
          current_floor--;
        result++;
        if (current_floor < 0) {
          done = true;
        }
      }
    } else {
      done = true;
    }
  }
  endTime = millis();
  screen.write("Done !", TOP_LINE);
  screen.append(" [", TOP_LINE);
  screen.append(String(endTime - startTime), TOP_LINE);
  screen.append("ms]", TOP_LINE);
  screen.write(String(result), BOTTOM_LINE);
}

void loop() {
}
