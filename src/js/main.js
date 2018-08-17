// ================================
// START YOUR APP HERE
// ================================
console.log('And now for something completely different...');

const loadPanel = document.getElementById("load");
const aboutPanel = document.getElementById("about");
const aboutClose = document.getElementById("aboutClose");
const btnLogo = document.getElementById("logo-button");
const btnHome = document.getElementById("nav-home");
const btnPrev = document.getElementById("nav-prev");
const btnNext = document.getElementById("nav-next");
const btnAdmin = document.getElementById("btn-admin");

const activityBarIn = document.getElementById("activity-in");
const activityLightsIn = [].slice.call(document.querySelectorAll('#activity-in .indicator-light'));
const activityBarOut = document.getElementById("activity-out");
const activityLightsOut = [].slice.call(document.querySelectorAll('#activity-out .indicator-light'));

const contentPanels = document.querySelectorAll('.content-panels .panel');
let panelIndex = 0;
console.log('contentPanels', contentPanels);

function slidePanel(num){
    panelIndex = panelIndex + num;
    let panelsLength = contentPanels.length;
    console.log('panelIndex', panelIndex);
    for (let i = 0; i < panelsLength; i++) {
        if(i === panelIndex) {
            contentPanels[i].classList.add('current');
            contentPanels[i].classList.remove('prev');
            contentPanels[i].classList.remove('next');
        }
        if(i < panelIndex) {
            contentPanels[i].classList.add('prev');
            contentPanels[i].classList.remove('current');
            contentPanels[i].classList.remove('next');
        }
        if (i > panelIndex) {
            contentPanels[i].classList.add('next');
            contentPanels[i].classList.remove('current');
            contentPanels[i].classList.remove('prev');
        }
    }
    if (panelIndex === 0) {
        btnHome.disabled = true;
        btnPrev.disabled = true;
        btnNext.disabled = false;
    }
    if (panelIndex != 0 && panelIndex < panelsLength) {
        btnHome.disabled = false;
        btnPrev.disabled = false;
        btnNext.disabled = false;
    }
    if (panelIndex === panelsLength - 1) {
        btnHome.disabled = false;
        btnPrev.disabled = false;
        btnNext.disabled = true;
    }
    
}

activityDemoIn();
function activityDemoIn() {

    let signal = Math.floor(Math.random() * 10);
    setTimeout(() => {
        for (let i = 0; i < activityLightsIn.length; i++) {
            if (activityLightsIn[i].dataset.indicator <= signal) {
                activityLightsIn[i].classList.add('on');
            } else {
                activityLightsIn[i].classList.remove('on');
            }
        }
        activityDemoIn();
    }, 200);
}
activityDemoOut();
function activityDemoOut() {
    let signal = Math.floor(Math.random() * 10);
    setTimeout(() => {
        for (let i = 0; i < activityLightsOut.length; i++) {
            if (activityLightsOut[i].dataset.indicator <= signal) {
                activityLightsOut[i].classList.add('on');
            } else {
                activityLightsOut[i].classList.remove('on');
            }
        }
        activityDemoOut();
    }, 200);
}

setTimeout(() => {
    loadPanel.classList.remove("loading");
}, 3000);

btnLogo.addEventListener("click", () => {
    aboutPanel.classList.add('show');
});

btnHome.addEventListener("click", () => { 
    console.log("home click"); 
    panelIndex = 0;
    slidePanel(0);
});

btnPrev.addEventListener("click", () => { 
    console.log("prev click"); 
    slidePanel(-1);
});

btnNext.addEventListener("click", () => { 
    console.log("next click"); 
    slidePanel(1);
});

btnAdmin.addEventListener("click", () => { console.log("admin click"); });


aboutClose.addEventListener("click", () => { 
    aboutPanel.classList.remove('show');
 });
