#include <Arduino.h>
#include "wrap.h"

Wrap::Wrap(int x, int y, int z) {
  _x = x;
  _y = y;
  _z = z;
}

int Wrap::smallestSideArea() {
  if (_x <= _y)
    return _x * min(_y, _z);
  if (_x >= _y)
    return _y * _z; 
}

int Wrap::surfaceArea() {
  return (2 * _x * _y) + (2 * _y * _z) + (2 * _x * _z);
}
