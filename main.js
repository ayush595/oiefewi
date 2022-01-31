imager= "";
objects= [];
status= "";
theurl= "https://miro.medium.com/max/3200/1*MCfQtVCVj6GHHgpN1HX7pg.jpeg";
finallurl= String(theurl);  
function urlpasted() {
theurl = document.getElementById("inn").value;
finallurl= String(theurl);    
object_sound= "";
}
function preload() {
    imager= loadImage(finallurl, "png");
}
function setup() {
    canvas= createCanvas(700,500);
    canvas.center();
    cocoos= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("dot").innerHTML= 'status: detecting objects';
    video = createCapture(VIDEO);
    video.hide();
    video.size(700,500);
}

function modelLoaded() {
    console.log("model is loaded");
    status= true;

}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects= results;
      
          
        
    }
}
function draw() {
    image(video, 0, 0, 700, 500);
    if (status != "") {
        r= random(255);
        g= random(255);
        b= random(255);
        
        cocoos.detect(video, gotResults);


        for (var i=0;  i< objects.length ; i++) {
            document.getElementById("dot").innerHTML= "status= status has been detected";
            document.getElementById("objectnu").innerHTML= "number of objects :- " + objects.length;
            object_sound= objects[0].label;
            speak();
            fill(r,g,b);
            accuracy= floor(objects[i].confidence*100);
            text(objects[i].label + " " + accuracy + "%", objects[i].x+15 , objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width-20, objects[i].height-24);
            
            
        }
        
       
    }
    
}
function speak() {
    var apistored= window.speechSynthesis;
    data1= object_sound;
    utterspeak= new SpeechSynthesisUtterance(data1);
    apistored.speak(utterspeak);
        
    }
