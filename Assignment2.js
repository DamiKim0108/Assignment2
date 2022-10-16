
var gl;
var points;

var maxNumTriangles = 200;  
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;

var direction = true;


var x1=-1.0;
var x2 = -1.0;
var x3 = -0.8;




window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );


    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    var vertices = [
          vec2(-0.2, 0.9), 
          vec2(-0.6, -0.4),
          vec2(0.2, -0.4),
          vec2(-0.7, 0.7),    //윗꼭짓점, 높이
          vec2(-1, -0.4),      //왼쪽, 왼쪽의 높이 
          vec2(-0.3, -0.4),    //두번째 삼각형
          
          vec2( -1.0, -0.4 ), 
          vec2( -1.0, -1.0 ), 
          vec2( 1.0, -0.4 ),
          vec2( 1.0, -1.0),   //길

          vec2(-0.8, -0.1),
          vec2(-0.95, -0.3), 
          vec2(-0.65, -0.3),   //첫번째 나무 삼각형 
          vec2(-0.8, -0.3), 
          vec2(-0.95, -0.5),
          vec2(-0.65, -0.5),  //첫번째 두번째 삼각형
          vec2(-0.8, -0.5), 
          vec2(-0.95, -0.7),
          vec2(-0.65, -0.7),   //첫번째 세번째 삼각형

          vec2(-0.4, 0.1),
          vec2(-0.55, -0.1), 
          vec2(-0.25, -0.1), 
          vec2(-0.4, -0.1), 
          vec2(-0.55, -0.3),
          vec2(-0.25, -0.3),
          vec2(-0.4, -0.3), 
          vec2(-0.55, -0.5),
          vec2(-0.25, -0.5),

          vec2(0.0, -0.05),
          vec2(-0.15, -0.25), 
          vec2(0.15, -0.25), 
          vec2(0.0, -0.25), 
          vec2(-0.15, -0.45),
          vec2(0.15, -0.45),
          vec2(0.0, -0.45), 
          vec2(-0.15, -0.65),
          vec2(0.15, -0.65),


          vec2(-0.85, -0.7), 
          vec2(-0.85, -0.9), 
          vec2(-0.75, -0.7),
          vec2(-0.75, -0.9),

          vec2(-0.45, -0.5), 
          vec2(-0.45, -0.7), 
          vec2(-0.35, -0.5),
          vec2(-0.35, -0.7),

          vec2(-0.05, -0.65), 
          vec2(-0.05, -0.85), 
          vec2(0.05, -0.65),
          vec2(0.05, -0.85),

          vec2(0.5, 0.9),
          vec2(0.4, 0.8),
          vec2(0.4, 0.7),
          vec2(0.5, 0.6),
          vec2(0.6, 0.6),
          vec2(0.7, 0.7),
          vec2(0.7, 0.8),
          vec2(0.6, 0.9),

          vec2(0.55, 0.2),
          vec2(0.2, -0.08),
          vec2(0.9, -0.08),

          vec2(0.3, -0.08), 
          vec2(0.3, -0.6), 
          vec2(0.8, -0.08),
          vec2(0.8, -0.6),

          vec2(0.45, -0.3), 
          vec2(0.45, -0.6), 
          vec2(0.65, -0.3),
          vec2(0.65, -0.6),

          vec2( x1, -0.8 ), 
          vec2( x1, -1.0 ), 
          vec2( x3, -0.8 ),
          vec2( x3, -1.0) 

     ];

     var colors = [
          vec4(0.8, 1.0, 0.8, 1.0),
          vec4(0.2, 0.35, 0.35, 0.87),
          vec4(0.2, 0.35, 0.35, 0.87),
          vec4(0.8, 1.0, 0.8, 1.0),
          vec4(0.0, 0.4, 0.4, 0.9),
          vec4(0.0, 0.4, 0.4, 0.9),
    ];

    var Color = [
          vec4(0.8, 1.0, 0.8, 1.0)];



    
    
function animate(){

    gl.uniform4f(colorLoc, 0.2, 0.35, 0.35, 0.87);

    render10();



}


canvas.addEventListener("mousedown", function(event){

          gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
          var t = vec2(2*event.clientX/canvas.width-1, 
                    2*(canvas.height-event.clientY)/canvas.height-1);
          gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));
          
          gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
          t = vec4(Color[(index)%1]);
          gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
          index++;
} );


// document.getElementById("Controls").onclick = function(){
//      console.log(event.button);
//      direction = !direction;     
// }




    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5, 0.7, 0.8, 0.8 );


    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );


    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    
    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);



    var colorLoc = gl.getUniformLocation(program, "color");


    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );

    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);


    gl.uniform4f(colorLoc, 0.8, 0.8, 0.7, 0.8);
    gl.drawArrays( gl.TRIANGLE_STRIP, 6, 4 );


    gl.uniform4f(colorLoc,0.0, 0.4, 0.0, 0.7);
    gl.drawArrays( gl.TRIANGLES, 10, 27 );



    gl.uniform4f(colorLoc,0.58,0.3,0,1);
    gl.drawArrays( gl.TRIANGLE_STRIP, 37, 4 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 41, 4 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 45, 4 );

    gl.uniform4f(colorLoc, 0.9, 0.08, 0.26, 0.8);
    gl.drawArrays( gl.TRIANGLE_FAN, 49, 8);

    gl.uniform4f(colorLoc, 0.42, 0.32, 0.48, 0.7);
    gl.drawArrays( gl.TRIANGLES, 57, 3);

    gl.uniform4f(colorLoc, 0.6, 0.54, 0.64, 0.7);
    gl.drawArrays( gl.TRIANGLE_STRIP, 60, 4);

    gl.uniform4f(colorLoc, 0.6, 0.6, 0.6, 0.8);
    gl.drawArrays( gl.TRIANGLE_STRIP, 64, 4);



     gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );


    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);


    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW );

    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    
    //gl.drawArrays(gl.POINTS, 0, index);

    window.requestAnimationFrame(render);
    // animate();
    // setInterval(animate, 30);

};
window.requestAnimationFrame(render);


function render1() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}

function render(){

    //gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.POINTS, 0, index);

    //window.requestAnimationFrame(render);


}


function render3() {
          
    gl.drawArrays( gl.TRIANGLE_STRIP, 6, 4 );
}

function render4() {
          gl.drawArrays( gl.TRIANGLES, 10, 27 );
}

function render5() {         
          gl.drawArrays( gl.TRIANGLE_STRIP, 37, 4 );
          gl.drawArrays( gl.TRIANGLE_STRIP, 41, 4 );
          gl.drawArrays( gl.TRIANGLE_STRIP, 45, 4 );
 }

 function render6(){
          gl.drawArrays( gl.TRIANGLE_FAN, 49, 8);
 }

 function render7(){
          gl.drawArrays( gl.TRIANGLES, 57, 3);
 }

 function render8(){
          gl.drawArrays( gl.TRIANGLE_STRIP, 60, 4);
 }

 function render9(){
          gl.drawArrays( gl.TRIANGLE_STRIP, 64, 4);
 }

 function render10(){
    gl.drawArrays( gl.TRIANGLE_STRIP, 68, 4);
}