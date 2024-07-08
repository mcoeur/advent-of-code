#include "Arduino.h"

#ifndef wrap_h
#define wrap_h
class Wrap {
public:
  Wrap(int x, int y, int z);
  int smallestSideArea();
  int surfaceArea();
private:
  int _x;
  int _y;
  int _z;
};
#endif