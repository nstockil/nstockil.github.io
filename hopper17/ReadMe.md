# Micro:bit Fireflies
This workshop will outline how to use a set of Micro:bits to simulate fireflies using MakeCode or JavaScript.

Programming concepts that can be taught through this tutorial:
- Using the radio functionality of the Micro:bit
- Defining functions in MakeCode
- Event Handling

## Requirements for Best Results
- 5 Micro:bits
- Device for using [MakeCode editor](makecode.microbit.org/)

This tutorial can also be taught without Micro:bits, and just using the MakeCode Editor.  In this case the simulation does not tend to last long for visual impact.

## Configuring the Micro:bit radio
The first step for being able to use the Micro:bit for radio is to configure the radio channel for it to listen to.


In MakeCode:

![Configuring the radio channel to listen to](/Firefly_radiochannel.PNG)

In JavaScript:
``` javascript
// configures the radio channel to listen to.
radio.setGroup(1)
```

## Sending the message
We need a way of sending out the first message to start our simulation.

We can use the button input on the Micro:bit to do this.  We can define a event handler for when the A button on one of the devices is pressed.

This will only need to be pressed once.  After this, the Micro:bits will be responsible for relaying messages without our help.

In MakeCode:

![Sending the message over with MakeCode](/Firefly_sendMessage.PNG)

Note that for the MakeCode implementation we had to define a function called fadeOut.  This is to gradually dim the LED diplay.  This is not needed in the JavaScript code however as fadeOut is a supported function you can call.

In JavaScript:
``` javascript
/**
 * Defines the functionality when the A button on the Micro:bit is pressed.
 * We want to send out a signal over radio then display an icon.
 */
input.onButtonPressed(Button.A, function () {
    radio.sendString("boop")
    led.setBrightness(255)
    basic.showIcon(IconNames.Heart)
    led.fadeOut(500)
})
```

## Recieving the message
The next step will be to write an event handler for when the Micro:bit recieves the message over the radio channel.

In this case we will want to light up the Micro:bit and then send out the radio signal again.

We will use the show icon functionality to light up the display.

In MakeCode:

![Reieving the message over with MakeCode](/Firefly_recieveMessage.PNG)

In JavaScript:
``` javascript
/**
 * Defines the functionality when a string is recieved through the Radio.
 * Display an icon briefly then decide whether or not to resend the signal.
 */
radio.onReceivedString(function (receivedString) {
    if (receivedString == "boop") {
        basic.pause(Math.randomRange(0, 500))
        led.setBrightness(255)
        basic.showIcon(IconNames.Heart)
        led.fadeOut(500)
    if (Math.randomRange(0, 8) >= 4) {
            basic.pause(Math.randomRange(0, 500))
            radio.sendString("boop")
        }
    }
})
```

## Complete Code

The complete Firefly code using MakeCode:

![Complete MakeCode Implementation](/Firefly_feb19_makecode_with_function.PNG)

The complete Firefly code using Javascript:
```javascript
/**
 * Defines the functionality when a string is recieved through the Radio.
 * Display an icon briefly then decide whether or not to resend the signal.
 */
radio.onReceivedString(function (receivedString) {
    if (receivedString == "boop") {
        basic.pause(Math.randomRange(0, 500))
        led.setBrightness(255)
        basic.showIcon(IconNames.Heart)
        led.fadeOut(500)
    if (Math.randomRange(0, 8) >= 4) {
            basic.pause(Math.randomRange(0, 500))
            radio.sendString("boop")
        }
    }
})

/**
 * Defines the functionality when the A button on the Micro:bit is pressed.
 * We want to send out a signal over radio then display an icon.
 */
input.onButtonPressed(Button.A, function () {
    radio.sendString("boop")
    led.setBrightness(255)
    basic.showIcon(IconNames.Heart)
    led.fadeOut(500)
})

// ===========================================
// Code that runs On Start
// ===========================================

// configure the radio channel to listen to.
radio.setGroup(1)

```

## Acknowledgements
Original Firefly project by CodeDojo Scotland using MicroPython ([Project Document](http://coderdojoscotland.com/wp-content/uploads/2016/04/MicrobitFireflyRadioResource-Draft-2.pdf)).