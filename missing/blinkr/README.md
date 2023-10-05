# Blinkr
A simple tool to turn your useless ScrLk LED into a stretching reminder.

## How to use
Open terminal and type = `blinkr`, then enter password to allow blinkr to access your keyboard's SrcLk LED. Do this everytime you plug in your keyboard.
Press `shift + ctrl + K` to start the timer. Press again to reset the timer.
When 45 minutes is reached, the LED will gently flash. Press `shift + ctrl + K` to stop the flashing. If key isn't pressed, flashing will stop automatically after 1 minute.

State diagram:
    ----> idle <------------
    |       | SIGINT       |
    |       |              |
1min|     start <--SIGINT  | SIGINT
    |       | -------|     |
    |       | 45min        |
    -------end--------------


## How it works
The python file implements the states by catching keyboard interrupts and echoing the right value into /sys/class/leds/ to interact with the LED.
The keyboard interrups are implemented by writing the PID of the blinkr instance into the file `blinkr-intr.sh`, then map the execution of that file to `shift + ctrl + K` in ubuntu startup app manager.
To set writing permission to the keyboard's LED values, the relevant commands are written in `blinkr-reset.sh`. An alias is then added in ~/.bashrc to execute that file when given the alias "blinkr".
