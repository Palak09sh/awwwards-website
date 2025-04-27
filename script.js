var timeout;
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});

function firstPageAnim() {
    var tl = gsap.timeline();
    tl.from("#nav", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            ease: Expo.easeInOut
        })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1,
            stagger: 0.2,
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
        });
}
// We use gsap.util.clamp() in circleChaptaKaro() 

function circleChaptaKaro() {
    // define default scale value
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    
    window.addEventListener("mousemove", function(dets) {
      clearTimeout(timeout)
      // var xdiff = dets.clientX - xprev;
      // var ydiff = dets.clientY - yprev;
      xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
      yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
        xprev = dets.clientX;
        yprev = dets.clientY;
          // xscale= xgsap.util.clamp(.8,.12,xdiff)
          // yscale = ygsap.util.clamp(.8,.12,ydiff)
          circleMouseFollower(xscale,yscale)
          timeout=setTimeout(function(){
          document.querySelector("#mincircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
          },100);
    });
    // 100 second baad mouse chlna suru hoga 
}


function circleMouseFollower(xscale,yscale) {
    window.addEventListener("mousemove", function(dets) {
        document.querySelector("#mincircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}
circleChaptaKaro()
circleMouseFollower();  
firstPageAnim();

// teeno element ko select karo, uske baad teeno par ek mousemove lgao, jab mousemove ho to ye pata karo ki mouse khah par hai, jiska matlab hai mouse ki x y position ke badle us image ko show karo and us image kko move karo, move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffort = 0;
    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3, // Corrected the ease function
            duration: 0.5,
            
        });
    });
    
   elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffort = dets.clientX - rotate;
    rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3, // Corrected the ease function
            // duration: 0.5,
            top:diff,
            left:dets.clientX,
            rotate: gsap.utils.clamp(-10,10,diffort*0.2)
        });
    });
});
