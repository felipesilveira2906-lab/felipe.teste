export const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida/AEtjO1Xwi6u4skTv0R9_TflUBmMIGiv_JbrFusrI3knXLY4Z-HD600oKyrEiBrw8Z1Z8Yd1d9-j2wh0TfQtVXsGY0-CX8_IhHkwulyqqu-34VjACyaU4Zyn30aGMysep5OmWuFnGlcXKygF8VrirsfdpjhoLP98knsQBum4kLEGPm933Ici0x9BfqrCEk-VDecD0RMm51buvjlrzRoPQlfqUB_2uTG-AakQ5TYqfudFrFx8x_HqByoXJQ7KGqbw",
  profile: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXzRm4_F-NSPA0p9CanjymlCF71G0dTNwHlPLjdB82NsTa83jNjLu106rkMQB_qkKGYGEvdZFlIbkvNykV06mUWcbXDf4Jp8s_AoUWYowDHlivbYzZ-hB3UT9y2t-djKJUyoFxnbYojZp03cwFY0A1kcHHchs9GgwOa7veUv6TyUbXe7fmwpdVtlTw1PVl9fVMhc0XvFHCSRqa14r2UuAa5C0COTRbPX4b2sHBXP0N2hh7w6wg_0k6",
  cb500xHero: "https://lh3.googleusercontent.com/aida-public/AB6AXuB621nxVbrvKRiFJoJkJQ_vKWhPhDwhPrVfMHczHBrMeBgjCmyj_J5Zgq_tqEo-lE8IX5otsKzji1dtn2Ef9xeJvpIzCeYSpaMglfrkwcfRIARjFRtRGOmVeJIUHeGx3MtNl56wXM6iCjbQ05vdKgSIdkBCgvKkR10Cgsm2mEwVlW2nX8qjV33qg0qZn3gFRUPNdisi4FwCr6HqE7dKj0tjaZgcBuRyXMWMQ3-daJYbY6VWgLJjyclI",
  cockpitMap: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH44fUOT7El2VgblikP7R9rsA2UUpcDUdJK83jDmVxWESmG1fZH74Ef8M8we301U0X9kDhTcYUiAahlxyk0C7ObtPiUdCAmfI28_Pbdf4VUp0sBXJaBA_474azRAhHJzWZPvHg1j1-cdfxfQ4CuD5yLR7HUrm9Jg8wjFB5ss6-405uLacrG0YnJLMCg8eG5ltTD230i4JP_X_y-bh9xW4K9WGBgxn_8pgpfa6aTOOV1nEZlOvhY16i",
};

export interface LogbookEntry {
  id: string;
  title: string;
  date: string;
  location: string;
  details: string;
  price: string;
  status: "scheduled" | "completed";
  odometer?: string;
}

export interface VehicleData {
  id: string;
  type: "moto" | "car";
  shortName: string;
  fullName: string;
  brandYear: string;
  year: string;
  plate: string;
  fuelType: string;
  engineSpec: string;
  tankSpec: string;
  maxRangeSpec: string;
  healthPercent: number;
  odometer: string;
  tankPercent: number;
  estimatedRangeKm: number;
  avgConsumption: string;
  lastFuelPrice: string;
  heroImage: string;
  manualLabel: string;
  alertTitle: string;
  alertRemainingKm: number;
  alertDays: number;
  alertLimitKm: string;
  alertDailyProfile: string;
  logbook: LogbookEntry[];
}

export const INITIAL_VEHICLES: Record<string, VehicleData> = {
  cb500x: {
    id: "cb500x",
    type: "moto",
    shortName: "CB 500X",
    fullName: "Honda CB 500X",
    brandYear: "Honda • 2023",
    year: "2023",
    plate: "BRA2E19",
    fuelType: "Flex",
    engineSpec: "500cc • 50,4 cv",
    tankSpec: "17,5 L (Flex)",
    maxRangeSpec: "~490 km",
    healthPercent: 94,
    odometer: "14.250",
    tankPercent: 68,
    estimatedRangeKm: 285,
    avgConsumption: "28,4 km/L",
    lastFuelPrice: "R$ 5,69",
    heroImage: ASSETS.cb500xHero,
    manualLabel: "Manual 500X",
    alertTitle: "Troca de Óleo & Filtro",
    alertRemainingKm: 350,
    alertDays: 12,
    alertLimitKm: "14.600",
    alertDailyProfile: "28 km/dia",
    logbook: [
      {
        id: "1",
        title: "Revisão Periódica 15.000 km",
        date: "12/05/2025",
        location: "Concessionária Honda Mavesa SP",
        details: "Troca de velas, filtro de ar e check-up",
        price: "R$ 380,00",
        status: "scheduled",
      },
      {
        id: "2",
        title: "Substituição do Pneu Traseiro",
        date: "14/01/2025",
        odometer: "Aos 11.200 km",
        location: "Borracharia & Moto Center Mooca",
        details: "Pirelli Scorpion Rally STR 160/60 R17 c/ balanceamento",
        price: "R$ 620,00",
        status: "completed",
      },
      {
        id: "3",
        title: "Tensionamento & Lubrificação",
        date: "28/03/2025",
        odometer: "Aos 13.800 km",
        location: "Garagem Domiciliar (Motul C4)",
        details: "",
        price: "R$ 35,00",
        status: "completed",
      },
    ],
  },
  corolla: {
    id: "corolla",
    type: "car",
    shortName: "Corolla XEi",
    fullName: "Toyota Corolla XEi",
    brandYear: "Toyota • 2022",
    year: "2022",
    plate: "FSP4H88",
    fuelType: "Flex",
    engineSpec: "2.0L • 177 cv",
    tankSpec: "50 L (Flex)",
    maxRangeSpec: "~610 km",
    healthPercent: 97,
    odometer: "38.420",
    tankPercent: 82,
    estimatedRangeKm: 495,
    avgConsumption: "12,2 km/L",
    lastFuelPrice: "R$ 5,69",
    heroImage: ASSETS.cb500xHero,
    manualLabel: "Manual Corolla",
    alertTitle: "Alinhamento & Balanceamento",
    alertRemainingKm: 1580,
    alertDays: 35,
    alertLimitKm: "40.000",
    alertDailyProfile: "45 km/dia",
    logbook: [
      {
        id: "c1",
        title: "Revisão Programada 40.000 km",
        date: "22/06/2025",
        location: "Toyota Tsusho Paulista",
        details: "Fluido de freio, óleo sintético 0W-20 e filtros",
        price: "R$ 940,00",
        status: "scheduled",
      },
      {
        id: "c2",
        title: "Troca de Palhetas e Higienização A/C",
        date: "10/02/2025",
        odometer: "Aos 35.100 km",
        location: " Bosch Car Service Jardins",
        details: "Filtro de cabine carvão ativado + oxi-sanitização",
        price: "R$ 240,00",
        status: "completed",
      },
    ],
  },
};
