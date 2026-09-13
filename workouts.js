/* HYBRID CHALLENGE LOG — built-in daily workout definitions */

const RACE_TEMPLATES={
  easyHybrid:{
    id:'easyHybrid',
    label:'加減練一下',
    duration:'約 30–40 分鐘',
    intensity:1,
    description:'低門檻活動日。不跑步，以 Quick Walk 搭配簡單全身動作，適合恢復日、初學者或只是想動一動。',
    equipment:'壺鈴／啞鈴／自體重量',
    total:'總 Quick Walk：2 km',
    build(){
      const seq=[
        ['Quick Walk','500 m',500],
        ['Kettlebell Swing','20 reps · 輕重量'],
        ['Quick Walk','500 m',500],
        ['Dumbbell Row','15 reps / side'],
        ['Quick Walk','500 m',500],
        ['Kettlebell Goblet Squat','20 reps'],
        ['Quick Walk','500 m',500],
        ['Farmers Carry','60 m · 輕中重量（RPE 5–6）'],
        ['Plank','45 sec']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

  coreTraining:{
    id:'coreTraining',
    label:'核心也要練',
    duration:'約 55–65 分鐘',
    intensity:2,
    description:'核心穩定＋心肺交錯。不跑步，讓 Erg／Sled／Carry 與核心控制輪流出現，重點是疲勞下維持軀幹穩定，而不是單純做腹肌。',
    equipment:'SkiErg／Row／BikeErg／Sled／啞鈴',
    total:'跑步：0 km｜核心與心肺交錯｜預計約 60 分鐘',
    build(){
      const seq=[
        ['SkiErg','800 m'],
        ['Weighted Sit-Up','25 reps'],
        ['Sled Push','40 m · RPE 6–7'],
        ['Dead Bug','20 reps / side'],
        ['Row','800 m'],
        ['Plank Dumbbell Drag','20 reps / side'],
        ['Sled Pull','40 m · RPE 6–7'],
        ['Weighted Russian Twist','40 reps'],
        ['BikeErg','6 min'],
        ['Renegade Row','12 reps / side'],
        ['Farmers Carry','120 m · RPE 6–7'],
        ['Pallof Press','15 reps / side']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

  engineBuilder:{
    id:'engineBuilder',
    label:'平凡的一次訓練',
    duration:'約 55–70 分鐘',
    intensity:3,
    description:'很普通的日常訓練。有跑、有推、有拉、有負重，但沒有任何一項特別極端。',
    equipment:'啞鈴／壺鈴／自體重量',
    total:'總 Run：2.4 km',
    build(){
      const seq=[
        ['Run','400 m',400],
        ['Dumbbell Thruster','20 reps'],
        ['Run','400 m',400],
        ['Kettlebell Swing','25 reps'],
        ['Run','400 m',400],
        ['Dumbbell Row','15 reps / side'],
        ['Run','400 m',400],
        ['Farmers Carry','100 m · RPE 6–7'],
        ['Run','400 m',400],
        ['Weighted Sit-Up','20 reps'],
        ['Run','400 m',400],
        ['Walking Lunges','30 reps']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

  noRun:{
    id:'noRun',
    label:'今天不跑步',
    duration:'約 85–95 分鐘',
    intensity:5,
    description:'不跑步的長時間 hybrid endurance。Heavy Walk 指快速走、坡度走或輕度負重走，以能穩定完成 8 分鐘為原則，再穿插全身肌耐力與 carry。',
    equipment:'啞鈴／壺鈴／藥球／可負重步行',
    total:'跑步：0 km｜Heavy Walk：約 64 分鐘',
    build(){
      const seq=[
        ['Heavy Walk','8 min · 快走／坡度走／輕度負重'],
        ['Kettlebell Swing','40 reps'],
        ['Heavy Walk','8 min · 快走／坡度走／輕度負重'],
        ['Dumbbell Walking Lunge','40 reps'],
        ['Heavy Walk','8 min · 快走／坡度走／輕度負重'],
        ['Burpee','25 reps'],
        ['Heavy Walk','8 min · 快走／坡度走／輕度負重'],
        ['Farmers Carry','160 m · RPE 6–7'],
        ['Heavy Walk','8 min · 快走／坡度走／輕度負重'],
        ['Kettlebell Goblet Squat','30 reps'],
        ['Heavy Walk','8 min · 快走／坡度走／輕度負重'],
        ['Medicine Ball Slam','40 reps'],
        ['Heavy Walk','8 min · 快走／坡度走／輕度負重'],
        ['Front Rack Carry','120 m · RPE 6–7'],
        ['Heavy Walk','8 min · 快走／坡度走／輕度負重'],
        ['Dumbbell Thruster','30 reps']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

  lowerBlast:{
    id:'lowerBlast',
    label:'下肢炸裂 Run',
    duration:'約 75–90 分鐘',
    intensity:6,
    description:'下肢主導的 compromised-running 挑戰。Sled、lunge、squat 與 carry 反覆穿插跑步，重點是腿部疲勞後仍能維持移動效率。',
    equipment:'Sled／Row／啞鈴或壺鈴',
    total:'總 Run：3.5 km',
    build(){
      const seq=[
        ['Run','500 m',500],
        ['Sled Push','40 m · RPE 7–8'],
        ['Run','500 m',500],
        ['Dumbbell Walking Lunge','40 reps'],
        ['Run','500 m',500],
        ['Sled Pull','40 m · RPE 7–8'],
        ['Run','500 m',500],
        ['Kettlebell Goblet Squat','30 reps'],
        ['Run','500 m',500],
        ['Row','600 m'],
        ['Run','500 m',500],
        ['Heavy Farmers Carry','120 m · RPE 7–8'],
        ['Run','500 m',500],
        ['Weighted Lunges','60 m · 可穩定完成重量']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

  balanced8:{
    id:'balanced8',
    label:'全能 8 站',
    duration:'約 85–105 分鐘',
    intensity:8,
    description:'跑量低於經典挑戰，但仍屬高負荷的全能型訓練。保留 8 段跑步與多個 race-specific station，適合作為較完整的 HYROX-style 模擬。',
    equipment:'SkiErg／Sled／Row／壺鈴／啞鈴',
    total:'總 Run：6 km｜8 個工作站',
    build(){
      const seq=[
        ['Run','750 m',750],
        ['SkiErg','1000 m'],
        ['Run','750 m',750],
        ['Sled Push','50 m · RPE 7–8'],
        ['Run','750 m',750],
        ['Dumbbell Thruster','40 reps'],
        ['Run','750 m',750],
        ['Row','1000 m'],
        ['Run','750 m',750],
        ['Burpee Broad Jump','60 m'],
        ['Run','750 m',750],
        ['Farmers Carry','160 m · RPE 7–8'],
        ['Run','750 m',750],
        ['Kettlebell Swing','50 reps'],
        ['Run','750 m',750],
        ['Wall Balls','80 reps']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

  fatBurn:{
    id:'fatBurn',
    label:'代謝耐力',
    duration:'約 75–90 分鐘',
    intensity:7,
    description:'Quick Walk、Run、BikeErg 與 Row 交錯，搭配全身肌耐力動作，目標是維持較長時間的穩定輸出。減脂效果仍取決於整體能量平衡與長期訓練。',
    equipment:'BikeErg／Row／壺鈴／啞鈴／自體重量',
    total:'總 Run：1.8 km｜Quick Walk：2.4 km｜BikeErg：8 min｜Row：600 m',
    build(){
      const seq=[
        ['Quick Walk','800 m',800],
        ['Kettlebell Swing','30 reps'],
        ['Run','600 m',600],
        ['Dumbbell Walking Lunge','30 reps'],
        ['BikeErg','4 min'],
        ['Farmers Carry','100 m · RPE 6–7'],
        ['Run','600 m',600],
        ['Dumbbell Thruster','20 reps'],
        ['Quick Walk','800 m',800],
        ['Kettlebell Goblet Squat','30 reps'],
        ['Row','600 m'],
        ['Burpee','20 reps'],
        ['Run','600 m',600],
        ['Farmers Carry','100 m · RPE 6–7'],
        ['BikeErg','4 min'],
        ['Weighted Sit-Up','25 reps'],
        ['Quick Walk','800 m',800],
        ['Wall Balls','40 reps']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

  moverDay:{
    id:'moverDay',
    label:'搬運工的一天',
    duration:'約 80–100 分鐘',
    intensity:8,
    description:'重、慢、一直搬。跑量不高，主要靠 sled、carry、deadlift、walking lunge 與 Heavy Walk 累積負重耐力。Heavy 以 RPE 7–8 為原則；比較成績時請固定相同重量。',
    equipment:'Sled／BikeErg／啞鈴／壺鈴／可負重步行',
    total:'Run：1 km｜Heavy Walk：1.6 km',
    build(){
      const seq=[
        ['Heavy Walk','800 m · 快走／坡度走／輕中負重',800],
        ['Heavy Sled Push','50 m · RPE 7–8'],
        ['Dumbbell Deadlift','30 reps'],
        ['BikeErg','4 min'],
        ['Heavy Sled Pull','50 m · RPE 7–8'],
        ['Front Rack Carry','120 m · RPE 7–8'],
        ['Run','500 m',500],
        ['Kettlebell Goblet Squat','30 reps'],
        ['Heavy Farmers Carry','160 m · RPE 7–8'],
        ['BikeErg','4 min'],
        ['Dumbbell Walking Lunge','80 m'],
        ['Run','500 m',500],
        ['Kettlebell Thruster','30 reps'],
        ['Heavy Walk','800 m · 快走／坡度走／輕中負重',800]
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

  aerobicMax:{
    id:'aerobicMax',
    label:'有氧拉滿',
    duration:'約 90–115 分鐘',
    intensity:9,
    description:'長時間心肺輸出。Run、SkiErg、Row 反覆交錯；前段維持可持續節奏，最後三段再逐步加速，避免一開始就衝爆。',
    equipment:'SkiErg／Row／壺鈴／啞鈴',
    total:'總 Run：4.2 km｜SkiErg + Row：3.2 km',
    build(){
      const seq=[
        ['Run','600 m',600],
        ['SkiErg','800 m'],
        ['Run','600 m',600],
        ['Row','800 m'],
        ['Run','600 m',600],
        ['SkiErg','800 m'],
        ['Run','600 m',600],
        ['Row','800 m'],
        ['Run','600 m',600],
        ['Kettlebell Swing','40 reps'],
        ['Run','600 m',600],
        ['Farmers Carry','120 m · RPE 6–7'],
        ['Run','600 m',600],
        ['Dumbbell Thruster','30 reps']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

  hellDay:{
    id:'hellDay',
    label:'地獄日',
    duration:'約 120–150 分鐘',
    intensity:10,
    description:'終極高量 benchmark。完整跑量加上高負荷工作站，適合已有訓練基礎時偶爾用來測試能力，不建議頻繁安排。',
    equipment:'SkiErg／Sled／Row／BikeErg／重負重器材',
    total:'總 Run：8 km｜10 個高量工作站｜明確高於經典挑戰',
    build(){
      const seq=[
        ['Run','1 km',1000],
        ['SkiErg','1000 m'],
        ['Run','1 km',1000],
        ['Heavy Sled Push','50 m · RPE 8'],
        ['Run','1 km',1000],
        ['Heavy Sled Pull','50 m · RPE 8'],
        ['Run','1 km',1000],
        ['Burpee Broad Jump','80 m'],
        ['Run','1 km',1000],
        ['Row','1000 m'],
        ['Run','1 km',1000],
        ['Heavy Farmers Carry','200 m · RPE 8'],
        ['Run','1 km',1000],
        ['Weighted Lunges','100 m'],
        ['Run','1 km',1000],
        ['Wall Balls','100 reps'],
        ['BikeErg','5 min'],
        ['Kettlebell Thruster','40 reps']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

  coreSculpt:{
    id:'coreSculpt',
    label:'核心線條雕塑',
    duration:'約 50–60 分鐘',
    intensity:3,
    description:'核心耐力＋全身肌耐力的無跑訓練。開始前自選一種有氧，全程使用同一種器材／模式，搭配 carry、下肢與肩背動作。',
    equipment:'有氧自選／啞鈴／壺鈴／Cable 或自體重量',
    total:'跑步：0 km｜Cardio：約 29 分鐘｜核心＋全身肌耐力',
    build(cardioChoice='Bike'){
      const cardio=String(cardioChoice||'Bike');
      const seq=[
        [cardio,'6 min'],
        ['Kettlebell Goblet Squat','20 reps'],
        ['Farmers Carry','80 m · RPE 6'],
        ['Reverse Crunch','15 reps'],
        [cardio,'6 min'],
        ['Dumbbell Row','15 reps / side'],
        ['Walking Lunges','24 reps'],
        ['Pallof Press','12 reps / side'],
        [cardio,'6 min'],
        ['Hip Thrust','20 reps'],
        ['Suitcase Carry','40 m / side'],
        ['Hanging Knee Raise','12 reps'],
        [cardio,'6 min'],
        ['Dumbbell Shoulder Press','15 reps'],
        ['Box Step-Up','20 reps'],
        ['Cable Crunch','15 reps'],
        [cardio,'5 min · moderate–hard'],
        ['Side Plank','30 sec / side'],
        ['Hollow Body Hold','30 sec'],
        ['Plank','60 sec']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

strengthBoost:{
  id:'strengthBoost',
  label:'力量強化',
  duration:'約 60–75 分鐘',
  intensity:4,
  description:'以全身力量與力量耐力為主，Row 穿插在力量區塊之間維持心肺壓力；最後以 500 m hard Row 作為 finisher，避免連續兩段 Row 重複。',
  equipment:'Row／Sled／壺鈴／啞鈴／Sandbag',
  total:'跑步：0 km｜Row：2.3 km｜Kettlebell + Sled strength',
  build(){
    const seq=[
      ['Kettlebell Goblet Squat','20 reps'],
      ['Kettlebell Swing','20 reps'],
      ['Farmers Carry','100 m · RPE 6–7'],
      ['Row','600 m'],
      ['Sled Push','40 m · RPE 7'],
      ['Dumbbell Bench Press','15 reps'],
      ['Front Rack Carry','40 m / side'],
      ['Row','600 m'],
      ['Sled Pull','40 m · RPE 7'],
      ['Box Step-Up','24 reps · weighted'],
      ['Dumbbell Shoulder Press','15 reps'],
      ['Row','600 m'],
      ['Kettlebell Deadlift','20 reps'],
      ['Sandbag Carry','100 m'],
      ['Lat Pulldown','15 reps'],
      ['Sandbag Front Squat','15 reps'],
      ['Row','500 m · hard'],
      ['Kettlebell Swing','20 reps']
    ];
    return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
  }
},

  lineBoost:{
    id:'lineBoost',
    label:'線條強化',
    duration:'約 60–70 分鐘',
    intensity:4,
    description:'力量、核心與爆發力均衡的無跑訓練。Bike 負責心肺，Medicine Ball Slam 增加全身爆發與核心穩定刺激。',
    equipment:'Bike／Sled／藥球／啞鈴／Sandbag／Cable',
    total:'跑步：0 km｜Bike：約 28 分鐘｜Medicine Ball Slam：45 reps',
    build(){
      const seq=[
        ['Bike','6 min'],
        ['Kettlebell Goblet Squat','20 reps'],
        ['Medicine Ball Slam','15 reps'],
        ['Hanging Knee Raise','15 reps'],
        ['Bike','6 min'],
        ['Sled Push','40 m · RPE 7'],
        ['Romanian Deadlift','20 reps'],
        ['Pallof Press','15 reps / side'],
        ['Bike','6 min'],
        ['Medicine Ball Slam','15 reps'],
        ['Farmers Carry','100 m · RPE 6–7'],
        ['Reverse Crunch','20 reps'],
        ['Bike','6 min'],
        ['Sandbag Lunges','30 reps'],
        ['Dumbbell Shoulder Press','15 reps'],
        ['Suitcase Carry','50 m / side'],
        ['Bike','4 min · hard'],
        ['Medicine Ball Slam','15 reps'],
        ['Cable Crunch','20 reps'],
        ['Side Plank','40 sec / side']
      ];
      return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
    }
  },

shoulderBackSculpt:{
  id:'shoulderBackSculpt',
  label:'肩背線條雕塑',
  duration:'約 55–70 分鐘',
  intensity:5,
  description:'肩背主導的 conditioning。以 TRX、啞鈴、壺鈴、藥球、carry 與自體重量維持連續工作，著重肩胛控制、肩背肌耐力、握力與核心穩定，和一般上肢重訓做出區隔。',
  equipment:'TRX／藥球／啞鈴／壺鈴／自體重量',
  total:'跑步：0 km｜無固定式機械／無槓鈴｜Upper-body conditioning',
  build(){
    const seq=[
      ['Medicine Ball Slam','15 reps'],
      ['TRX Row','15 reps'],
      ['Dumbbell Push Press','12 reps'],
      ['Farmers Carry','80 m · RPE 6–7'],
      ['Kettlebell Swing','20 reps'],
      ['TRX Y Raise','12 reps'],
      ['Bear Crawl','20 m'],
      ['Dumbbell Lateral Raise','15 reps'],
      ['Medicine Ball Slam','15 reps'],
      ['Renegade Row','10 reps / side'],
      ['Overhead Carry','30 m / side'],
      ['TRX Face Pull','15 reps'],
      ['Push-Up','15 reps'],
      ['Kettlebell Halo','10 reps / side'],
      ['TRX Reverse Fly','12 reps'],
      ['Plank Shoulder Tap','15 reps / side'],
      ['Farmers Carry','100 m · RPE 6–7'],
      ['Medicine Ball Slam','20 reps']
    ];
    return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
  }
},

slimWaist:{
  id:'slimWaist',
  label:'小蠻腰挑戰',
  duration:'約 55–70 分鐘',
  intensity:5,
  description:'以 Box 原地登階維持心肺，搭配 carry、TRX、藥球、瑜珈球與核心控制。重點是軀幹穩定、腰腹肌耐力與全身 conditioning，不依賴 cable、Sled 或固定式機台。',
  equipment:'Box／TRX／藥球／瑜珈球／啞鈴／壺鈴',
  total:'跑步：0 km｜Box Step-Up：約 9 分鐘｜Core + Carry + Medicine Ball conditioning',
  build(){
    const seq=[
      ['Box Step-Up','3 min · 穩定節奏'],
      ['Kettlebell Swing','20 reps'],
      ['Suitcase Carry','40 m / side'],
      ['TRX Knee Tuck','12–15 reps'],
      ['Medicine Ball Slam','15 reps'],
      ['Wall Sit','45 sec · 可抱藥球'],
      ['Box Step-Up','3 min · 穩定節奏'],
      ['Stability Ball Stir-the-Pot','10 circles / direction'],
      ['Dumbbell Walking Lunge','24 reps'],
      ['Medicine Ball Russian Twist','20 reps / side'],
      ['Front Rack Carry','60 m · RPE 6–7'],
      ['Wall Sit','45 sec · Medicine Ball Hold'],
      ['Box Step-Up','3 min · 稍快'],
      ['Stability Ball Rollout','12–15 reps'],
      ['Medicine Ball Slam','20 reps'],
      ['Renegade Row','10 reps / side'],
      ['TRX Body Saw','12 reps'],
      ['Side Plank Hip Lift','12 reps / side'],
      ['Hollow Body Hold','30–40 sec'],
      ['Plank','60 sec']
    ];
    return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
  }
},

zeroRunEndurance:{
  id:'zeroRunEndurance',
  label:'無跑步肌耐力訓練',
  duration:'約 75–90 分鐘',
  intensity:6,
  description:'高密度全身肌耐力，走路只作為短暫 transition，不是主體。Sled、Carry、Sandbag、Kettlebell、上肢推拉與核心交錯，和「今天不跑步」的長時間 walk endurance 做出區隔。',
  equipment:'跑步機或快走空間／Sled／壺鈴／啞鈴／Sandbag／Wall Ball',
  total:'跑步：0 km｜Brisk / Incline Walk：約 28 分鐘｜High-density muscular endurance',
  build(){
    const seq=[
      ['Incline Walk','6 min'],
      ['Sled Push','40 m · RPE 7'],
      ['Kettlebell Goblet Squat','25 reps'],
      ['Dumbbell Row','15 reps / side'],
      ['Brisk Walk','5 min'],
      ['Sled Pull','40 m · RPE 7'],
      ['Farmers Carry','150 m · RPE 6–7'],
      ['Sandbag Lunges','30 reps'],
      ['Incline Walk','6 min'],
      ['Dumbbell Bench Press','20 reps'],
      ['Kettlebell Swing','25 reps'],
      ['Box Step-Up','24 reps · weighted'],
      ['Brisk Walk','5 min'],
      ['Dumbbell Shoulder Press','20 reps'],
      ['Wall Balls','40 reps'],
      ['Suitcase Carry','50 m / side'],
      ['Incline Walk','6 min · hard'],
      ['Plank Dumbbell Drag','12 reps / side'],
      ['Reverse Crunch','20 reps'],
      ['Plank','60 sec']
    ];
    return seq.map(x=>({name:x[0],detail:x[1],distance_m:x[2]||null}));
  }
},

  tyrunTest:{
    id:'tyrunTest',
    label:'Tyrun 測試',
    duration:'約 55–70 分鐘',
    intensity:6,
    description:'TYRUN Scaled 專項測試。4 個 Block，跑步穿插拉力、核心、Erg 與 Sandbag。',
    equipment:'Sled／Cable／Kettlebell／Box／Medicine Ball／TRX／Row／SkiErg／Sandbag',
    total:'總 Run：1.6 km｜Row：1000 m｜SkiErg：1000 m｜Sandbag Bear Hug Carry：100 m',
    build(){
      const item=(block,name,detail,distance_m=null)=>({
        name,detail,distance_m,
        block_index:block,
        block_rounds:1,
        block_rest:'—'
      });
      return [
        item(1,'Run','400 m',400),
        item(1,'Sled Pull','80 m · 70 kg',80),
        item(1,'Seated Cable Row','12–15 reps'),
        item(1,'KB Plank Drag','12 reps / side'),

        item(2,'Run','400 m',400),
        item(2,'Weighted Box Step-Up','40 reps · 5–10 kg'),
        item(2,'Medicine Ball Sit-Up','30 reps · 4–6 kg'),
        item(2,'TRX Row','12–15 reps'),

        item(3,'Run','400 m',400),
        item(3,'Row','1000 m',1000),
        item(3,'Devil Press','20 reps · 2×5 kg'),

        item(4,'Run','400 m',400),
        item(4,'SkiErg','1000 m',1000),
        item(4,'Sandbag Bear Hug Carry','100 m · 20 kg · Put down & Ground-to-Shoulder every 10 m',100)
      ];
    }
  },

  // Legacy aliases keep old saved results readable after the rename.
  heavyDay:null,
  dualEngine:null,
  noStop:null
};
RACE_TEMPLATES.heavyDay=RACE_TEMPLATES.moverDay;
RACE_TEMPLATES.dualEngine=RACE_TEMPLATES.aerobicMax;
RACE_TEMPLATES.noStop=RACE_TEMPLATES.fatBurn;

/*
  Keep the hidden native daily-template <select> generated from this file.

  Result:
  - adding/editing a BUILT-IN workout only requires workouts.js;
  - index.html no longer needs a new <option> every time;
  - cloud-managed Supabase templates are still merged later by app.js.
*/
function syncBuiltinDailyTemplateSelect(){
  const select=document.querySelector('#raceTemplate');
  if(!select)return;

  const previous=select.value;
  const escapeHtml=v=>String(v??'').replace(/[&<>"']/g,m=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));

  const ids=Object.entries(RACE_TEMPLATES)
    .filter(([id,t])=>t&&typeof t==='object'&&String(t.id)===String(id))
    .map(([id])=>id);

  select.innerHTML=ids.map(id=>{
    const t=RACE_TEMPLATES[id];
    const level=Math.max(1,Math.min(10,Math.round(Number(t.intensity)||1)));
    return `<option value="${escapeHtml(id)}" data-level="${level}">Level ${level} | ${escapeHtml(t.label||id)}</option>`;
  }).join('');

  if(ids.includes(previous))select.value=previous;
  else if(ids.length)select.value=ids[0];
}

syncBuiltinDailyTemplateSelect();
