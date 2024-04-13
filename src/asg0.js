// DrawRectangle.js
function main() {
    // Retrieve the <canvas> element
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // Get the rendering context for 2DCG (what is 2DCG?)
    ctx = canvas.getContext('2d');

    // Draw a black canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // set color to blue
    ctx.fillRect(0, 0, canvas.width, canvas.height); // fill rectangle with color

    // create an instance of Vector3
    cx = canvas.width/2;
    cy = canvas.height/2;

    vc = new Vector3([2.25, 2.25, 0]);
    drawVector(vc, 'red');
}

function drawVector(v, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + v.elements[0] * 20, cy - v.elements[1] * 20);
    ctx.stroke();
}

function handleDrawEvent() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // set color to blue
    ctx.fillRect(0, 0, canvas.width, canvas.height); // fill rectangle with color
    
    // read values of text boxes to create v1
    // get x value
    var x1 = document.getElementById("v1_x").value;
    // console.log(x1);
    // get y value
    var y1 = document.getElementById("v1_y").value;
    // console.log(y1);
    // create v1
    vc1 = new Vector3([x1, y1, 0])

    // call drawVector(v1, "red")
    drawVector(vc1, "red");

    // read values of text boxes to create v2
    // get x value
    var x2 = document.getElementById("v2_x").value;
    // console.log(x2);
    // get y value
    var y2 = document.getElementById("v2_y").value;
    // console.log(y2);
    // create v2
    vc2 = new Vector3([x2, y2, 0])

    // call drawVector(v2, "blue")
    drawVector(vc2, "blue");
}

function areaTriangle(v1, v2) {
    // create new vector
    var v3 = new Vector3(3);
    // v3 is the cross product of v1 and v2
    v3 = Vector3.cross(v1, v2);
    // console.log("cross product: ", v3);
    var area = v3.magnitude() / 2;
    return area;
}

function handleDrawOperationEvent() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // set color to blue
    ctx.fillRect(0, 0, canvas.width, canvas.height); // fill rectangle with color
    
    // read values for v1, v2 and draw them
    handleDrawEvent();

    // read selector value and call respective Vector3 function
    var op = document.getElementById("op-select").value;
    // console.log(op);
    // init v3
    var v3 = new Vector3(3);
    // init v4
    var v4 = new Vector3(3);

    // check operation
    if (op === 'add' || op === 'sub') {
        // perform appropriate operation
        v3 = (op === 'add' ? vc1.add(vc2) : vc1.sub(vc2));
    }
    else if (op === 'div' || op === 'mul') {
        // read scalar
        var s = document.getElementById('s').value;
        // console.log(s);
        // check div or mul
        if (op === 'div') {
            v3 = vc1.div(s);
            v4 = vc2.div(s);
        }
        else {
            v3 = vc1.mul(s);
            v4 = vc2.mul(s);
        }
    }
    else if (op === 'mag') {
        // print magnitude of each vector
        console.log("Magnitude of v1: ", vc1.magnitude());
        console.log("Magnitude of v2: ", vc2.magnitude());
    }
    else if (op === 'norm') {
        v3 = vc1.normalize();
        v4 = vc2.normalize();
    }
    else if (op === 'angle') {
        // use dot product formula to calculate the angle
        var cos = Vector3.dot(vc1, vc2) / (vc1.magnitude() * vc2.magnitude());
        var ang = Math.acos(cos) * (180/ Math.PI);
        // print to console
        console.log("Angle: ", ang);
    }
    else if (op === 'area') {
        // perform ||cross product|| / 2
        let area = areaTriangle(vc1, vc2);
        console.log("Area of the triangle: ", area);
    }
    // draw the resulting vectors
    drawVector(v3, "green");
    drawVector(v4, "green");
}

// changed v1, v2 to vc1, 2 and vec to vc may be able to change back to orig