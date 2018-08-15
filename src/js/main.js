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

activityDemo();
function activityDemo() {

    let signal = Math.floor(Math.random() * 10);
    setTimeout(() => {
        for (let i = 0; i < activityLightsIn.length; i++) {
            if (activityLightsIn[i].dataset.indicator <= signal) {
                activityLightsIn[i].classList.add('on');
            } else {
                activityLightsIn[i].classList.remove('on');
            }
        }
        activityDemo();
    }, 200);
}

setTimeout(() => {
    loadPanel.classList.remove("loading");
}, 3000);

btnLogo.addEventListener("click", () => {
    aboutPanel.classList.add('show');
});

btnHome.addEventListener("click", () => { console.log("home click"); });

btnPrev.addEventListener("click", () => { console.log("prev click"); });

btnNext.addEventListener("click", () => { console.log("next click"); });

btnAdmin.addEventListener("click", () => { console.log("admin click"); });


aboutClose.addEventListener("click", () => { 
    aboutPanel.classList.remove('show');
 });
