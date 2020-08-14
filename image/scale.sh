#!/bin/bash
scale () {
  convert icon.png -resize $1x$1\! dist/icon_$1.png
}

mkdir dist
scale 60
scale 120
scale 76
scale 152
scale 40
scale 80
scale 57
scale 114
scale 72
scale 144
scale 29
scale 58
scale 50
scale 100
scale 48
scale 96
scale 192
scale 32
