let data;

function init(imgSrc) {
  drawImg(imgSrc);
}

function changeImage() {
  let url = document.getElementById("urlBox");
  imgSrc = url.value;
  drawImg(imgSrc);
}

//draws image on canvas
function drawImg(imgSrc) {
  let c = document.getElementById("picCanvas");
  let ctx = c.getContext("2d");
  let img = document.getElementById("pic");
  img.crossOrigin = "anonymous";
  img.src = imgSrc;
  img.onload = function() {
    ctx.drawImage(img, 0, 0, c.width, c.height);
    let imageData = ctx.getImageData(0, 0, c.width, c.height);
    data = imageData.data;
  }
}

function playSong() {
  sepRGBA();
}

function sepRGBA() {
  red = new Array();
  grn = new Array();
  blu = new Array();
  for(i=0; i<1000; i+=4){
    red.push(pitch(data[i]));
    grn.push(octave(data[i+1]));
    blu.push(duration(data[i+2]));
  }
  musicTime(red, grn, blu);
}

function musicTime(pitch, octave, duration) {
  let synth = new Tone.Synth().toMaster();
  let total = 0;
  for(i=0;i<pitch.length;i++){
    synth.triggerAttackRelease(pitch[i]+octave[i], duration[i], total);
    total = total + duration[i];
  }
}

function pitch(x) {
  let y = x % 5;
  let note;
  switch(y) {
    case 0:
      note = "C";
      break;
    case 1:
      note = "D";
      break;
    case 2:
      note = "E";
      break;
    case 3:
      note = "G";
      break;
    case 4:
      note = "A";
      break;
  }
  return note;
}

function octave(x) {
  return (x % 2) + 3;
}

function duration(x) {
  let y = x % 7;
  let dur;
  switch(y) {
    case 0:
      dur = 2; //whole
      break;
    case 1:
      dur = 1.5; //dotted half
      break;
    case 2:
      dur = 1; //half
      break;
    case 3:
      dur = .75; //dotted quarter
      break;
    case 4:
      dur = .5; //quarter
      break;
    case 5:
      dur = .37; //dotted eighth
      break;
    case 6:
      dur = .25; //eighth
      break;
  }
  return dur;
}
