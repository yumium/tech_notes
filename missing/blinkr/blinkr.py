#!/usr/bin/env python3
import os, subprocess, time

class LED:
    def blink(iter, interval):
        for i in range(iter):
            subprocess.run(f"echo '1' > /sys/class/leds/{LED._get_location()}/brightness", shell=True)
            time.sleep(interval)
            subprocess.run(f"echo '0' > /sys/class/leds/{LED._get_location()}/brightness", shell=True)
            time.sleep(interval)

    def start_heart():
        subprocess.run(f"echo 'heartbeat' > /sys/class/leds/{LED._get_location()}/trigger", shell=True)
        
    def stop_heart():
        subprocess.run(f"echo 'none' > /sys/class/leds/{LED._get_location()}/trigger", shell=True)

    # Get the name of the scrolllock LED so other functions can access the right files
    # Returns empty string if keyboard isn't plugged in
    #   Note: in this case the program can still run, though it won't do anything as the target file doesn't exist so none of the echo goes through. When user plugs in the keyboard and reset permissions, things will work again
    def _get_location():
        try:
            loc = subprocess.check_output("ls /sys/class/leds/ | grep -E 'input([^3]|[0-9]{2,})::scrolllock'", shell=True)
            return loc.decode("utf-8").strip()
        except subprocess.CalledProcessError:
            return ""

def timed_loop(s,fn):
    try:
        fn()
        time.sleep(s)
    except KeyboardInterrupt:
        timed_loop(s,fn)

def timed_gate(s):
    try:
        time.sleep(s)
    except KeyboardInterrupt:
        pass

def main():
    while True:
        timed_gate(1E7)

        timed_loop(60*45,lambda: LED.blink(3,0.25))

        LED.start_heart()
        timed_gate(120)
        LED.stop_heart()


if __name__ == "__main__":
    pid = os.getpid()
    subprocess.run(f"sed -E -i 's/^blinkrPID=.*$/blinkrPID={pid}/' ~/Tech/missing/blinkr/blinkr-intr.sh", shell=True)
    main()

