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
    'disc-rep': {
        subject: "Disconnect-Rep initiated (No response)",
        notes: "Caller stopped responding. Read no response disclose and disconnected call"
    },
    'disc-caller': {
        subject: "Disconnect-Caller initiated",
        notes: "Caller stopped responding, then call dropped."
    },
    'sw-slide': {
        subject: "Solid Waste-Slide Week",
        notes: "Advised of 1 day slide this week due to Holiday.",
        'sw-no-trash': "Advised we do not provide trash to this address and to reach out to private collector."
    },
    'sw-no-trash': {
        subject: "Solid Waste-No County Trash Service",
        notes: "Advised we do not provide trash service to this address."
    },
    'sw-station': {
        subject: "Solid Waste-Transfer Station Info",
        notes: "Gave info about Transfer Station Including:\n" +
            "Hours: M-Sa 7am-5pm & Su 9am-5pm\n" +
            "Cost: 500lbs free then $60/ton\n" +
            "Location: 16101 Frederick Rd, Derwood, MD 20855"
    },
    'rrp-apply': {
        subject: "RRP-How to apply",
        notes: "Gave info about applying for RRP including:\n" +
            "Where to apply online.\n" +
            "What non-profits can help apply.\n" +
            "Emailed KBA to apply."
    },
    'rrp-status': {
        subject: "RRP-How to check status",
        notes: "Advised RRP status can be checked by logging into RRP portal or emailing HHS@montgomerycountymd.gov."
    }
}

/************************ 
 * COMMON TRANSFER NOTES
 ************************/
const xferData =
{
    "boe-boe": {
        name: "Board of Elections",
        phone: "7-8683"
    },
    "dot-highway": {
        name: "DOT: Highway Services",
        phone: "7-7623"
    },
    "dot-engineering": {
        name: "DOT: Traffic Engineering",
        phone: "7-2190"
    },
    "fin-payments": {
        name: "FIN: Pay by Phone",
        phone: "7-8898"
    },
    "fin-payroll": {
        name: "FIN: Payroll",
        phone: "7-8840"
    },
    "hhs-lar": {
        name: "HHS: Licensure and Regulatory",
        phone: "7-3986"
    },
    "hhs-oess": {
        name: "HHS: Office of Eligibility and Support Services",
        phone: "7-1003"
    },
    "cupf-cupf": {
        name: "CUPF: Community Use of Public Facilities",
        phone: "7-2725"
    },
    "non-boe": {
        name: "Maryland State Board of Electricians",
        phone: "410-230-6163"
    },
    "non-mva": {
        name: "Motor Vehicle Administration",
        phone: "800-950-1682"
    },
    "hhs-covid": {
        name: "HHS: Covid Hotline",
        phone: "7-2982"
    },
    "hhs-odc": {
        name: "HHS: Disease Control and Epidemiology",
        phone: "7-1755"
    },
    "dot-parking": {
        name: "DOT: Division of Parking Management",
        phone: "7-8740"
    },
    "non-sdat": {
        name: "State Department of Assesments and Taxation",
        phone: "888-246-5941"
    },
    "non-sha": {
        name: "MDOT State Highway Administration:",
        phone: "301-513-7300"
    },
    "pol-pol": {
        name: "Police: Non-Emergency",
        phone: "301-279-8000"
    }
}

/****************** 
 * COMMON STOP IDs
 ******************/
const stopIdData = {
    'bethesda': {
        name: 'Bethesda',
        routes: {
            29: ['20306', '20308'],
            30: ['20308'],
            32: ['20306', '20308'],
            34: ['20300'],
            36: ['20306', '20308'],
            47: ['20308'],
            70: ['20308'],
        }
    },
    'forest_glen': {
        name: 'Forest Glen',
        routes: {
            7: ['15276'],
            8: ['15272'],
        }
    },
    'friendship_heights': {
        name: 'Friendship Heights',
        routes: {
            1: ['22700'],
            11: ['22700'],
            23: ['14769'],
            29: ['14769'],
            34: ['22700', '27356'],
        }
    },
    'germantown': {
        name: 'Germantown',
        routes: {
            55: ['15182'],
            61: ['15182'],
            74: ['15182'],
            75: ['28898'],
            83: ['15012'],
            97: ['15182'],
            98: ['15182'],
            100: ['15182'],
        }
    },
    'glenmont': {
        name: 'Glenmont',
        routes: {
            10: ['29190'],
            26: ['29184', '29182'],
            31: ['29182'],
            33: ['29180'],
            39: ['29184', '29182'],
            41: ['29184', '29182'],
            51: ['29182', '29190'],
            53: ['29182'],
            55: ['29180'],
        }
    },
    'grosvenor': {
        name: 'Grosvenor',
        routes: {
            6: ['15298'],
            37: ['15298'],
            46: ['27730'],
            96: ['23164'],
        }
    },
    'lakeforest': {
        name: 'Lakeforest',
        routes: {
            54: ['23722'],
            55: ['23722'],
            56: ['23722'],
            57: ['23722'],
            58: ['23722'],
            59: ['23722'],
            61: ['23722'],
            101: ['30010'],
        }
    },
    'medical_center': {
        name: 'Medical Center',
        routes: {
            30: ['24010'],
            33: ['24006'],
            34: ['24008'],
            46: ['24008'],
            70: ['24010'],
            101: ['24010'],
        }
    },
    'montgomery_mall': {
        name: 'Montgomery Mall',
        routes: {
            6: ['17620'],
            26: ['17621'],
            42: ['17626'],
            47: ['17624'],
            96: ['17620'],
        }
    },
    'rockville': {
        name: 'Rockville',
        routes: {
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
        }
    },
    'shady_grove': {
        name: 'Shady Grove',
        routes: {
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
        }
    },
    'silver_spring': {
        name: 'Silver Spring',
        routes: {
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
        }
    },
    'twinbrook': {
        name: 'Twinbrook',
        routes: {
            5: ['26588'],
            10: ['28424', '26580'],
            26: ['26580'],
            44: ['26582'],
            45: ['28424'],
            46: ['26586'],
        }
    },
    'wheaton': {
        name: 'Wheaton',
        routes: {
            9: ['15416'],
            31: ['29740'],
            34: ['27186'],
            38: ['29740'],
        }
    },
    'white_flint': {
        name: 'White Flint',
        routes: {
            5: ['25542', '25610'],
            26: ['25542', '25610'],
            42: ['25542'],
            46: ['25542', '25610'],
            81: ['25542', '25610'],
            101: ['25542', '25610'],
        }
    }
}

export { lafRoutes, lafDepots, commonCallData, xferData, stopIdData }
