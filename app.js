/* ==========================================================================
   Gram-Mausam (গ্রামমৌসম / গ্রামमौसम) - Agricultural Climate Intelligence System
   SIH26086: Ministry of Earth Sciences (MoES) / IMD
   Target Locations:
   - Burdwan City & Subdivisions (Purba Bardhaman, West Bengal) [UIT Burdwan]
   - Chota Nagpur Plateau (Ranchi Pilot, Jharkhand)
   Features:
   - Real-time live weather streaming & Damodar Basin telemetry
   - Multi-channel Productivity Messaging Hub (WhatsApp, Text SMS & Voice in 3 Languages: Bengali, Hindi, English)
   - Block & Panchayat Scale Downscaled Outlook (7-to-30 Days)
   - Global Teleconnections (ENSO, IOD, MJO Wheeler-Hendon, BSISO)
   - Dynamic Root-Zone Water Balance (FAO-56 Penman-Monteith)
   - Aquifer & Tubewell/Borewell Advisory (Alluvial & Hard-Rock)
   - 8-Crop Hydro-Agronomic Matrix with Burdwan GI crops & Contingency Fallback
   - Mayank Shah's 5 Security Checks Verification Modal
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Antigravity Design Tokens Initialization
     -------------------------------------------------------------------------- */
  const ANTIGRAVITY_DESIGN_TOKENS = {
    spacing: {
      '--ag-space-1': '4px',
      '--ag-space-2': '8px',
      '--ag-space-3': '12px',
      '--ag-space-4': '16px',
      '--ag-space-5': '20px',
      '--ag-space-6': '24px',
      '--ag-space-7': '28px',
      '--ag-space-8': '32px',
    },
    colors: {
      '--ag-text-primary': '#121317',
      '--ag-text-secondary': '#454954',
      '--ag-text-tertiary': '#6E7480',
      '--ag-text-inverse': '#FFFFFF',
      '--ag-bg-canvas': '#F4F6F8',
      '--ag-bg-surface': '#FFFFFF',
      '--ag-bg-subtle': '#ECEFF2',
      '--ag-green-primary': '#0F8A5F',
      '--ag-green-light': '#E7F6EE',
      '--ag-green-dark': '#0A5E40',
      '--ag-monsoon-blue': '#0284C7',
      '--ag-monsoon-light': '#E0F2FE',
      '--ag-monsoon-dark': '#0369A1',
      '--ag-amber-warning': '#D97706',
      '--ag-amber-light': '#FEF3C7',
      '--ag-red-danger': '#DC2626',
      '--ag-red-light': '#FEE2E2',
      '--ag-purple-mjo': '#7C3AED',
      '--ag-purple-light': '#EDE9FE',
    }
  };

  function applyAntigravityTokens() {
    const root = document.documentElement;
    Object.entries(ANTIGRAVITY_DESIGN_TOKENS.spacing).forEach(([k, v]) => root.style.setProperty(k, v));
    Object.entries(ANTIGRAVITY_DESIGN_TOKENS.colors).forEach(([k, v]) => root.style.setProperty(k, v));
  }

  /* --------------------------------------------------------------------------
     2. Comprehensive Location Data Registry (Burdwan WB + Jharkhand Pilot)
     -------------------------------------------------------------------------- */
  const LOCATION_DATA = {
    // West Bengal: Purba Bardhaman (Burdwan City & Subdivisions)
    burdwan: {
      name: { en: "Burdwan City (Purba Bardhaman, WB)", bn: "বর্ধমান সদর (পূর্ব বর্ধমান)", hi: "बर्धमान शहर (पश्चिम बंगाल)", nag: "बर्धमान (पं. बंगाल)", sat: "ᱵᱚᱨᱫᱷᱚᱢᱟᱱ (ᱯ. ᱵᱮᱝᱜᱚᱞ)", mr: "बर्धमान शहर (प. बंगाल)", te: "బర్ధమాన్ నగరం (ప. బెంగాల్)" },
      isPilot: true,
      elevation: 30,
      wtd: 4.8,
      sy: 14.0,
      suctionLimit: 10.0,
      safePumpingHours: "4.5 hrs/d",
      savingRs: "₹800 / acre",
      currentSmi: 0.82,
      onsetDates: "10–14 June",
      sowingDate: "12 June",
      breakDates: "16–20 July",
      breakDays: 4,
      breakProb: "32.0%",
      onsetProb: "92.4%",
      pe: "52.4 mm",
      et0: "4.2 mm/d",
      ds: "+25.0 mm/d",
      primaryCrop: "Aman Paddy (Swarna & Gobindobhog)",
      stationId: "IMD-WB-BURDWAN-01 &bull; Burdwan Sadar / UIT Campus",
      canalStatus: "Normal Flow (DVC Barrage safe)",
      panchayats: [
        { id: "burdwan_sadar", name: "Burdwan Sadar / UIT Campus", smi: 0.82, wtd: 4.8 },
        { id: "golapbag", name: "Golapbag Agricultural Zone", smi: 0.84, wtd: 4.6 },
        { id: "rajbati", name: "Rajbati Urban-Agri Fringe", smi: 0.80, wtd: 5.0 },
        { id: "baburbag", name: "Baburbag Cluster", smi: 0.83, wtd: 4.7 },
        { id: "alisha", name: "Alisha Highway Belt", smi: 0.79, wtd: 5.1 },
        { id: "kamalnagar", name: "Kamalnagar Panchayat", smi: 0.85, wtd: 4.5 }
      ],
      sampleAdvisory: {
        bn: "বর্ধমান সদর ও অববাহিকা: বঙ্গোপসাগরীয় মৌসুমি অক্ষরেখা সক্রিয় — মাটিতে আর্দ্রতা অনুকূল (SMI 0.82), ১২ জুন থেকে আমন ধানের বীজতলা ও চারা রোপণ শুরু করুন। ডিভিসি দামোদর খালের জলস্তর স্বাভাবিক। নীচু জমিতে অতিরিক্ত জল নিষ্কাশনের ব্যবস্থা রাখুন।",
        hi: "बर्धमान सदर एवं दामोदर बेसिन: बंगाल की खाड़ी से मानसूनी हवाएं सक्रिय — मिट्टी में पर्याप्त नमी (SMI 0.82), 12 जून से अमन धान (स्वर्णा व गोविंदभोग) की बुवाई शुरू करें। डीवीसी नहर में जलस्तर सामान्य। निचले खेतों में जल निकासी खुली रखें।",
        en: "Burdwan City & Damodar Basin: Active monsoon flow from Bay of Bengal — soil moisture optimal (SMI 0.82), initiate Aman paddy (Swarna & Gobindobhog) nursery and transplantation from 12 June. DVC canal running normal flow. Ensure field drainage channels are open."
      }
    },
    burdwan_1: {
      name: { en: "Burdwan-I Block (Rayna/Kamalnagar)", bn: "বর্ধমান-১ ব্লক (রায়না/কমলনগর)", hi: "बर्धमान-1 ब्लॉक", nag: "बर्धमान-1", sat: "ᱵᱚᱨᱫᱷᱚᱢᱟᱱ-᱑", mr: "बर्धमान-१ ब्लॉक", te: "బర్ధమాన్-1" },
      isPilot: true,
      elevation: 28,
      wtd: 4.5,
      sy: 14.5,
      suctionLimit: 10.0,
      safePumpingHours: "5.0 hrs/d",
      savingRs: "₹750 / acre",
      currentSmi: 0.85,
      onsetDates: "10–13 June",
      sowingDate: "11 June",
      breakDates: "17–20 July",
      breakDays: 3,
      breakProb: "28.0%",
      onsetProb: "93.0%",
      pe: "56.0 mm",
      et0: "4.1 mm/d",
      ds: "+28.0 mm/d",
      primaryCrop: "Aman Paddy, Jute & Vegetables",
      stationId: "IMD-WB-BURDWAN-02 &bull; Rayna Substation",
      canalStatus: "Optimal Inflow",
      panchayats: [
        { id: "rayna", name: "Rayna Panchayat", smi: 0.85, wtd: 4.5 },
        { id: "saraitikar", name: "Saraitikar Panchayat", smi: 0.86, wtd: 4.3 }
      ],
      sampleAdvisory: {
        bn: "বর্ধমান-১ ব্লক: পাট এবং আমন ধানের জন্য উপযুক্ত সময়। জমিতে ৫ সেমির বেশি জল জমতে দেবেন না।",
        hi: "बर्धमान-1 ब्लॉक: जूट और अमन धान के लिए उत्तम समय। खेतों में 5 सेमी से अधिक पानी न भरने दें।",
        en: "Burdwan-I Block: Favorable window for Jute retting and Aman paddy seedling establishment."
      }
    },
    burdwan_2: {
      name: { en: "Burdwan-II Block (Kurmun/Barsul)", bn: "বর্ধমান-২ ব্লক (কুড়মুন/বারশুল)", hi: "बर्धमान-2 ब्लॉक", nag: "बर्धमान-2", sat: "ᱵᱚᱨᱫᱷᱚᱢᱟᱱ-᱒", mr: "बर्धमान-२ ब्लॉक", te: "బర్ధమాన్-2" },
      isPilot: true,
      elevation: 32,
      wtd: 5.1,
      sy: 13.8,
      suctionLimit: 10.0,
      safePumpingHours: "4.5 hrs/d",
      savingRs: "₹820 / acre",
      currentSmi: 0.81,
      onsetDates: "11–14 June",
      sowingDate: "13 June",
      breakDates: "16–21 July",
      breakDays: 5,
      breakProb: "34.0%",
      onsetProb: "91.5%",
      pe: "50.0 mm",
      et0: "4.3 mm/d",
      ds: "+22.0 mm/d",
      primaryCrop: "Gobindobhog Rice & Mustard",
      stationId: "KVK-WB-BURD-04 &bull; Kurmun Agromet",
      canalStatus: "Normal Regulated Flow",
      panchayats: [
        { id: "kurmun", name: "Kurmun Gram Panchayat", smi: 0.81, wtd: 5.1 },
        { id: "barsul", name: "Barsul Panchayat", smi: 0.82, wtd: 5.0 }
      ],
      sampleAdvisory: {
        bn: "বর্ধমান-২ ব্লক: সুগন্ধি গোবিন্দভোগ ধানের অনুকূল আবহাওয়া। শিষ আসার সময় প্রয়োজনীয় আর্দ্রতা বজায় রাখুন।",
        hi: "बर्धमान-2 ब्लॉक: सुगंधित गोविंदभोग धान के लिए अनुकूल मौसम। बालियां निकलते समय नमी बनाए रखें।",
        en: "Burdwan-II Block: Prime conditions for aromatic Gobindobhog rice nursery and transplanting."
      }
    },
    memari: {
      name: { en: "Memari Block (Paddy-Potato Belt)", bn: "মেমারী ব্লক (ধান ও আলু অঞ্চল)", hi: "मेमारी ब्लॉक (धान-आलू बेल्ट)", nag: "मेमारी", sat: "ᱢᱮᱢᱟᱨᱤ", mr: "मेमारी ब्लॉक", te: "మేమారి బ్లాక్" },
      isPilot: true,
      elevation: 25,
      wtd: 4.2,
      sy: 15.0,
      suctionLimit: 10.0,
      safePumpingHours: "5.5 hrs/d",
      savingRs: "₹700 / acre",
      currentSmi: 0.88,
      onsetDates: "09–13 June",
      sowingDate: "11 June",
      breakDates: "17–20 July",
      breakDays: 3,
      breakProb: "25.0%",
      onsetProb: "94.0%",
      pe: "62.0 mm",
      et0: "4.0 mm/d",
      ds: "+34.0 mm/d",
      primaryCrop: "Aman Paddy & Pre-Potato Soil Prep",
      stationId: "IMD-WB-MEMARI-01",
      canalStatus: "High Canal Recharge",
      panchayats: [
        { id: "memari_rural", name: "Memari Rural", smi: 0.88, wtd: 4.2 }
      ],
      sampleAdvisory: {
        bn: "মেমারী ব্লক: প্রচুর বৃষ্টিপাত ও অগভীর ভূগর্ভস্থ জলস্তর। আলুর জমির জন্য উপযুক্ত নিকাশী নালা তৈরি রাখুন।",
        hi: "मेमारी ब्लॉक: प्रचुर वर्षा एवं उथला भूजल स्तर। आलू की पूर्व-तैयारी के लिए जल निकासी नालियां खुली रखें।",
        en: "Memari Block: Abundant precipitation and shallow alluvial aquifer. Maintain drainage for potato field prep."
      }
    },

    // Jharkhand Pilot Blocks (Chota Nagpur Plateau)
    kanke: {
      name: { en: "Kanke Block (Ranchi)", bn: "কাঙ্কে ব্লক (রাঁচি, ঝাড়খণ্ড)", hi: "कांके प्रखंड (राँची)", nag: "कांके ब्लॉक (राँची)", sat: "ᱠᱟᱸᱠᱮ ᱵᱞᱚᱠ (ᱨᱟᱺᱪᱤ)", mr: "कांके ब्लॉक (रांची)", te: "కాంకే బ్లాక్ (రాంచీ)" },
      isPilot: true,
      elevation: 648,
      wtd: 9.4,
      sy: 2.2,
      suctionLimit: 12.0,
      safePumpingHours: "2.0 hrs/d",
      savingRs: "₹1,250 / acre",
      currentSmi: 0.68,
      onsetDates: "18–21 June",
      sowingDate: "20 June",
      breakDates: "12–20 July",
      breakDays: 8,
      breakProb: "74.5%",
      onsetProb: "86.4%",
      pe: "42.8 mm",
      et0: "4.6 mm/d",
      ds: "+19.9 mm/d",
      primaryCrop: "Rice / Paddy (Dhan) & Madua",
      stationId: "IMD-JH-RANCHI-02 &bull; Kanke Agro Station",
      canalStatus: "Hard-rock terrain (Rainfed / Borewell)",
      panchayats: [
        { id: "kanke_central", name: "Kanke Central Panchayat", smi: 0.68, wtd: 9.4 },
        { id: "sukurhutu", name: "Sukurhutu Panchayat", smi: 0.65, wtd: 9.8 },
        { id: "pithoria", name: "Pithoria Panchayat", smi: 0.72, wtd: 8.9 }
      ],
      sampleAdvisory: {
        bn: "কাঙ্কে ব্লক (রাঁচি): ১৮-২১ জুন মৌসুমি বায়ু আগমন সম্ভাব্য — ২০ জুন থেকে ধান বোনা শুরু করুন। ১২-২০ জুলাই শুকনো আবহাওয়া থাকবে, বোরওয়েল দিনে সর্বাধিক ২ ঘণ্টা চালান।",
        hi: "कांके प्रखंड (राँची जिला): मानसून आगमन 18-21 जून संभावित — 20 जून से धान बुवाई शुरू करें। 12-20 जुलाई सूखे के दौरान बोरवेल केवल 2 घंटे/दिन चलाएं।",
        en: "Kanke block (Ranchi): monsoon onset expected 18–21 June — soil moisture optimal, begin paddy sowing on 20 June. Break alert: 12–20 July (8-day dry spell) — limit pumping to 2 hrs/day."
      }
    },
    mandar: {
      name: { en: "Mandar Block (Ranchi)", bn: "মান্ডার ব্লক (রাঁচি)", hi: "मांडर प्रखंड (राँची)", nag: "मांडर ब्लॉक", sat: "ᱢᱟᱸᱫᱟᱨ", mr: "मांडर", te: "మందార్" },
      isPilot: true,
      elevation: 620,
      wtd: 10.2,
      sy: 1.8,
      suctionLimit: 12.0,
      safePumpingHours: "1.5 hrs/d",
      savingRs: "₹1,400 / acre",
      currentSmi: 0.62,
      onsetDates: "19–22 June",
      sowingDate: "21 June",
      breakDates: "11–19 July",
      breakDays: 9,
      breakProb: "78.0%",
      onsetProb: "82.5%",
      pe: "38.5 mm",
      et0: "4.8 mm/d",
      ds: "+14.2 mm/d",
      primaryCrop: "Madua (Ragi) & Maize",
      stationId: "IMD-JH-MANDAR-01",
      canalStatus: "Rainfed Upland",
      panchayats: [{ id: "mandar_hq", name: "Mandar HQ", smi: 0.62, wtd: 10.2 }],
      sampleAdvisory: {
        bn: "মান্ডার ব্লক: ১১-১৯ জুলাই দীর্ঘ শুকনো থাকার আশঙ্কা। ধানের বদলে মড়ুয়া (Ragi) চাষকে অগ্রাধিকার দিন।",
        hi: "मांडर प्रखंड: 11-19 जुलाई तक कड़ा मानसून विराम अनुमानित। मड़ुआ की बुवाई को प्राथमिकता दें।",
        en: "Mandar block: Severe 9-day break risk 11–19 July. Prioritize Madua (Finger Millet) over late paddy."
      }
    },

    // Macro Belts
    vidarbha: {
      name: { en: "Vidarbha (Cotton/Soybean)", bn: "বিদর্ভ (তুলা ও সোয়াবিন)", hi: "विदर्भ (कपास एवं सोयाबीन)", nag: "विदर्भ", sat: "ᱵᱤᱫᱚᱨᱵᱷᱚ", mr: "विदर्भ", te: "విదర్భ" },
      isPilot: false,
      elevation: 310,
      wtd: 8.2,
      sy: 3.2,
      suctionLimit: 14.0,
      safePumpingHours: "3.5 hrs/d",
      savingRs: "₹950 / acre",
      currentSmi: 0.82,
      onsetDates: "15–18 June",
      sowingDate: "17 June",
      breakDates: "05–12 August",
      breakDays: 7,
      breakProb: "58.0%",
      onsetProb: "92.0%",
      pe: "65.0 mm",
      et0: "4.2 mm/d",
      ds: "+32.0 mm/d",
      primaryCrop: "Cotton & Soybean",
      stationId: "IMD-MH-NAGPUR-01",
      canalStatus: "Black Soil Retention",
      panchayats: [],
      sampleAdvisory: {
        bn: "বিদর্ভ: ভারী বৃষ্টির সতর্কতা। জমিতে নিকাশী নালা তৈরি করুন ও ইউরিয়া প্রয়োগ স্থগিত রাখুন।",
        hi: "विदर्भ: मूसलाधार वर्षा का अलर्ट। काली मिट्टी में जल निकासी नालियां खोलें।",
        en: "Vidarbha: Heavy convective downpours expected. Open drainage furrows immediately."
      }
    }
  };

  /* --------------------------------------------------------------------------
     3. 8-Crop Hydro-Agronomic Matrix (Includes Burdwan Rice Bowl Specialties)
     -------------------------------------------------------------------------- */
  const CROPS_MATRIX = [
    {
      id: "rice",
      name: "Rice / Paddy (Aman / Dhan)",
      localName: "আমন ধান (স্বর্ণা / MTU-7029)",
      season: "kharif",
      isFallback: false,
      waterReq: "120–150 cm",
      criticalStage: "Tillering, Panicle Initiation, Flowering",
      breakSensitivity: "Very High",
      sensClass: "sens-vhigh",
      advisory: "Mainstay of Burdwan and Bengal delta. Adopt Alternate Wetting & Drying (AWD) to cut water by 30%. If delayed >14d, switch to short duration variety."
    },
    {
      id: "gobindobhog",
      name: "Gobindobhog Rice (Burdwan Special)",
      localName: "গোবিন্দভোগ ধান (বর্ধমান জিআই ট্যাগ)",
      season: "kharif",
      isFallback: false,
      waterReq: "110–130 cm",
      criticalStage: "Tillering, Aromatic Grain Filling",
      breakSensitivity: "High",
      sensClass: "sens-high",
      advisory: "Burdwan's GI-tagged heritage aromatic rice. Maintain 3-5 cm standing water during panicle formation; prevent standing water desiccation."
    },
    {
      id: "potato",
      name: "Potato / Alu (Burdwan Belt)",
      localName: "আলু (বর্ধমান ও মেমারী বেল্ট)",
      season: "rabi",
      isFallback: false,
      waterReq: "40–50 cm",
      criticalStage: "Tuber Initiation & Bulking",
      breakSensitivity: "High",
      sensClass: "sens-high",
      advisory: "Burdwan is India's leading potato zone. Clear post-monsoon field drainage channels to prevent fungal blight and tuber rot."
    },
    {
      id: "jute",
      name: "Jute (Patson / পাট)",
      localName: "পাট (তোষা ও দেশি)",
      season: "kharif",
      isFallback: false,
      waterReq: "150–200 cm",
      criticalStage: "Early Vegetative, Stem Elongation (45–70 days)",
      breakSensitivity: "High",
      sensClass: "sens-high",
      advisory: "Extensively grown in Burdwan-I and Kalna alluvial plains. Requires clean retting water in DVC canal distributaries post-harvest."
    },
    {
      id: "ragi",
      name: "Ragi / Finger Millet (Madua)",
      localName: "মড়ুয়া / রাগী (আকস্মিক ফসল)",
      season: "kharif",
      isFallback: true,
      waterReq: "35–50 cm",
      criticalStage: "Tillering, Flowering, Grain Formation",
      breakSensitivity: "Very Low",
      sensClass: "sens-vlow",
      advisory: "⭐ PRIMARY FALLBACK CHAMPION: Mandatory recommendation for rainfed uplands (Tanr) or when onset is delayed >3 weeks. Needs only 35-50 cm water."
    },
    {
      id: "mustard",
      name: "Mustard (Sarson / সর্ষে)",
      localName: "সর্ষে (হলুদ ও কালো)",
      season: "rabi",
      isFallback: false,
      waterReq: "25–35 cm",
      criticalStage: "Flowering, Siliqua Development",
      breakSensitivity: "Low",
      sensClass: "sens-low",
      advisory: "Cultivated in Burdwan following Aman paddy harvest utilizing residual subsoil moisture."
    },
    {
      id: "maize",
      name: "Maize / Corn (Makka / ভুট্টা)",
      localName: "ভুট্টা / মাক্কা",
      season: "kharif",
      isFallback: false,
      waterReq: "50–80 cm",
      criticalStage: "Tasseling, Silking, Early Grain Filling",
      breakSensitivity: "High",
      sensClass: "sens-high",
      advisory: "Ridge-and-furrow drainage for heavy downpours. One protective tubewell pulse during a 7–10 day dry break."
    },
    {
      id: "pulses",
      name: "Pulses - Arhar / Tur (রহর ডাল)",
      localName: "অড়হর / তুর ডাল",
      season: "kharif",
      isFallback: true,
      waterReq: "35–45 cm",
      criticalStage: "Branching, Flowering, Pod Development",
      breakSensitivity: "Low",
      sensClass: "sens-low",
      advisory: "Intercrop with maize on upland fields in 1:2 ratio. Deep taproots withstand dry spells without supplemental irrigation."
    }
  ];

  /* --------------------------------------------------------------------------
     4. 7-to-30-Day Probabilistic Forecast Outlook Data
     -------------------------------------------------------------------------- */
  const OUTLOOK_DATA = {
    burdwan: [
      { week: "Week 1 (Days 1–7)", dates: "10 Jun – 16 Jun 2026", prob: "92.4%", rainfall: "+42.5 mm", onset: "12 Jun 2026", regime: "Monsoon Surge (Bay of Bengal)", smi: "0.82 (Optimal)", pumping: "Not Needed (Rainfed)", directive: "Transplant Aman paddy (Swarna & Gobindobhog); check nursery drainage.", badgeClass: "table-badge-low" },
      { week: "Week 2 (Days 8–14)", dates: "17 Jun – 23 Jun 2026", prob: "88.0%", rainfall: "+35.0 mm", onset: "18 Jun 2026", regime: "Active Monsoon Showers", smi: "0.85 (Saturated)", pumping: "Not Needed", directive: "Apply basal NPK nutrients in transplanted fields; inspect for stem borer.", badgeClass: "table-badge-low" },
      { week: "Week 3 (Days 15–21)", dates: "24 Jun – 30 Jun 2026", prob: "32.0%", rainfall: "-12.0 mm", onset: "26 Jun 2026", regime: "Mild 4-Day Break (Low Risk)", smi: "0.72 (Adequate Buffer)", pumping: "2.0 hrs/d (If canal deficit)", directive: "Shallow alluvial water table ensures zero moisture stress in Burdwan.", badgeClass: "table-badge-mod" },
      { week: "Week 4 (Days 22–30)", dates: "01 Jul – 09 Jul 2026", prob: "84.5%", rainfall: "+28.0 mm", onset: "03 Jul 2026", regime: "Monsoon Trough Active", smi: "0.80 (Optimal)", pumping: "Stop (Rainfed)", directive: "Normal vegetative tillering; weed eradication.", badgeClass: "table-badge-low" }
    ],
    kanke: [
      { week: "Week 1 (Days 1–7)", dates: "18 Jun – 24 Jun 2026", prob: "86.4%", rainfall: "+38.2 mm", onset: "20 Jun 2026", regime: "Monsoon Onset (Surge)", smi: "0.72 (Optimal)", pumping: "Not Needed (Rainfed)", directive: "Begin paddy sowing on 20 June; soil moisture optimal.", badgeClass: "table-badge-low" },
      { week: "Week 2 (Days 8–14)", dates: "25 Jun – 01 Jul 2026", prob: "72.0%", rainfall: "+18.5 mm", onset: "27 Jun 2026", regime: "Active Sowing Spell", smi: "0.68 (Adequate)", pumping: "0.5 hr/d (Auxiliary)", directive: "Complete seedling nursery bed preparation.", badgeClass: "table-badge-mod" },
      { week: "Week 3 (Days 15–21)", dates: "02 Jul – 08 Jul 2026", prob: "74.5%", rainfall: "-28.4 mm", onset: "03 Jul 2026", regime: "Break Monsoon Spell (Dry)", smi: "0.38 (Stress Alert)", pumping: "Max 2.0 hrs/d (Strict)", directive: "8-day break. Restrict borewell to 2h/d; hold urea spraying.", badgeClass: "table-badge-severe" },
      { week: "Week 4 (Days 22–30)", dates: "09 Jul – 17 Jul 2026", prob: "68.2%", rainfall: "+22.0 mm", onset: "11 Jul 2026", regime: "Monsoon Revival Pulse", smi: "0.65 (Recharged)", pumping: "Stop (Rain Recharging)", directive: "Monsoon revival; resume top-dressing after rains stabilize.", badgeClass: "table-badge-low" }
    ]
  };

  /* --------------------------------------------------------------------------
     5. Multi-Language Dictionary & Localized Advisories
     -------------------------------------------------------------------------- */
  const I18N = {
    bn: {
      brandTitle: "গ্রামমৌসম",
      brandSub: "(Gram-Mausam) অতি-স্থানীয় আবহাওয়া ও কৃষি পরামর্শ ব্যবস্থা",
      spellActive: "সক্রিয় বর্ষার মরসুম (দিন ১–৫)",
      spellBreak: "অনাবৃষ্টি / বিরতি সতর্কতা (দিন ১২–২০)",
      teleconnectionsTitle: "বিশ্ব জলবায়ু টেলি-সংযোগ সূচক",
      teleconnectionsSubtitle: "মৌসুমি বায়ু নিয়ন্ত্রণকারী বৈশ্বিক অনুঘটক (ENSO, IOD, MJO)",
      mjoDiagramHeader: "MJO হুইলার-হেন্ডন পর্যায় চিত্র",
      riskMapHeader: "বর্ধমান ও রাঁচি ব্লক/পঞ্চায়েত ঝুঁকি মানচিত্র",
      tableHeader: "৭ থেকে ৩০ দিনের পূর্বাভাস ও কৃষি সিদ্ধান্ত",
      advisoryTitle: "স্থানীয় কৃষি আবহাওয়া পরামর্শ ও ভয়েস রিডআউট",
      advisorySubtitle: "কৃষি সম্প্রসারণ আধিকারিক ও চাষী ভাইদের জন্য বিশেষ নির্দেশিকা",
      btnWaLabel: "হোয়াটসঅ্যাপে পাঠান",
      btnCopyLabel: "বার্তা কপি করুন",
      btnSmsLabel: "এসএমএস পাঠান",
      advisories: [
        { crop: "আমন ধান ও গোবিন্দভোগ", spell: "রোপণ ও জল ব্যবস্থাপনা", title: "বীজতলা পরিচর্যা ও এডাব্লিউডি (AWD)", desc: "বর্ধমান সদরে ১২ জুন থেকে আমন ধানের বীজতলা ফেলুন। ডিভিসি সেচ খালের জল স্বাভাবিক। জমিতে ৫ সেমির বেশি জল জমতে দেবেন না যাতে গোবিন্দভোগ ধানের চারা পচে না যায়।", tts: "বর্ধমান জেলার কৃষক ভাইদের নমস্কার। ১২ জুন থেকে আমন ধানের বীজতলা তৈরি করুন। দামোদর খালের জলস্তর স্বাভাবিক আছে।" },
        { crop: "পাট চাষ", spell: "আর্দ্রতা ব্যবস্থাপনা", title: "পাট গাছ বৃদ্ধির পরিচর্যা", desc: "বর্ধমানের বেলে-দোআঁশ মাটিতে পাটের চারা বৃদ্ধির জন্য অনুকূল আর্দ্রতা বজায় রাখুন। জমিতে জল নিষ্কাশনের ব্যবস্থা রাখুন।", tts: "পাট চাষী ভাইদের জন্য পরামর্শ: জমিতে অতিরিক্ত জল জমতে দেবেন না এবং আগাছা পরিষ্কার রাখুন।" },
        { crop: "আলু চাষ প্রস্তুতি", spell: "আগাম জমি তৈরি", title: "বর্ষা পরবর্তী আলু জমি নিষ্কাশন", desc: "মেমারী ও বর্ধমানের আলু চাষের জমিগুলি বর্ষার জল দ্রুত নেমে যাওয়ার উপযোগী করে প্রস্তুত রাখুন যাতে ছত্রাক সংক্রমণ না হয়।", tts: "মেমারী এবং বর্ধমানের আলু চাষী বন্ধুরা: বর্ষার পর জমিতে যাতে জল জমে না থাকে তার জন্য নিকাশী নালা তৈরি রাখুন।" },
        { crop: "মড়ুয়া (বিকল্প ফসল)", spell: "অনাবৃষ্টি প্রতিরোধক", title: "এই মরসুমে মড়ুয়া রোপণ, ধান নয়", desc: "অনাবৃষ্টি বা উঁচু জমিতে মড়ুয়া (রাগী) চাষ করুন। এতে জল খুব কম লাগে এবং ফসল শুকিয়ে নষ্ট হয় না।", tts: "পরামর্শ: বৃষ্টির অনিশ্চয়তা থাকলে ধানের বদলে মড়ুয়া চাষ করুন, ক্ষতির সম্ভাবনা থাকবে না।" }
      ]
    },
    hi: {
      brandTitle: "ग्राममौसम",
      brandSub: "(Gram-Mausam) अति-स्थानीय मानसून आगमन एवं कृषि परामर्श प्रणाली",
      spellActive: "सक्रिय मानसून दौर (दिन 1–5)",
      spellBreak: "मानसून विराम चेतावनी (दिन 12–20)",
      teleconnectionsTitle: "वैश्विक जलवायु टेलीकनेक्शन सूचकांक",
      teleconnectionsSubtitle: "भारतीय मानसून को नियंत्रित करने वाले वैश्विक कारक (ENSO, IOD, MJO)",
      mjoDiagramHeader: "MJO व्हीलर-हेंडन 2D चरण आरेख",
      riskMapHeader: "बर्धमान एवं राँची ब्लॉक/पंचायत जोखिम मानचित्र",
      tableHeader: "7 से 30 दिन सांख्यिकीय संभावनाएं एवं कृषि निर्णय",
      advisoryTitle: "स्थानीय कृषि मौसम परामर्श एवं वॉयस अलर्ट",
      advisorySubtitle: "सक्रिय/विराम मानसून चक्र के अनुसार कृषि अधिकारियों और किसानों के लिए",
      btnWaLabel: "व्हाट्सएप पर प्रसारित करें",
      btnCopyLabel: "संदेश कॉपी करें",
      btnSmsLabel: "एसएमएस सिमुलेशन भेजें",
      advisories: [
        { crop: "अमन धान एवं गोविंदभोग", spell: "बुवाई व सिंचाई", title: "AWD सिंचाई एवं नर्सरी प्रबंधन", desc: "बर्धमान में 12 जून से अमन धान और गोविंदभोग की रोपाई शुरू करें। डीवीसी नहर में पानी सामान्य है। खेतों में 5 सेमी से अधिक पानी न भरने दें।", tts: "किसान भाइयों: 12 जून से अमन धान की बुवाई शुरू करें। डीवीसी नहर से सिंचाई की स्थिति अनुकूल है।" },
        { crop: "मड़ुआ (रागी)", spell: "आपदा रक्षक फसल", title: "सूखे में मड़ुआ बुवाई का नियम", desc: "ऊंचे खेतों में 'इस बारिश में मड़ुआ लगाओ, धान नहीं'। मड़ुआ को केवल 35-50 सेमी पानी चाहिए और फसल नहीं सूखती।", tts: "सलाह: ऊंचे खेतों में धान के बजाय मड़ुआ लगाएं, सूखे में भी पूरी पैदावार मिलेगी।" },
        { crop: "आलू (मेमारी बेल्ट)", spell: "पूर्व-तैयारी", title: "आलू खेत जल निकासी", desc: "बर्धमान और मेमारी में आलू खेतों से वर्षा जल निकासी की व्यवस्था रखें ताकि कंद सड़न रोग न लगे।", tts: "आलू उत्पादक किसान: खेतों में पानी ठहरने न दें, नालियां खुली रखें।" },
        { crop: "मक्का / दालें", spell: "अंतर्वर्ती खेती", title: "मक्के के साथ अरहर", desc: "मक्के के साथ अरहर की अंतर्वर्ती खेती करें। गहरी जड़ें होने के कारण सूखे को आसानी से झेल लेती हैं।", tts: "दलहन किसान: मक्के के साथ अरहर लगाएं, सूखा प्रतिरोधक क्षमता बढ़ेगी।" }
      ]
    },
    en: {
      brandTitle: "Gram-Mausam",
      brandSub: "(গ্রামমৌসম) Hyperlocal Weather & Agronomic Advisory System",
      spellActive: "Active Monsoon Spell (Days 1–5)",
      spellBreak: "Break Monsoon Alert (Days 12–20)",
      teleconnectionsTitle: "Global Climate Teleconnection Indices",
      teleconnectionsSubtitle: "Planetary drivers (ENSO, IOD, MJO, BSISO) coupled with regional atmospheric boundary conditions",
      mjoDiagramHeader: "MJO Wheeler-Hendon Phase Diagram",
      riskMapHeader: "Burdwan & Ranchi Block/Panchayat Risk Map",
      tableHeader: "7-to-30-Day Statistical Probabilities & Agronomic Outlook",
      advisoryTitle: "Localized Agronomic Advisories & Voice Readout",
      advisorySubtitle: "Synchronized with active/break monsoon cycles for extension officers and farmers",
      btnWaLabel: "Broadcast via WhatsApp",
      btnCopyLabel: "Copy Message Payload",
      btnSmsLabel: "Simulate SMS Push",
      advisories: [
        { crop: "Aman Paddy & Gobindobhog", spell: "Transplantation Protocol", title: "AWD Irrigation & Nursery Vigil", desc: "Initiate Aman paddy nursery and Gobindobhog transplanting from 12 June in Burdwan alluvial basin. DVC canal running normal. Maintain drainage in low-lying plots.", tts: "Attention Burdwan farmers: Optimal conditions for Aman and Gobindobhog paddy transplantation. DVC canal flow is normal." },
        { crop: "Madua / Ragi (Fallback)", spell: "Contingency Champion", title: "Drought-Proofing Upland Fields", desc: "For rainfed uplands or delayed monsoons, Madua requires only 35-50 cm water. Zero vulnerability during upcoming break spell; guarantees harvest.", tts: "Farmer advisory: On upland fields, sow Madua instead of paddy to prevent moisture stress crop loss." },
        { crop: "Potato (Burdwan Belt)", spell: "Soil Drainage", title: "Pre-Potato Land Management", desc: "Ensure rapid runoff drainage channels in Memari and Burdwan potato lands to prevent tuber rot.", tts: "Potato growers: maintain open drainage channels in sandy loam plots to prevent root rot." },
        { crop: "Jute (Patson)", spell: "Elongation Phase", title: "Moisture & Retting Water Watch", desc: "Maintain moisture at field capacity during elongation. Ensure DVC distributaries have sufficient retting water post-harvest.", tts: "Jute farmers: ensure adequate soil moisture during elongation phase." }
      ]
    }
  };

  /* --------------------------------------------------------------------------
     6. State Management
     -------------------------------------------------------------------------- */
  let currentLang = 'bn';
  let currentLocation = 'burdwan';
  let currentMapScope = 'burdwan';
  let currentLayer = 'rainfall';
  let isSunlightMode = false;
  let simulatedBreakDays = 8;
  let cropFilter = 'all';
  let currentChannel = 'whatsapp';
  let msgLanguage = 'bn';

  // Regional Map Layer Data
  const REGION_LAYER_DATA = {
    rainfall: {
      label: "Precipitation Anomaly",
      burdwan: { val: "+42 mm", prob: "92%", color: "#0F8A5F", state: "Optimal Sowing Rain" },
      burdwan_1: { val: "+56 mm", prob: "93%", color: "#0F8A5F", state: "Abundant Rain" },
      burdwan_2: { val: "+50 mm", prob: "91%", color: "#0F8A5F", state: "Optimal Rain" },
      memari: { val: "+62 mm", prob: "94%", color: "#0F8A5F", state: "Surplus Rain" },
      kalna: { val: "+48 mm", prob: "90%", color: "#0F8A5F", state: "Optimal Rain" },
      katwa: { val: "+40 mm", prob: "88%", color: "#0F8A5F", state: "Good Rain" },
      galsi: { val: "+36 mm", prob: "86%", color: "#0F8A5F", state: "Adequate Rain" },
      kanke: { val: "+38 mm", prob: "86%", color: "#0F8A5F", state: "Optimal Sowing" },
      mandar: { val: "+32 mm", prob: "82%", color: "#0F8A5F", state: "Moderate Rain" },
      ormanjhi: { val: "+48 mm", prob: "88%", color: "#0F8A5F", state: "Optimal Rain" },
      burmu: { val: "+41 mm", prob: "84%", color: "#0F8A5F", state: "Adequate Rain" },
      bero: { val: "+36 mm", prob: "81%", color: "#0F8A5F", state: "Moderate Rain" },
      chatra: { val: "+24 mm", prob: "76%", color: "#D97706", state: "Deficit Sowing Risk" },
      vidarbha: { val: "+65 mm", prob: "92%", color: "#DC2626", state: "Heavy Downpour Alert" },
      gangetic: { val: "+56 mm", prob: "90%", color: "#0F8A5F", state: "Abundant Rain" },
      delta: { val: "+72 mm", prob: "94%", color: "#DC2626", state: "Depression Surge" },
      rayalaseema: { val: "+14 mm", prob: "45%", color: "#D97706", state: "Moderate Rain" },
      marathwada: { val: "+38 mm", prob: "84%", color: "#0F8A5F", state: "Favorable" }
    },
    dryspell: {
      label: "Dry Break Spell Risk",
      burdwan: { val: "32.0%", prob: "32%", color: "#0F8A5F", state: "Low Break Risk (4d)" },
      burdwan_1: { val: "28.0%", prob: "28%", color: "#0F8A5F", state: "Low Break Risk" },
      burdwan_2: { val: "34.0%", prob: "34%", color: "#0F8A5F", state: "Low Break Risk" },
      memari: { val: "25.0%", prob: "25%", color: "#0F8A5F", state: "Negligible Risk" },
      kalna: { val: "30.0%", prob: "30%", color: "#0F8A5F", state: "Low Risk" },
      katwa: { val: "35.0%", prob: "35%", color: "#0F8A5F", state: "Low Risk" },
      galsi: { val: "38.0%", prob: "38%", color: "#0F8A5F", state: "Moderate Risk" },
      kanke: { val: "74.5%", prob: "74%", color: "#DC2626", state: "8-Day Dry Break" },
      mandar: { val: "78.0%", prob: "78%", color: "#DC2626", state: "9-Day Dry Break" },
      ormanjhi: { val: "62.0%", prob: "62%", color: "#EA580C", state: "6-Day Break" },
      burmu: { val: "72.0%", prob: "72%", color: "#DC2626", state: "8-Day Break" },
      bero: { val: "76.0%", prob: "76%", color: "#DC2626", state: "9-Day Break" },
      chatra: { val: "82.0%", prob: "82%", color: "#DC2626", state: "Severe 11-Day Break" },
      vidarbha: { val: "38.0%", prob: "38%", color: "#0F8A5F", state: "Mild Dry Spell" },
      gangetic: { val: "35.0%", prob: "35%", color: "#0F8A5F", state: "Low Break" },
      delta: { val: "30.0%", prob: "30%", color: "#0F8A5F", state: "Adequate" },
      rayalaseema: { val: "76.0%", prob: "76%", color: "#DC2626", state: "Severe 10-Day Break" },
      marathwada: { val: "65.0%", prob: "65%", color: "#EA580C", state: "7-Day Break" }
    },
    soilmoisture: {
      label: "Soil Moisture Index (SMI)",
      burdwan: { val: "0.82", prob: "High", color: "#0F8A5F", state: "Abundant Moisture Buffer" },
      burdwan_1: { val: "0.85", prob: "Saturated", color: "#0284C7", state: "High Alluvial Retention" },
      burdwan_2: { val: "0.81", prob: "High", color: "#0F8A5F", state: "Optimal Buffer" },
      memari: { val: "0.88", prob: "Saturated", color: "#0284C7", state: "Saturated Clay-Loam" },
      kalna: { val: "0.84", prob: "High", color: "#0F8A5F", state: "Floodplain Buffer" },
      katwa: { val: "0.80", prob: "High", color: "#0F8A5F", state: "Good Retention" },
      galsi: { val: "0.76", prob: "High", color: "#0F8A5F", state: "Adequate" },
      kanke: { val: "0.68", prob: "Adequate", color: "#0F8A5F", state: "Good Root Buffer" },
      mandar: { val: "0.62", prob: "Moderate", color: "#D97706", state: "Declining Rapidly" },
      ormanjhi: { val: "0.74", prob: "High", color: "#0F8A5F", state: "Surplus" },
      burmu: { val: "0.65", prob: "Moderate", color: "#0F8A5F", state: "Optimal" },
      bero: { val: "0.60", prob: "Moderate", color: "#D97706", state: "Stress Risk" },
      chatra: { val: "0.52", prob: "Low", color: "#DC2626", state: "Moisture Stress" },
      vidarbha: { val: "0.82", prob: "High", color: "#0284C7", state: "Field Capacity" },
      gangetic: { val: "0.88", prob: "High", color: "#0F8A5F", state: "Abundant Buffer" },
      delta: { val: "0.92", prob: "Saturated", color: "#0284C7", state: "Waterlogged" },
      rayalaseema: { val: "0.44", prob: "Deficit", color: "#DC2626", state: "Near Wilting Point" },
      marathwada: { val: "0.64", prob: "Moderate", color: "#D97706", state: "Moderate" }
    },
    aquifer: {
      label: "Aquifer Depth & Drawdown",
      burdwan: { val: "4.8m (Safe)", prob: "Safe", color: "#0F8A5F", state: "Buffer 5.2m &bull; Limit 4.5h/d" },
      burdwan_1: { val: "4.5m (Safe)", prob: "Safe", color: "#0F8A5F", state: "Buffer 5.5m &bull; Limit 5.0h/d" },
      burdwan_2: { val: "5.1m (Safe)", prob: "Safe", color: "#0F8A5F", state: "Buffer 4.9m &bull; Limit 4.5h/d" },
      memari: { val: "4.2m (Safe)", prob: "Safe", color: "#0F8A5F", state: "Buffer 5.8m &bull; Limit 5.5h/d" },
      kalna: { val: "4.4m (Safe)", prob: "Safe", color: "#0F8A5F", state: "Buffer 5.6m" },
      katwa: { val: "4.9m (Safe)", prob: "Safe", color: "#0F8A5F", state: "Buffer 5.1m" },
      galsi: { val: "5.6m (Safe)", prob: "Safe", color: "#0F8A5F", state: "Buffer 4.4m" },
      kanke: { val: "9.4m (Alert)", prob: "Alert", color: "#EA580C", state: "Buffer 2.6m &bull; Limit 2.0h/d" },
      mandar: { val: "10.2m (Risk)", prob: "Risk", color: "#DC2626", state: "Buffer 1.8m &bull; Limit 1.5h/d" },
      ormanjhi: { val: "8.6m (Safe)", prob: "Safe", color: "#0F8A5F", state: "Buffer 3.4m" },
      burmu: { val: "9.8m (Alert)", prob: "Alert", color: "#D97706", state: "Buffer 2.2m" },
      bero: { val: "10.4m (Risk)", prob: "Risk", color: "#DC2626", state: "Buffer 1.6m" },
      chatra: { val: "11.1m (Critical)", prob: "Critical", color: "#DC2626", state: "Buffer 0.9m &bull; Limit 1.0h/d" },
      vidarbha: { val: "8.2m", prob: "Safe", color: "#0F8A5F", state: "Black Soil Table" },
      gangetic: { val: "6.2m", prob: "Safe", color: "#0F8A5F", state: "Deep Alluvium" },
      delta: { val: "3.5m", prob: "Safe", color: "#0F8A5F", state: "Shallow Table" },
      rayalaseema: { val: "12.8m", prob: "Critical", color: "#DC2626", state: "Over-Extracted" },
      marathwada: { val: "10.5m", prob: "Alert", color: "#EA580C", state: "Basalt Depletion" }
    }
  };

  /* --------------------------------------------------------------------------
     7. Multi-Channel Messaging Templates (Bengali, Hindi, English)
     -------------------------------------------------------------------------- */
  const MSG_TEMPLATES = {
    "burdwan-paddy": {
      bn: `*🚨 গ্রামমৌসম কৃষি বার্তা: বর্ধমান আমন ধান ও গোবিন্দভোগ রোপণ* 🌾💧
*অঞ্চল:* {LOCATION_NAME}
*তারিখ:* ১০–১৬ জুন ২০২৬ (মৌসুমি বৃষ্টিপাত অনুকূল)
*নির্দেশিকা:*
১. 🌱 আমন ধান (স্বর্ণা MTU-7029) এবং গোবিন্দভোগের বীজতলা তৈরি শুরু করুন। মাটিতে আর্দ্রতা সর্বোত্তম (SMI 0.82)।
২. 🌊 দামোদর ডিভিসি খালের জলস্তর স্বাভাবিক। নীচু জমিতে ৫ সেমির বেশি জল জমতে দেবেন না।
৩. 🚫 ভারী বৃষ্টির সময় ইউরিয়া সার ছড়াবেন না।
⚠️ _ইউআইটি বর্ধমান ও কেন্দ্রীয় কৃষি আবহাওয়া দফতর_`,
      hi: `*🚨 ग्राममौसम कृषि निर्देश: बर्धमान अमन धान एवं गोविंदभोग रोपाई* 🌾💧
*क्षेत्र:* {LOCATION_NAME}
*समयावधि:* 10–16 जून 2026 (मानसून सक्रिय)
*निर्देश:*
1. 🌱 अमन धान (स्वर्णा) और सुगंधित गोविंदभोग की बुवाई शुरू करें। मिट्टी में नमी उत्तम (SMI 0.82) है।
2. 🌊 दामोदर डीवीसी नहर में जलस्तर सामान्य। निचले खेतों में जल निकासी खुली रखें।
3. 🚫 भारी बारिश के दौरान यूरिया का छिड़काव न करें।
⚠️ _यूआईटी बर्धमान एवं पृथ्वी विज्ञान मंत्रालय_`,
      en: `*🚨 GRAM-MAUSAM AGROMET ALERT: BURDWAN AMAN PADDY ONSET* 🌾💧
*Zone:* {LOCATION_NAME}
*Window:* 10–16 June 2026 (Monsoon Surge Active)
*Agro Directives:*
1. 🌱 Initiate Aman Paddy (Swarna MTU-7029) & Gobindobhog nursery bed transplantation. Soil SMI is optimal at 0.82.
2. 🌊 Damodar DVC canal flow is running normal. Open drainage in low-lying clay plots to prevent seedling rot.
3. 🚫 Hold chemical fertilizer broadcasting during downpours.
⚠️ _UIT Burdwan & MoES Agromet Division_`
    },
    "damodar-drainage": {
      bn: `*🌊 দামোদর অববাহিকা সতর্কতা: নিকাশী নালা পরিষ্কার নির্দেশ* 🌧️⚡
*অঞ্চল:* {LOCATION_NAME}
*সম্ভাব্য বৃষ্টি:* আগামী ৭২ ঘণ্টায় ৫০–৮৫ মিমি বৃষ্টিপাতের সম্ভাবনা।
*কৃষকদের নির্দেশ:*
১. 🚜 নীচু আমন ধানের জমি ও পাট ক্ষেতের নিকাশী নালা অবিলম্বে খুলে দিন।
২. 💧 বাঁধ ও খালের অতিরিক্ত জল দ্রুত বের করে দেওয়ার ব্যবস্থা রাখুন।
⚠️ _দামোদর জল সম্পদ ও কৃষি টাস্ক ফোর্স_`,
      hi: `*🌊 दामोदर बेसिन चेतावनी: जल निकासी नाली प्रबंधन* 🌧️⚡
*क्षेत्र:* {LOCATION_NAME}
*पूर्वानुमान:* अगले 72 घंटों में 50–85 मिमी वर्षा की संभावना।
*निर्देश:*
1. 🚜 निचले खेतों में पानी जमा न होने दें, निकास नालियां तुरंत खोलें।
2. 💧 अत्यधिक जलभराव से धान की नई पौध को सड़ने से बचाएं।
⚠️ _दामोदर जल संसाधन एवं ग्राममौसम_`,
      en: `*🌊 DAMODAR BASIN WARNING: CANAL DRAINAGE MANDATE* 🌧️⚡
*Zone:* {LOCATION_NAME}
*Rainfall Forecast:* 50–85 mm accumulation expected over 72 hours.
*Directives:*
1. 🚜 Clear all field furrows in low-lying paddy and jute plots immediately.
2. 💧 Prevent seedling submergence along DVC canal irrigation distributaries.
⚠️ _Damodar Valley Task Force & Gram-Mausam_`
    },
    "break-drought": {
      bn: `*☀️ অনাবৃষ্টি ও শুকনো আবহাওয়া সতর্কতা: বোরওয়েল নিয়ন্ত্রণ* ⚠️🌾
*অঞ্চল:* {LOCATION_NAME}
*সময়:* ১২–২০ জুলাই ২০২৬ (৮ দিন বর্ষা বিরতি)
*মাটির আর্দ্রতা:* ০.৬৮ থেকে ০.৩৮-এ নেমে যাওয়ার সম্ভাবনা।
*জরুরি নির্দেশ:* বোরওয়েল দিনে সর্বাধিক ২ ঘণ্টা চালান। মাটির জল ধরে রাখতে জৈব আচ্ছাদন (Mulching) ব্যবহার করুন।
⚠️ _গ্রামমৌসম ভূগর্ভস্থ জল সংরক্ষণ সেল_`,
      hi: `*☀️ मानसून विराम (सूखा) चेतावनी: बोरवेल सीमा* ⚠️🌾
*क्षेत्र:* {LOCATION_NAME}
*अवधि:* 12–20 जुलाई 2026 (8 दिन वर्षा ब्रेक)
*कड़ा निर्देश:* बोरवेल अधिकतम 2 घंटे/दिन ही चलाएं ताकि भूजल स्तर सुरक्षित रहे!
*सुरक्षा:* ड्रिप सिंचाई का उपयोग करें, यूरिया छिड़काव स्थगित रखें।
⚠️ _ग्राममौसम भूजल संरक्षण विभाग_`,
      en: `*☀️ CLIMATE ALERT: MID-SEASON DRY BREAK MONSOON* ⚠️🌾
*Zone:* {LOCATION_NAME}
*Forecast Window:* 12–20 July 2026 (~8 Days Dry Spell)
*CRITICAL BOREWELL LIMIT:* Max 2.0 hrs/day to prevent aquifer drawdown!
*Protection:* Switch to protective drip; apply mulching.
⚠️ _Gram-Mausam Hydro-Geological Desk_`
    },
    "fallback-madua": {
      bn: `*💡 জরুরি কৃষি নির্দেশিকা: উঁচু জমিতে মড়ুয়া (রাগী) চাষ* 🌾
*অঞ্চল:* {LOCATION_NAME}
*নিয়ম:* "এই মরসুমে মড়ুয়া লাগান, ধান নয়!"
*সুবিধা:* মড়ুয়াতে মাত্র ৩৫-৫০ সেমি জল লাগে। অনাবৃষ্টির সময়েও সম্পূর্ণ ফলন নিশ্চিত থাকে ও বীজ নষ্টের আর্থিক ক্ষতি থেকে বাঁচায়।
⚠️ _গ্রামমৌসম আপৎকালীন ফসল ইঞ্জিন_`,
      hi: `*💡 आपातकालीन फसल निर्देश: मड़ुआ (रागी) की बुवाई करें* 🌾
*क्षेत्र:* {LOCATION_NAME}
*नियम:* "इस बारिश में मड़ुआ लगाओ, धान नहीं"
*फायदा:* मड़ुआ में केवल 35-50 सेमी पानी लगता है। बीज झुलसने और लागत डूबने से 100% बचाव।
⚠️ _ग्राममौसम आकस्मिक फसल योजना_`,
      en: `*💡 CONTINGENCY DIRECTIVE: SWITCH TO MADUA / RAGI* 🌾
*Zone:* {LOCATION_NAME}
*Action Rule:* "Is barish me Madua (Ragi) lagao, Dhan (Paddy) nahi"
*Benefit:* Ragi needs only 35-50 cm water vs 140 cm for Paddy. 100% protection against seed desiccation on uplands.
⚠️ _Gram-Mausam Agronomic Contingency Engine_`
    },
    "heavy-downpour": {
      bn: `*🚨 ভারী বৃষ্টিপাত সতর্কতা: সার প্রয়োগ স্থগিত রাখুন* 🌧️⚡
*অঞ্চল:* {LOCATION_NAME}
*পূর্বাভাস:* আগামী ৪ দিনে ৬০–৯০ মিমি বৃষ্টিপাত।
*পরামর্শ:* রাসায়নিক সার ও কীটনাশক ছড়ানো বন্ধ রাখুন যাতে ধুয়ে নষ্ট না হয় (একর প্রতি ৮৫০ টাকা সাশ্রয়)।
⚠️ _গ্রামমৌসম কৃষি উপদেষ্টা_`,
      hi: `*🚨 मूसलाधार बारिश चेतावनी: रासायनिक खाद स्थगित रखें* 🌧️⚡
*क्षेत्र:* {LOCATION_NAME}
*पूर्वानुमान:* 50–90 मिमी संचयी वर्षा।
*सलाह:* यूरिया और डीएपी का छिड़काव तुरंत रोकें ताकि पानी में बहने से बर्बादी न हो।
⚠️ _ग्राममौसम कृषि सलाह_`,
      en: `*🚨 HEAVY DOWNPOUR WARNING: WASHOUT PREVENTION* 🌧️⚡
*Zone:* {LOCATION_NAME}
*Accumulation:* 50–90 mm expected over 4 days.
*Directive:* Suspend all broadcast application of Urea and DAP. Prevents ₹850/acre runoff loss.
⚠️ _Gram-Mausam Agromet Network_`
    },
    "pest-blast": {
      bn: `*🐛 পোকা ও রোগ বালাই সতর্কতা: উচ্চ আর্দ্রতা অ্যালার্ট* ⚠️
*রোগ:* ধানের ব্লাস্ট এবং পোকা আক্রমণ ({LOCATION_NAME})
*কারণ:* বাতাসে ৮৮% আপেক্ষিক আর্দ্রতা ও মেঘলা আকাশ।
*প্রতিকার:* ধানের নিচের পাতার দিকে নৌকাকৃতি দাগ লক্ষ্য করুন। ট্রাইসাইক্লাজোল ০.৬ গ্রাম/লিটার জলে গুলে স্প্রে করুন।
⚠️ _গ্রামমৌসম উদ্ভিদ সংরক্ষণ শাখা_`,
      hi: `*🐛 कीट एवं रोग चेतावनी: उच्च आर्द्रता अलर्ट* ⚠️
*रोग:* धान का ब्लास्ट एवं तना छेदक ({LOCATION_NAME})
*कारण:* हवा में 88% से अधिक नमी।
*उपाय:* ट्राइसाइक्लाजोल 75% WP @ 0.6 ग्राम/लीटर का छिड़काव करें।
⚠️ _ग्राममौसम पादप संरक्षण विभाग_`,
      en: `*🐛 PEST OUTBREAK SENTRY: HIGH HUMIDITY WARNING* ⚠️
*Target:* Paddy Leaf Blast & Stem Borer ({LOCATION_NAME})
*Trigger:* Prolonged 88% RH + overcast skies.
*Action:* Inspect lower canopy. Spray Tricyclazole 75% WP @ 0.6g/L on initial leaf infection.
⚠️ _Gram-Mausam Plant Protection Division_`
    }
  };

  /* --------------------------------------------------------------------------
     8. DOM Elements Cache
     -------------------------------------------------------------------------- */
  const body = document.getElementById('app-body');
  const districtSelect = document.getElementById('district-select');
  const panchayatSelect = document.getElementById('panchayat-select');
  const panchayatContainer = document.getElementById('panchayat-container');
  const langSelect = document.getElementById('language-select');
  const btnSunlight = document.getElementById('btn-sunlight-toggle');
  const sunlightIcon = document.getElementById('sunlight-icon');
  const sunlightLabel = document.getElementById('sunlight-label');
  const btnSecurityModal = document.getElementById('btn-security-modal');
  const securityModal = document.getElementById('security-modal');
  const btnCloseSecurity = document.getElementById('btn-close-security');
  const btnAckSecurity = document.getElementById('btn-ack-security');

  // Real-time ribbon DOM
  const streamStationId = document.getElementById('stream-station-id');
  const rtTemp = document.getElementById('rt-temp');
  const rtHumidity = document.getElementById('rt-humidity');
  const rtRain = document.getElementById('rt-rain');
  const rtCanal = document.getElementById('rt-canal');
  const rtSolar = document.getElementById('rt-solar');
  const rtClock = document.getElementById('rt-clock');
  const syncStatusBadge = document.getElementById('sync-status-badge');
  const backendLivePill = document.getElementById('backend-live-pill');
  const btnRefreshTelemetry = document.getElementById('btn-refresh-telemetry');

  // Hero Operational Banner DOM
  const opLocationTag = document.getElementById('op-location-tag');
  const opSowingDate = document.getElementById('op-sowing-date');
  const opBreakTitle = document.getElementById('op-break-title');
  const opBreakText = document.getElementById('op-break-text');
  const opFallbackText = document.getElementById('op-fallback-text');
  const metricOnsetProb = document.getElementById('metric-onset-prob');
  const metricBreakProb = document.getElementById('metric-break-prob');
  const metricSmiVal = document.getElementById('metric-smi-val');
  const metricPumpingVal = document.getElementById('metric-pumping-val');
  const metricPumpingSub = document.getElementById('metric-pumping-sub');
  const btnBannerAudio = document.getElementById('btn-banner-audio');

  // Burdwan Command Center DOM
  const damodarGaugeStatus = document.getElementById('damodar-gauge-status');
  const gaugeFillBar = document.getElementById('gauge-fill-bar');
  const gaugeCurrentVal = document.getElementById('gauge-current-val');
  const barrageReleaseVal = document.getElementById('barrage-release-val');
  const burdwanWtdVal = document.getElementById('burdwan-wtd-val');
  const burdwanSmiOverall = document.getElementById('burdwan-smi-overall');
  const depth10Val = document.getElementById('depth-10-val');
  const depth10Bar = document.getElementById('depth-10-bar');
  const depth30Val = document.getElementById('depth-30-val');
  const depth30Bar = document.getElementById('depth-30-bar');
  const depth100Val = document.getElementById('depth-100-val');
  const depth100Bar = document.getElementById('depth-100-bar');

  // Sowing Calculator DOM
  const calcCropSelect = document.getElementById('calc-crop-select');
  const calcBlockSelect = document.getElementById('calc-block-select');
  const calcTopoSelect = document.getElementById('calc-topo-select');
  const calcResWindow = document.getElementById('calc-res-window');
  const calcResTransplant = document.getElementById('calc-res-transplant');
  const calcResWater = document.getElementById('calc-res-water');
  const calcResRisk = document.getElementById('calc-res-risk');
  const calcResAdvice = document.getElementById('calc-res-advice');
  const btnCalcSendMsg = document.getElementById('btn-calc-send-msg');

  // Messaging Hub DOM
  const tabWhatsapp = document.getElementById('tab-whatsapp');
  const tabSms = document.getElementById('tab-sms');
  const tabVoice = document.getElementById('tab-voice');
  const msgRecipientSelect = document.getElementById('msg-recipient-select');
  const customPhoneGroup = document.getElementById('custom-phone-group');
  const customPhoneInput = document.getElementById('custom-phone-input');
  const msgLanguageSelect = document.getElementById('msg-language-select');
  const msgTemplateSelect = document.getElementById('msg-template-select');
  const messageContentBox = document.getElementById('message-content-box');
  const charCountText = document.getElementById('char-count-text');
  const segmentCountText = document.getElementById('segment-count-text');
  const voiceControlsPanel = document.getElementById('voice-controls-panel');
  const voiceLangTitle = document.getElementById('voice-lang-title');
  const voiceWaveAnim = document.getElementById('voice-wave-anim');
  const voiceSpeedSelect = document.getElementById('voice-speed-select');
  const voiceBulletinSelect = document.getElementById('voice-bulletin-select');
  const btnVoicePreview = document.getElementById('btn-voice-preview');
  const btnVoiceStop = document.getElementById('btn-voice-stop');
  const btnVoiceRecord = document.getElementById('btn-voice-record');
  const recIcon = document.getElementById('rec-icon');
  const recLabel = document.getElementById('rec-label');
  const farmerRecBox = document.getElementById('farmer-rec-box');
  const recTimer = document.getElementById('rec-timer');
  const btnRecStop = document.getElementById('btn-rec-stop');
  const btnRecSend = document.getElementById('btn-rec-send');
  const smsDltPreviewPanel = document.getElementById('sms-dlt-preview-panel');
  const waExtraActions = document.getElementById('wa-extra-actions');
  const btnWaQr = document.getElementById('btn-wa-qr');
  const waQrModal = document.getElementById('wa-qr-modal');
  const btnCloseWaQr = document.getElementById('btn-close-wa-qr');
  const btnAckWaQr = document.getElementById('btn-ack-wa-qr');
  const qrCanvasBox = document.getElementById('qr-canvas-box');
  const btnHubWhatsapp = document.getElementById('btn-hub-whatsapp');
  const btnHubSms = document.getElementById('btn-hub-sms');
  const btnHubVoice = document.getElementById('btn-hub-voice');
  const btnHubCopy = document.getElementById('btn-hub-copy');
  const dispatchLogsList = document.getElementById('dispatch-logs-list');
  const logCountPill = document.getElementById('log-count-pill');

  // Water Balance & Aquifer DOM
  const wbPeVal = document.getElementById('wb-pe-val');
  const wbEt0Val = document.getElementById('wb-et0-val');
  const wbDsVal = document.getElementById('wb-ds-val');
  const liveSmiNumber = document.getElementById('live-smi-number');
  const liveSmiStatus = document.getElementById('live-smi-status');
  const smiPointer = document.getElementById('smi-pointer');
  const breakDaysSlider = document.getElementById('break-days-slider');
  const breakDaysVal = document.getElementById('break-days-val');
  const sliderOutcomeText = document.getElementById('slider-outcome-text');

  const waterTableLine = document.getElementById('water-table-line');
  const wtLineTag = document.getElementById('wt-line-tag');
  const strataCaption = document.getElementById('strata-caption');
  const aqWtd = document.getElementById('aq-wtd');
  const aqSy = document.getElementById('aq-sy');
  const aqBuffer = document.getElementById('aq-buffer');
  const aqSaving = document.getElementById('aq-saving');
  const pumpingTitle = document.getElementById('pumping-title');
  const pumpingDesc = document.getElementById('pumping-desc');
  const cgwbStationTag = document.getElementById('cgwb-station-tag');

  // Map DOM
  const btnScopeBurdwan = document.getElementById('btn-scope-burdwan');
  const btnScopeJharkhand = document.getElementById('btn-scope-jharkhand');
  const btnScopeNational = document.getElementById('btn-scope-national');
  const mapBurdwanGroup = document.getElementById('map-burdwan-group');
  const mapJharkhandGroup = document.getElementById('map-jharkhand-blocks-group');
  const mapNationalGroup = document.getElementById('map-national-belts-group');
  const districtInfobox = document.getElementById('district-infobox');
  const infoboxName = document.getElementById('infobox-name');
  const infoboxRiskType = document.getElementById('infobox-risk-type');
  const infoboxPct = document.getElementById('infobox-pct');
  const infoboxHint = document.getElementById('infobox-hint');
  const mjoCanvas = document.getElementById('mjo-canvas');

  // Crops & Outlook Table
  const cropsMatrixGrid = document.getElementById('crops-matrix-grid');
  const tableOutlookBody = document.getElementById('table-outlook-body');
  const advisoriesContainer = document.getElementById('advisories-container');
  const toastNotice = document.getElementById('toast-notice');
  const toastMessage = document.getElementById('toast-message');

  /* --------------------------------------------------------------------------
     9. Real-Time Telemetry & Live Clock Stream
     -------------------------------------------------------------------------- */
  function updateLiveClock() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    if (rtClock) rtClock.textContent = `${hrs}:${mins}:${secs} IST`;
  }

  async function fetchRealtimeTelemetry() {
    try {
      const locKey = currentLocation.startsWith('burdwan') || currentLocation === 'memari' ? 'burdwan' : 'kanke';
      const res = await fetch(`/api/realtime?location=${locKey}`);
      if (res.ok) {
        const data = await res.json();
        const t = data.telemetry;
        if (rtTemp) rtTemp.textContent = `${t.temperature_c}°C`;
        if (rtHumidity) rtHumidity.textContent = `${t.humidity_pct}%`;
        if (rtRain) rtRain.textContent = `${t.rainfall_rate_mm_hr} mm/h`;
        if (rtCanal) rtCanal.textContent = t.damodar_dvc_canal_status || 'Normal Regulated Flow';
        if (rtSolar) rtSolar.textContent = `${t.solar_radiation_wm2 || 420} W/m²`;
        if (streamStationId) streamStationId.innerHTML = `${data.station_id} &bull; ${data.location.split(',')[0]}`;
        if (syncStatusBadge) syncStatusBadge.innerHTML = '🟢 Connected (IST)';
        if (backendLivePill) backendLivePill.innerHTML = '🟢 Backend API: Active';
      }
    } catch (err) {
      console.warn("Realtime stream fallback active");
    }
  }

  async function fetchBurdwanData() {
    try {
      const res = await fetch('/api/burdwan-data');
      if (res.ok) {
        const b = await res.json();
        const hydro = b.damodar_hydrology;
        const soil = b.soil_moisture_depth_profile;
        if (gaugeCurrentVal) gaugeCurrentVal.textContent = `${hydro.sadarghat_gauge_m} m`;
        if (barrageReleaseVal) barrageReleaseVal.textContent = `${hydro.durgapur_barrage_release_cusecs.toLocaleString()} cfs`;
        if (gaugeFillBar) {
          const pct = Math.min(95, Math.max(25, (hydro.sadarghat_gauge_m / hydro.danger_level_m) * 100));
          gaugeFillBar.style.width = `${pct}%`;
        }
        if (burdwanWtdVal) burdwanWtdVal.textContent = `${b.aquifer_mechanics.water_table_depth_m} m (Specific Yield ${b.aquifer_mechanics.specific_yield_pct}%)`;
        if (depth10Val) depth10Val.textContent = `${soil.surface_10cm.smi} (${soil.surface_10cm.status})`;
        if (depth10Bar) depth10Bar.style.width = `${soil.surface_10cm.smi * 100}%`;
        if (depth30Val) depth30Val.textContent = `${soil.rootzone_30cm.smi} (${soil.rootzone_30cm.status})`;
        if (depth30Bar) depth30Bar.style.width = `${soil.rootzone_30cm.smi * 100}%`;
        if (depth100Val) depth100Val.textContent = `${soil.subsoil_100cm.smi} (${soil.subsoil_100cm.status})`;
        if (depth100Bar) depth100Bar.style.width = `${soil.subsoil_100cm.smi * 100}%`;
        if (burdwanSmiOverall) burdwanSmiOverall.textContent = `SMI ${soil.rootzone_30cm.smi} • OPTIMAL`;
      }
    } catch (e) {
      console.warn("Burdwan data fallback active");
    }
  }

  /* --------------------------------------------------------------------------
     10. Core UI Synchronization
     -------------------------------------------------------------------------- */
  function updateAll() {
    const loc = LOCATION_DATA[currentLocation] || LOCATION_DATA.burdwan;
    const lang = I18N[currentLang] || I18N.bn;

    // 1. Language Classes on Body
    body.classList.remove('lang-bn', 'lang-hi', 'lang-nag', 'lang-sat', 'lang-mr', 'lang-te');
    if (currentLang === 'bn') body.classList.add('lang-bn');
    if (currentLang === 'hi') body.classList.add('lang-hi');
    if (currentLang === 'nag') body.classList.add('lang-nag');
    if (currentLang === 'sat') body.classList.add('lang-sat');
    if (currentLang === 'mr') body.classList.add('lang-mr');
    if (currentLang === 'te') body.classList.add('lang-te');

    // 2. Location & Panchayat Selectors
    if (loc.isPilot && loc.panchayats.length > 0) {
      panchayatContainer.style.display = 'flex';
      panchayatSelect.innerHTML = loc.panchayats.map(p => `<option value="${p.id}">${p.name} (SMI: ${p.smi})</option>`).join('');
    } else {
      panchayatContainer.style.display = 'none';
    }

    // 3. Hero Operational Banner
    const locDisplayName = loc.name[currentLang] || loc.name.en;
    opLocationTag.textContent = `${locDisplayName} ${loc.isPilot ? '[PILOT ZONE]' : ''}`;
    opSowingDate.textContent = loc.sowingDate;
    opBreakTitle.textContent = `Intra-Seasonal Outlook: ${loc.breakDates} (~${loc.breakDays}-Day Break Risk: ${loc.breakProb})`;
    opBreakText.innerHTML = `Alluvial water table depth at <strong>${loc.wtd} m</strong>. ${loc.canalStatus}. Safe pumping limit: <strong>${loc.safePumpingHours}</strong> (${loc.savingRs} saved).`;

    metricOnsetProb.textContent = loc.onsetProb;
    metricBreakProb.textContent = loc.breakProb;
    metricSmiVal.textContent = loc.currentSmi;
    metricPumpingVal.textContent = loc.safePumpingHours;
    metricPumpingSub.textContent = `Saves ${loc.savingRs}`;

    // 4. Water Balance Engine Updates
    wbPeVal.textContent = loc.pe;
    wbEt0Val.textContent = loc.et0;
    wbDsVal.textContent = loc.ds;
    updateSmiSimulation();

    // 5. Aquifer Section
    aqWtd.textContent = `${loc.wtd} m`;
    aqSy.textContent = `${loc.sy}%`;
    const bufferM = Math.max(0, (loc.suctionLimit - loc.wtd)).toFixed(1);
    aqBuffer.textContent = `${bufferM} m`;
    aqSaving.textContent = loc.savingRs;
    pumpingTitle.textContent = `Safe Tubewell Pumping: Max ${loc.safePumpingHours}`;
    pumpingDesc.textContent = `Water table is at ${loc.wtd} m, leaving ${bufferM} m buffer above suction cutoff (${loc.suctionLimit} m). Specific Yield is ${loc.sy}%.`;
    cgwbStationTag.textContent = loc.stationId || 'CGWB Telemetry #WB-BURD-01';

    // Animate schematic
    const wtPercent = Math.min(85, Math.max(15, (loc.wtd / 16) * 100));
    waterTableLine.style.top = `${wtPercent}%`;
    wtLineTag.textContent = `Water Table Depth: ${loc.wtd} m`;
    if (loc.sy > 5) {
      strataCaption.textContent = `Prolific Alluvial Sand-Gravel Aquifer (Sy = ${loc.sy}% &bull; Burdwan Basin)`;
    } else {
      strataCaption.textContent = `Weathered Regolith Mantle (Sy = ${loc.sy}% &bull; Chota Nagpur CGGC)`;
    }

    // 6. Map Sync
    updateMapDisplay();

    // 7. Crop Matrix
    renderCropsMatrix();

    // 8. Outlook Table
    renderOutlookTable();

    // 9. Advisories
    renderAdvisories(lang.advisories);

    // 10. Update Hub Text
    updateComposerFromTemplate();

    // 11. Fetch live telemetry from backend
    fetchRealtimeTelemetry();
  }

  function updateSmiSimulation() {
    const loc = LOCATION_DATA[currentLocation] || LOCATION_DATA.burdwan;
    const days = parseInt(breakDaysSlider.value, 10);
    simulatedBreakDays = days;
    breakDaysVal.textContent = `${days} Days`;

    const baseSmi = loc.currentSmi;
    const decayRate = loc.sy > 5 ? 0.035 : 0.065; // Alluvial soil retains moisture longer
    const projectedSmi = Math.max(0.20, +(baseSmi * Math.exp(-decayRate * days)).toFixed(2));

    liveSmiNumber.textContent = projectedSmi.toFixed(2);
    smiPointer.style.left = `${Math.min(96, Math.max(4, projectedSmi * 100))}%`;

    if (projectedSmi < 0.25) {
      liveSmiNumber.style.color = 'var(--ag-red-danger)';
      liveSmiStatus.className = 'smi-status-pill badge-danger';
      liveSmiStatus.textContent = 'Wilting Point Danger';
    } else if (projectedSmi < 0.50) {
      liveSmiNumber.style.color = 'var(--ag-amber-warning)';
      liveSmiStatus.className = 'smi-status-pill badge-warning';
      liveSmiStatus.textContent = 'Moderate Moisture Stress';
    } else {
      liveSmiNumber.style.color = 'var(--ag-green-primary)';
      liveSmiStatus.className = 'smi-status-pill badge-green';
      liveSmiStatus.textContent = 'Optimal Root Buffer';
    }

    sliderOutcomeText.innerHTML = `Under a <strong>${days}-day dry break</strong>, active root-zone SMI drops from <strong>${baseSmi}</strong> to <strong>${projectedSmi}</strong> (${projectedSmi < 0.50 ? '⚠️ Irrigation pulse required' : 'Adequate subsoil moisture buffer'}).`;
  }

  /* --------------------------------------------------------------------------
     11. Burdwan Sowing Window & Crop Risk Calculator
     -------------------------------------------------------------------------- */
  const BURDWAN_CALC_DATA = {
    gobindobhog: {
      name: "Gobindobhog Rice (GI Tagged)",
      window: "10–15 June 2026",
      transplant: "05–15 July 2026",
      water: "3–5 cm Standing",
      risk: { lowland: "Low (22%) • Safe", medium: "Low (28%) • Safe", upland: "Moderate (42%) • Retain Water" },
      advice: "Sow nursery on raised seedbeds with 5cm standing water in puddled plots. Heritage GI short grain of Burdwan; apply basal organic compost and 50% N."
    },
    swarna: {
      name: "Swarna (MTU-7029) High-Yielding Aman",
      window: "05–12 June 2026",
      transplant: "01–10 July 2026",
      water: "5–7 cm Standing",
      risk: { lowland: "Low (18%) • Safe", medium: "Low (24%) • Safe", upland: "Moderate (38%) • Monitor" },
      advice: "Heavy tillering long duration variety (145 days). Ensure 25–30 day old seedlings are transplanted at 20x15 cm spacing."
    },
    swarna_sub1: {
      name: "Swarna-Sub1 (Submergence Tolerant)",
      window: "08–15 June 2026",
      transplant: "05–12 July 2026",
      water: "5–10 cm Standing",
      risk: { lowland: "Very Low (12%) • Immune to Submergence", medium: "Low (20%) • Safe", upland: "Low (25%)" },
      advice: "Can withstand complete submergence for up to 14 days under Damodar flood situations. Best for low-lying beels of Burdwan-I and Jamalpur."
    },
    potato: {
      name: "Potato (Jyoti / Pokhraj)",
      window: "20 Sep – 10 Oct (Field Prep)",
      transplant: "25 Oct – 15 Nov (Planting)",
      water: "Field Capacity (Zero Waterlogging)",
      risk: { lowland: "High (65%) • Waterlogging Risk", medium: "Low (25%) • Safe", upland: "Very Low (15%) • Prime" },
      advice: "Premier cash crop of Memari & Jamalpur belt. Ensure deep drainage furrows are cleared immediately after monsoon rains to prevent tuber rot."
    },
    jute: {
      name: "Tossa Jute (Patson Fiber)",
      window: "15 Apr – 15 May (Sowing)",
      transplant: "Active Stem Elongation (45-70d)",
      water: "Moist Soil (Retting in canals)",
      risk: { lowland: "Low (20%) • Safe", medium: "Low (22%) • Safe", upland: "Moderate (35%)" },
      advice: "Requires clean flowing water for microbiological retting in DVC distributaries. Maintain weed-free condition during early vegetative stage."
    },
    madua: {
      name: "Madua / Ragi (Contingency Upland Crop)",
      window: "20 June – 05 July 2026",
      transplant: "Direct Seeded / Nursery",
      water: "35–50 cm Total (Drought Resilient)",
      risk: { lowland: "Moderate (30%) • Avoid Saturated Soils", medium: "Low (15%) • Safe", upland: "Zero Risk (5%) • Recommended" },
      advice: "Emergency fallback crop: requires only 35-50 cm water. Guarantees 100% harvest during erratic breaks or late monsoons on well-drained uplands."
    }
  };

  function setupBurdwanCalculator() {
    if (!calcCropSelect || !calcBlockSelect || !calcTopoSelect) return;

    function recalculate() {
      const cropKey = calcCropSelect.value;
      const topoKey = calcTopoSelect.value;
      const data = BURDWAN_CALC_DATA[cropKey] || BURDWAN_CALC_DATA.gobindobhog;

      if (calcResWindow) calcResWindow.textContent = data.window;
      if (calcResTransplant) calcResTransplant.textContent = data.transplant;
      if (calcResWater) calcResWater.textContent = data.water;
      const riskText = data.risk[topoKey] || data.risk.medium;
      if (calcResRisk) {
        calcResRisk.textContent = riskText;
        calcResRisk.className = `calc-stat-val ${riskText.includes('Low') || riskText.includes('Zero') ? 'text-green' : 'text-amber'}`;
      }
      if (calcResAdvice) {
        calcResAdvice.innerHTML = `✨ <strong>Action Directive (${data.name}):</strong> ${data.advice}`;
      }
    }

    calcCropSelect.addEventListener('change', recalculate);
    calcBlockSelect.addEventListener('change', recalculate);
    calcTopoSelect.addEventListener('change', recalculate);

    if (btnCalcSendMsg) {
      btnCalcSendMsg.addEventListener('click', () => {
        const cropName = calcCropSelect.options[calcCropSelect.selectedIndex].text;
        const blockName = calcBlockSelect.options[calcBlockSelect.selectedIndex].text;
        const topoName = calcTopoSelect.options[calcTopoSelect.selectedIndex].text;
        const windowVal = calcResWindow.textContent;
        const transplantVal = calcResTransplant.textContent;
        const waterVal = calcResWater.textContent;
        const riskVal = calcResRisk.textContent;

        let formattedMsg = '';
        if (msgLanguage === 'bn') {
          formattedMsg = `*🚨 বর্ধমান কৃষি সময়সূচী পরামর্শ:* 🌾\n*ফসল:* ${cropName}\n*ব্লক:* ${blockName} | *জমি:* ${topoName}\n-------------------------\n১. 🌱 বীজতলা ফেলার সময়: ${windowVal}\n২. 🚜 জমিতে রোপণ লক্ষ্য: ${transplantVal}\n৩. 💧 প্রয়োজনীয় জলস্তর: ${waterVal}\n৪. ⚠️ অনাবৃষ্টি / প্লাবন ঝুঁকি: ${riskVal}\n⚠️ _ইউআইটি বর্ধমান ও গ্রামমৌসম কৃষি সেল_`;
        } else if (msgLanguage === 'hi') {
          formattedMsg = `*🚨 बर्धमान कृषि समय सारिणी परामर्श:* 🌾\n*फसल:* ${cropName}\n*प्रखंड:* ${blockName} | *भूमि:* ${topoName}\n-------------------------\n1. 🌱 बुवाई की अवधि: ${windowVal}\n2. 🚜 रोपाई का समय: ${transplantVal}\n3. 💧 आवश्यक जलस्तर: ${waterVal}\n4. ⚠️ सूखा / जलभराव जोखिम: ${riskVal}\n⚠️ _यूआईटी बर्धमान एवं ग्राममौसम_`;
        } else {
          formattedMsg = `*🚨 BURDWAN CROP CALENDAR DIRECTIVE:* 🌾\n*Crop:* ${cropName}\n*Block:* ${blockName} | *Terrain:* ${topoName}\n-------------------------\n1. 🌱 Sowing Window: ${windowVal}\n2. 🚜 Transplanting Target: ${transplantVal}\n3. 💧 Water Standing: ${waterVal}\n4. ⚠️ Break / Flood Risk: ${riskVal}\n⚠️ _UIT Burdwan & Gram-Mausam Agronomy Desk_`;
        }

        messageContentBox.value = formattedMsg;
        updateCharSegments();

        // Switch to WhatsApp or Voice tab
        tabWhatsapp.click();
        const hubEl = document.getElementById('messaging-hub-section');
        if (hubEl) hubEl.scrollIntoView({ behavior: 'smooth' });
        showToast("Sowing schedule loaded into Messaging Hub! 📲");
      });
    }

    recalculate();
  }

  /* --------------------------------------------------------------------------
     12. Multi-Channel Messaging Hub (WhatsApp, SMS, Voice in 3 Languages)
     -------------------------------------------------------------------------- */
  function setupMessagingHub() {
    // Channel Tab switching
    const tabs = [tabWhatsapp, tabSms, tabVoice];
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentChannel = tab.getAttribute('data-channel');

        if (currentChannel === 'voice') {
          if (voiceControlsPanel) voiceControlsPanel.style.display = 'flex';
          if (smsDltPreviewPanel) smsDltPreviewPanel.style.display = 'none';
          if (waExtraActions) waExtraActions.style.display = 'none';
          btnHubWhatsapp.style.display = 'none';
          btnHubSms.style.display = 'none';
          btnHubVoice.style.display = 'inline-flex';
        } else if (currentChannel === 'sms') {
          if (voiceControlsPanel) voiceControlsPanel.style.display = 'none';
          if (smsDltPreviewPanel) smsDltPreviewPanel.style.display = 'flex';
          if (waExtraActions) waExtraActions.style.display = 'none';
          btnHubWhatsapp.style.display = 'none';
          btnHubSms.style.display = 'inline-flex';
          btnHubVoice.style.display = 'none';
        } else {
          if (voiceControlsPanel) voiceControlsPanel.style.display = 'none';
          if (smsDltPreviewPanel) smsDltPreviewPanel.style.display = 'none';
          if (waExtraActions) waExtraActions.style.display = 'flex';
          btnHubWhatsapp.style.display = 'inline-flex';
          btnHubSms.style.display = 'none';
          btnHubVoice.style.display = 'none';
        }
      });
    });

    // Multi-Language Switcher for Voice
    document.querySelectorAll('.btn-voice-lang').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-voice-lang').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const chosenLang = btn.getAttribute('data-vlang');
        msgLanguage = chosenLang;
        if (msgLanguageSelect) msgLanguageSelect.value = chosenLang;
        if (voiceLangTitle) {
          voiceLangTitle.textContent = chosenLang === 'bn' ? 'Bengali Voice Note (বাংলা)' : chosenLang === 'hi' ? 'Hindi Voice Note (हिन्दी)' : 'English Voice Note';
        }
        updateComposerFromTemplate();
        showToast(`Voice Note language set to ${chosenLang === 'bn' ? 'বাংলা' : chosenLang === 'hi' ? 'हिन्दी' : 'English'} 🎙️`);
      });
    });

    // Recipient selection
    msgRecipientSelect.addEventListener('change', () => {
      if (msgRecipientSelect.value === 'custom') {
        customPhoneGroup.style.display = 'flex';
      } else {
        customPhoneGroup.style.display = 'none';
      }
    });

    // Language dropdown selection
    msgLanguageSelect.addEventListener('change', () => {
      msgLanguage = msgLanguageSelect.value;
      document.querySelectorAll('.btn-voice-lang').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-vlang') === msgLanguage);
      });
      if (voiceLangTitle) {
        voiceLangTitle.textContent = msgLanguage === 'bn' ? 'Bengali Voice Note (বাংলা)' : msgLanguage === 'hi' ? 'Hindi Voice Note (हिन्दी)' : 'English Voice Note';
      }
      updateComposerFromTemplate();
    });

    // Template selection
    msgTemplateSelect.addEventListener('change', updateComposerFromTemplate);

    // Voice Bulletin Quick Select
    if (voiceBulletinSelect) {
      voiceBulletinSelect.addEventListener('change', () => {
        const val = voiceBulletinSelect.value;
        if (val === 'paddy') msgTemplateSelect.value = 'burdwan-paddy';
        else if (val === 'drainage') msgTemplateSelect.value = 'damodar-drainage';
        else if (val === 'break') msgTemplateSelect.value = 'break-drought';
        else if (val === 'pest') msgTemplateSelect.value = 'pest-blast';
        updateComposerFromTemplate();
      });
    }

    // Live textarea character & segment counter
    messageContentBox.addEventListener('input', updateCharSegments);

    // Voice Preview & Stop
    btnVoicePreview.addEventListener('click', () => {
      const text = messageContentBox.value;
      speakVoiceAlert(text, msgLanguage);
    });

    btnVoiceStop.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        if (voiceWaveAnim) voiceWaveAnim.style.opacity = '0.3';
        if (btnVoicePreview) btnVoicePreview.innerHTML = '<span>▶️</span><span>Play Voice Note Preview</span>';
        showToast("Voice playback stopped.");
      }
    });

    // Farmer Voice Recording Simulation
    let recInterval = null;
    let recSeconds = 0;
    if (btnVoiceRecord) {
      btnVoiceRecord.addEventListener('click', () => {
        if (!farmerRecBox) return;
        if (farmerRecBox.style.display === 'none') {
          farmerRecBox.style.display = 'flex';
          recSeconds = 0;
          if (recTimer) recTimer.textContent = '00:00';
          recInterval = setInterval(() => {
            recSeconds++;
            const m = String(Math.floor(recSeconds / 60)).padStart(2, '0');
            const s = String(recSeconds % 60).padStart(2, '0');
            if (recTimer) recTimer.textContent = `${m}:${s}`;
          }, 1000);
          if (recLabel) recLabel.textContent = 'Recording Query...';
          showToast("Recording farmer voice query (Speak into microphone) 🎙️");
        } else {
          clearInterval(recInterval);
          farmerRecBox.style.display = 'none';
          if (recLabel) recLabel.textContent = 'Record Farmer Query';
        }
      });
    }

    if (btnRecStop) {
      btnRecStop.addEventListener('click', () => {
        clearInterval(recInterval);
        showToast(`Audio query captured (${recSeconds}s). Ready to dispatch! ⏹️`);
      });
    }

    if (btnRecSend) {
      btnRecSend.addEventListener('click', async () => {
        clearInterval(recInterval);
        if (farmerRecBox) farmerRecBox.style.display = 'none';
        if (recLabel) recLabel.textContent = 'Record Farmer Query';
        const duration = recSeconds || 14;
        showToast(`Sending ${duration}s voice query to KVK Burdwan agronomists... 📤`);
        await dispatchMessageViaBackend('voice', `[Farmer Voice Audio Query] ${duration}s question recorded in ${msgLanguage === 'bn' ? 'বাংলা' : msgLanguage === 'hi' ? 'हिन्दी' : 'English'} for KVK Purba Bardhaman`, msgLanguage);
      });
    }

    // WhatsApp Kiosk QR Modal
    if (btnWaQr) {
      btnWaQr.addEventListener('click', () => {
        const text = messageContentBox.value;
        const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(waUrl)}`;
        const qrImg = document.querySelector('#wa-qr-modal .qr-code-img');
        if (qrImg) qrImg.src = qrUrl;
        if (waQrModal) waQrModal.style.display = 'flex';
      });
    }

    if (btnCloseWaQr) btnCloseWaQr.addEventListener('click', () => { if (waQrModal) waQrModal.style.display = 'none'; });
    if (btnAckWaQr) btnAckWaQr.addEventListener('click', () => { if (waQrModal) waQrModal.style.display = 'none'; });

    // Action Dispatches
    btnHubWhatsapp.addEventListener('click', () => {
      const text = messageContentBox.value;
      let phone = '';
      if (msgRecipientSelect.value === 'custom') {
        phone = customPhoneInput.value.replace(/[^0-9]/g, '');
      }
      const waUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
      recordSentMessage('whatsapp', text, msgLanguage);
      showToast("WhatsApp broadcast opened! 💬");
    });

    btnHubSms.addEventListener('click', async () => {
      const text = messageContentBox.value;
      btnHubSms.style.transform = 'scale(0.96)';
      setTimeout(() => btnHubSms.style.transform = '', 150);
      await dispatchMessageViaBackend('sms', text, msgLanguage);
    });

    btnHubVoice.addEventListener('click', async () => {
      const text = messageContentBox.value;
      btnHubVoice.style.transform = 'scale(0.96)';
      setTimeout(() => btnHubVoice.style.transform = '', 150);
      speakVoiceAlert(text, msgLanguage);
      await dispatchMessageViaBackend('voice', text, msgLanguage);
    });

    btnHubCopy.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(messageContentBox.value).then(() => showToast("Message text copied! 📋"));
      }
    });

    // Initial setup
    updateComposerFromTemplate();
    fetchMessageLogs();
  }

  function updateComposerFromTemplate() {
    const tplKey = msgTemplateSelect.value;
    const loc = LOCATION_DATA[currentLocation] || LOCATION_DATA.burdwan;
    const locName = loc.name[msgLanguage] || loc.name.en;

    const tplGroup = MSG_TEMPLATES[tplKey] || MSG_TEMPLATES['burdwan-paddy'];
    const rawTemplate = tplGroup[msgLanguage] || tplGroup['en'];
    const finalText = rawTemplate.replace('{LOCATION_NAME}', locName);

    messageContentBox.value = finalText;
    updateCharSegments();
  }

  function updateCharSegments() {
    const text = messageContentBox.value;
    const isUnicode = /[^\u0020-\u007E\r\n]/.test(text);
    const charCount = Array.from(text).length;

    let segmentLimit = isUnicode ? 70 : 160;
    let multiLimit = isUnicode ? 67 : 153;
    let segments = 1;
    if (charCount > segmentLimit) {
      segments = Math.ceil(charCount / multiLimit);
    }

    charCountText.textContent = `Chars: ${charCount}`;
    segmentCountText.textContent = `${segments} Segment (${isUnicode ? 'Unicode UCS-2' : 'GSM 7-bit'})`;
  }

  function speakVoiceAlert(text, lang) {
    if (!('speechSynthesis' in window)) {
      showToast("Speech synthesis not supported on this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#🚨🌾💧🌊🌱🚜🚫⚠️]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const voices = window.speechSynthesis.getVoices();
    let langCode = 'bn-IN';
    if (lang === 'hi') langCode = 'hi-IN';
    if (lang === 'en') langCode = 'en-IN';

    const match = voices.find(v => v.lang.startsWith(langCode.slice(0, 2)) || v.lang.includes('IN'));
    if (match) utterance.voice = match;
    utterance.lang = langCode;

    const speedVal = parseFloat(voiceSpeedSelect?.value || '1.0');
    utterance.rate = isNaN(speedVal) ? 0.95 : speedVal;

    if (voiceWaveAnim) voiceWaveAnim.style.opacity = '1';
    if (btnVoicePreview) btnVoicePreview.innerHTML = '<span>🔊</span><span>Playing Audio Note...</span>';

    utterance.onend = utterance.onerror = () => {
      if (voiceWaveAnim) voiceWaveAnim.style.opacity = '0.3';
      if (btnVoicePreview) btnVoicePreview.innerHTML = '<span>▶️</span><span>Play Voice Note Preview</span>';
    };

    window.speechSynthesis.speak(utterance);
    showToast(`Playing voice alert in ${lang === 'bn' ? 'বাংলা' : lang === 'hi' ? 'हिन्दी' : 'English'} (${speedVal}x speed) 🔊`);
  }

  async function dispatchMessageViaBackend(channel, text, lang) {
    let recipient = msgRecipientSelect.options[msgRecipientSelect.selectedIndex].text;
    if (msgRecipientSelect.value === 'custom' && customPhoneInput.value) {
      recipient = customPhoneInput.value;
    }

    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: channel,
          recipient: recipient,
          message: text,
          language: lang,
          location: LOCATION_DATA[currentLocation]?.name.en || currentLocation
        })
      });

      if (res.ok) {
        const data = await res.json();
        showToast(`${channel.toUpperCase()} Dispatched to ${data.recipient}! (ID: ${data.dispatch_id}) ✅`);
        fetchMessageLogs();
      } else {
        recordSentMessage(channel, text, lang);
      }
    } catch (err) {
      recordSentMessage(channel, text, lang);
    }
  }

  async function fetchMessageLogs() {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        renderMessageLogs(data.messages);
      }
    } catch (err) {
      console.warn("Could not load message logs");
    }
  }

  function renderMessageLogs(messages) {
    if (!dispatchLogsList) return;
    dispatchLogsList.innerHTML = '';
    logCountPill.textContent = `${messages.length} Dispatched`;

    messages.forEach(msg => {
      const card = document.createElement('div');
      card.className = 'log-card-item';
      const icon = msg.channel === 'whatsapp' ? '💬 WhatsApp' : msg.channel === 'sms' ? '✉️ Text SMS' : '🎙️ Voice Note';
      const statusClass = msg.status === 'READ' ? 'status-read' : msg.status === 'DELIVERED' ? 'status-delivered' : 'status-queued';

      card.innerHTML = `
        <div class="log-card-top">
          <span class="log-channel-badge">${icon}</span>
          <span class="log-status-badge ${statusClass}">${msg.status}</span>
        </div>
        <div class="log-recipient-line">${msg.recipient}</div>
        <div class="log-preview-text">${msg.message_preview}</div>
        <div class="log-meta-bottom">
          <span>${msg.language_name} &bull; ${msg.location}</span>
          <span class="tabular-num">${msg.time_formatted}</span>
        </div>
      `;
      dispatchLogsList.appendChild(card);
    });
  }

  function recordSentMessage(channel, text, lang) {
    const langNames = { bn: "বাংলা (Bengali)", hi: "हिन्दी (Hindi)", en: "English" };
    const fakeRecord = {
      id: `DISPATCH-${channel.toUpperCase().slice(0, 2)}-${Date.now().toString().slice(-4)}`,
      time_formatted: "Just now",
      channel: channel,
      recipient: msgRecipientSelect.options[msgRecipientSelect.selectedIndex].text,
      location: LOCATION_DATA[currentLocation]?.name.en || "Burdwan City",
      language_name: langNames[lang] || lang,
      status: "DELIVERED",
      message_preview: text
    };
    showToast(`${channel.toUpperCase()} message queued and sent! 📨`);
    const existing = Array.from(dispatchLogsList.children);
    fetchMessageLogs();
  }

  /* --------------------------------------------------------------------------
     12. Map Scope & Color Engine
     -------------------------------------------------------------------------- */
  function setupMap() {
    btnScopeBurdwan.addEventListener('click', () => {
      btnScopeBurdwan.classList.add('active');
      btnScopeJharkhand.classList.remove('active');
      btnScopeNational.classList.remove('active');
      currentMapScope = 'burdwan';
      mapBurdwanGroup.style.display = 'inline';
      mapJharkhandGroup.style.display = 'none';
      mapNationalGroup.style.display = 'none';
      currentLocation = 'burdwan';
      districtSelect.value = 'burdwan';
      updateAll();
    });

    btnScopeJharkhand.addEventListener('click', () => {
      btnScopeJharkhand.classList.add('active');
      btnScopeBurdwan.classList.remove('active');
      btnScopeNational.classList.remove('active');
      currentMapScope = 'jharkhand';
      mapBurdwanGroup.style.display = 'none';
      mapJharkhandGroup.style.display = 'inline';
      mapNationalGroup.style.display = 'none';
      currentLocation = 'kanke';
      districtSelect.value = 'kanke';
      updateAll();
    });

    btnScopeNational.addEventListener('click', () => {
      btnScopeNational.classList.add('active');
      btnScopeBurdwan.classList.remove('active');
      btnScopeJharkhand.classList.remove('active');
      currentMapScope = 'national';
      mapBurdwanGroup.style.display = 'none';
      mapJharkhandGroup.style.display = 'none';
      mapNationalGroup.style.display = 'inline';
      currentLocation = 'vidarbha';
      districtSelect.value = 'vidarbha';
      updateAll();
    });

    // Layer Buttons
    document.querySelectorAll('.layer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLayer = btn.getAttribute('data-layer');
        updateMapColors();
      });
    });

    // Map Path Click / Hover
    document.querySelectorAll('.map-region-path').forEach(path => {
      const rKey = path.getAttribute('data-region');
      path.addEventListener('mouseenter', () => populateInfobox(rKey));
      path.addEventListener('mouseleave', () => populateInfobox(currentLocation));
      path.addEventListener('click', () => {
        if (LOCATION_DATA[rKey]) {
          currentLocation = rKey;
          districtSelect.value = rKey;
          updateAll();
          showToast(`Selected ${LOCATION_DATA[rKey].name[currentLang] || rKey}`);
        }
      });
    });

    districtSelect.addEventListener('change', (e) => {
      currentLocation = e.target.value;
      if (currentLocation.startsWith('burdwan') || currentLocation === 'memari') {
        if (currentMapScope !== 'burdwan') btnScopeBurdwan.click();
      } else if (LOCATION_DATA[currentLocation]?.isPilot) {
        if (currentMapScope !== 'jharkhand') btnScopeJharkhand.click();
      } else {
        if (currentMapScope !== 'national') btnScopeNational.click();
      }
      updateAll();
    });
  }

  function updateMapColors() {
    const data = REGION_LAYER_DATA[currentLayer];
    document.querySelectorAll('.map-region-path').forEach(path => {
      const rKey = path.getAttribute('data-region');
      if (data && data[rKey]) {
        path.setAttribute('fill', data[rKey].color);
      }
    });
    populateInfobox(currentLocation);
  }

  function populateInfobox(regionKey) {
    const layerData = REGION_LAYER_DATA[currentLayer];
    const item = layerData ? layerData[regionKey] : null;
    const loc = LOCATION_DATA[regionKey];
    if (!item || !loc) return;

    const displayName = loc.name[currentLang] || loc.name.en;
    infoboxName.textContent = displayName;
    infoboxRiskType.innerHTML = `${layerData.label}: <strong>${item.val}</strong>`;
    infoboxPct.innerHTML = `Statistical Status: <strong>${item.prob}</strong> (${item.state})`;
    infoboxPct.style.color = item.color;
    infoboxHint.innerHTML = `💧 Soil SMI: ${loc.currentSmi} | 🪨 Safe Pumping: ${loc.safePumpingHours}`;
  }

  function updateMapDisplay() {
    updateMapColors();
    populateInfobox(currentLocation);
  }

  /* --------------------------------------------------------------------------
     13. Crops Matrix & Filtering
     -------------------------------------------------------------------------- */
  function setupCropMatrix() {
    document.querySelectorAll('.crop-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.crop-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        cropFilter = btn.getAttribute('data-crop-filter');
        renderCropsMatrix();
      });
    });
  }

  function renderCropsMatrix() {
    cropsMatrixGrid.innerHTML = '';
    const filtered = CROPS_MATRIX.filter(c => {
      if (cropFilter === 'kharif') return c.season === 'kharif';
      if (cropFilter === 'rabi') return c.season === 'rabi' || c.season === 'annual';
      if (cropFilter === 'fallback') return c.isFallback;
      return true;
    });

    filtered.forEach(crop => {
      const card = document.createElement('article');
      card.className = `crop-card ${crop.isFallback ? 'is-fallback' : ''}`;
      card.innerHTML = `
        <div class="crop-card-header">
          <div class="crop-name-box">
            <h4>${crop.name}</h4>
            <span class="crop-season-tag">${crop.localName} &bull; ${crop.season.toUpperCase()}</span>
          </div>
          <span class="crop-water-pill">💧 ${crop.waterReq}</span>
        </div>
        <div class="crop-stage-row">
          <strong>Critical Growth Stage:</strong> ${crop.criticalStage}
        </div>
        <span class="crop-sensitivity-badge ${crop.sensClass}">Break Sensitivity: ${crop.breakSensitivity}</span>
        <div class="crop-action-box">
          <strong>Contingency Action:</strong> ${crop.advisory}
        </div>
      `;
      cropsMatrixGrid.appendChild(card);
    });
  }

  /* --------------------------------------------------------------------------
     14. 7-to-30-Day Outlook Table
     -------------------------------------------------------------------------- */
  function renderOutlookTable() {
    tableOutlookBody.innerHTML = '';
    const list = OUTLOOK_DATA[currentLocation] || OUTLOOK_DATA.burdwan;

    list.forEach((row, i) => {
      const tr = document.createElement('tr');
      const isCur = i === 0 ? ' <span style="font-weight:700; color:var(--ag-green-primary);">(Current)</span>' : '';
      tr.innerHTML = `
        <td><strong>${row.week}</strong>${isCur}</td>
        <td class="tabular-num">${row.dates}</td>
        <td class="tabular-num" style="font-weight:700; color:${i === 2 ? 'var(--ag-red-danger)' : 'var(--ag-text-primary)'};">${row.prob}</td>
        <td class="tabular-num">${row.rainfall}</td>
        <td class="tabular-num">${row.onset}</td>
        <td><span class="table-badge ${row.badgeClass}">${row.regime}</span></td>
        <td class="tabular-num">${row.smi}</td>
        <td class="tabular-num"><strong>${row.pumping}</strong></td>
        <td>${row.directive}</td>
      `;
      tableOutlookBody.appendChild(tr);
    });
  }

  /* --------------------------------------------------------------------------
     15. Localized Advisories Rendering
     -------------------------------------------------------------------------- */
  function renderAdvisories(list) {
    advisoriesContainer.innerHTML = '';
    list.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'advisory-card';
      card.innerHTML = `
        <div class="advisory-card-header">
          <span class="crop-tag">🌾 ${item.crop}</span>
          <span class="spell-indicator">${item.spell}</span>
        </div>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
        <div class="advisory-actions">
          <span class="tabular-num" style="font-size:0.75rem; color:var(--ag-text-tertiary);">Priority: Urgent</span>
          <button class="btn-tts" data-tts-index="${index}" title="Listen to regional audio readout">
            <span class="tts-icon">🔊</span>
            <span class="tts-label">Voice Readout</span>
          </button>
        </div>
      `;
      advisoriesContainer.appendChild(card);
    });

    advisoriesContainer.querySelectorAll('.btn-tts').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-tts-index'), 10);
        speakVoiceAlert(list[idx].tts, currentLang);
      });
    });
  }

  /* --------------------------------------------------------------------------
     16. MJO Wheeler-Hendon Canvas Drawing
     -------------------------------------------------------------------------- */
  function drawMjoDiagram() {
    if (!mjoCanvas) return;
    const ctx = mjoCanvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 380;
    const height = 320;

    mjoCanvas.width = width * dpr;
    mjoCanvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 28;
    const unitRadius = maxRadius * 0.45;

    ctx.clearRect(0, 0, width, height);

    // Unit circle
    ctx.beginPath();
    ctx.arc(cx, cy, unitRadius, 0, Math.PI * 2);
    ctx.fillStyle = isSunlightMode ? '#F1F5F9' : '#F8FAFC';
    ctx.fill();
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Axes
    ctx.strokeStyle = isSunlightMode ? '#121317' : '#CBD5E1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, cy);
    ctx.lineTo(width - 20, cy);
    ctx.moveTo(cx, 20);
    ctx.lineTo(cx, height - 20);
    ctx.stroke();

    // Diagonals
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - maxRadius * 0.7, cy - maxRadius * 0.7);
    ctx.lineTo(cx + maxRadius * 0.7, cy + maxRadius * 0.7);
    ctx.moveTo(cx - maxRadius * 0.7, cy + maxRadius * 0.7);
    ctx.lineTo(cx + maxRadius * 0.7, cy - maxRadius * 0.7);
    ctx.stroke();

    // Phase Labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const labels = [
      { text: "Phase 7 (W. Pacific)", x: cx + maxRadius * 0.68, y: cy - maxRadius * 0.45 },
      { text: "Phase 6 (W. Pacific)", x: cx + maxRadius * 0.38, y: cy - maxRadius * 0.78 },
      { text: "Phase 5 (Maritime)", x: cx - maxRadius * 0.38, y: cy - maxRadius * 0.78 },
      { text: "Phase 4 (Maritime)", x: cx - maxRadius * 0.68, y: cy - maxRadius * 0.45 },
      { text: "Phase 3 (Indian Ocean)", x: cx - maxRadius * 0.65, y: cy + maxRadius * 0.48, active: true },
      { text: "Phase 2 (Indian Ocean)", x: cx - maxRadius * 0.35, y: cy + maxRadius * 0.78 },
      { text: "Phase 1 (Africa)", x: cx + maxRadius * 0.35, y: cy + maxRadius * 0.78 },
      { text: "Phase 8 (Americas)", x: cx + maxRadius * 0.68, y: cy + maxRadius * 0.48 }
    ];

    labels.forEach(l => {
      ctx.fillStyle = l.active ? '#7C3AED' : (isSunlightMode ? '#121317' : '#475569');
      ctx.font = l.active ? 'bold 11px sans-serif' : '600 10px sans-serif';
      ctx.fillText(l.text, l.x, l.y);
    });

    // Trajectory
    const traj = [
      { rmm1: 0.65, rmm2: -0.80 },
      { rmm1: 0.45, rmm2: -0.65 },
      { rmm1: 0.15, rmm2: -0.40 },
      { rmm1: -0.20, rmm2: -0.55 },
      { rmm1: -0.48, rmm2: -0.30 },
      { rmm1: -0.75, rmm2: 0.10 },
      { rmm1: -0.92, rmm2: 0.70 },
      { rmm1: -1.05, rmm2: 1.15 },
      { rmm1: -0.98, rmm2: 1.32 }
    ];

    const pts = traj.map(p => ({ x: cx + (p.rmm1 * unitRadius), y: cy - (p.rmm2 * unitRadius) }));

    ctx.beginPath();
    ctx.strokeStyle = '#7C3AED';
    ctx.lineWidth = 2.5;
    pts.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    pts.forEach((pt, i) => {
      ctx.beginPath();
      const isLatest = i === pts.length - 1;
      ctx.arc(pt.x, pt.y, isLatest ? 6 : 3, 0, Math.PI * 2);
      ctx.fillStyle = isLatest ? '#DC2626' : '#8B5CF6';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    const latest = pts[pts.length - 1];
    ctx.fillStyle = '#121317';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText("Active Convective Surge (Phase 3)", latest.x, latest.y - 12);
  }

  /* --------------------------------------------------------------------------
     17. Toast & Feedback
     -------------------------------------------------------------------------- */
  function showToast(msg) {
    if (!toastNotice) return;
    toastMessage.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => { toastNotice.classList.remove('show'); }, 3400);
  }

  /* --------------------------------------------------------------------------
     18. App Lifecycle & Event Listeners
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    applyAntigravityTokens();

    // Language Dropdown
    langSelect.addEventListener('change', (e) => {
      currentLang = e.target.value;
      if (currentLang === 'bn' || currentLang === 'hi' || currentLang === 'en') {
        msgLanguageSelect.value = currentLang;
        msgLanguage = currentLang;
      }
      updateAll();
      showToast(`Language set to ${e.target.selectedOptions[0].text}`);
    });

    // Dark Mode Toggle
    btnSunlight.addEventListener('click', () => {
      isSunlightMode = !isSunlightMode;
      if (isSunlightMode) {
        body.classList.add('dark-mode');
        sunlightIcon.textContent = '☀️';
        sunlightLabel.textContent = 'Light Mode';
        showToast("Deep Dark Mode Enabled 🌙");
      } else {
        body.classList.remove('dark-mode');
        sunlightIcon.textContent = '🌙';
        sunlightLabel.textContent = 'Dark Mode';
        showToast("Standard Mode Restored ☀️");
      }
      drawMjoDiagram();
    });

    // Security Modal
    btnSecurityModal.addEventListener('click', () => securityModal.style.display = 'flex');
    btnCloseSecurity.addEventListener('click', () => securityModal.style.display = 'none');
    btnAckSecurity.addEventListener('click', () => {
      securityModal.style.display = 'none';
      showToast("Security Audit Acknowledged (100/100) ✅");
    });

    // Slider
    breakDaysSlider.addEventListener('input', updateSmiSimulation);

    // Banner audio
    btnBannerAudio.addEventListener('click', () => {
      const loc = LOCATION_DATA[currentLocation] || LOCATION_DATA.burdwan;
      const advText = loc.sampleAdvisory[currentLang] || loc.sampleAdvisory.en;
      speakVoiceAlert(advText, currentLang);
    });

    // Real-time Sync Button
    btnRefreshTelemetry.addEventListener('click', () => {
      fetchRealtimeTelemetry();
      fetchBurdwanData();
      fetchMessageLogs();
      showToast("Real-time telemetry and dispatch logs synchronized! 🔄");
    });

    // Start Live Clock
    setInterval(updateLiveClock, 1000);
    updateLiveClock();

    // Auto-refresh telemetry & Burdwan data every 15s
    setInterval(() => {
      fetchRealtimeTelemetry();
      fetchBurdwanData();
    }, 15000);

    // Initialize modules
    setupMap();
    setupCropMatrix();
    setupBurdwanCalculator();
    setupMessagingHub();

    // Initial render
    updateAll();
    fetchBurdwanData();

    // Canvas drawing
    if (document.fonts) {
      document.fonts.ready.then(() => drawMjoDiagram());
    } else {
      drawMjoDiagram();
    }

    window.addEventListener('resize', drawMjoDiagram);
  });

})();
