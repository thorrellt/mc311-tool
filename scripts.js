import { lafRoutes, lafDepots, commonCallData, xferData, stopIdData } from './data.js';

function clearList(listName) {
    $("#" + listName).empty();
}

function showToast(){
    $('.toast').toast('show');
}

const lastNotesDisplay = document.getElementById('last-notes-display');


function updateDisplay(newText){
    $(lastNotesDisplay).text(newText);
}

function copyNotes(notes) {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        showToast();
        updateDisplay(notes)
        return navigator.clipboard.writeText(notes);
    }
        
    return Promise.reject('The Clipboard API is not available.');
}

function sortObjectByKeys(obj) {
    return Object.keys(obj).sort().reduce((r, k) => (r[k] = obj[k], r), {});
}

function generateDropdownListObj(values, entries){
    let listObj = {};
    entries.forEach((entry, i) => listObj[entry] = values[i]);
    return sortObjectByKeys(listObj)
}

function fillDropdownList(values, entries, listElement) {
    const listObj = generateDropdownListObj(values, entries)
    for(const entry in listObj){
        let option = document.createElement('option');
        option.value = listObj[entry];
        option.text = entry;
        listElement.add(option);

    }
}


/*****************
 * RIDE ON ARRIVAL
 *****************/
// Generate & Copy Notes
function generateArrivalNotes() {
    //Gather User Inputs
    const stopID = document.getElementById("ride-on-arrival-id").value;
    const route = document.getElementById("ride-on-arrival-route").value;
    const minutes = document.getElementById("ride-on-arrival-minutes").value;

    //Build String for output
    let notes = `Called `
    if (stopID && stopID !== '') notes += `from ${stopID} `;
    if (route && route !== '') notes += `about the arrival of ${route}`;
    notes += `. `
    if (Number(minutes) <= 0 || minutes === '' || !minutes) {
        notes += `Advised arriving any moment.`
    } else {
        notes += `Advised ${minutes} minutes.`
    }
    return notes
};

const arrivalCopyBtn = document.getElementById('ride-on-arrival-copy-btn');
arrivalCopyBtn.addEventListener("click", () =>{
    copyNotes(generateArrivalNotes())
});


/****************
 * DPS INSPECTION 
 ****************/
//Utility Function to iterate business days
Date.prototype.nextBusDay = function () {
    if (this.getDay() < 5) {
        this.setDate(this.getDate() + 1)
    } else {
        this.setDate(this.getDate() + 3)
    }
}

// Generate & Copy Notes
function generateInspectionNotes() {
    //Gather User Inputs
    const permitType = document.getElementById("inspection-scheduler-permit-type").value;
    const permitNumber = document.getElementById("inspection-scheduler-permit-number").value;
    const contactID = document.getElementById("inspection-scheduler-contact-id").value;
    const inspectionType = document.getElementById("inspection-scheduler-inspection-type").value;

    //Set scheduled date to next business day
    let scheduledDate = new Date();
    scheduledDate.nextBusDay();

    //Interate another day b/c next day scheduling ends at 12pm
    if (scheduledDate.getHours() >= 12) scheduledDate.nextBusDay();

    //Build String for output
    let notes = '';
    notes += permitType ? `${permitType} Permit:: ` : `Permit:: `;
    notes += permitNumber ? `${permitNumber}. ` : `N/A. `;
    if (!contactID || Number(contactID) === 0) {
        notes += `Contact ID:: N/A. Wants to schedule `;
        notes += inspectionType ? `${inspectionType} ` : ``;
        notes += `inspection for ${scheduledDate.toLocaleDateString()}. Transfer to DPS Tier II due to no contact ID.`;

    } else {
        notes += `Contact ID:: ${contactID}. Scheduled `;
        notes += inspectionType ? `${inspectionType} ` : ``;
        notes += `inspection for ${scheduledDate.toLocaleDateString()}. `;
    }

    return notes;
}

const schedulerCopyBtn = document.getElementById('inspection-scheduler-copy-btn');
schedulerCopyBtn.addEventListener("click", () =>{
    copyNotes(generateInspectionNotes())
});



/****************************** 
 * LOST & FOUND / DEPOT LOCATOR 
 ******************************/
const lafDropdown = document.getElementById('lost-and-found-day');
const lafRouteNum = document.getElementById("lost-and-found-route-number");
let currentDepot = ''

