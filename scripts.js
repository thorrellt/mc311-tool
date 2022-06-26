function copyArrivalTime() {
    const stopID = document.getElementById("ride-on-arrival-id").value;
    const route = document.getElementById("ride-on-arrival-route").value;
    const minutes = document.getElementById("ride-on-arrival-minutes").value;

    // const notes = `Called from ${stopID} about the arrival of the ${route}. Advised ${minutes} minutes.`

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