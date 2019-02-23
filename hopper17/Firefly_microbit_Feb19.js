/**
 * This is the code that was used as part of a tutorial on using the radio functionatlity for the Micro:bit
 */


// ===========================================
// Define event handlers
// ===========================================

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
 * Defines the functionality when the A button on the microbit is pressed.
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
