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
      ['Farmers Carry','160 m · RPE 6–7'],
      ['Sandbag Lunges','30 reps'],
      ['Incline Walk','6 min'],
      ['Dumbbell Bench Press','20 reps'],
      ['Kettlebell Swing','25 reps'],
      ['Box Step-Up','24 reps · weighted'],
      ['Brisk Walk','5 min'],
      ['Dumbbell Shoulder Press','20 reps'],
      ['Wall Balls','40 reps'],
      ['Suitcase Carry','120 m total'],
      ['Incline Walk','6 min · hard'],
      ['Plank Reach','24 total'],
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

  limitedGymL4:{
    id:'limitedGymL4',
    label:'壺鈴基礎耐力',
    duration:'約 30–40 分鐘',
    intensity:4,
    description:'場地限制版基礎 hybrid conditioning。使用橢圓機、壺鈴、大木箱與核心動作；第一輪從一般 swing 開始，後續加入變化。控制腿部總量，適合每週 2–3 次 HYROX 配合兩次全身重訓。',
    equipment:'橢圓機／壺鈴／大木箱／自體重量',
    total:'Elliptical：9 min｜3 rounds｜全身肌耐力＋核心',
    build(){
      const item=(round,name,detail,distance_m=null)=>({
        name,detail,distance_m,
        block_index:round,
        block_rounds:1,
        block_rest:'—'
      });
      return [
        item(1,'Elliptical','3 min'),
        item(1,'Kettlebell Swing','20 reps · 8–12 kg'),
        item(1,'Weighted Box Step-Up','8 reps / side · bodyweight–6 kg'),
        item(1,'Single-Arm Kettlebell Row','10 reps / side · 8–12 kg'),
        item(1,'Leg Raise','12 reps'),
        item(1,'Plank Drag','10 reps / side'),

        item(2,'Elliptical','3 min'),
        item(2,'Alternating-Hand Kettlebell Swing','20 reps · 8–12 kg'),
        item(2,'Weighted Box Step-Up','8 reps / side · bodyweight–6 kg'),
        item(2,'Single-Arm Kettlebell Row','10 reps / side · 8–12 kg'),
        item(2,'Leg Raise','12 reps'),
        item(2,'Plank Drag','10 reps / side'),

        item(3,'Elliptical','3 min'),
        item(3,'Side-to-Side Kettlebell Swing','20 reps · 8–12 kg'),
        item(3,'Weighted Box Step-Up','8 reps / side · bodyweight–6 kg'),
        item(3,'Single-Arm Kettlebell Row','10 reps / side · 8–12 kg'),
        item(3,'Leg Raise','12 reps'),
        item(3,'Plank Drag','10 reps / side')
      ];
    }
  },

  limitedGymL5:{
    id:'limitedGymL5',
    label:'心肺肌耐力',
    duration:'約 35–45 分鐘',
    intensity:5,
    description:'跑步與壺鈴全身肌耐力交錯。保留 squat、push、pull 與核心，但避免同一堂加入過多 lunge／step-up，降低與重訓及其他 HYROX 日的腿部量重疊。',
    equipment:'跑步機／壺鈴／自體重量',
    total:'Treadmill：1.5 km｜3 rounds｜Cardio + muscular endurance',
    build(){
      const item=(round,name,detail,distance_m=null)=>({
        name,detail,distance_m,
        block_index:round,
        block_rounds:1,
        block_rest:'—'
      });
      return [
        item(1,'Treadmill','500 m',500),
        item(1,'Kettlebell Swing','20 reps · 10–14 kg'),
        item(1,'Kettlebell Goblet Squat','12 reps'),
        item(1,'Kettlebell Push Press','12 reps · 6–10 kg'),
        item(1,'Single-Arm Kettlebell Row','10 reps / side · 8–12 kg'),
        item(1,'Leg Raise','15 reps'),

        item(2,'Treadmill','500 m',500),
        item(2,'Alternating-Hand Kettlebell Swing','20 reps · 10–14 kg'),
        item(2,'Kettlebell Goblet Squat','12 reps'),
        item(2,'Kettlebell Push Press','12 reps · 6–10 kg'),
        item(2,'Single-Arm Kettlebell Row','10 reps / side · 8–12 kg'),
        item(2,'Plank Drag','10 reps / side'),

        item(3,'Treadmill','500 m',500),
        item(3,'Side-to-Side Kettlebell Swing','20 reps · 10–14 kg'),
        item(3,'Kettlebell Goblet Squat','12 reps'),
        item(3,'Kettlebell Push Press','12 reps · 6–10 kg'),
        item(3,'Single-Arm Kettlebell Row','10 reps / side · 8–12 kg'),
        item(3,'Leg Raise','15 reps')
      ];
    }
  },

  limitedGymL6:{
    id:'limitedGymL6',
    label:'HYROX Conditioning',
    duration:'約 45–55 分鐘',
    intensity:6,
    description:'四輪場地限制版 HYROX conditioning。用橢圓機維持持續心肺，swing 變化、push press、核心與少量 reverse lunge 建立疲勞下全身輸出；不使用 Sled、Sandbag、Wall Ball 或 Farmers Carry。',
    equipment:'橢圓機／壺鈴／瑜珈球／自體重量',
    total:'Elliptical：16 min｜4 rounds｜全身 conditioning',
    build(){
      const item=(round,name,detail,distance_m=null)=>({
        name,detail,distance_m,
        block_index:round,
        block_rounds:1,
        block_rest:'—'
      });
      return [
        item(1,'Elliptical','4 min'),
        item(1,'Kettlebell Swing','20 reps · 10–14 kg'),
        item(1,'Kettlebell Push Press','12 reps · 6–10 kg'),
        item(1,'Plank Drag','10 reps / side'),
        item(1,'Stability Ball Knee Tuck','12 reps'),

        item(2,'Elliptical','4 min'),
        item(2,'Alternating-Hand Kettlebell Swing','20 reps · 10–14 kg'),
        item(2,'Kettlebell Swing + Reverse Lunge','8 reps / side'),
        item(2,'Kettlebell Push Press','12 reps · 6–10 kg'),
        item(2,'Stability Ball Knee Tuck','12 reps'),

        item(3,'Elliptical','4 min'),
        item(3,'Double Kettlebell Skier Swing','20 reps'),
        item(3,'Kettlebell Push Press','12 reps · 6–10 kg'),
        item(3,'Plank Drag','10 reps / side'),
        item(3,'Stability Ball Knee Tuck','12 reps'),

        item(4,'Elliptical','4 min'),
        item(4,'Side-to-Side Kettlebell Swing','20 reps · 10–14 kg'),
        item(4,'Kettlebell Swing + Reverse Lunge','8 reps / side'),
        item(4,'Kettlebell Push Press','12 reps · 6–10 kg'),
        item(4,'Plank Drag','10 reps / side'),
        item(4,'Stability Ball Knee Tuck','12 reps')
      ];
    }
  },

  limitedMetabolicNoRun:{
    id:'limitedMetabolicNoRun',
    label:'有限器材 × 促進代謝 × 無跑',
    duration:'約 40–50 分鐘',
    intensity:6,
    description:'有限器材下的無跑全身代謝訓練。以 Bike 穿插輕重量、高次數與自體重量動作，維持心率並訓練全身肌耐力與核心耐力；重點是持續輸出與整體活動量，而不是追求大重量。',
    equipment:'腳踏車機／壺鈴／TRX／瑜珈球／自體重量',
    total:'Bike：16 min｜4 rounds｜全身代謝耐力＋核心',
    build(){
      const item=(round,name,detail,distance_m=null)=>({
        name,detail,distance_m,
        block_index:round,
        block_rounds:1,
        block_rest:'—'
      });
      return [
        item(1,'Bike','4 min'),
        item(1,'Goblet Squat','30 reps'),
        item(1,'Assisted Pull-Up','30 reps'),
        item(1,'Wall Sit','1 min'),
        item(1,'Plank Reach','40 reps'),

        item(2,'Bike','4 min'),
        item(2,'Kettlebell Swing','30 reps'),
        item(2,'Kettlebell Row','30 reps'),
        item(2,'Plank','1 min'),
        item(2,'Russian Twist','40 reps'),

        item(3,'Bike','4 min'),
        item(3,'Kettlebell Thruster','30 reps'),
        item(3,'Push-Up','30 reps'),
        item(3,'Superman Hold','1 min'),
        item(3,'V-Up','30 reps'),

        item(4,'Bike','4 min'),
        item(4,'Devil Press','30 reps'),
        item(4,'TRX Row','30 reps'),
        item(4,'Swiss Ball Glute Bridge','2 min'),
        item(4,'Side-to-Side Leg Raise','40 reps')
      ];
    }
  },

  limitedStrengthConditioning:{
    id:'limitedStrengthConditioning',
    label:'器材有限 × Strength × Conditioning',
    duration:'約 45–55 分鐘',
    intensity:7,
    description:'4 個 AMRAP Blocks。Block 1 為 15 分鐘，其餘各 10 分鐘；每完成一輪會保留該輪紀錄並新增下一輪，不會清空已完成資料。成績以四個 Block 累計完成的 exercise 項目次數為主，完整輪數另行保留。',
    equipment:'壺鈴／輔助引體設備／箱子／自體重量',
    total:'AMRAP：45 min｜Score：完成 exercise 項目總次數｜完整輪數保留',
    build(){
      const item=(block,duration,name,detail)=>({
        name,detail,
        block_index:block,
        block_rounds:1,
        block_rest:'—',
        block_duration_seconds:duration,
        block_amrap:true
      });
      return [
        item(1,900,'Goblet Squat','20 reps'),
        item(1,900,'Heavy KB Swing','20 reps'),
        item(1,900,'Push-Up','20 reps'),
        item(1,900,'Leg Raise','20 reps'),

        item(2,600,'Assisted Pull-Up','10 reps'),
        item(2,600,'Reverse Lunge','20 reps total'),
        item(2,600,'Plank Reach','30 reps total'),

        item(3,600,'KB Row','20 reps total'),
        item(3,600,'Forward / Walking Lunge','20 reps total'),
        item(3,600,'Mountain Climber','30 reps total'),

        item(4,600,'Weighted Step-Up','10 reps / side'),
        item(4,600,'Devil Press','12 reps'),
        item(4,600,'Superman Hold','40-sec hold')
      ];
    }
  },

  limitedGymL7:{
    id:'limitedGymL7',
    label:'Hybrid Endurance',
    duration:'約 45–60 分鐘',
    intensity:7,
    description:'四輪較高強度 hybrid endurance，每輪動作不同。用 Bike／Elliptical 建立持續心肺壓力，再穿插 swing 變化、step-up、goblet squat、reverse lunge、上肢推拉與核心；難度提高但避免每輪都堆疊多個腿部動作。',
    equipment:'腳踏車機／橢圓機／壺鈴／啞鈴／大木箱／自體重量',
    total:'Cardio：16 min｜4 rounds｜高強度 Hybrid endurance',
    build(){
      const item=(round,name,detail,distance_m=null)=>({
        name,detail,distance_m,
        block_index:round,
        block_rounds:1,
        block_rest:'—'
      });
      return [
        item(1,'Bike','4 min · hard but sustainable'),
        item(1,'Kettlebell Swing','24 reps'),
        item(1,'Kettlebell Goblet Squat','12 reps'),
        item(1,'Single-Arm Kettlebell Row','12 reps / side'),
        item(1,'Plank Drag','12 reps / side'),

        item(2,'Bike','4 min · hard but sustainable'),
        item(2,'Alternating-Hand Kettlebell Swing','24 reps'),
        item(2,'Weighted Box Step-Up','8 reps / side · bodyweight–8 kg'),
        item(2,'Kettlebell Push Press','12 reps · 6–10 kg'),
        item(2,'Leg Raise','15 reps'),

        item(3,'Elliptical','4 min · hard but sustainable'),
        item(3,'Double Kettlebell Skier Swing','20 reps'),
        item(3,'Kettlebell Swing + Reverse Lunge','8 reps / side'),
        item(3,'Single-Arm Kettlebell Row','12 reps / side'),
        item(3,'Plank Drag','12 reps / side'),

        item(4,'Elliptical','4 min · hard but sustainable'),
        item(4,'Side-to-Side Kettlebell Swing','24 reps'),
        item(4,'Kettlebell Goblet Squat','12 reps'),
        item(4,'Dumbbell Thruster','10 reps'),
        item(4,'Leg Raise','15 reps')
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

/* ===== AMRAP PERSISTENT ROUND CARDS v5 · click-safe stable UI · limitedStrengthConditioning =====
   Purpose:
   - Keep completed AMRAP rounds visible instead of clearing checkmarks.
   - Append a fresh round card only after the current round is fully checked.
   - Do NOT call app.js's renderSession() on each AMRAP exercise check, which
     avoids the annoying full-list redraw / visual jump.
   - Primary score = total completed exercise items across all four blocks.
   - Full-round counts and partial final rounds are retained as secondary data.
   - Persist AMRAP score inside stations.amrap_score when the normal result is
     saved, without changing the database schema.
*/
(function(){
  const TEMPLATE_ID='limitedStrengthConditioning';
  const ACTIVE_KEY='hybridActiveSession_v1';
  const STATE_PREFIX='hybridAmrapRoundCards_v3:';
  const LAST_SCORE_KEY='hybridAmrapLastScore_v3';
  const SCORE_CACHE=new Map();
  let lastSessionId=null;
  let lastDetailResultId=null;
  let finalizing=false;
  let bypassFinish=false;
  let wallDecorating=false;
  let installed=false;

  function readJson(key,fallback=null){
    try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch(e){return fallback}
  }
  function writeJson(key,value){
    try{localStorage.setItem(key,JSON.stringify(value))}catch(e){}
  }
  function readSession(){return readJson(ACTIVE_KEY,null)}
  function isTargetSession(s){
    return !!(s&&s.templateId===TEMPLATE_ID&&Array.isArray(s.items)&&s.items.length);
  }
  function stateKey(s){return `${STATE_PREFIX}${s?.id||'unknown'}`}
  function esc(v){
    return String(v??'').replace(/[&<>"']/g,m=>({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[m]));
  }
  function fmt(sec){
    const s=Math.max(0,Math.ceil(Number(sec)||0));
    return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  }
  function fmtLong(sec){
    const s=Math.max(0,Math.round(Number(sec)||0));
    const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),r=s%60;
    return h?`${h}:${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`:`${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
  }
  function minutesLabel(sec){return `${Math.round(Number(sec)/60)} min`}
  function blockStyle(index){
    const palette=['#64d8d0','#ff9b78','#b894ff','#7ed9a9','#efc96f','#7bb7ff','#f08fc2','#9fd073'];
    return palette[(Math.max(1,Number(index)||1)-1)%palette.length];
  }
  function blockDefs(s){
    const map=new Map();
    (s?.items||[]).forEach((it,itemIndex)=>{
      const index=Math.max(0,Number(it?.block_index)||0);
      const duration=Math.max(0,Number(it?.block_duration_seconds)||0);
      if(!index||!duration)return;
      if(!map.has(index))map.set(index,{index,duration,itemIndexes:[]});
      map.get(index).itemIndexes.push(itemIndex);
    });
    return [...map.values()].sort((a,b)=>a.index-b.index);
  }
  function emptyRound(def){
    return {checks:Array(def.itemIndexes.length).fill(false),createdAt:Date.now()};
  }
  function normalizeRound(round,def){
    const checks=Array.isArray(round?.checks)?round.checks.slice(0,def.itemIndexes.length):[];
    while(checks.length<def.itemIndexes.length)checks.push(false);
    return {checks:checks.map(Boolean),createdAt:Number(round?.createdAt)||Date.now()};
  }
  function loadState(s,defs){
    let state=readJson(stateKey(s),null);
    if(!state||state.version!==3||state.sessionId!==s.id||typeof state.blocks!=='object'){
      state={version:3,sessionId:s.id,blocks:{},nativeSynced:false};
    }
    defs.forEach(def=>{
      const key=String(def.index);
      let bs=state.blocks[key];
      if(!bs){
        bs=state.blocks[key]={
          remaining:def.duration,running:false,endAt:null,expired:false,
          pausedBySession:false,started:false,manualFinished:false,
          rounds:[emptyRound(def)]
        };
      }
      if(!Number.isFinite(Number(bs.remaining)))bs.remaining=def.duration;
      bs.running=!!bs.running;
      bs.expired=!!bs.expired;
      bs.pausedBySession=!!bs.pausedBySession;
      bs.started=!!bs.started;
      bs.manualFinished=!!bs.manualFinished;
      if(!Array.isArray(bs.rounds)||!bs.rounds.length)bs.rounds=[emptyRound(def)];
      bs.rounds=bs.rounds.map(r=>normalizeRound(r,def));
    });
    return state;
  }
  function saveState(s,state){writeJson(stateKey(s),state)}
  function remainingNow(bs){
    if(bs?.running&&bs?.endAt){
      return Math.max(0,Math.ceil((Number(bs.endAt)-Date.now())/1000));
    }
    return Math.max(0,Math.ceil(Number(bs?.remaining)||0));
  }
  function ended(bs){return !!(bs?.expired||bs?.manualFinished)}
  function roundComplete(round){
    return !!(round&&Array.isArray(round.checks)&&round.checks.length&&round.checks.every(Boolean));
  }
  function roundCompletedItems(round){
    return Array.isArray(round?.checks)?round.checks.filter(Boolean).length:0;
  }
  function blockCompletedItems(bs){
    return Array.isArray(bs?.rounds)?bs.rounds.reduce((n,r)=>n+roundCompletedItems(r),0):0;
  }
  function blockFullRounds(bs){
    return Array.isArray(bs?.rounds)?bs.rounds.filter(roundComplete).length:0;
  }
  function totalCompletedItems(state,defs){
    return defs.reduce((sum,def)=>sum+blockCompletedItems(state.blocks[String(def.index)]),0);
  }
  function totalFullRounds(state,defs){
    return defs.reduce((sum,def)=>sum+blockFullRounds(state.blocks[String(def.index)]),0);
  }
  function sessionElapsedSeconds(s){
    if(!s?.startedAt)return 0;
    const now=s.running?Date.now():(Number(s.pausedAt)||Date.now());
    return Math.max(0,Math.round((now-Number(s.startedAt)-(Number(s.pausedTotal)||0))/1000));
  }
  function scoreSnapshot(s,defs,state){
    return {
      version:3,
      score_type:'completed_items',
      template_id:TEMPLATE_ID,
      session_id:s.id,
      total_completed_items:totalCompletedItems(state,defs),
      total_full_rounds:totalFullRounds(state,defs),
      total_session_seconds:sessionElapsedSeconds(s),
      blocks:defs.map(def=>{
        const bs=state.blocks[String(def.index)];
        const full=blockFullRounds(bs);
        const items=blockCompletedItems(bs);
        const last=bs.rounds[bs.rounds.length-1];
        return {
          block:def.index,
          duration_seconds:def.duration,
          exercises_per_round:def.itemIndexes.length,
          completed_items:items,
          full_rounds:full,
          partial_items:roundComplete(last)?0:roundCompletedItems(last),
          rounds_started:bs.rounds.length
        };
      }),
      finished_at:new Date().toISOString()
    };
  }
  function readLastScore(){
    const x=readJson(LAST_SCORE_KEY,null);
    if(!x||x.template_id!==TEMPLATE_ID)return null;
    return x;
  }
  function writeScoreSnapshot(s,defs,state){
    const snap=scoreSnapshot(s,defs,state);
    writeJson(LAST_SCORE_KEY,snap);
    return snap;
  }
  function blockBreakdown(score){
    return (score?.blocks||[]).map(b=>{
      const partial=Number(b.partial_items)||0;
      return `B${b.block} ${Number(b.full_rounds)||0}輪${partial?`+${partial}項`:''}`;
    }).join(' · ');
  }

  function installStyles(){
    if(document.getElementById('amrapRoundCardsV5Styles'))return;
    const style=document.createElement('style');
    style.id='amrapRoundCardsV5Styles';
    style.textContent=`
      #trainingModal.amrap-v3-session .session-item.amrap-source-exercise{display:none!important}
      #trainingModal.amrap-v3-session #sessionList,.amrap-block-shell,.amrap-round-stack,.amrap-round-card,.amrap-round-check{overflow-anchor:none!important}
      .amrap-round-check{touch-action:manipulation;-webkit-tap-highlight-color:transparent;outline-offset:-2px}
      .amrap-round-check:active{transform:none!important}
      .amrap-round-check-status{min-width:3.2em;text-align:right}
      .amrap-v3-scorebar{grid-column:1/-1;display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07)}
      .amrap-v3-scorebar b{font-size:15px;color:#f4f7f9}.amrap-v3-scorebar span{font-size:9px;color:#8492a5}
      .amrap-v3-score-pill{display:flex;align-items:baseline;gap:5px;padding:5px 8px;border:1px solid #334255;border-radius:8px;background:#0e151e}
      .amrap-block-shell{margin:14px 0 16px;border:1px solid #314054;border-left:4px solid var(--amrap-accent,#70ded8);border-radius:13px;background:#0d141d;overflow:hidden}
      .amrap-block-header{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px 11px;border-bottom:1px solid rgba(255,255,255,.07);background:linear-gradient(90deg,color-mix(in srgb,var(--amrap-accent) 10%,transparent),transparent 48%),#111923}
      .amrap-block-copy{min-width:0}.amrap-block-copy strong{display:block;font-size:12px}.amrap-block-copy span{display:block;margin-top:3px;color:#8796aa;font-size:9px}
      .amrap-block-actions{display:flex;gap:5px;align-items:center;flex-wrap:wrap;justify-content:flex-end}
      .amrap-block-timer,.amrap-block-reset,.amrap-block-complete{min-height:31px;border:1px solid #3a4a5f;border-radius:8px;background:#0d151f;color:#dbe4ee;padding:5px 9px;font-size:10px;font-weight:900}
      .amrap-block-timer.running{border-color:#70ded8;color:#9df3ee}.amrap-block-timer.expired{border-color:#efc96f;color:#ffe4a1}
      .amrap-block-complete{border-color:#456653;color:#a9edc6}.amrap-block-reset{padding-inline:8px}
      .amrap-round-stack{display:grid;gap:8px;padding:9px 10px 11px}
      .amrap-round-card{border:1px solid #293648;border-radius:10px;background:#0a1017;overflow:hidden}
      .amrap-round-card.complete{border-color:#3f6b55;background:#0b1512}.amrap-round-card.locked{opacity:.8}
      .amrap-round-head{display:flex;justify-content:space-between;gap:8px;align-items:center;padding:7px 9px;border-bottom:1px solid rgba(255,255,255,.055);background:#101823}
      .amrap-round-head strong{font-size:10px;color:var(--amrap-accent,#70ded8)}.amrap-round-head span{font-size:8.5px;color:#7f8d9f}
      .amrap-round-items{display:grid;gap:1px}
      .amrap-round-check{display:grid;grid-template-columns:26px minmax(0,1fr) auto;gap:8px;align-items:center;width:100%;min-height:42px;padding:7px 9px;border:0;border-top:1px solid rgba(255,255,255,.035);background:transparent;color:#dce4ed;text-align:left}
      .amrap-round-check:first-child{border-top:0}.amrap-round-check:hover:not(:disabled){background:#121d28}.amrap-round-check.checked{background:rgba(107,214,163,.06)}
      .amrap-round-check:disabled{cursor:default}.amrap-check-icon{width:24px;height:24px;display:grid;place-items:center;border:1px solid #45556b;border-radius:50%;font-size:11px;font-weight:950;color:#718095}
      .amrap-round-check.checked .amrap-check-icon{border-color:#6bd6a3;background:#143326;color:#9ff0c3}
      .amrap-round-exercise b{display:block;font-size:10.5px}.amrap-round-exercise span{display:block;margin-top:2px;font-size:8.5px;color:#7e8b9d}
      .amrap-round-check-status{font-size:8px;color:#667487;white-space:nowrap}.amrap-round-check.checked .amrap-round-check-status{color:#79cfa2}
      .amrap-new-round-note{padding:4px 9px 1px;color:#738196;font-size:8px}
      .amrap-v3-finalize-overlay{position:absolute;inset:0;z-index:50;display:grid;place-items:center;background:rgba(7,10,15,.84);backdrop-filter:blur(4px);border-radius:inherit}
      .amrap-v3-finalize-overlay div{padding:13px 16px;border:1px solid #334255;border-radius:11px;background:#111923;color:#dce6ef;font-size:11px;font-weight:900}
      .amrap-wall-breakdown{margin-top:4px;font-size:8px;color:#7f8d9f}
      .daily-preview-block.amrap-preview .daily-preview-block-head span,.daily-modal-block.amrap-preview .daily-modal-block-head span{color:#efc96f;font-weight:900}
      #amrapFinishBreakdown{margin-top:9px;padding:8px 10px;border:1px solid #334255;border-radius:9px;background:#0d141d;color:#96a3b4;font-size:10px;text-align:center}
      @media(max-width:640px){
        .amrap-block-header{grid-template-columns:1fr}.amrap-block-actions{justify-content:flex-start}.amrap-block-timer{min-width:92px}
        .amrap-round-check{grid-template-columns:24px minmax(0,1fr);gap:7px}.amrap-round-check-status{grid-column:2}
      }
    `;
    document.head.appendChild(style);
  }

  function roundCardHtml(s,def,bs,roundIndex){
    const round=bs.rounds[roundIndex];
    const done=roundCompletedItems(round);
    const full=roundComplete(round);
    const lock=ended(bs);
    return `<div class="amrap-round-card ${full?'complete':''} ${ended(bs)?'locked':''}" data-amrap-round-card="${def.index}:${roundIndex}">
      <div class="amrap-round-head">
        <strong>ROUND ${roundIndex+1}</strong>
        <span data-amrap-round-count="${def.index}:${roundIndex}">${done} / ${def.itemIndexes.length} 項</span>
      </div>
      <div class="amrap-round-items">
        ${def.itemIndexes.map((sessionIndex,itemPos)=>{
          const item=s.items[sessionIndex]||{};
          const checked=!!round.checks[itemPos];
          return `<button type="button" class="amrap-round-check ${checked?'checked':''}"
            data-amrap-check="${def.index}:${roundIndex}:${itemPos}" ${lock?'disabled':''}>
            <span class="amrap-check-icon" aria-hidden="true">${checked?'✓':'○'}</span>
            <span class="amrap-round-exercise"><b>${esc(item.name)}</b><span>${esc(item.detail||'')}</span></span>
            <span class="amrap-round-check-status">${checked?'完成':'待完成'}</span>
          </button>`;
        }).join('')}
      </div>
    </div>`;
  }
  function blockShellHtml(s,def,bs){
    const rounds=blockFullRounds(bs),items=blockCompletedItems(bs);
    return `<section class="amrap-block-shell" data-amrap-block-shell="${def.index}" style="--amrap-accent:${blockStyle(def.index)}">
      <div class="amrap-block-header">
        <div class="amrap-block-copy">
          <strong>BLOCK ${def.index} · AMRAP ${minutesLabel(def.duration)}</strong>
          <span data-amrap-meta="${def.index}">完成 ${items} 項 · ${rounds} 完整輪</span>
        </div>
        <div class="amrap-block-actions">
          <button type="button" class="amrap-block-timer ${bs.running?'running':''} ${bs.expired?'expired':''}" data-amrap-toggle="${def.index}" ${ended(bs)?'disabled':''}>${bs.expired?'時間到':`${bs.running?'Ⅱ':'▶'} ${fmt(remainingNow(bs))}`}</button>
          <button type="button" class="amrap-block-reset" data-amrap-reset="${def.index}" aria-label="重設 Block ${def.index}">↺</button>
          <button type="button" class="amrap-block-complete" data-amrap-complete="${def.index}" ${ended(bs)?'disabled':''}>${ended(bs)?'✓ Block 結束':'結束 Block'}</button>
        </div>
      </div>
      <div class="amrap-round-stack" data-amrap-round-stack="${def.index}">
        ${bs.rounds.map((_,ri)=>roundCardHtml(s,def,bs,ri)).join('')}
      </div>
    </section>`;
  }
  function setTextStable(el,value){
    if(!el)return;
    const next=String(value);
    if(el.textContent!==next)el.textContent=next;
  }
  function ensureScoreBar(state,defs){
    const box=document.querySelector('#trainingModal .timer-box');
    if(!box)return;
    let bar=document.getElementById('amrapV3ScoreBar');
    if(!bar){
      bar=document.createElement('div');
      bar.id='amrapV3ScoreBar';bar.className='amrap-v3-scorebar';
      bar.innerHTML=`
        <div class="amrap-v3-score-pill"><span>目前成績</span><b data-amrap-score-items>0</b><span>項</span></div>
        <div class="amrap-v3-score-pill"><span>完整輪次</span><b data-amrap-score-rounds>0</b></div>
        <div class="amrap-v3-score-pill"><span>Blocks</span><b data-amrap-score-blocks>0/${defs.length}</b></div>`;
      box.appendChild(bar);
    }
    const completed=totalCompletedItems(state,defs);
    const rounds=totalFullRounds(state,defs);
    const endedBlocks=defs.filter(d=>ended(state.blocks[String(d.index)])).length;
    setTextStable(bar.querySelector('[data-amrap-score-items]'),completed);
    setTextStable(bar.querySelector('[data-amrap-score-rounds]'),rounds);
    setTextStable(bar.querySelector('[data-amrap-score-blocks]'),`${endedBlocks}/${defs.length}`);
  }
  function updateProgress(state,defs){
    ensureScoreBar(state,defs);
    const completed=totalCompletedItems(state,defs);
    const endedBlocks=defs.filter(d=>ended(state.blocks[String(d.index)])).length;
    const progress=document.getElementById('sessionProgress');
    if(progress)setTextStable(progress,`${completed} 項 · ${endedBlocks}/${defs.length} Blocks`);
    const finish=document.getElementById('finishChallengeBtn');
    if(finish)finish.disabled=finalizing||endedBlocks!==defs.length;
  }
  function syncRoundCard(shell,def,bs,roundIndex){
    const round=bs.rounds[roundIndex];
    const card=shell.querySelector(`[data-amrap-round-card="${def.index}:${roundIndex}"]`);
    if(!card)return;
    const full=roundComplete(round);
    card.classList.toggle('complete',full);
    card.classList.toggle('locked',ended(bs));
    const count=card.querySelector(`[data-amrap-round-count="${def.index}:${roundIndex}"]`);
    if(count)setTextStable(count,`${roundCompletedItems(round)} / ${def.itemIndexes.length} 項`);
    round.checks.forEach((checked,itemPos)=>{
      const btn=card.querySelector(`[data-amrap-check="${def.index}:${roundIndex}:${itemPos}"]`);
      if(!btn)return;
      btn.classList.toggle('checked',!!checked);
      btn.disabled=ended(bs);
      const icon=btn.querySelector('.amrap-check-icon');if(icon)setTextStable(icon,checked?'✓':'○');
      const status=btn.querySelector('.amrap-round-check-status');if(status)setTextStable(status,checked?'完成':'待完成');
    });
  }
  function appendRoundCard(s,def,bs,roundIndex){
    const shell=document.querySelector(`[data-amrap-block-shell="${def.index}"]`);
    const stack=shell?.querySelector(`[data-amrap-round-stack="${def.index}"]`);
    if(!stack||stack.querySelector(`[data-amrap-round-card="${def.index}:${roundIndex}"]`))return;
    const wrap=document.createElement('div');
    wrap.innerHTML=roundCardHtml(s,def,bs,roundIndex);
    const card=wrap.firstElementChild;
    if(card)stack.appendChild(card);
  }
  function updateBlockUi(s,def,bs){
    const shell=document.querySelector(`[data-amrap-block-shell="${def.index}"]`);
    if(!shell)return;
    const btn=shell.querySelector(`[data-amrap-toggle="${def.index}"]`);
    if(btn){
      btn.textContent=bs.expired?'時間到':`${bs.running?'Ⅱ':'▶'} ${fmt(remainingNow(bs))}`;
      btn.classList.toggle('running',!!bs.running);
      btn.classList.toggle('expired',!!bs.expired);
      btn.disabled=ended(bs);
    }
    const complete=shell.querySelector(`[data-amrap-complete="${def.index}"]`);
    if(complete){complete.textContent=ended(bs)?'✓ Block 結束':'結束 Block';complete.disabled=ended(bs)}
    const meta=shell.querySelector(`[data-amrap-meta="${def.index}"]`);
    if(meta){
      const items=blockCompletedItems(bs),rounds=blockFullRounds(bs);
      meta.textContent=ended(bs)?`Block 結束 · 完成 ${items} 項 · ${rounds} 完整輪`:`完成 ${items} 項 · ${rounds} 完整輪 · ROUND ${bs.rounds.length}`;
    }
    bs.rounds.forEach((_,ri)=>syncRoundCard(shell,def,bs,ri));
  }
  function ensureTrainingDecoration(s,defs,state){
    const modal=document.getElementById('trainingModal');
    const list=document.getElementById('sessionList');
    if(!modal||!list||!modal.classList.contains('open'))return;
    modal.classList.add('amrap-v3-session');
    const rows=[...list.querySelectorAll(':scope > .session-item')];
    if(rows.length<s.items.length)return;

    defs.forEach(def=>{
      def.itemIndexes.forEach(i=>rows[i]?.classList.add('amrap-source-exercise'));
      let shell=list.querySelector(`[data-amrap-block-shell="${def.index}"]`);
      const first=rows[def.itemIndexes[0]];
      if(!first)return;
      if(!shell){
        const holder=document.createElement('div');
        holder.innerHTML=blockShellHtml(s,def,state.blocks[String(def.index)]);
        shell=holder.firstElementChild;
        if(shell)first.before(shell);
      }
      const bs=state.blocks[String(def.index)];
      bs.rounds.forEach((_,ri)=>appendRoundCard(s,def,bs,ri));
      updateBlockUi(s,def,bs);
    });
    updateProgress(state,defs);
  }

  function signal(){
    try{navigator.vibrate?.([180,90,180])}catch(e){}
    try{
      const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
      const ctx=new AC(),now=ctx.currentTime;
      [0,.18].forEach((offset,i)=>{
        const osc=ctx.createOscillator(),gain=ctx.createGain();
        osc.frequency.value=i?660:880;
        gain.gain.setValueAtTime(.0001,now+offset);
        gain.gain.exponentialRampToValueAtTime(.11,now+offset+.01);
        gain.gain.exponentialRampToValueAtTime(.0001,now+offset+.12);
        osc.connect(gain);gain.connect(ctx.destination);osc.start(now+offset);osc.stop(now+offset+.13);
      });
      setTimeout(()=>ctx.close?.(),800);
    }catch(e){}
  }
  function toggleBlock(blockIndex){
    const s=readSession();if(!isTargetSession(s)||!s.running)return;
    const defs=blockDefs(s),def=defs.find(x=>x.index===Number(blockIndex));if(!def)return;
    const state=loadState(s,defs),bs=state.blocks[String(def.index)];
    if(ended(bs))return;
    if(bs.running){
      bs.remaining=remainingNow(bs);bs.running=false;bs.endAt=null;bs.pausedBySession=false;
    }else{
      bs.started=true;bs.running=true;bs.endAt=Date.now()+Number(bs.remaining)*1000;bs.pausedBySession=false;
    }
    saveState(s,state);updateBlockUi(s,def,bs);updateProgress(state,defs);
  }
  function resetBlock(blockIndex){
    const s=readSession();if(!isTargetSession(s))return;
    const defs=blockDefs(s),def=defs.find(x=>x.index===Number(blockIndex));if(!def)return;
    const state=loadState(s,defs);
    state.blocks[String(def.index)]={remaining:def.duration,running:false,endAt:null,expired:false,pausedBySession:false,started:false,manualFinished:false,rounds:[emptyRound(def)]};
    state.nativeSynced=false;
    saveState(s,state);
    document.querySelector(`[data-amrap-block-shell="${def.index}"]`)?.remove();
    ensureTrainingDecoration(s,defs,state);
  }
  function completeBlock(blockIndex){
    const s=readSession();if(!isTargetSession(s))return;
    const defs=blockDefs(s),def=defs.find(x=>x.index===Number(blockIndex));if(!def)return;
    const state=loadState(s,defs),bs=state.blocks[String(def.index)];
    if(ended(bs))return;
    bs.remaining=remainingNow(bs);bs.running=false;bs.endAt=null;bs.pausedBySession=false;bs.started=true;bs.manualFinished=true;
    state.nativeSynced=false;
    saveState(s,state);updateBlockUi(s,def,bs);updateProgress(state,defs);
  }
  function scrollHostFor(el){
    let node=el?.parentElement||null;
    while(node&&node!==document.body&&node!==document.documentElement){
      const st=getComputedStyle(node);
      if(/auto|scroll|overlay/i.test(st.overflowY||'')&&node.scrollHeight>node.clientHeight+1)return node;
      node=node.parentElement;
    }
    return document.scrollingElement||document.documentElement;
  }
  // Legacy viewport helper kept for compatibility; V5 no longer calls it on checkbox clicks.
  function preserveViewportAround(el){
    if(!el)return ()=>{};
    const host=scrollHostFor(el);
    const docHost=host===document.scrollingElement||host===document.documentElement||host===document.body;
    const beforeTop=el.getBoundingClientRect().top;
    const beforeScroll=docHost?Number((document.scrollingElement||document.documentElement).scrollTop||window.scrollY||0):Number(host.scrollTop||0);
    let cancelled=false;
    const restore=()=>{
      if(cancelled||!document.contains(el))return;
      const afterTop=el.getBoundingClientRect().top;
      const delta=afterTop-beforeTop;
      if(Math.abs(delta)>.25){
        if(docHost)(document.scrollingElement||document.documentElement).scrollTop=Number((document.scrollingElement||document.documentElement).scrollTop||0)+delta;
        else host.scrollTop=Number(host.scrollTop||0)+delta;
      }else{
        const current=docHost?Number((document.scrollingElement||document.documentElement).scrollTop||0):Number(host.scrollTop||0);
        if(Math.abs(current-beforeScroll)>1){
          if(docHost)(document.scrollingElement||document.documentElement).scrollTop=beforeScroll;
          else host.scrollTop=beforeScroll;
        }
      }
    };
    restore();
    requestAnimationFrame(()=>{restore();requestAnimationFrame(restore)});
    setTimeout(restore,60);
    return ()=>{cancelled=true};
  }
  function updateBlockSummaryOnly(def,bs){
    const shell=document.querySelector(`[data-amrap-block-shell="${def.index}"]`);
    if(!shell)return;
    const meta=shell.querySelector(`[data-amrap-meta="${def.index}"]`);
    if(meta){
      const items=blockCompletedItems(bs),rounds=blockFullRounds(bs);
      setTextStable(meta,ended(bs)?`Block 結束 · 完成 ${items} 項 · ${rounds} 完整輪`:`完成 ${items} 項 · ${rounds} 完整輪 · ROUND ${bs.rounds.length}`);
    }
  }

  function toggleRoundCheck(token){
    const [blockNo,roundNo,itemNo]=String(token||'').split(':').map(Number);
    const s=readSession();if(!isTargetSession(s)||!s.running)return;
    const defs=blockDefs(s),def=defs.find(x=>x.index===blockNo);if(!def)return;
    const state=loadState(s,defs),bs=state.blocks[String(def.index)];
    if(ended(bs)||remainingNow(bs)<=0)return;
    // Clicking an exercise starts/resumes this AMRAP block automatically.
    // This avoids a dead UI where all exercise buttons are disabled before
    // the user manually presses the block timer.
    if(!bs.running){
      bs.started=true;
      bs.running=true;
      bs.endAt=Date.now()+Number(bs.remaining)*1000;
      bs.pausedBySession=false;
    }
    const round=bs.rounds[roundNo];if(!round||itemNo<0||itemNo>=round.checks.length)return;
    round.checks[itemNo]=!round.checks[itemNo];
    state.nativeSynced=false;

    const becameComplete=roundComplete(round);
    const wasLast=roundNo===bs.rounds.length-1;
    if(becameComplete&&wasLast&&remainingNow(bs)>0){
      bs.rounds.push(emptyRound(def));
    }
    saveState(s,state);

    const shell=document.querySelector(`[data-amrap-block-shell="${def.index}"]`);
    if(shell)syncRoundCard(shell,def,bs,roundNo);
    if(becameComplete&&wasLast)appendRoundCard(s,def,bs,bs.rounds.length-1);
    updateBlockSummaryOnly(def,bs);
    updateProgress(state,defs);
  }

  function allBlocksEnded(state,defs){return defs.length>0&&defs.every(d=>ended(state.blocks[String(d.index)]))}
  function showFinalizeOverlay(show){
    const card=document.querySelector('#trainingModal .modal-card');if(!card)return;
    let overlay=document.getElementById('amrapV4FinalizeOverlay');
    if(show&&!overlay){
      overlay=document.createElement('div');overlay.id='amrapV4FinalizeOverlay';overlay.className='amrap-v3-finalize-overlay';
      overlay.innerHTML='<div>正在整理 AMRAP 成績…</div>';
      const pos=getComputedStyle(card).position;if(pos==='static')card.style.position='relative';
      card.appendChild(overlay);
    }else if(!show&&overlay){overlay.remove()}
  }
  function finalizeAndRunNativeFinish(){
    if(finalizing)return;
    const s=readSession();if(!isTargetSession(s))return;
    const defs=blockDefs(s),state=loadState(s,defs);
    if(!allBlocksEnded(state,defs))return;
    writeScoreSnapshot(s,defs,state);
    finalizing=true;showFinalizeOverlay(true);

    function step(){
      const current=readSession();
      if(!isTargetSession(current)){finalizing=false;showFinalizeOverlay(false);return}
      const list=document.getElementById('sessionList');
      const rows=[...list?.querySelectorAll(':scope > .session-item')||[]];
      const next=current.items.findIndex(x=>!x.done);
      if(next>=0){
        const btn=rows[next]?.querySelector('.session-complete-toggle');
        if(btn){btn.click();setTimeout(step,22);return}
      }
      const currentDefs=blockDefs(current),currentState=loadState(current,currentDefs);
      currentState.nativeSynced=true;saveState(current,currentState);
      finalizing=false;showFinalizeOverlay(false);
      bypassFinish=true;
      const finish=document.getElementById('finishChallengeBtn');
      if(finish){finish.disabled=false;finish.click()}
      setTimeout(decorateFinishModal,30);
    }
    step();
  }

  function syncPreview(){
    const select=document.getElementById('raceTemplate');
    if(!select||select.value!==TEMPLATE_ID)return;
    const t=RACE_TEMPLATES[TEMPLATE_ID];if(!t||typeof t.build!=='function')return;
    const items=t.build()||[],durations=[];
    items.forEach(it=>{const b=Number(it.block_index)||0,d=Number(it.block_duration_seconds)||0;if(b>0&&d>0&&!durations[b-1])durations[b-1]=d});
    document.querySelectorAll('#dailyPreviewList .daily-preview-block').forEach((block,i)=>{
      if(!durations[i])return;block.classList.add('amrap-preview');
      const meta=block.querySelector('.daily-preview-block-head span');if(meta)meta.textContent=`AMRAP ${minutesLabel(durations[i])} · 輪次保留 · Score = 完成項目數`;
    });
    document.querySelectorAll('#dailyModalBlocks .daily-modal-block').forEach((block,i)=>{
      if(!durations[i])return;block.classList.add('amrap-preview');
      const meta=block.querySelector('.daily-modal-block-head span');if(meta)meta.textContent=`AMRAP ${minutesLabel(durations[i])} · 輪次保留 · Score = 完成項目數`;
    });
  }

  function tick(){
    const s=readSession();
    if(!isTargetSession(s)){
      document.getElementById('trainingModal')?.classList.remove('amrap-v3-session');
      document.getElementById('amrapV3ScoreBar')?.remove();
      syncPreview();
      return;
    }
    if(lastSessionId!==s.id){
      lastSessionId=s.id;
      const old=readLastScore();
      if(old&&old.session_id!==s.id){try{localStorage.removeItem(LAST_SCORE_KEY)}catch(e){}}
    }
    const defs=blockDefs(s),state=loadState(s,defs);
    let dirty=false,justEnded=false;
    defs.forEach(def=>{
      const bs=state.blocks[String(def.index)];
      if(!s.running&&bs.running){
        bs.remaining=remainingNow(bs);bs.running=false;bs.endAt=null;bs.pausedBySession=true;dirty=true;
      }else if(s.running&&bs.pausedBySession&&!ended(bs)&&Number(bs.remaining)>0){
        bs.pausedBySession=false;bs.running=true;bs.endAt=Date.now()+Number(bs.remaining)*1000;dirty=true;
      }
      if(bs.running){
        bs.remaining=remainingNow(bs);
        if(bs.remaining<=0){
          bs.remaining=0;bs.running=false;bs.endAt=null;bs.expired=true;bs.pausedBySession=false;dirty=true;justEnded=true;signal();
        }
      }
    });
    if(dirty)saveState(s,state);
    ensureTrainingDecoration(s,defs,state);
    if(justEnded)defs.forEach(d=>updateBlockUi(s,d,state.blocks[String(d.index)]));
    if(allBlocksEnded(state,defs))writeScoreSnapshot(s,defs,state);
    syncPreview();
  }

  /* Persist score inside the existing JSONB `stations` column. Because
     workouts.js loads before app.js, this fetch wrapper is installed in time
     to see both result POSTs and result-list GETs. */
  function installFetchScoreBridge(){
    if(typeof window.fetch!=='function'||window.fetch.__amrapV3Wrapped)return;
    const original=window.fetch.bind(window);
    const wrapped=async function(input,init={}){
      const url=typeof input==='string'?input:String(input?.url||'');
      const isResults=/\/rest\/v1\/training_results(?:\?|$)/.test(url);
      let nextInit=init;
      if(isResults&&String(init?.method||'GET').toUpperCase()==='POST'&&typeof init?.body==='string'){
        try{
          const row=JSON.parse(init.body);
          if(row?.stations?.challenge_template?.id===TEMPLATE_ID){
            const score=readLastScore();
            if(score&&Date.now()-Date.parse(score.finished_at||0)<12*60*60*1000){
              row.stations={...(row.stations||{}),amrap_score:score};
              nextInit={...init,body:JSON.stringify(row)};
            }
          }
        }catch(e){}
      }
      const response=await original(input,nextInit);
      if(isResults){
        try{
          response.clone().json().then(data=>{
            const rows=Array.isArray(data)?data:[data];
            rows.filter(Boolean).forEach(r=>{if(r?.id)SCORE_CACHE.set(String(r.id),r)});
            scheduleWallDecoration();
          }).catch(()=>{});
        }catch(e){}
      }
      return response;
    };
    wrapped.__amrapV3Wrapped=true;
    window.fetch=wrapped;
  }

  function scoreFromResult(r){
    const score=r?.stations?.amrap_score;
    return score&&score.score_type==='completed_items'?score:null;
  }
  function decorateOneWallRow(el,row){
    const score=scoreFromResult(row);if(!score)return;
    const result=el.querySelector('.wall-entry-result');
    if(result){
      const label=result.querySelector('span'),strong=result.querySelector('strong');
      if(label)label.textContent='完成項目';
      if(strong)strong.textContent=`${Number(score.total_completed_items)||0} 次`;
      result.title=`運動時間 ${fmtLong(row.total_seconds)}`;
    }
    const core=el.querySelector('.wall-entry-core');
    if(core){
      let sub=core.querySelector('.amrap-wall-breakdown');
      if(!sub){sub=document.createElement('div');sub.className='amrap-wall-breakdown';core.appendChild(sub)}
      sub.textContent=blockBreakdown(score);
    }
  }
  function decorateWall(){
    if(wallDecorating)return;
    const box=document.getElementById('dailyResults');if(!box)return;
    const els=[...box.querySelectorAll('.daily-limitedStrengthConditioning[data-result-id]')];
    if(!els.length)return;
    const data=els.map(el=>({el,row:SCORE_CACHE.get(String(el.dataset.resultId))})).filter(x=>scoreFromResult(x.row));
    if(!data.length)return;
    wallDecorating=true;
    data.forEach(x=>decorateOneWallRow(x.el,x.row));
    data.sort((a,b)=>{
      const sa=Number(scoreFromResult(a.row)?.total_completed_items)||0;
      const sb=Number(scoreFromResult(b.row)?.total_completed_items)||0;
      if(sa!==sb)return sb-sa;
      return (Number(a.row?.total_seconds)||0)-(Number(b.row?.total_seconds)||0);
    });
    let prevScore=null,rank=0;
    data.forEach((x,i)=>{
      const score=Number(scoreFromResult(x.row)?.total_completed_items)||0;
      if(prevScore===null||score!==prevScore)rank=i+1;
      prevScore=score;
      const label=x.el.querySelector('.wall-entry-rank span');
      const strong=x.el.querySelector('.wall-entry-rank strong');
      if(label)label.textContent='同項排名';
      if(strong)strong.textContent=`#${String(rank).padStart(2,'0')}`;
    });
    if(data.length>1){
      const first=data.map(x=>x.el).sort((a,b)=>[...box.children].indexOf(a)-[...box.children].indexOf(b))[0];
      if(first){
        const placeholder=document.createComment('amrap-score-order');first.before(placeholder);
        const frag=document.createDocumentFragment();data.forEach(x=>frag.appendChild(x.el));
        placeholder.after(frag);placeholder.remove();
      }
    }
    setTimeout(()=>{wallDecorating=false},0);
  }
  let wallTimer=null;
  function scheduleWallDecoration(){
    clearTimeout(wallTimer);wallTimer=setTimeout(decorateWall,40);
  }
  function installWallObserver(){
    const setup=()=>{
      const box=document.getElementById('dailyResults');
      if(!box){setTimeout(setup,100);return}
      new MutationObserver(()=>{if(!wallDecorating)scheduleWallDecoration()}).observe(box,{childList:true,subtree:false});
      scheduleWallDecoration();
    };
    setup();
  }

  function decorateDetailModal(){
    const row=SCORE_CACHE.get(String(lastDetailResultId||''));
    const score=scoreFromResult(row);if(!score)return;
    const modal=document.getElementById('workoutDetailModal');if(!modal?.classList.contains('open'))return;
    const meta=document.getElementById('workoutDetailMeta');
    if(meta)meta.textContent=[row.nickname||'未命名選手',row.session_date||'',`AMRAP 成績 ${score.total_completed_items} 項`,`運動時間 ${fmtLong(row.total_seconds)}`].filter(Boolean).join(' · ');
    const summary=document.getElementById('workoutDetailSummary');
    if(summary)summary.textContent=`完成項目 ${score.total_completed_items} 次｜完整輪次 ${score.total_full_rounds}｜${blockBreakdown(score)}`;
  }
  function decorateFinishModal(){
    const modal=document.getElementById('finishModal');if(!modal?.classList.contains('open'))return;
    const score=readLastScore();if(!score)return;
    const time=document.getElementById('finishTime');
    if(time){time.textContent=String(score.total_completed_items);const label=time.parentElement?.querySelector('span');if(label)label.textContent='完成項目（次）'}
    const items=document.getElementById('finishItems');
    if(items){items.textContent=String(score.total_full_rounds);const label=items.parentElement?.querySelector('span');if(label)label.textContent='完整輪次合計'}
    const summary=document.querySelector('#finishModal .finish-summary');
    if(summary){
      let extra=document.getElementById('amrapFinishBreakdown');
      if(!extra){extra=document.createElement('div');extra.id='amrapFinishBreakdown';summary.insertAdjacentElement('afterend',extra)}
      extra.textContent=`${blockBreakdown(score)}｜運動時間 ${fmtLong(score.total_session_seconds)}`;
    }
  }

  function bindActions(){
    // Bubble-phase delegation only. These are custom AMRAP controls, so there
    // is no need to capture the event or stop propagation before the button
    // itself receives the click. This keeps the controls genuinely clickable.
    document.addEventListener('click',e=>{
      const check=e.target.closest?.('[data-amrap-check]');
      if(check){toggleRoundCheck(check.dataset.amrapCheck);return}
      const toggle=e.target.closest?.('[data-amrap-toggle]');
      if(toggle){toggleBlock(toggle.dataset.amrapToggle);return}
      const reset=e.target.closest?.('[data-amrap-reset]');
      if(reset){resetBlock(reset.dataset.amrapReset);return}
      const complete=e.target.closest?.('[data-amrap-complete]');
      if(complete){completeBlock(complete.dataset.amrapComplete);return}
      const result=e.target.closest?.('.daily-limitedStrengthConditioning[data-result-id]');
      if(result){lastDetailResultId=result.dataset.resultId;setTimeout(decorateDetailModal,20)}
    });

    document.addEventListener('click',e=>{
      const finish=e.target.closest?.('#finishChallengeBtn');if(!finish)return;
      const s=readSession();if(!isTargetSession(s))return;
      if(bypassFinish){bypassFinish=false;return}
      const defs=blockDefs(s),state=loadState(s,defs);
      if(!allBlocksEnded(state,defs)){e.preventDefault();e.stopImmediatePropagation();return}
      e.preventDefault();e.stopImmediatePropagation();finalizeAndRunNativeFinish();
    },true);

    const finishModal=document.getElementById('finishModal');
    if(finishModal)new MutationObserver(()=>{if(finishModal.classList.contains('open'))setTimeout(decorateFinishModal,0)}).observe(finishModal,{attributes:true,attributeFilter:['class']});
  }

  function install(){
    if(installed)return;installed=true;
    installStyles();bindActions();installWallObserver();
    setInterval(tick,250);tick();
  }

  installFetchScoreBridge();
  if(document.readyState==='loading')window.addEventListener('DOMContentLoaded',()=>setTimeout(install,0),{once:true});
  else setTimeout(install,0);
})();

