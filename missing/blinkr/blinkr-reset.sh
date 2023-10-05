#!/bin/bash

# Enable led trigger
modprobe ledtrig_heartbeat

# If keyboard is connected, change its ScrLock LED permission to allow changes
ls /sys/class/leds/ | grep -E 'input([^3]|[0-9]{2,})::scrolllock' && chmod o+w /sys/class/leds/$(ls /sys/class/leds/ | grep -E 'input([^3]|[0-9]{2,})::scrolllock')/brightness /sys/class/leds/$(ls /sys/class/leds/ | grep -E 'input([^3]|[0-9]{2,})::scrolllock')/trigger

