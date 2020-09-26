#!/bin/bash
mkdir dist

icon() {
  convert icon.png -resize $1x$1\! dist/icon_$1.png
}

icon 60
icon 120
icon 180
icon 76
icon 152
icon 20
icon 40
icon 80
icon 57
icon 87
icon 114
icon 72
icon 144
icon 167
icon 29
icon 58
icon 50
icon 100
icon 48
icon 96
icon 192
icon 32
convert icon.png -resize 1024x1024! -background '#CA190C' -extent 1024x1024 -gravity center dist/icon_1024.png

splash() {
  x=$(($1 < $2 ? $1 : $2))
  x=$(echo $x/1.5 | bc)
  convert splash.png -resize $x dist/tmp.bmp
  convert dist/tmp.bmp -background '#fafbfd' -gravity center -extent $1x$2 dist/splash_$1x$2.png
}

splash 320 480
splash 640 960
splash 768 1024
splash 1536 2048
splash 1024 768
splash 2048 1536
splash 640 1136
splash 750 1334
splash 1242 2208
splash 2208 1242

rm dist/tmp.bmp
