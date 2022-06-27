
/*****************
 * RIDE ON ARRIVAL
 *****************/
function copyArrivalTimeNotes() {
    //Gather User Inputs
    const stopID = document.getElementById("ride-on-arrival-id").value;
    const route = document.getElementById("ride-on-arrival-route").value;
    const minutes = document.getElementById("ride-on-arrival-minutes").value;

    //Build String for output
    let notes = `Called `
    if (stopID && stopID !== '') notes += `from ${stopID} `;
    if (route && route !== '') notes += `about the arrival of ${route}`;
    notes += `. `
    if(Number(minutes) <= 0 || minutes === '' || !minutes){
        notes += `Advised arriving any moment.`
    } else {
        notes += `Advised ${minutes} minutes.`
    }

    console.log(minutes);
    console.log(notes);
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(notes);
    return Promise.reject('The Clipboard API is not available.');
};


/****************
 * DPS INSPECTION 
 ****************/
//Utility Function to iterate business days
Date.prototype.nextBusDay = function (){
    if(this.getDay() < 5) {
        this.setDate(this.getDate() + 1)
    } else {
        this.setDate(this.getDate() + 3)
    }
}

function copyInspectionNotes(){
    //Gather User Inputs
    const permitType = document.getElementById("inspection-scheduler-permit-type").value;
    const permitNumber = document.getElementById("inspection-scheduler-permit-number").value;
    const contactID = document.getElementById("inspection-scheduler-contact-id").value;
    const inspectionType = document.getElementById("inspection-scheduler-inspection-type").value;

    //Set scheduled date to next business day
    let scheduledDate = new Date();
    scheduledDate.nextBusDay();

    //Interate another day b/c next day scheduling ends at 12pm
    if(scheduledDate.getHours() >= 12) scheduledDate.nextBusDay();

    //Build String for output
    let notes = '';
    notes += permitType ? `${permitType} Permit:: ` : `Permit:: `;
    notes += permitNumber ? `${permitNumber}. ` : `N/A. `;
    if(!contactID || Number(contactID) === 0 ){
        notes += `Contact ID:: N/A. Wants to schedule `;
        notes += inspectionType ? `${inspectionType} ` : ``;
        notes += `inspection for ${scheduledDate.toLocaleDateString()}. Transfer to DPS Tier II due to no contact ID.`;

    } else {
        notes += `Contact ID:: ${contactID}. Scheduled `;
        notes += inspectionType ? `${inspectionType} ` : ``;
        notes += `inspection for ${scheduledDate.toLocaleDateString()}. `;
    }


    console.log(notes);
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(notes);
    return Promise.reject('The Clipboard API is not available.');

}


/****************************** 
 * LOST & FOUND / DEPOT LOCATOR 
 ******************************/
 let selectedDay = 'Select Day';
 let depot = ''
//Collection of Depots for Bus routes
const depots = {
    1: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    2: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    3: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    4: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    5: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Nicholson Court'},
    6: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    7: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    8: {weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A'},
    9: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    10: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    11: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    12: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    13: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    14: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'N/A'},
    15: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    16: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    17: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    18: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    19: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    20: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    21: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    22: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    23: {weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A'},
    24: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    25: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    26: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    28: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'N/A'},
    29: {weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'Nicholson Court'},
    30: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    31: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    32: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    33: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    34: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    36: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    37: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    38: {weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'Nicholson Court'},
    39: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    41: {weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    42: {weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A'},
    43: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    44: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    45: {weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A'},
    46: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    47: {weekday: 'Silver Spring', saturday: 'Nicholson Court', sunday: 'Nicholson Court'},
    48: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    49: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    51: {weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A'},
    52: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    53: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    54: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    55: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    56: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    57: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    58: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    59: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    60: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    61: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    63: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    64: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg'},
    65: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    66: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    67: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    70: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    71: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    73: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    74: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    75: {weekday: 'Gaithersburg', saturday: 'Nicholson Court', sunday: 'Nicholson Court'},
    76: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    78: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    79: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    81: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    83: {weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A'},
    90: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    93: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    94: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    96: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
    97: {weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'Nicholson Court'},
    98: {weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A'},
    100: {weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Nicholson Court'},
    101: {weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A'},
    L8: {weekday: 'N/A', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    T2: {weekday: 'N/A', saturday: 'Silver Spring', sunday: 'Silver Spring'},
    301: {weekday: 'N/A', saturday: 'N/A', sunday: 'N/A'},
    flex: {weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A'},
}

const depotPhoneNumbers = {
    Gaithersburg : `240.777.5925`,
    'Nicholson Court' : `240.777.5910`,
    'Silver Spring' : `240.777.5960`,
}

function updateSelectedDay(){
    selectedDay = $(this).text().toLowerCase();
}

function updateDayDropdown(){
    $("#lost-and-found-day:first-child").html(selectedDay +' <span class="caret"></span>');
}

function updateDepot() {
    //get selected route #    
    const routeNumber = document.getElementById("lost-and-found-route-number").value;
    
    //update depot variable
    if (!depots[routeNumber]){
        depot = `Route Not Found`;
    } else {
        depot = depots[routeNumber][selectedDay];
    }
  
    //update the DOM
    updateDayDropdown();
    $("#depot-name").html(depot);
}

// Make Dropdown text match Selection
$(".dropdown-menu li button").click(updateSelectedDay);
// Update Depot name on change
$(".dropdown-menu li button").click(updateDepot);
$("#lost-and-found-route-number").change(updateDepot);

function copyLostAndFoundNotes() {
    //get selected route #    
    const routeNumber = document.getElementById("lost-and-found-route-number").value;

    //Build String for output
    let notes = ``
    switch(depot){
        case 'Route Not Found':
            notes = depot;
            break;
        
        case 'N/A':
            notes = `No depot. Route doesn't run on selected day`;
            break;

        default:
            notes = `Calling about an item lost on the ${routeNumber}. I provided ${depotPhoneNumbers[depot]} to contact the ${depot} bus depot.`;
    }
    
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(notes);
    return Promise.reject('The Clipboard API is not available.');
};