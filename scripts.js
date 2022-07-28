function clearSelectList(listName) {
    $("#"+listName).empty();
}

function copyNotes(notes) {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(notes);
    return Promise.reject('The Clipboard API is not available.');
}






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
    if (Number(minutes) <= 0 || minutes === '' || !minutes) {
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
Date.prototype.nextBusDay = function () {
    if (this.getDay() < 5) {
        this.setDate(this.getDate() + 1)
    } else {
        this.setDate(this.getDate() + 3)
    }
}

function copyInspectionNotes() {
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


    console.log(notes);
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(notes);
    return Promise.reject('The Clipboard API is not available.');

}


/****************************** 
 * LOST & FOUND / DEPOT LOCATOR 
 ******************************/
const dayDropdown = document.getElementById('lost-and-found-day');
let selectedDay = dayDropdown.value;
let depot = ''

//Collection of Depots for Bus routes
const depots = {
    1: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    2: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    3: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    4: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    5: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Nicholson Court' },
    6: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    7: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    8: { weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A' },
    9: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    10: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    11: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    12: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    13: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    14: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'N/A' },
    15: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    16: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    17: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    18: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    19: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    20: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    21: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    22: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    23: { weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A' },
    24: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    25: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    26: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    28: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'N/A' },
    29: { weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'Nicholson Court' },
    30: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    31: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    32: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    33: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    34: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    36: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    37: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    38: { weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'Nicholson Court' },
    39: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    41: { weekday: 'Silver Spring', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    42: { weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A' },
    43: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    44: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    45: { weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A' },
    46: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    47: { weekday: 'Silver Spring', saturday: 'Nicholson Court', sunday: 'Nicholson Court' },
    48: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    49: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    51: { weekday: 'Silver Spring', saturday: 'N/A', sunday: 'N/A' },
    52: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    53: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    54: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    55: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    56: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    57: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    58: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    59: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    60: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    61: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    63: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    64: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Gaithersburg' },
    65: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    66: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    67: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    70: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    71: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    73: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    74: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    75: { weekday: 'Gaithersburg', saturday: 'Nicholson Court', sunday: 'Nicholson Court' },
    76: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    78: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    79: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    81: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    83: { weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A' },
    90: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    93: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    94: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    96: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
    97: { weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'Nicholson Court' },
    98: { weekday: 'Nicholson Court', saturday: 'Nicholson Court', sunday: 'N/A' },
    100: { weekday: 'Gaithersburg', saturday: 'Gaithersburg', sunday: 'Nicholson Court' },
    101: { weekday: 'Gaithersburg', saturday: 'N/A', sunday: 'N/A' },
    L8: { weekday: 'N/A', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    T2: { weekday: 'N/A', saturday: 'Silver Spring', sunday: 'Silver Spring' },
    301: { weekday: 'N/A', saturday: 'N/A', sunday: 'N/A' },
    flex: { weekday: 'Nicholson Court', saturday: 'N/A', sunday: 'N/A' },
}

const depotPhoneNumbers = {
    Gaithersburg: `240.777.5925`,
    'Nicholson Court': `240.777.5910`,
    'Silver Spring': `240.777.5960`,
}

function updateSelectedDay() {
    selectedDay = dayDropdown.value;
    console.log(selectedDay);
}

function updateDayDropdown() {
    $("#lost-and-found-day:first-child").html(selectedDay + ' <span class="caret"></span>');
}

function updateDepot() {
    //get selected route #    
    const routeNumber = document.getElementById("lost-and-found-route-number").value;

    //update depot variable
    if (!depots[routeNumber]) {
        depot = `Route Not Found`;
    } else {
        depot = depots[routeNumber][selectedDay];
    }

    // //update the DOM
    // updateDayDropdown();
    $("#depot-name").html(depot);
}

// Make Dropdown text match Selection
dayDropdown.addEventListener('change', () => {
    updateSelectedDay();
    updateDepot();
});


// Update Depot name on change
$(".dropdown-menu li button").click(updateDepot);
$("#lost-and-found-route-number").change(updateDepot);

function copyLostAndFoundNotes() {
    //get selected route #    
    const routeNumber = document.getElementById("lost-and-found-route-number").value;

    //Build String for output
    let notes = ``
    switch (depot) {
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




/****************** 
 * COMMON STOP IDs
 ******************/
const transitStations = {
    'bethesda': {
        20300: ['34'],
        20306: ['29', '32', '36'],
        20308: ['29', '30', '32', '36', '47', '70'],
    },
    'forest_glen': {
        15272: ['8'],
        15276: ['7'],
    },
    'friendship_heights': {
        22700: ['1', '11', '34'],
        14769: ['23', '29'],
        27356: ['34'],
    },
    'germantown': {
        15182: ['55', '61', '74', '75', '97', '98', '100'],
        15012: ['83'],
    },
    'glenmont': {
        29180: ['33', '55'],
        29184: ['26', '39', '41'],
        29182: ['26', '31', '39', '41', '49', '51', '53'],
        29190: ['10'],
        29192: ['51'],
    },
    'grosvenor': {
        23164: ['96'],
        27730: ['46'],
        15298: ['6', '37'],
    },
    'lakeforest': {
        30010: ['101'],
        23722: ['54', '55', '56', '57', '58', '59', '61'],
    },
    'medical_center': {
        24006: ['33'],
        24008: ['34', '46'],
        24010: ['30', '70', '101'],
    },
    'montgomery mall': {
        17620: ['6', '96'],
        17621: ['26'],
        17626: ['42'],
        17624: ['47'],
    },
    'rockville': {
        25654: ['46'],
        28216: ['48', '49'],
        14775: ['55'],
        25650: ['59'],
        25656: ['101'],
        25652: ['45', '52'],
        25660: ['54', '56', '63'],
        25662: ['44', '47', '81'],
    },
    'shady_grove': {
        14776: ['55', '57', '59', '63', '66', '67'],
        14601: ['43', '53', '58', '60', '61', '64', '65', '71', '73', '74', '76', '78', '79', '90', '101'],
        26012: ['101'],
        26006: ['43'],
    },
    'silver_spring': {
        17479: ['28'],
        17609: ['1', '11'],
        17607: ['2'],
        17604: ['16'],
        17480: ['8', '9'],
        17481: ['21', '22'],
        17605: ['12', '13'],
        17484: ['15', '19'],
        17485: ['18'],
        17486: ['20'],
        17487: ['14', '17'],
        17490: ['4', '5'],
    },
    'twinbrook': {
        26586: ['46'],
        28424: ['10', '45'],
        26588: ['5'],
        26580: ['10', '26'],
        26582: ['44']
    },
    'wheaton': {
        29740: ['31', '38'],
        15416: ['9'],
        27186: ['34'],
    },
    'white_flint': {
        25542: ['5', '26', '42', '46', '81', '101'],
        25610: ['5', '26', '46', '81', '101'],
    },
}
const stations = {
    'bethesda': {
        29: ['20306', '20308'],
        30: ['20308'],
        32: ['20306', '20308'],
        34: ['20300'],
        36: ['20306', '20308'],
        47: ['20308'],
        70: ['20308'],
    },
    'forest_glen': {
        7: ['15276'],
        8: ['15272'],
    },
    'friendship_heights': {
        1: ['22700'],
        11: ['22700'],
        23: ['14769'],
        29: ['14769'],
        34: ['22700', '27356'],
    },
    'germantown': {
        55: ['20306', '20308'],
        61: ['20308'],
        74: ['20306', '20308'],
        75: ['20300'],
        83: ['20306', '20308'],
        97: ['20308'],
        98: ['20308'],
        100: ['20308'],
    },
    'glenmont': {
        10: ['29190'],
        26: ['29184', '29182'],
        31: ['29182'],
        33: ['29180'],
        39: ['29184', '29182'],
        41: ['29184', '29182'],
        51: ['29182', '29190'],
        53: ['29182'],
        55: ['29180'],
    },
    'grosvenor': {
        6: ['15298'],
        37: ['15298'],
        46: ['27730'],
        96: ['23164'],
    },
    'lakeforest': {
        54: ['23722'],
        55: ['23722'],
        56: ['23722'],
        57: ['23722'],
        58: ['23722'],
        59: ['23722'],
        61: ['23722'],
        101: ['30010'],
    },
    'medical_center': {
        30: ['24010'],
        33: ['24006'],
        34: ['24008'],
        46: ['24008'],
        70: ['24010'],
        101: ['24010'],
    },
    'montgomery_mall': {
        6: ['17620'],
        26: ['17621'],
        42: ['17626'],
        47: ['17624'],
        96: ['17620'],
    },
    'rockville': {
        44: ['25662'],
        45: ['25652'],
        46: ['25654'],
        47: ['25662'],
        48: ['28216'],
        49: ['28216'],
        52: ['25652'],
        54: ['25660'],
        55: ['14775'],
        56: ['25660'],
        59: ['25650'],
        63: ['25660'],
        81: ['25662'],
        101: ['25656'],
    },
    'shady_grove': {
        43: ['14601', '26006'],
        53: ['14601'],
        55: ['14776'],
        57: ['14776'],
        58: ['14601'],
        59: ['14776'],
        60: ['14601'],
        61: ['14601'],
        63: ['14776'],
        64: ['14601'],
        65: ['14601'],
        66: ['14776'],
        67: ['14776'],
        71: ['14601'],
        73: ['14601'],
        74: ['14601'],
        76: ['14601'],
        78: ['14601'],
        79: ['14601'],
        90: ['14601'],
        101: ['14601', '26012'],
    },
    'silver_spring': {
        1: ['17609'],
        2: ['17607'],
        4: ['17490'],
        5: ['17490'],
        8: ['17480'],
        9: ['17480'],
        11: ['17609'],
        12: ['17605'],
        13: ['17605'],
        14: ['17487'],
        15: ['17484'],
        16: ['17604'],
        17: ['17487'],
        18: ['17485'],
        19: ['17484'],
        20: ['17486'],
        21: ['17481'],
        22: ['17481'],
        28: ['17479'],
    },
    'twinbrook': {
        5: ['26588'],
        10: ['28424', '26580'],
        26: ['26580'],
        44: ['26582'],
        45: ['28424'],
        46: ['26586'],
    },
    'wheaton': {
        9: ['15416'],
        31: ['29740'],
        34: ['27186'],
        38: ['29740'],
    },
    'white_flint': {
        5: ['25542', '25610'],
        26: ['25542', '25610'],
        42: ['25542'],
        46: ['25542', '25610'],
        81: ['25542', '25610'],
        101: ['25542', '25610'],
    },
}

const stationDropdown = document.getElementById('stop-id-stations');
const routesDropdown = document.getElementById('stop-id-routes');
let selectedStation = stationDropdown.value;
let selectedRoute = routesDropdown.value;
let stopID = "";


function updateRouteList() {
    let stopList = Object.keys(stations[selectedStation]);

    for (let i = 0; i < stopList.length; i++) {
        let option = document.createElement('option');
        option.value = stopList[i];
        option.text = stopList[i];
        routesDropdown.add(option);
    }
    selectedRoute = routesDropdown.value;

}

function clearRouteList() {
    $("#stop-id-routes").empty();
}

// Make Dropdown text match Selection
stationDropdown.addEventListener('change', () => {
    selectedStation = stationDropdown.value;
    clearRouteList();
    updateRouteList();
    updateStopID();
});

routesDropdown.addEventListener('change', () => {
    selectedRoute = routesDropdown.value;
    updateStopID();
});


function updateStopID() {
    stopID = stations[selectedStation][selectedRoute][0];
    console.log(selectedRoute);
    console.log(stopID);

    if (stations[selectedStation][selectedRoute].length > 1) {
        $("#stop-id-id").html(stopID + " or " + stations[selectedStation][selectedRoute][1])
    } else {
        $("#stop-id-id").html(stopID);
    }

}

function copyStopIdNotes() {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(stopID);
    return Promise.reject('The Clipboard API is not available.');
}

updateRouteList();
updateStopID();


const arrivalCopyBtn = document.getElementById('ride-on-arrival-copy-btn');
arrivalCopyBtn.addEventListener("click", copyArrivalTimeNotes);

const schedulerCopyBtn = document.getElementById('inspection-scheduler-copy-btn');
schedulerCopyBtn.addEventListener("click", copyInspectionNotes);

const lostAndFoundCopyBtn = document.getElementById('lost-and-found-copy-btn');
lostAndFoundCopyBtn.addEventListener("click", copyLostAndFoundNotes);

const stopIdCopyBtn = document.getElementById('stop-id-copy-btn');
stopIdCopyBtn.addEventListener("click", copyStopIdNotes);



