import io from 'socket.io-client'
var socket = io.connect('http://localhost:8080');

//***  DOM constants  ***//
const loadPanel = document.getElementById("load");
const aboutPanel = document.getElementById("about");
const aboutClose = document.getElementById("aboutClose");
const btnLogo = document.getElementById("logo-button");
const btnHome = document.getElementById("nav-home");
const btnPrev = document.getElementById("nav-prev");
const btnNext = document.getElementById("nav-next");
const btnAdmin = document.getElementById("btn-admin");
const contentPanels = document.querySelectorAll('.content-panels .panel');

const activityIndicatorIn = [].slice.call(document.querySelectorAll('#activity-in .indicator-light'));
const activityIndicatorOut = [].slice.call(document.querySelectorAll('#activity-out .indicator-light'));
const rcpIndicatorIn = [].slice.call(document.querySelectorAll('#rcp-in .indicator-light'));
const rcpIndicatorOut = [].slice.call(document.querySelectorAll('#rcp-out .indicator-light'));
const angStrengthIndicator = [].slice.call(document.querySelectorAll('#ang_strength .indicator-light'));
const cngStrengthIndicator = [].slice.call(document.querySelectorAll('#cng_strength .indicator-light'));
const internetStrengthIndicator = [].slice.call(document.querySelectorAll('#internet_strength .indicator-light'));
const cngDetailIn = [].slice.call(document.querySelectorAll('#cng_detail_in .indicator-light'));
const cngDetailOut = [].slice.call(document.querySelectorAll('#cng_detail_out .indicator-light'));
const angQuantityIn = [].slice.call(document.querySelectorAll('#ang_quantity_in .indicator-light'));
const angQuantityOut = [].slice.call(document.querySelectorAll('#ang_quantity_out .indicator-light'));

const connectionDuration = document.getElementById("connection_duration");
const connectionDropOuts = document.getElementById("connection_drop_outs");
const connectionEndPoints = document.getElementById("connection_end_points");

const bytes_in_min = document.getElementById("bytes_in_min");
const bytes_out_min = document.getElementById("bytes_out_min");
const bytes_in_hr = document.getElementById("bytes_in_hr");
const bytes_out_hr = document.getElementById("bytes_out_hr");
const bytes_in_day = document.getElementById("bytes_in_day");
const bytes_out_day = document.getElementById("bytes_out_day");
const packets_in_min = document.getElementById("packets_in_min");
const packets_out_min = document.getElementById("packets_out_min");
const packets_in_hr = document.getElementById("packets_in_hr");
const packets_out_hr = document.getElementById("packets_out_hr");
const packets_in_day = document.getElementById("packets_in_day");
const packets_out_day = document.getElementById("packets_out_day");
const cng_status_in = document.getElementById("cng_status_in");
const cng_status_out = document.getElementById("cng_status_out");
const ang_time_in = document.getElementById("ang_time_in");
const ang_time_out = document.getElementById("ang_time_out");

let panelIndex = 0;

