function locoscroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locoscroll()

function videoConAnimation(){
    var videocon = document.querySelector('#video-container')
var vidBtn = document.querySelector("#play-btn")

videocon.addEventListener("mouseenter", ()=>{

    gsap.to(vidBtn,{
        opacity:1,
        scale:1
    })
})

videocon.addEventListener("mouseleave",()=>{

    gsap.to(vidBtn,{
        opacity:0,
        scale:0
    })
})

videocon.addEventListener("mousemove",(dets)=>{
    
    gsap.to(vidBtn,{
        left : dets.clientX -80,
        top: dets.clientY - 50
    })
})
}
videoConAnimation()

function textAnim(){
    gsap.from("#page1 h1", {
        y:100,
        opacity:0,
        duration:0.5,
        delay:0.2,
        stagger:0.5
    })
    
    gsap.from("#page1 #video-container",{
        scale:0.8,
        opacity:0,
        delay:1
    })
}
textAnim()

function Movingcursor(){
    document.addEventListener("mousemove", (dets)=>{
        gsap.to("#cursor",{
            left: dets.x,
            top:dets.y
        })
    })
    
    // document.querySelectorAll('.child').addEventListener("mouseenter", ()=>{
    //     gsap.to("#cursor",{
    //         transform: `translate(-50%,-50%) scale(1)`
    //     })
    // })
    // document.querySelectorAll('.child').addEventListener("mouseleave", ()=>{
    //     gsap.to("#cursor",{
    //         transform: `translate(-50%,-50%) scale(0)`
    //     })
    // })
    
    var a = document.querySelectorAll(".child")
    
    a.forEach((elem)=>{
        elem.addEventListener("mouseenter", function(){
            gsap.to("#cursor",{
                transform: `translate(-50%, -50%) scale(1)`
            })
        })
    
        elem.addEventListener("mouseleave", function(){
            gsap.to("#cursor",{
                transform:`translate(-50%, -50%) scale(0)`
            })
        })
    })
}
Movingcursor()

function navAnimation(){
    gsap.to("#navbar-left svg",{
        transform: `translateY(-100%)`,
        scrollTrigger:{
            trigger:`#page1`,
            scroller:`#main`,
            start:`top 0`,
            end:`top -5%`,
            scrub: true
        }
    })
    
    gsap.to("#navbar-right #links",{
        transform: `translateY(-100%)`,
        opacity:`0`,
        scrollTrigger:{
            trigger:`#page1`,
            scroller:`#main`,
            start:`top 0`,
            end:`top -5%`,
            scrub: true
        }
    })
}
navAnimation()