# 15s in Python 3.6

import sys

lines = [l.rstrip("\n") for l in sys.stdin]
lines = [int(l) for l in lines[0].split(",")]

previous_number = lines[len(lines) - 1]
indexes = dict()

for i, line in enumerate(lines):
    indexes[line] = i + 1

for i in range(len(lines), 30*1000*1000):
    try:
        previous_position = indexes[previous_number]
    except KeyError:
        indexes[previous_number] = i
        previous_number = 0
    else:
        indexes[previous_number] = i
        previous_number = i - previous_position

print(previous_number)
