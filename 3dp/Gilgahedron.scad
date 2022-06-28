//Copyright 2022 Gilgamech Technologies
//Title: Gilgahedron
//Made by: Stephen Gillie
//Created on: 3/17/2022
//Updated on: 5/17/2022
//Units: any
//Notes: 

//icon_extrude("BigG.dxf",1,1,5);
//inverse_icon_extrude("BigG.dxf",1,1,5);

//Basic Shapes
module gCube(xSize=1,ySize=1,zSize=1,xMove=0,yMove=0,zMove=0,xRotate=0,yRotate=0,zRotate=0){
translate([xMove,yMove,zMove])
rotate([xRotate,yRotate,zRotate])
    cube([xSize,ySize,zSize],center=true);
}

module gCylinder(h=1,r1=1,r2=1,xMove=0,yMove=0,zMove=0,xRotate=0,yRotate=0,zRotate=0){
translate([xMove,yMove,zMove])
rotate([xRotate,yRotate,zRotate])
    cylinder(h,r1,r2,center=true,$fn=100);
}

module gSphere(xScale=1,yScale=1,zScale=1,xMove=0,yMove=0,zMove=0,xRotate=0,yRotate=0,zRotate=0){
translate([xMove,yMove,zMove])
rotate([xRotate,yRotate,zRotate])
    scale([xScale,yScale,zScale]) 
    sphere(r=(1),$fn=100);
}



//Complex polyhedra
module pyramid() {
Points = [
  [ 0,  0,  0 ],  //0
  [ 8,  0,  0 ],  //1
  [ 8,  8,  0 ],  //2
  [ 0,  8,  0 ],  //3
  [ 4,  4,  8 ]];  //4

Faces = [
  [0,1,2,3],  // bottom
  [4,1,0],  // front
  [4,2,1],  // right
  [4,3,2],  // back
  [4,0,3]]; // left
  
polyhedron( Points, Faces );
}
module d4() {
Points = [
  [ 0,  0,  0 ],  //0
  [ 8,  2,  0 ],  //1
  [ 2,  8,  0 ],  //2
  [ 3,  3,  7]];  //3

Faces = [
  [0,1,2],  // bottom
  [0,1,3],  // front
  [0,2,3],  // back
  [0,1,3], // right
  [1,2,3]]; // left
  
polyhedron( Points, Faces );
}
module d8(){
Points = [
  [ 4, 4, 0 ],  //0
  [ 8, 0, 6 ],  //1
  [ 8, 8, 6 ],  //2
  [ 0, 8, 6 ],  //3
  [ 0, 0, 6 ],  //4
  [ 4, 4,12 ]];  //0

Faces = [
  [0,1,2], // bottom front
  [0,2,3], // bottom right
  [0,3,4], // bottom back
  [0,4,1], // bottom left
  [5,1,2], // top front
  [5,2,3], // top right
  [5,3,4], // top back
  [5,4,1]]; // top left
  
polyhedron( Points, Faces );
}
module silo(height=80,diameter=33){
gCylinder(height,diameter,diameter);
gSphere(diameter,diameter,diameter,0,0,height/2);
}

//Extrusion
module file_extrude(filename="bigG.dxf"){
translate([-20,-20,0])
linear_extrude(height = 1, center = true)
import (file = filename);
}
module icon_extrude(filename="bigG.dxf",xScale=1,yScale=1,zScale=1,xMove=0,yMove=0,zMove=0,xRotate=0,yRotate=0,zRotate=0){
translate([xMove,yMove,zMove])
rotate([xRotate,yRotate,zRotate])
scale([xScale,yScale,zScale])
file_extrude(filename);

}
module inverse_icon_extrude(filename="bigG.dxf",xScale=1,yScale=1,zScale=1,xMove=0,yMove=0,zMove=0,xRotate=0,yRotate=0,zRotate=0){
bezelMult = 45;
difference(){
gCube(xScale*bezelMult,yScale*bezelMult,zScale,xMove,yMove+.5,zMove,xRotate,yRotate,zRotate);
icon_extrude(filename,xScale,yScale,zScale*1.05,xMove,yMove,zMove,xRotate,yRotate,zRotate);
}}

module text_extrude(string="Hello World!",height=1){
translate([-36,-4.5,0])
linear_extrude(height)
    text(string);
}
module gText(text="Hello World!",xSize=1,ySize=1,zSize=1,xTrans=0,yTrans=0,zTrans=0,xRot=0,yRot=0,zRot=0){
    translate([xTrans,yTrans,zTrans])
    rotate([xRot,yRot,zRot])
    scale([xSize*.1,ySize*.1,zSize*.1])
    linear_extrude(1)
    text(text);
}

//utility
module roundedBox(xSize=36,ySize=36,zSize=2,xTrans=0,yTrans=0,zTrans=0,xRot=0,yRot=0,zRot=0){
translate([xTrans,yTrans,zTrans])
rotate([xRot,yRot,zRot])
union(){
cubeSF=1.25;
gCube(xSize/cubeSF,ySize,zSize);
gCube(xSize,ySize/cubeSF-1,zSize);

cylSF=cubeSF*2;
cr=xSize*.085;

//dishwasher
//cx=xSize/cylSF+.4;
//cy=ySize/cylSF-1.2;

//bathtub
cx=xSize/cylSF+.8; 
cy=ySize/cylSF-1.6;


gCylinder(zSize,cr,cr,cx,cy);
gCylinder(zSize,cr,cr,-cx,cy);
gCylinder(zSize,cr,cr,cx,-cy);
gCylinder(zSize,cr,cr,-cx,-cy);
}}
module gBowl(length=4,width=4,depth=4,xTrans=0,yTrans=0,zTrans=0,xRot=0,yRot=0,zRot=0){
translate([xTrans,yTrans,zTrans])
    rotate([xRot,yRot,zRot])
difference(){
    gSphere(length,width,depth);
    gSphere(length,width,depth*1.125,0,0,depth*.125);
}}
//bar stock
module gTube(length=1,r1=1,r2=1,xTrans=0,yTrans=0,zTrans=0,xRot=0,yRot=0,zRot=0){
difference(){
    gCylinder(length,r1,r2,xTrans,yTrans,zTrans,xRot,yRot,zRot);
    gCylinder(length*1.1,r1*.9,r2*.9,xTrans,yTrans,zTrans,xRot,yRot,zRot);
}}
module roundedEdge(xSize = 1,ySize = 2,zSize = 10,xTrans=0,yTrans=0,zTrans=0,xRot=0,yRot=0,zRot=0) {
intersection() {
    gCylinder(zSize,ySize/2,ySize/2,xTrans,yTrans,zTrans,xRot,yRot,zRot);
    gCube(xSize,ySize,zSize,xTrans,yTrans,zTrans,xRot,yRot,zRot);
}}
//library
module checkPrint(Size=109){gCube(Size,Size,Size);}
