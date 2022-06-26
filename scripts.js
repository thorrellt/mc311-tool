function copyArrivalTime() {
    const stopID = document.getElementById("ride-on-arrival-id").value;
    const route = document.getElementById("ride-on-arrival-route").value;
    const minutes = document.getElementById("ride-on-arrival-minutes").value;

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

Date.prototype.nextBusDay = function (){
    if(this.getDay() < 5) {
        this.setDate(this.getDate() + 1)
    } else {
        this.setDate(this.getDate() + 3)
    }
}

function copyInspection(){
    const permitType = document.getElementById("inspection-scheduler-permit-type").value;
    const permitNumber = document.getElementById("inspection-scheduler-permit-number").value;
    const contactID = document.getElementById("inspection-scheduler-contact-id").value;
    const inspectionType = document.getElementById("inspection-scheduler-inspection-type").value;

    let scheduledDate = new Date(2022, 5, 24, 23, 59);
    scheduledDate.nextBusDay();
    if(scheduledDate.getHours() >= 12) scheduledDate.nextBusDay();


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

