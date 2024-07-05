# Advent of code x Arduino

## Hardware

I set myself one rule for this project.

> [!IMPORTANT]
> The system should work without beeing plugged to a computer.

This brings it's own challenges and raises a few questions.

### 1. Where to store input data

The most straightforward way to tackle this problem is to use an external storage. I picked a microSD card reader for the task, although I won't be using more than 0.01% of the available space.

### 2. How to display the results

Once again, i picked the easiest solution and used a basic 16x2 LCD screen.

Long story short, here is my test bench for the project :

![Breadboard Schematics](breadboard.png)
