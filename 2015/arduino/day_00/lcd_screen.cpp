#include <Arduino.h>
#include "lcd_screen.h"

LiquidCrystal lcd(7, 8, 2, 3, 4, 5);

LCDScreen::LCDScreen(int cols, int rows) {
  lcd.begin(cols, rows);
  _cols = cols;
  _rows = rows;
}

void LCDScreen::append(String str, int line) {
  if (_buffer[line].length() >= _cols) {
    _buffer[line].remove(0, str.length());
  }
  _buffer[line].concat(str);
  lcd.setCursor(0, line);
  lcd.print(_buffer[line].c_str());
}

void LCDScreen::write(String str, int line) {
  _buffer[line] = str;
  clearLine(line);
  lcd.setCursor(0, line);
  lcd.print(_buffer[line].c_str());
}

void LCDScreen::clearLine(int line) {
  lcd.setCursor(0, line);
  lcd.write("                ");
}

void LCDScreen::clear() {
  lcd.clear();
}