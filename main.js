/**
 * Item appears on screen and timer begins
 * 
 * on a click event
 *  see if item is clicked on
 *  TRUE
 *      timer stops
 *      see how close to the center of the item you are
 *      display resulte
 *  FALSE
 *      provide feedback to indicate to go again.
 */

var target = {
    width: 50,
    height: 50,
    color: 'green',
    x: 50,
    y: 50
};

var targetPositions = [{x:10, y:10},{x:100, y:100},{x:400, y:550},{x:600, y:100},{x:900, y:500},{x:350, y:10}]
var targetPositionIndex = 0;

var context;
var canvas;
var gameArea;

var time;

var resultsTable;

document.addEventListener("DOMContentLoaded", function() {
    // set up canvas, game, and export
    canvas = document.getElementById("cursor-test");
    context = canvas.getContext("2d");

    makeTargetStartButton();
    
    resultsTable = document.getElementById("results");

    // start game up
    gameArea = canvas.getBoundingClientRect();
    setInterval(draw, 10);
    document.addEventListener("click",startGame, false);
});

function makeTargetStartButton(){
    target.height = canvas.height / 4;
    target.width = canvas.width / 4;
    target.x = (canvas.width / 2) - (target.width / 2);
    target.y = (canvas.height / 2) - (target.height / 2);
    target.color = 'green'
}

function startGame(ev) {
    // ensure the correct target is hit
    console.log("Starting game...");

    if (isClicked(ev.clientX, ev.clientY))
    {
        console.log("Triggering game to start");
        
        // update target size / location / color
        targetPositionIndex = 0;

        target.height = 50;
        target.width = 50;
        target.color = 'red'
        target.x = targetPositions[targetPositionIndex].x;
        target.y = targetPositions[targetPositionIndex].y;

        // change event function to react
        console.log("Changing event handlers");
        document.removeEventListener("click",startGame);
        document.addEventListener("click",react);
        
        // start timer
        startTimer();
    }
}

function isClicked(x, y) {
    x = x - gameArea.left;
    y = y - gameArea.top;
    return x >= target.x
        && (x <= target.x + target.width)
        && y >= target.y
        && (y <= target.y + target.height);
}

function react(ev) {
    console.log("Checking reaction...");
    if (isClicked(ev.clientX, ev.clientY)) {
        console.log("Target Hit");
        
        // stop timer
        var time = stopTimer();
        // output result to table
        addResult(targetPositionIndex+1, (time/1000)); // replace 100 with timer value

        // move target to next position or end game
        if(++targetPositionIndex >= (targetPositions.length))
        {
            console.log("Game complete");
            document.removeEventListener("click",react);
            makeTargetStartButton();
            document.addEventListener("click",startGame);
        } else {
            target.x = targetPositions[targetPositionIndex].x;
            target.y = targetPositions[targetPositionIndex].y;
            startTimer();
        }
    }
}

function draw() {
    // drawing code
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = target.color;
    context.fillRect(target.x, target.y, target.width, target.height);
}

function addResult( round, time ) {
    var row = resultsTable.insertRow(round);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = round;
    cell2.innerHTML = "" + time + " seconds";
}

function startTimer() {
    time = Date.now();
}

function stopTimer() {
    var endTime = Date.now();
    return endTime - time;
}

function exportResults() {
    console.log("Exporting results...");
    var exportLink = document.createElement("a");
    var content = getTableInformation();
    var file = new Blob([content], {type: 'text/plain'});
    exportLink.href = URL.createObjectURL(file);
    exportLink.name = Date.now();
    exportLink.download = Date.now();
    exportLink.click();
}

function getTableInformation(){
    var table = [];
    var rows = document.querySelectorAll("#results tr");

    for (var i = 0 ; i < rows.length; i ++) {
        var row = [];
        var cols = rows[i].querySelectorAll("td, th");

        for(var j = 0; j < cols.length; j++){
            row.push(cols[j].innerText);
        }

        table.push(row.join("|"));
    }

    return table.join("\n");
}