let angData = {};
socket.on('ang_data', (data) => {
    
    angData = data.ang_data;
    for (let i = 0; i < 10; i++) {
        (activityIndicatorIn[i].dataset.indicator <= angData.activity_in) ? activityIndicatorIn[i].classList.add('on') :  activityIndicatorIn[i].classList.remove('on');
        (activityIndicatorOut[i].dataset.indicator <= angData.activity_out) ? activityIndicatorOut[i].classList.add('on') : activityIndicatorOut[i].classList.remove('on');
        (rcpIndicatorIn[i].dataset.indicator <= angData.rcp_pool_in) ? rcpIndicatorIn[i].classList.add('on') : rcpIndicatorIn[i].classList.remove('on');
        (rcpIndicatorOut[i].dataset.indicator <= angData.rcp_pool_out) ? rcpIndicatorOut[i].classList.add('on') : rcpIndicatorOut[i].classList.remove('on');
        (angStrengthIndicator[i].dataset.indicator <= angData.connnection_status.ang_strength) ? angStrengthIndicator[i].classList.add('on') : angStrengthIndicator[i].classList.remove('on');
        (cngStrengthIndicator[i].dataset.indicator <= angData.connnection_status.cng_strength) ? cngStrengthIndicator[i].classList.add('on') : cngStrengthIndicator[i].classList.remove('on');
        (internetStrengthIndicator[i].dataset.indicator <= angData.connnection_status.internet_strength) ? internetStrengthIndicator[i].classList.add('on') : internetStrengthIndicator[i].classList.remove('on');
        (cngDetailIn[i].dataset.indicator <= angData.cng_detail.rcp_pool_in) ? cngDetailIn[i].classList.add('on') : cngDetailIn[i].classList.remove('on');
        (cngDetailOut[i].dataset.indicator <= angData.cng_detail.rcp_pool_out) ? cngDetailOut[i].classList.add('on') : cngDetailOut[i].classList.remove('on');
        (angQuantityIn[i].dataset.indicator <= angData.ang_rcp_pool_detail.quantity_in) ? angQuantityIn[i].classList.add('on') : angQuantityIn[i].classList.remove('on');
        (angQuantityOut[i].dataset.indicator <= angData.ang_rcp_pool_detail.quantity_out) ? angQuantityOut[i].classList.add('on') : angQuantityOut[i].classList.remove('on');
    }
    let duration = Date.now() - Date.parse(angData.connection_detail.start);
    let hh = ("00" + (Math.floor(duration / 1000 / 60 / 60))).substr(-2);
    duration -= hh * 1000 * 60 * 60;
    let mm = ("00" + (Math.floor(duration / 1000 / 60))).substr(-2);
    duration -= mm * 1000 * 60;
    let ss = ("00" + (Math.floor(duration / 1000))).substr(-2);
    connectionDuration.innerHTML = `${hh} : ${mm} : ${ss}`;
    connectionDropOuts.innerHTML = `${angData.connection_detail.drop_outs}`;
    connectionEndPoints.innerHTML = `${angData.connection_detail.end_points}`;
    bytes_in_min.innerHTML = `${formatNum(angData.activity_detail.bytes_in_min)}`;
    bytes_out_min.innerHTML = `${formatNum(angData.activity_detail.bytes_out_min)}`;
    bytes_in_hr.innerHTML = `${formatNum(angData.activity_detail.bytes_in_hr)}`;
    bytes_out_hr.innerHTML = `${formatNum(angData.activity_detail.bytes_out_hr)}`;
    bytes_in_day.innerHTML = `${formatNum(angData.activity_detail.bytes_in_day)}`;
    bytes_out_day.innerHTML = `${formatNum(angData.activity_detail.bytes_out_day)}`;
    packets_in_min.innerHTML = `${formatNum(angData.activity_detail.packets_in_min)}`;
    packets_out_min.innerHTML = `${formatNum(angData.activity_detail.packets_out_min)}`;
    packets_in_hr.innerHTML = `${formatNum(angData.activity_detail.packets_in_hr)}`;
    packets_out_hr.innerHTML = `${formatNum(angData.activity_detail.packets_out_hr)}`;
    packets_in_day.innerHTML = `${formatNum(angData.activity_detail.packets_in_day)}`;
    packets_out_day.innerHTML = `${formatNum(angData.activity_detail.packets_out_day)}`;
    cng_status_in.innerHTML = `${angData.cng_detail.status_in} Mbps`;
    cng_status_out.innerHTML = `${angData.cng_detail.status_out} Mbps`;
    ang_time_in.innerHTML = `${angData.ang_rcp_pool_detail.time_in} Hours`;
    ang_time_out.innerHTML = `${angData.ang_rcp_pool_detail.time_out} Hours`;
});

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

function formatNum(num) {
    let formatted = num;
    if(999 < num  && num < 1000000) {
        return formatted = (num / 1000).toFixed(1) + " K";
    }
    if (999999 < num && num < 1000000000) {
        return formatted = (num / 1000000).toFixed(1) + " M";
    }
    if (999999999 < num && num < 1000000000000) {
        return formatted = (num / 1000000000).toFixed(1) + " G";
    }
    return formatted;
}

// activityDemoIn();
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
// activityDemoOut();
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
