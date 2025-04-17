// Route-based train data for IRCTC simulation
const routeBasedTrains = {
    // Delhi (NDLS) to Mumbai (CSTM/BCT)
    "NDLS-CSTM": [
        {
            number: "12951",
            name: "Mumbai Rajdhani Express",
            departure: "16:35",
            arrival: "08:15",
            duration: "15h 40m",
            classes: {
                "SL": { available: 125, fare: 750 },
                "3A": { available: 83, fare: 1950 },
                "2A": { available: 28, fare: 2795 },
                "1A": { available: 12, fare: 4650 }
            }
        },
        {
            number: "12953",
            name: "August Kranti Rajdhani Express",
            departure: "17:05",
            arrival: "09:45",
            duration: "16h 40m",
            classes: {
                "SL": { available: 152, fare: 720 },
                "3A": { available: 45, fare: 1850 },
                "2A": { available: 18, fare: 2650 },
                "1A": { available: 5, fare: 4450 }
            }
        },
        {
            number: "12909",
            name: "Mumbai Central Garib Rath Express",
            departure: "15:25",
            arrival: "08:10",
            duration: "16h 45m",
            classes: {
                "SL": { available: 185, fare: 620 },
                "3A": { available: 120, fare: 1450 }
            }
        }
    ],
    // Delhi (NDLS) to Kolkata (HWH/KOAA)
    "NDLS-HWH": [
        {
            number: "12301",
            name: "Howrah Rajdhani Express",
            departure: "16:55",
            arrival: "09:45",
            duration: "16h 50m",
            classes: {
                "SL": { available: 145, fare: 780 },
                "3A": { available: 93, fare: 2050 },
                "2A": { available: 24, fare: 2850 },
                "1A": { available: 10, fare: 4750 }
            }
        },
        {
            number: "12305",
            name: "Howrah Duronto Express",
            departure: "12:55",
            arrival: "06:10",
            duration: "17h 15m",
            classes: {
                "SL": { available: 175, fare: 750 },
                "3A": { available: 85, fare: 1980 },
                "2A": { available: 30, fare: 2780 },
                "1A": { available: 15, fare: 4650 }
            }
        },
        {
            number: "12313",
            name: "Sealdah Rajdhani Express",
            departure: "16:30",
            arrival: "10:10",
            duration: "17h 40m",
            classes: {
                "SL": { available: 165, fare: 760 },
                "3A": { available: 75, fare: 2000 },
                "2A": { available: 22, fare: 2800 },
                "1A": { available: 8, fare: 4700 }
            }
        }
    ],
    // Delhi (NDLS) to Chennai (MAS)
    "NDLS-MAS": [
        {
            number: "12269",
            name: "Chennai Duronto Express",
            departure: "15:35",
            arrival: "20:40",
            duration: "29h 05m",
            classes: {
                "SL": { available: 135, fare: 850 },
                "3A": { available: 73, fare: 2250 },
                "2A": { available: 24, fare: 3050 },
                "1A": { available: 9, fare: 5250 }
            }
        },
        {
            number: "12615",
            name: "Grand Trunk (GT) Express",
            departure: "18:40",
            arrival: "06:50",
            duration: "36h 10m",
            classes: {
                "SL": { available: 185, fare: 820 },
                "3A": { available: 95, fare: 2150 },
                "2A": { available: 35, fare: 2950 },
                "1A": { available: 15, fare: 5050 }
            }
        },
        {
            number: "12621",
            name: "Tamil Nadu Express",
            departure: "22:30",
            arrival: "07:15",
            duration: "32h 45m",
            classes: {
                "SL": { available: 195, fare: 830 },
                "3A": { available: 85, fare: 2200 },
                "2A": { available: 32, fare: 3000 },
                "1A": { available: 12, fare: 5150 }
            }
        }
    ],
    // Delhi (NDLS) to Bengaluru (SBC)
    "NDLS-SBC": [
        {
            number: "12627",
            name: "Karnataka Express",
            departure: "20:50",
            arrival: "06:40",
            duration: "33h 50m",
            classes: {
                "SL": { available: 165, fare: 875 },
                "3A": { available: 85, fare: 2350 },
                "2A": { available: 28, fare: 3150 },
                "1A": { available: 10, fare: 5450 }
            }
        },
        {
            number: "22693",
            name: "Rajdhani Express (Via Vijayawada)",
            departure: "21:10",
            arrival: "05:30",
            duration: "32h 20m",
            classes: {
                "SL": { available: 155, fare: 890 },
                "3A": { available: 75, fare: 2400 },
                "2A": { available: 25, fare: 3200 },
                "1A": { available: 8, fare: 5550 }
            }
        }
    ],
    // Mumbai (CSTM/BCT) to Kolkata (HWH/KOAA)
    "CSTM-HWH": [
        {
            number: "12809",
            name: "Mumbai-Howrah Mail",
            departure: "21:35",
            arrival: "04:55",
            duration: "31h 20m",
            classes: {
                "SL": { available: 175, fare: 870 },
                "3A": { available: 75, fare: 2250 },
                "2A": { available: 28, fare: 3050 },
                "1A": { available: 10, fare: 5250 }
            }
        },
        {
            number: "12101",
            name: "Jnaneshwari Super Deluxe Express",
            departure: "15:05",
            arrival: "21:05",
            duration: "30h 00m",
            classes: {
                "SL": { available: 165, fare: 860 },
                "3A": { available: 70, fare: 2200 },
                "2A": { available: 25, fare: 3000 },
                "1A": { available: 8, fare: 5200 }
            }
        },
        {
            number: "12261",
            name: "Mumbai CST-Howrah Duronto Express",
            departure: "11:05",
            arrival: "16:10",
            duration: "29h 05m",
            classes: {
                "SL": { available: 155, fare: 890 },
                "3A": { available: 65, fare: 2300 },
                "2A": { available: 22, fare: 3100 },
                "1A": { available: 7, fare: 5350 }
            }
        }
    ],
    // Mumbai (CSTM/BCT) to Chennai (MAS)
    "CSTM-MAS": [
        {
            number: "12163",
            name: "Dadar-Chennai Central Express",
            departure: "19:10",
            arrival: "19:30",
            duration: "24h 20m",
            classes: {
                "SL": { available: 185, fare: 780 },
                "3A": { available: 75, fare: 2050 },
                "2A": { available: 30, fare: 2850 },
                "1A": { available: 12, fare: 4850 }
            }
        },
        {
            number: "11027",
            name: "Mumbai-Chennai Mail",
            departure: "23:05",
            arrival: "19:35",
            duration: "20h 30m",
            classes: {
                "SL": { available: 175, fare: 770 },
                "3A": { available: 65, fare: 2000 },
                "2A": { available: 25, fare: 2800 },
                "1A": { available: 10, fare: 4750 }
            }
        }
    ],
    // Chennai (MAS) to Bengaluru (SBC)
    "MAS-SBC": [
        {
            number: "12027",
            name: "Chennai Shatabdi Express",
            departure: "06:00",
            arrival: "10:50",
            duration: "4h 50m",
            classes: {
                "CC": { available: 145, fare: 780 },
                "EC": { available: 45, fare: 1480 }
            }
        },
        {
            number: "12639",
            name: "Brindavan Express",
            departure: "07:50",
            arrival: "13:25",
            duration: "5h 35m",
            classes: {
                "SL": { available: 150, fare: 390 },
                "3A": { available: 75, fare: 1050 },
                "CC": { available: 168, fare: 740 }
            }
        },
        {
            number: "12607",
            name: "Lalbagh Express",
            departure: "15:35",
            arrival: "21:05",
            duration: "5h 30m",
            classes: {
                "SL": { available: 165, fare: 380 },
                "3A": { available: 85, fare: 1020 },
                "CC": { available: 158, fare: 720 }
            }
        }
    ],
    // Default trains for any other route
    "default": [
        {
            number: "12345",
            name: "Sampark Kranti Express",
            departure: "08:30",
            arrival: "19:45",
            duration: "11h 15m",
            classes: {
                "SL": { available: 168, fare: 720 },
                "3A": { available: 82, fare: 1920 },
                "2A": { available: 32, fare: 2650 },
                "1A": { available: 14, fare: 4450 }
            }
        },
        {
            number: "12456",
            name: "Superfast Express",
            departure: "14:15",
            arrival: "23:30",
            duration: "9h 15m",
            classes: {
                "SL": { available: 185, fare: 680 },
                "3A": { available: 92, fare: 1850 },
                "2A": { available: 35, fare: 2550 },
                "1A": { available: 18, fare: 4350 }
            }
        },
        {
            number: "16789",
            name: "Garib Rath Express",
            departure: "21:10",
            arrival: "08:25",
            duration: "11h 15m",
            classes: {
                "SL": { available: 210, fare: 650 },
                "3A": { available: 105, fare: 1750 }
            }
        }
    ]
}; 