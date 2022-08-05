/******************************* 
 * LOST & FOUND / DEPOT LOCATOR 
 *******************************/
const lafRoutes = {
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
const lafDepots = {
    'Gaithersburg': `240.777.5925`,
    'Nicholson Court': `240.777.5910`,
    'Silver Spring': `240.777.5960`,
}


/******************** 
 * COMMON CALL NOTES
 ********************/

 const commonCallData = {
    'disc-rep': {subject: "Disconnect-Rep initiated (No response)",
                notes: "Caller stopped responding. Read no response disclose and disconnected call"},
    'disc-caller': {subject: "Disconnect-Caller initiated",
                notes: "Caller stopped responding, then call dropped."},
    'sw-slide': {subject: "Solid Waste-Slide Week",
                notes: "Advised of 1 day slide this week due to Holiday.",
                'sw-no-trash': "Advised we do not provide trash to this address and to reach out to private collector."},
    'sw-no-trash': {subject: "Solid Waste-No County Trash Service",
                notes: "Solid Waste-No County Trash Service"},
    'sw-station': {subject: "Solid Waste-Transfer Station Info",
                notes: "Gave info about Transfer Station Including:\n" +
                "Hours: M-Sa 7am-5pm & Su 9am-5pm\n" +
                "Cost: 500lbs free then $60/ton\n" +
                "Location: 16101 Frederick Rd, Derwood, MD 20855"},
    'rrp-apply': {subject: "RRP-How to apply",
                notes: "Gave info about applying for RRP including:\n" +
                "Where to apply online.\n" +
                "What non-profits can help apply.\n" +
                "Emailed KBA to apply."},
    'rrp-status': {subject: "RRP-How to check status",
                notes: "Advised RRP status can be checked by logging into RRP portal or emailing HHS@montgomerycountymd.gov."}
}

/************************ 
 * COMMON TRANSFER NOTES
 ************************/
const xferData =
{
    "boe-boe": {name: "Board of Elections",
                phone: "7-8683"}, 
    "dot-highway": {name:"DOT: Highway Services",
                phone: "7-7623"},
    "dot-engineering": {name:"DOT: Traffic Engineering",
                phone: "7-2190"},
    "fin-payments": {name:"FIN: Pay by Phone",
                phone: "7-8898"},
    "fin-payroll": {name:"FIN: Payroll",
                phone: "7-8840"},
    "hhs-lar": {name:"HHS: Licensure and Regulatory",
                phone: "7-3986"},
    "hhs-oess": {name:"HHS: Office of Eligibilty and Support Services",
                phone: "7-1003"},
    "non-boe": {name:"Maryland State Board of Electricians",
                phone: "410-230-6163"},
    "non-mva": {name:"Motor Vehicle Administration",
                phone: "800-950-1682"},
    "hhs-covid": {name:"HHS: Covid Hotline",
                phone: "7-2982"},
    "hhs-odc": {name:"HHS: Disease Control and Epidemiology",
                phone: "7-1755"},
    "dot-parking": {name:"DOT: Division of Parking Management",
                phone: "7-8740"},
    "non-sdat": {name:"State Department of Assesments and Taxation",
                phone: "888-246-5941"},
    "non-sha": {name:"MDOT State Highway Administration:",
                phone: "301-513-7300"},
    "pol-pol": {name:"Police: Non-Emergency",
                phone: "301-279-8000"}
}

export {lafRoutes, lafDepots, commonCallData,xferData}