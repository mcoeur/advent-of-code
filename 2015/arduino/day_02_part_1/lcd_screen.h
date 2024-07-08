#include "Arduino.h"
#include <LiquidCrystal.h>

#ifndef lcd_screen_h
#define lcd_screen_h
#define TOP_LINE 0
#define BOTTOM_LINE 1
class LCDScreen {
public:
  LCDScreen(int cols, int rows);
  void append(String str, int line);
  void write(String str, int line);
  void clear();
  void clearLine(int line);
private:
  unsigned int _cols;
  unsigned int _rows;
  String _buffer[2];
};
#endif