// Update Depot Name Display on change
function updateDepotDisplay() {
    //get selected route #    
    const currentRoute = lafRouteNum.value;

    //update depot variable
    if (!lafRoutes[currentRoute]) {
        currentDepot = `Route Not Found`;
    } else {
        currentDepot = lafRoutes[currentRoute][lafDropdown.value];
    }

    //update the DOM
    $("#depot-name").html(currentDepot);
}
lafDropdown.addEventListener('change', updateDepotDisplay);
lafRouteNum.addEventListener('change', updateDepotDisplay);


// Generate & Copy Notes
function generateLafNotes(){    
    const selectedRouteNum = document.getElementById("lost-and-found-route-number").value;

    //Build String for output
    let notes;
    switch (currentDepot) {
        case 'Route Not Found':
            notes = currentDepot;
            break;

        case 'N/A':
            notes = `No depot. Route doesn't run on selected day`;
            break;

        default:
            notes = `Calling about an item lost on the ${selectedRouteNum}. I provided ${lafDepots[currentDepot]} to contact the ${currentDepot} bus depot.`;
    }
    return notes;
}

const lostAndFoundCopyBtn = document.getElementById('lost-and-found-copy-btn');
lostAndFoundCopyBtn.addEventListener("click", () =>{
    copyNotes(generateLafNotes()) 
});



/****************** 
 * COMMON STOP IDs
 ******************/
// Generate Dropdown
const stationDropdown = document.getElementById('stop-id-stations');
const routesDropdown = document.getElementById('stop-id-routes');
const stationValues = Object.keys(stopIdData);
const stationEntries = Object.values(stopIdData).map(station => station.name);

fillDropdownList(stationValues, 
    stationEntries, 
    stationDropdown)
function updateRouteList() {
    let stopList = Object.keys(stopIdData[stationDropdown.value].routes);
    fillDropdownList(stopList, stopList, routesDropdown)
} updateRouteList();


//Update Display/Dropdowns on change
let stopID = "";
function updateStopIdDisplay() {
    stopID = stopIdData[stationDropdown.value].routes[routesDropdown.value][0];

    if (stopIdData[stationDropdown.value].routes[routesDropdown.value].length > 1) {
        $("#stop-id-id").html(stopID + " or " + stopIdData[stationDropdown.value].routes[routesDropdown.value][1])
    } else {
        $("#stop-id-id").html(stopID);
    }

} updateStopIdDisplay();

stationDropdown.addEventListener('change', () => {
    clearList('stop-id-routes');
    updateRouteList();
    updateStopIdDisplay();
});
routesDropdown.addEventListener('change', () => {
    updateStopIdDisplay();
});


// Generate & Copy Notes
const stopIdCopyBtn = document.getElementById('stop-id-copy-btn');
stopIdCopyBtn.addEventListener("click", function () {
    copyNotes(stopID);
});


/******************** 
 * COMMON CALL NOTES
 ********************/
// Generate Dropdown
const commonCallDropdown = document.getElementById('common-calls-subject');
const commonCallValues = Object.keys(commonCallData);
const commonCallEntries = Object.values(commonCallData).map(
    item =>  item.subject
    );
fillDropdownList(commonCallValues, 
    commonCallEntries, 
    commonCallDropdown);


// Generate & Copy Notes
function generateCommonCallNotes(){
    return commonCallData[commonCallDropdown.value].notes;
}

const commonCallCopyBtn = document.getElementById('common-calls-copy-btn');
commonCallCopyBtn.addEventListener("click", function () {
    copyNotes(generateCommonCallNotes());
});


/************************ 
 * COMMON TRANSFER NOTES
 ************************/
// Generate Dropdown
const xfersDropdown = document.getElementById('common-xfers-subject');
const xferValues = Object.keys(xferData);
const xferEntries = Object.values(xferData).map(
    item => item.name
    );
fillDropdownList(xferValues, 
    xferEntries, 
    xfersDropdown);


// Generate & Copy Notes
function generateXferNotes(){
    return `Caller trying to reach ${xferData[xfersDropdown.value].name}. Provided ${xferData[xfersDropdown.value].phone} and transferred.`
}

const xferCopyBtn = document.getElementById('common-xfers-copy-btn');
xferCopyBtn.addEventListener("click", function () {
    copyNotes(generateXferNotes());
});