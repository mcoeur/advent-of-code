# Day 00

Day 0 was my proof of concept.

I needed to make sure that I could write from the SD card and display text on the LCD screen.

For some reason, the `autoScroll()` function from the [LiquidCrystal](https://www.arduino.cc/reference/en/libraries/liquidcrystal/) official Arduino library was glitchy. To prevent any headeache, and in order to not waste time on this, I decided to reimplement a quick and dirty `append` function that did just that (wrapped in a small `LCDScreen` class).

With this out of the way, let's get to the good stuff !
