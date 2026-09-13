(() => {
const TABLE='training_results';
const ACTIVE_SESSION_KEY='hybridActiveSession_v1';
const NICKNAME_MAX_LENGTH=14;
const NICKNAME_DEVICE_SECRET_KEY='hybridNicknameDeviceSecret_v1';
const PUBLIC_CONFIG=window.HYBRID_CONFIG||window.HYROX_CONFIG||{};
const cloudConfig={
  url:String(PUBLIC_CONFIG.SUPABASE_URL||'').trim(),
  key:String(PUBLIC_CONFIG.SUPABASE_PUBLISHABLE_KEY||'').trim()
};
const CHALLENGE_COOLDOWN_KEY='hyroxChallengeCountCooldown_v1';
const CHALLENGE_COOLDOWN_MS=60*60*1000; // same device + same source: count at most once per hour
const STATIONS=['SkiErg','Sled Push','Sled Pull','Burpee Broad Jump','Row','Farmers Carry','Sandbag Lunges','Wall Balls'];
const TYRUN_TEMPLATE_ID='tyrunSeason2';

const HYROX_DIVISIONS=[
  {value:'Women Open',label:'女子 Open'},
  {value:'Women Pro',label:'女子 Pro'},
  {value:'Men Open',label:'男子 Open'},
  {value:'Men Pro',label:'男子 Pro'},
  {value:'Mixed Doubles',label:'Mixed Doubles Open'}
];

const TYRUN_DIVISIONS=[
  {value:'Women Scaled',label:'女子 Scaled'},
  {value:'Women Open',label:'女子 Open'},
  {value:'Women Pro',label:'女子 Pro'},
  {value:'Men Scaled',label:'男子 Scaled'},
  {value:'Men Open',label:'男子 Open'},
  {value:'Men Pro',label:'男子 Pro'},
  {value:'Mixed Scaled',label:'Mixed Doubles Scaled'},
  {value:'Mixed Open',label:'Mixed Doubles Open'},
  {value:'Mixed Pro',label:'Mixed Doubles Pro'}
];
const CUSTOM_EXERCISES=[
  {name:'SkiErg',cat:'Race Stations'},
  {name:'Sled Push',cat:'Race Stations'},
  {name:'Sled Pull',cat:'Race Stations'},
  {name:'Burpee Broad Jump',cat:'Race Stations'},
  {name:'Row',cat:'Race Stations'},
  {name:'Farmers Carry',cat:'Race Stations'},
  {name:'Sandbag Lunges',cat:'Race Stations'},
  {name:'Wall Balls',cat:'Race Stations'},
  {name:'Echo Bike',cat:'Race Stations'},
  {name:'Seated Sled Pull',cat:'Race Stations'},
  {name:'Weighted Box Step Ups',cat:'Race Stations'},
  {name:'Medball Abmat Sit Ups',cat:'Race Stations'},
  {name:'Devil Press',cat:'Race Stations'},
  {name:'Sandbag Carry Over The Yoke',cat:'Race Stations'},
  {name:'Load Crawl',cat:'Race Stations'},
  {name:'Strength Erg Chest',cat:'Race Stations'},
  {name:'Weighted Lunges',cat:'Race Stations'},
  {name:'Kettlebell Thruster',cat:'Kettlebell'},
  {name:'Kettlebell Swing',cat:'Kettlebell'},
  {name:'Kettlebell Goblet Squat',cat:'Kettlebell'},
  {name:'Kettlebell Deadlift',cat:'Kettlebell'},
  {name:'Kettlebell Clean',cat:'Kettlebell'},
  {name:'Kettlebell Push Press',cat:'Kettlebell'},
  {name:'Dumbbell Thruster',cat:'Strength'},
  {name:'Dumbbell Walking Lunge',cat:'Strength'},
  {name:'Dumbbell Shoulder Press',cat:'Strength'},
  {name:'Dumbbell Row',cat:'Strength'},
  {name:'Front Squat',cat:'Strength'},
  {name:'Back Squat',cat:'Strength'},
  {name:'Deadlift',cat:'Strength'},
  {name:'Romanian Deadlift',cat:'Strength'},
  {name:'Walking Lunges',cat:'Strength'},
  {name:'Box Step-Up',cat:'Strength'},
  {name:'Burpee',cat:'Conditioning'},
  {name:'Push-Up',cat:'Conditioning'},
  {name:'Bear Crawl',cat:'Conditioning'},
  {name:'Battle Rope',cat:'Conditioning'},
  {name:'Quick Walk',cat:'Conditioning'},
  {name:'Heavy Walk',cat:'Conditioning'},
  {name:'Medicine Ball Slam',cat:'Conditioning'},
  {name:'BikeErg',cat:'Conditioning'},
  {name:'Assault Bike',cat:'Conditioning'},
  {name:'TRX Row',cat:'Conditioning'},
  {name:'Plank',cat:'Core'},
  {name:'Side Plank',cat:'Core'},
  {name:'Copenhagen Plank',cat:'Core'},
  {name:'Dead Bug',cat:'Core'},
  {name:'Bird Dog',cat:'Core'},
  {name:'Hollow Body Hold',cat:'Core'},
  {name:'Sit-Up',cat:'Core'},
  {name:'V-Up',cat:'Core'},
  {name:'Reverse Crunch',cat:'Core'},
  {name:'Bicycle Crunch',cat:'Core'},
  {name:'Russian Twist',cat:'Core'},
  {name:'Mountain Climber',cat:'Core'},
  {name:'Plank Shoulder Tap',cat:'Core'},
  {name:'Plank Knee to Elbow',cat:'Core'},
  {name:'Hanging Knee Raise',cat:'Core'},
  {name:'Hanging Leg Raise',cat:'Core'},
  {name:'Ab Wheel Rollout',cat:'Core'},
  {name:'Weighted Plank',cat:'Weighted Core'},
  {name:'Plank Dumbbell Drag',cat:'Weighted Core'},
  {name:'Weighted Sit-Up',cat:'Weighted Core'},
  {name:'Weighted Russian Twist',cat:'Weighted Core'},
  {name:'Weighted Dead Bug',cat:'Weighted Core'},
  {name:'Renegade Row',cat:'Weighted Core'},
  {name:'Kettlebell Halo',cat:'Weighted Core'},
  {name:'Turkish Get-Up',cat:'Weighted Core'},
  {name:'Suitcase Carry',cat:'Weighted Core'},
  {name:'Overhead Carry',cat:'Weighted Core'},
  {name:'Front Rack Carry',cat:'Weighted Core'},
  {name:'Farmer March',cat:'Weighted Core'},
  {name:'Dumbbell Side Bend',cat:'Weighted Core'},
  {name:'Cable Crunch',cat:'Weighted Core'},
  {name:'Pallof Press',cat:'Weighted Core'},
  {name:'Pallof Press Hold',cat:'Weighted Core'},
  {name:'Cable Wood Chop',cat:'Weighted Core'},
  {name:'Kneeling Cable Wood Chop',cat:'Weighted Core'},
  {name:'Landmine Rotation',cat:'Weighted Core'}
];

/* ===== Expanded movement library + user-defined movements ===== */
const USER_EXERCISE_LIBRARY_KEY='hybridUserExerciseLibrary_v1';
const EXTRA_CUSTOM_EXERCISES=[
  /* TRX */
  {name:'TRX Chest Press',cat:'TRX'},
  {name:'TRX Y Raise',cat:'TRX'},
  {name:'TRX Face Pull',cat:'TRX'},
  {name:'TRX Reverse Fly',cat:'TRX'},
  {name:'TRX Triceps Press',cat:'TRX'},
  {name:'TRX Biceps Curl',cat:'TRX'},
  {name:'TRX Squat',cat:'TRX'},
  {name:'TRX Split Squat',cat:'TRX'},
  {name:'TRX Reverse Lunge',cat:'TRX'},
  {name:'TRX Knee Tuck',cat:'TRX'},
  {name:'TRX Pike',cat:'TRX'},
  {name:'TRX Body Saw',cat:'TRX'},
  {name:'TRX Mountain Climber',cat:'TRX'},
  {name:'TRX Fallout',cat:'TRX'},
  {name:'TRX Hamstring Curl',cat:'TRX'},
  {name:'TRX Glute Bridge',cat:'TRX'},

  /* Bodyweight / warm-up friendly */
  {name:'Bodyweight Squat',cat:'Bodyweight'},
  {name:'Squat to Reach',cat:'Bodyweight'},
  {name:'Reverse Lunge',cat:'Bodyweight'},
  {name:'Lateral Lunge',cat:'Bodyweight'},
  {name:'Split Squat',cat:'Bodyweight'},
  {name:'Glute Bridge',cat:'Bodyweight'},
  {name:'Single-Leg Glute Bridge',cat:'Bodyweight'},
  {name:'Calf Raise',cat:'Bodyweight'},
  {name:'Wall Sit',cat:'Bodyweight'},
  {name:'Inchworm',cat:'Bodyweight'},
  {name:'Walkout',cat:'Bodyweight'},
  {name:'Incline Push-Up',cat:'Bodyweight'},
  {name:'Pike Push-Up',cat:'Bodyweight'},
  {name:'Marching in Place',cat:'Bodyweight'},
  {name:'High Knee March',cat:'Bodyweight'},
  {name:'Alternating Toe Tap on Box',cat:'Bodyweight'},

  /* Core / stability ball */
  {name:'Side Plank Hip Lift',cat:'Core'},
  {name:'Side Plank Reach Through',cat:'Core'},
  {name:'Plank Hip Dip',cat:'Core'},
  {name:'Plank to Down Dog',cat:'Core'},
  {name:'Bear Plank Shoulder Tap',cat:'Core'},
  {name:'Seated Knee Tuck',cat:'Core'},
  {name:'Leg Raise',cat:'Core'},
  {name:'Flutter Kick',cat:'Core'},
  {name:'Scissor Kick',cat:'Core'},
  {name:'Heel Tap',cat:'Core'},
  {name:'Toe Touch',cat:'Core'},
  {name:'Stability Ball Rollout',cat:'Core'},
  {name:'Stability Ball Stir-the-Pot',cat:'Core'},
  {name:'Stability Ball Knee Tuck',cat:'Core'},
  {name:'Stability Ball Pike',cat:'Core'},
  {name:'Stability Ball Crunch',cat:'Core'},

  /* Conditioning / cardio commonly used in daily menus */
  {name:'Brisk Walk',cat:'Conditioning'},
  {name:'Incline Walk',cat:'Conditioning'},
  {name:'Bike',cat:'Conditioning'},
  {name:'Stair Climber',cat:'Conditioning'},
  {name:'Elliptical',cat:'Conditioning'},
  {name:'Dumbbell Push Press',cat:'Conditioning'},
  {name:'Dumbbell Lateral Raise',cat:'Conditioning'},
  {name:'Medicine Ball Russian Twist',cat:'Conditioning'},
  {name:'Medicine Ball Front Carry',cat:'Conditioning'},
  {name:'Medicine Ball Overhead Carry',cat:'Conditioning'},
  {name:'Sandbag Carry',cat:'Conditioning'},
  {name:'Sandbag Front Squat',cat:'Conditioning'},
  {name:'Heavy Farmers Carry',cat:'Conditioning'},
  {name:'Heavy Sled Push',cat:'Conditioning'},
  {name:'Heavy Sled Pull',cat:'Conditioning'},
  {name:'Dumbbell Bench Press',cat:'Strength'},
  {name:'Dumbbell Deadlift',cat:'Strength'},
  {name:'Hip Thrust',cat:'Strength'},
  {name:'Lat Pulldown',cat:'Strength'}
];

// Keep the existing library intact, add missing movements only.
EXTRA_CUSTOM_EXERCISES.forEach(ex=>{
  if(!CUSTOM_EXERCISES.some(x=>x.name.toLowerCase()===ex.name.toLowerCase()))CUSTOM_EXERCISES.push(ex);
});
// Move the existing TRX Row into the TRX section for easier discovery.
const _trxRowCatalogItem=CUSTOM_EXERCISES.find(x=>x.name==='TRX Row');
if(_trxRowCatalogItem)_trxRowCatalogItem.cat='TRX';

let userExerciseLibrary=[];
try{
  const saved=JSON.parse(localStorage.getItem(USER_EXERCISE_LIBRARY_KEY)||'[]');
  if(Array.isArray(saved)){
    saved.forEach(ex=>{
      const name=String(ex?.name||'').trim();
      const cat=String(ex?.cat||'我的動作').trim()||'我的動作';
      if(!name)return;
      if(!CUSTOM_EXERCISES.some(x=>x.name.toLowerCase()===name.toLowerCase())){
        CUSTOM_EXERCISES.push({name,cat,userDefined:true});
      }
      userExerciseLibrary.push({name,cat});
    });
  }
}catch(e){console.warn('Could not load user exercise library',e)}

function saveUserExerciseLibrary(){
  try{localStorage.setItem(USER_EXERCISE_LIBRARY_KEY,JSON.stringify(userExerciseLibrary))}catch(e){}
}
function registerUserExercise(name,cat='我的動作'){
  const clean=String(name||'').trim().replace(/\s+/g,' ');
  const category=String(cat||'我的動作').trim()||'我的動作';
  if(!clean)return null;
  const existing=CUSTOM_EXERCISES.find(x=>x.name.toLowerCase()===clean.toLowerCase());
  if(existing)return existing;
  const ex={name:clean,cat:category,userDefined:true};
  CUSTOM_EXERCISES.push(ex);
  userExerciseLibrary.push({name:clean,cat:category});
  saveUserExerciseLibrary();
  return ex;
}

const DETAILS={
 'SkiErg':{
   'Women Open':'1000 m',
   'Women Pro':'1000 m',
   'Men Open':'1000 m',
   'Men Pro':'1000 m',
   'Mixed Doubles':'1000 m'
 },
 'Sled Push':{
   'Women Open':'50 m · 102 kg incl. sled',
   'Women Pro':'50 m · 152 kg incl. sled',
   'Men Open':'50 m · 152 kg incl. sled',
   'Men Pro':'50 m · 202 kg incl. sled',
   'Mixed Doubles':'50 m · 152 kg incl. sled'
 },
 'Sled Pull':{
   'Women Open':'50 m · 78 kg incl. sled',
   'Women Pro':'50 m · 103 kg incl. sled',
   'Men Open':'50 m · 103 kg incl. sled',
   'Men Pro':'50 m · 153 kg incl. sled',
   'Mixed Doubles':'50 m · 103 kg incl. sled'
 },
 'Burpee Broad Jump':{
   'Women Open':'80 m',
   'Women Pro':'80 m',
   'Men Open':'80 m',
   'Men Pro':'80 m',
   'Mixed Doubles':'80 m'
 },
 'Row':{
   'Women Open':'1000 m',
   'Women Pro':'1000 m',
   'Men Open':'1000 m',
   'Men Pro':'1000 m',
   'Mixed Doubles':'1000 m'
 },
 'Farmers Carry':{
   'Women Open':'200 m · 2×16 kg',
   'Women Pro':'200 m · 2×24 kg',
   'Men Open':'200 m · 2×24 kg',
   'Men Pro':'200 m · 2×32 kg',
   'Mixed Doubles':'200 m · 2×24 kg'
 },
 'Sandbag Lunges':{
   'Women Open':'100 m · 10 kg',
   'Women Pro':'100 m · 20 kg',
   'Men Open':'100 m · 20 kg',
   'Men Pro':'100 m · 30 kg',
   'Mixed Doubles':'100 m · 20 kg'
 },
 'Wall Balls':{
   'Women Open':'100 reps · 4 kg',
   'Women Pro':'100 reps · 6 kg',
   'Men Open':'100 reps · 6 kg',
   'Men Pro':'100 reps · 9 kg',
   'Mixed Doubles':'100 reps · 6 kg'
 }
};

/* Built-in daily workout templates live in workouts.js. */

function isStandardRaceType(type){return type==='經典挑戰'||type==='標準賽事'||type==='標準挑戰'}
function isSimulationType(type){return type==='日常訓練'||type==='日常挑戰'||type==='模擬賽挑戰'||type==='賽事挑戰'}
function isRaceChallengeType(type){return isStandardRaceType(type)||isSimulationType(type)}
function standardRaceItems(division){
  const out=[];
  STATIONS.forEach(s=>{
    out.push({name:'Run',detail:'1 km',distance_m:1000});
    out.push({name:s,detail:DETAILS[s]?.[division]||''});
  });
  return out;
}
function hyroxDivisionParts(division){
  const raw=String(division||'Women Open').trim();
  const group=raw.startsWith('Mixed')?'Mixed':raw.startsWith('Men')?'Men':'Women';
  const level=raw.includes('Pro')?'Pro':'Open';
  const doubles=raw.includes('Doubles');
  return {group,level,doubles};
}
function hyroxDivisionLabel(division){
  const {group,level,doubles}=hyroxDivisionParts(division);
  if(group==='Mixed')return `Mixed Doubles ${level}`;
  const groupLabel=group==='Women'?'女子':'男子';
  return `${groupLabel}${doubles?' Doubles':''} ${level}`;
}

function tyrunDivisionParts(division){
  const raw=String(division||'Women Open').trim();
  const group=raw.startsWith('Mixed')?'Mixed':raw.startsWith('Men')?'Men':'Women';
  const level=raw.includes('Scaled')?'Scaled':raw.includes('Pro')?'Pro':'Open';
  return {group,level};
}
function tyrunDivisionLabel(division){
  const {group,level}=tyrunDivisionParts(division);
  const groupLabel=group==='Women'?'女子':group==='Men'?'男子':'Mixed Doubles';
  return `${groupLabel} ${level}`;
}
function standardDivisionLabel(division,format='hyrox'){
  return format==='tyrun-s2'
    ?tyrunDivisionLabel(division)
    :hyroxDivisionLabel(division);
}
function tyrunUsesMenWeights(group){return group==='Men'||group==='Mixed'}

function tyrunRaceItems(division){
  const {group,level}=tyrunDivisionParts(division);
  const male=tyrunUsesMenWeights(group);
  const key=level.toLowerCase();

  const calories={scaled:60,open:80,pro:100}[key];

  const sledWeight=male
    ?{scaled:80,open:100,pro:120}[key]
    :{scaled:60,open:80,pro:100}[key];

  const stepWeight=key==='scaled'
    ?null
    :(male?{open:10,pro:15}[key]:{open:7.5,pro:10}[key]);

  const situpWeight=key==='scaled'
    ?null
    :(male?{open:6,pro:9}[key]:{open:3,pro:6}[key]);

  const devilWeight=male
    ?{scaled:7.5,open:10,pro:15}[key]
    :{scaled:5,open:7.5,pro:10}[key];

  const sandbagWeight=male
    ?{scaled:30,open:50,pro:70}[key]
    :{scaled:20,open:30,pro:50}[key];

  return [
    {name:'Run',detail:'600 m',distance_m:600},

    {name:'Echo Bike',detail:`${calories} cal`},

    {
      name:'Seated Sled Pull',
      detail:`90 m · 6×15 m · ${sledWeight} kg`,
      distance_m:90,
      weight_kg:String(sledWeight)
    },

    {name:'Run',detail:'600 m',distance_m:600},

    {
      name:'Weighted Box Step Ups',
      detail:stepWeight==null
        ?'100 reps · BW · 20-inch box'
        :`100 reps · 2×${stepWeight} kg · 20-inch box`,
      reps:100,
      weight_kg:stepWeight==null?null:String(stepWeight)
    },

    {
      name:'Medball Abmat Sit Ups',
      detail:situpWeight==null
        ?'100 reps · BW'
        :`100 reps · ${situpWeight} kg med ball`,
      reps:100,
      weight_kg:situpWeight==null?null:String(situpWeight)
    },

    {name:'Run',detail:'600 m',distance_m:600},

    {name:'Row',detail:'1000 m · Rogue Echo Row',distance_m:1000},

    {
      name:'Devil Press',
      detail:`100 m · 2×${devilWeight} kg`,
      distance_m:100,
      weight_kg:String(devilWeight)
    },

    {name:'Run',detail:'600 m',distance_m:600},

    {name:'SkiErg',detail:'1000 m · Rogue Echo Ski',distance_m:1000},

    {
      name:'Sandbag Carry Over The Yoke',
      detail:`100 m · 24 yokes @ 1 m · ${sandbagWeight} kg`,
      distance_m:100,
      weight_kg:String(sandbagWeight)
    }
  ];
}
function currentStandardRaceFormat(){
  return q('#standardRaceFormat')?.value==='tyrun-s2'?'tyrun-s2':'hyrox';
}
function standardRaceTemplateId(format=currentStandardRaceFormat()){
  return format==='tyrun-s2'?TYRUN_TEMPLATE_ID:'standardRace';
}
function standardRaceFormatLabel(format=currentStandardRaceFormat()){
  return format==='tyrun-s2'?'TYRUN S2':'HYROX';
}

function classicPreviewAccent(index){
  const palette=[
    ['#64d8d0','rgba(100,216,208,.09)'],
    ['#ff9b78','rgba(255,155,120,.09)'],
    ['#b894ff','rgba(184,148,255,.09)'],
    ['#7ed9a9','rgba(126,217,169,.09)'],
    ['#efc96f','rgba(239,201,111,.09)'],
    ['#7bb7ff','rgba(123,183,255,.09)'],
    ['#f08fc2','rgba(240,143,194,.09)'],
    ['#8bd0ff','rgba(139,208,255,.09)']
  ];
  return palette[(Math.max(1,Number(index)||1)-1)%palette.length];
}

function standardRacePreviewGroups(format,division){
  const items=format==='tyrun-s2'
    ?tyrunRaceItems(division)
    :standardRaceItems(division);

  if(format==='tyrun-s2'){
    // TYRUN Season 2 = 4 runs, each followed by 2 work stations.
    const groups=[];
    for(let i=0;i<items.length;i+=3){
      groups.push({
        label:`ROUND ${groups.length+1}`,
        meta:'600 m RUN + 2 STATIONS',
        items:items.slice(i,i+3)
      });
    }
    return groups;
  }

  // HYROX = 8 × (1 km run + 1 work station).
  const groups=[];
  for(let i=0;i<items.length;i+=2){
    groups.push({
      label:`ROUND ${groups.length+1}`,
      meta:'1 KM RUN + 1 STATION',
      items:items.slice(i,i+2)
    });
  }
  return groups;
}

function renderStandardRacePreview(){
  const grid=q('#standardRacePreviewGrid');
  const label=q('#standardRacePreviewLabel');
  const divisionSelect=q('#standardDivision');
  if(!grid||!label||!divisionSelect)return;

  const format=currentStandardRaceFormat();
  const division=divisionSelect.value;
  const groups=standardRacePreviewGroups(format,division);

  label.textContent=`${standardRaceFormatLabel(format)} · ${standardDivisionLabel(division,format)}`;

  grid.innerHTML=groups.map((group,gi)=>{
    const [accent,wash]=classicPreviewAccent(gi+1);
    return `<div class="classic-preview-block" style="--race-accent:${accent};--race-wash:${wash}">
      <div class="classic-preview-block-head">
        <strong>${esc(group.label)}</strong>
        <span>${esc(group.meta)}</span>
      </div>
      <div class="classic-preview-items">
        ${group.items.map((item,ii)=>`<div class="classic-preview-item">
          <div class="classic-preview-num">${ii+1}</div>
          <b>${esc(item.name)}</b>
          <span>${esc(item.detail||'')}</span>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

function updateStandardRaceUI(){
  const format=currentStandardRaceFormat();
  const divisionSelect=q('#standardDivision');
  if(!divisionSelect)return;
  const previous=String(divisionSelect.value||'Women Open');

  if(format==='tyrun-s2'){
    divisionSelect.innerHTML=TYRUN_DIVISIONS
      .map(x=>`<option value="${x.value}">${x.label}</option>`)
      .join('');

    if(TYRUN_DIVISIONS.some(x=>x.value===previous)){
      divisionSelect.value=previous;
    }else if(previous.startsWith('Men')){
      divisionSelect.value='Men Open';
    }else if(previous.startsWith('Mixed')){
      divisionSelect.value='Mixed Open';
    }else{
      divisionSelect.value='Women Open';
    }

    q('#standardRaceDescription').textContent=
      'TYRUN Season 2：4 × 600 m 跑步；每段跑步後接 2 個工作站。Scaled / Open / Pro 依官方標準切換負重與 Echo Bike calories。';
    q('#standardRunStat').textContent='2.4 km';
    q('#standardStationStat').textContent='8';
    q('#standardItemStat').textContent='12';

  }else{
    divisionSelect.innerHTML=HYROX_DIVISIONS
      .map(x=>`<option value="${x.value}">${x.label}</option>`)
      .join('');

    if(HYROX_DIVISIONS.some(x=>x.value===previous)){
      divisionSelect.value=previous;
    }else if(previous.startsWith('Men')){
      divisionSelect.value='Men Open';
    }else if(previous.startsWith('Mixed')){
      divisionSelect.value='Mixed Doubles';
    }else{
      divisionSelect.value='Women Open';
    }

    q('#standardRaceDescription').textContent=
      'HYROX：8 × 1 km 跑步＋8 個固定工作站。HYROX 沒有 Scaled；Singles 為 Open / Pro，Mixed Doubles 為 Open。';
    q('#standardRunStat').textContent='8.0 km';
    q('#standardStationStat').textContent='8';
    q('#standardItemStat').textContent='16';
  }

  renderStandardRacePreview();
  if(typeof syncClassicMenuModalTitle==='function')syncClassicMenuModalTitle();
}
function currentRaceTemplate(){return RACE_TEMPLATES[q('#raceTemplate')?.value]||RACE_TEMPLATES.lowerBlast}
function selectedDailyCardio(){return q('#dailyCardioChoice')?.value||'Bike'}
function rawTemplateItems(t,cardioChoice=null){
  if(!t||typeof t.build!=='function')return [];
  return (t.build(cardioChoice||selectedDailyCardio())||[]).map(x=>({...x}));
}
function templateItemsToBlocks(items,autoChunkSize=4){
  const source=Array.isArray(items)?items:[];
  if(!source.length)return [];
  const hasExplicit=source.some(x=>Number(x?.block_index)>0);
  if(!hasExplicit){
    const size=Math.max(1,Number(autoChunkSize)||4),out=[];
    for(let i=0;i<source.length;i+=size){
      out.push({
        index:out.length+1,
        rounds:1,
        rest:'—',
        items:source.slice(i,i+size).map(x=>({...x}))
      });
    }
    return out;
  }
  const order=[],map=new Map();
  source.forEach(x=>{
    const key=Math.max(1,Number(x?.block_index)||1);
    if(!map.has(key)){
      const block={
        index:key,
        rounds:Math.max(1,Math.min(20,Number(x?.block_rounds)||1)),
        rest:String(x?.block_rest||'—'),
        items:[]
      };
      map.set(key,block);order.push(key);
    }
    map.get(key).items.push({...x});
  });
  return order.sort((a,b)=>a-b).map((key,i)=>({...map.get(key),index:i+1}));
}
function expandTemplateBlockItems(items){
  const blocks=templateItemsToBlocks(items);
  const out=[];
  blocks.forEach((block,bi)=>{
    const rounds=Math.max(1,Number(block.rounds)||1);
    for(let round=1;round<=rounds;round++){
      block.items.forEach(x=>out.push({
        ...x,
        block_index:bi+1,
        block_round:round,
        block_rounds:rounds,
        block_rest:block.rest||'—'
      }));
    }
  });
  return out;
}
function buildTemplateItems(t,cardioChoice=null){
  return expandTemplateBlockItems(rawTemplateItems(t,cardioChoice));
}
function simulationItems(templateId){
  const t=RACE_TEMPLATES[templateId]||RACE_TEMPLATES.lowerBlast;
  return buildTemplateItems(t,'Bike');
}
// Level is the app's single difficulty scale. UI always displays Arabic numerals (1–10).
// The existing database field `intensity` stores this same Level value; it is NOT a second scale.
function levelNumber(n){
  const v=Math.round(Number(n)||1);
  return Math.min(10,Math.max(1,v));
}
function syncTemplatePicker(){
  const select=q('#raceTemplate'),picker=q('#templatePicker');
  if(!select||!picker)return;
  const t=currentRaceTemplate();
  const level=q('#templateTriggerLevel'),name=q('#templateTriggerName');
  const selectedOpt=select.options[select.selectedIndex];
  const displayLevel=levelNumber(Number(selectedOpt?.dataset.level)||Number(t.intensity)||1);
  if(level)level.textContent=`Level ${displayLevel}`;
  if(name)name.textContent=t.label;
  qa('#templatePickerMenu .template-option').forEach(btn=>{
    const selected=btn.dataset.templateId===select.value;
    btn.classList.toggle('selected',selected);
    btn.setAttribute('aria-selected',selected?'true':'false');
  });
}
function buildTemplatePicker(){
  const select=q('#raceTemplate'),menu=q('#templatePickerMenu'),trigger=q('#templatePickerTrigger'),picker=q('#templatePicker');
  if(!select||!menu||!trigger||!picker)return;
  const grouped=new Map();
  [...select.options].forEach(opt=>{
    const t=RACE_TEMPLATES[opt.value];if(!t)return;
    const level=levelNumber(Number(opt.dataset.level)||Number(t.intensity)||1);
    if(!grouped.has(level))grouped.set(level,[]);
    grouped.get(level).push({id:opt.value,label:t.label});
  });
  menu.innerHTML=[...grouped.entries()].sort((a,b)=>a[0]-b[0]).map(([level,items])=>`
    <div class="template-level-group" data-level="${level}">
      <div class="template-level-head">
        <span class="template-level-word">LEVEL</span>
        <strong class="template-level-number">${level}</strong>
      </div>
      <div class="template-level-options">
        ${items.map(item=>`<button type="button" class="template-option" role="option" data-template-id="${esc(item.id)}"><span>${esc(item.label)}</span><span class="template-option-check">✓</span></button>`).join('')}
      </div>
    </div>`).join('');
  menu.querySelectorAll('.template-option').forEach(btn=>btn.addEventListener('click',()=>{
    select.value=btn.dataset.templateId;
    picker.classList.remove('open');trigger.setAttribute('aria-expanded','false');
    select.dispatchEvent(new Event('change',{bubbles:true}));
  }));
  trigger.addEventListener('click',()=>{
    const open=!picker.classList.contains('open');
    picker.classList.toggle('open',open);trigger.setAttribute('aria-expanded',open?'true':'false');
    if(open){
      syncTemplatePicker();
      requestAnimationFrame(()=>menu.querySelector('.template-option.selected')?.scrollIntoView({block:'nearest'}));
    }
  });
  trigger.addEventListener('keydown',e=>{
    if(e.key==='Escape'){picker.classList.remove('open');trigger.setAttribute('aria-expanded','false')}
  });
  document.addEventListener('click',e=>{
    if(!picker.contains(e.target)){picker.classList.remove('open');trigger.setAttribute('aria-expanded','false')}
  });
  syncTemplatePicker();
}

function ensureDailyPreviewBlockStyles(){
  if(document.getElementById('dailyPreviewBlockStyles'))return;
  const style=document.createElement('style');
  style.id='dailyPreviewBlockStyles';
  style.textContent=`
    .daily-preview-list.block-layout{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;padding:0 14px 12px;counter-reset:none}
    .daily-preview-list.block-layout .daily-preview-block{display:block!important;padding:0!important;border:1px solid var(--block-accent,#45566c)!important;border-radius:11px;background:#0b121a;overflow:hidden;min-width:0}
    .daily-preview-list.block-layout .daily-preview-block::before{display:none!important;content:none!important}
    .daily-preview-block-head{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 10px;border-top:3px solid var(--block-accent,#70ded8);border-bottom:1px solid rgba(255,255,255,.065);background:linear-gradient(90deg,var(--block-wash,rgba(112,222,216,.07)),transparent 65%),#111923}
    .daily-preview-block-head strong{font-size:10px;letter-spacing:.08em;color:var(--block-accent,#70ded8)}
    .daily-preview-block-head span{font-size:8.5px;color:#8492a4;text-align:right}
    .daily-preview-block-items{display:grid;padding:5px 9px 7px}
    .daily-preview-block-item{display:grid;grid-template-columns:22px minmax(0,1fr);gap:1px 7px;padding:6px 0;border-top:1px solid #1f2a39}
    .daily-preview-block-item:first-child{border-top:0}
    .daily-preview-block-num{grid-column:1;grid-row:1/3;width:19px;height:19px;display:grid;place-items:center;border-radius:999px;background:#16212e;color:var(--block-accent,#70ded8);font-size:8px;font-weight:900}
    .daily-preview-block-item b{grid-area:auto!important;grid-column:2;grid-row:1;display:block!important;min-width:0;font-size:10.5px!important;line-height:1.3!important;font-weight:760!important;letter-spacing:0!important;color:#f1f5f8!important;text-shadow:none!important;filter:none!important;transform:none!important;-webkit-font-smoothing:antialiased}
    .daily-preview-block-item span{grid-area:auto!important;grid-column:2;grid-row:2;display:block!important;min-width:0;margin:1px 0 0!important;font-size:9px!important;line-height:1.35!important;color:#798799!important;text-shadow:none!important;filter:none!important;transform:none!important;-webkit-font-smoothing:antialiased}
    @media(max-width:640px){
      .daily-preview-list.block-layout{grid-template-columns:1fr;padding:0 11px 10px;gap:8px}
      .daily-preview-block-head{padding:7px 9px}
    }
  `;
  document.head.appendChild(style);
}
function dailyBlockAccent(index){
  const palette=[
    ['#64d8d0','rgba(100,216,208,.09)'],
    ['#ff9b78','rgba(255,155,120,.09)'],
    ['#b894ff','rgba(184,148,255,.09)'],
    ['#7ed9a9','rgba(126,217,169,.09)'],
    ['#efc96f','rgba(239,201,111,.09)'],
    ['#7bb7ff','rgba(123,183,255,.09)']
  ];
  return palette[(Math.max(1,Number(index)||1)-1)%palette.length];
}
function renderDailyPreviewBlocks(items){
  ensureDailyPreviewBlockStyles();
  const list=q('#dailyPreviewList');if(!list)return;
  const blocks=templateItemsToBlocks(items);
  list.classList.add('block-layout');
  list.innerHTML=blocks.map((block,bi)=>{
    const [accent,wash]=dailyBlockAccent(bi+1);
    const rounds=Math.max(1,Number(block.rounds)||1);
    const rest=String(block.rest||'—');
    const meta=[`${rounds} round${rounds>1?'s':''}`,rest&&rest!=='—'?`休息 ${rest}`:''].filter(Boolean).join(' · ');
    return `<li class="daily-preview-block" style="--block-accent:${accent};--block-wash:${wash}">
      <div class="daily-preview-block-head"><strong>BLOCK ${bi+1}</strong><span>${esc(meta)}</span></div>
      <div class="daily-preview-block-items">
        ${block.items.map((x,ii)=>`<div class="daily-preview-block-item"><div class="daily-preview-block-num">${ii+1}</div><b>${esc(x.name)}</b>${x.detail?`<span>${esc(x.detail)}</span>`:'<span></span>'}</div>`).join('')}
      </div>
    </li>`;
  }).join('');
}
function updateRaceTemplateUI(){
  const t=currentRaceTemplate();
  syncTemplatePicker();
  const cardioWrap=q('#dailyCardioChoiceWrap');
  if(cardioWrap)cardioWrap.style.display=t.id==='coreSculpt'?'grid':'none';
  const rawItems=rawTemplateItems(t);

  q('#dailyPreviewHead').textContent=`${t.label}｜${t.duration}｜Level ${levelNumber(t.intensity)}`;
  q('#dailyPreviewDesc').textContent=t.description||'';
  q('#dailyPreviewEquipment').textContent=`器材：${t.equipment}`;
  renderDailyPreviewBlocks(rawItems);
  q('#dailyPreviewTotal').textContent=t.total;
  if(typeof syncDailyLauncher==='function')syncDailyLauncher();
  if(q('#dailyMenuModal')?.classList.contains('open')&&typeof renderDailyMenuModal==='function')renderDailyMenuModal();
}

const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
let allResults=[],session=null,ticker=null,finishedSession=null,pendingWallChallenge=null,customOrder=[{id:uid(),name:'Run',distance:500,weight:'',reps:''}];
let sessionHistoryGuardArmed=false;

function saveActiveSession(){
  try{
    if(session)localStorage.setItem(ACTIVE_SESSION_KEY,JSON.stringify(session));
    else localStorage.removeItem(ACTIVE_SESSION_KEY);
  }catch(e){
    console.warn('Could not save active challenge',e);
  }
}
function clearActiveSession(){
  try{localStorage.removeItem(ACTIVE_SESSION_KEY)}catch(e){}
}
function sessionMetaText(s){
  if(!s)return '';
  if(isStandardRaceType(s.challengeType)){const format=s.raceFormat||((s.templateId===TYRUN_TEMPLATE_ID)?'tyrun-s2':'hyrox');return `${standardRaceFormatLabel(format)} · ${standardDivisionLabel(s.division,format)}`;}
  if(isSimulationType(s.challengeType))return s.templateLabel||s.title||'日常訓練';
  return 'Custom Challenge';
}
function syncSessionLockUI(){
  const locked=!!session?.pageLocked;
  const btn=q('#lockSessionBtn');
  const modal=q('#trainingModal');
  if(btn){
    btn.textContent=locked?'🔒 已鎖定':'鎖定頁面';
    btn.classList.toggle('locked',locked);
    btn.setAttribute('aria-pressed',locked?'true':'false');
    btn.title=locked?'點一下解除頁面鎖定':'避免誤按上一頁或關閉挑戰畫面';
  }
  if(modal)modal.classList.toggle('page-locked',locked);
}
function armSessionHistoryGuard(){
  if(!session?.pageLocked||sessionHistoryGuardArmed)return;
  try{
    history.pushState({...((history.state&&typeof history.state==='object')?history.state:{}),hybridSessionGuard:true},'',location.href);
    sessionHistoryGuardArmed=true;
  }catch(e){}
}
function disarmSessionHistoryGuard(){
  if(!sessionHistoryGuardArmed)return;
  sessionHistoryGuardArmed=false;
  try{
    if(history.state?.hybridSessionGuard)history.back();
  }catch(e){}
}
function setSessionPageLocked(locked){
  if(!session)return;
  session.pageLocked=!!locked;
  if(session.pageLocked)armSessionHistoryGuard();
  else disarmSessionHistoryGuard();
  syncSessionLockUI();
  saveActiveSession();
  toast(session.pageLocked?'挑戰頁面已鎖定':'已解除頁面鎖定');
}
function toggleSessionPageLock(){
  if(!session)return;
  setSessionPageLocked(!session.pageLocked);
}
function showActiveSession(){
  if(!session)return;
  q('#sessionTitle').textContent=session.title||'Challenge';
  q('#sessionMeta').textContent=sessionMetaText(session);
  q('#trainingModal').classList.add('open');
  syncSessionLockUI();
  renderSession();
  startTicker();
}
function restoreActiveSession(){
  let saved=null;
  try{saved=JSON.parse(localStorage.getItem(ACTIVE_SESSION_KEY)||'null')}catch(e){}
  if(!saved||!Array.isArray(saved.items)||!saved.items.length||!Number(saved.startedAt)){
    clearActiveSession();
    return false;
  }
  session=saved;
  session.pageLocked=!!session.pageLocked;
  showActiveSession();
  if(session.pageLocked)armSessionHistoryGuard();
  toast('已恢復進行中的挑戰');
  return true;
}
function closeSessionView(){
  if(!session){q('#trainingModal').classList.remove('open');return}
  if(session.pageLocked){
    q('#trainingModal').classList.add('open');
    toast('頁面已鎖定，請先解除鎖定');
    return;
  }
  if(session.running)pauseToggle();
  q('#trainingModal').classList.remove('open');
  saveActiveSession();
}
function uid(){return crypto?.randomUUID?.()||'id-'+Date.now()+'-'+Math.random().toString(16).slice(2)}
function nicknameLength(v){return Array.from(String(v||'')).length}
function getNicknameDeviceSecret(){
  let secret=localStorage.getItem(NICKNAME_DEVICE_SECRET_KEY)||'';
  if(secret)return secret;
  const bytes=new Uint8Array(32);
  crypto.getRandomValues(bytes);
  secret=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
  localStorage.setItem(NICKNAME_DEVICE_SECRET_KEY,secret);
  return secret;
}
function rpcTextValue(value){
  if(Array.isArray(value))value=value[0];
  if(value&&typeof value==='object')value=Object.values(value)[0];
  return String(value??'').replace(/^"|"$/g,'').trim();
}
async function claimNicknameForThisDevice(nickname){
  const result=await api('rpc/claim_nickname',{
    method:'POST',
    body:JSON.stringify({p_nickname:nickname,p_device_secret:getNicknameDeviceSecret()})
  });
  return rpcTextValue(result);
}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function europeChallengeStamp(date=new Date()){
  const parts=new Intl.DateTimeFormat('en-GB',{
    timeZone:'Europe/Amsterdam',year:'numeric',month:'2-digit',day:'2-digit',
    hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false
  }).formatToParts(date).reduce((o,p)=>{if(p.type!=='literal')o[p.type]=p.value;return o},{});
  return `${parts.year}${parts.month}${parts.day}-${parts.hour}${parts.minute}${parts.second}-${String(date.getMilliseconds()).padStart(3,'0')}`;
}
function uniqueAutoCustomName(){
  const base=`自訂挑戰 ${europeChallengeStamp()}`;
  const used=new Set((allResults||[]).map(r=>String(r.workout_name||'').trim()).filter(Boolean));
  if(!used.has(base))return base;
  let n=2,name='';
  do{name=`${base}-${String(n++).padStart(2,'0')}`}while(used.has(name));
  return name;
}
function setDefaultCustomName(force=false){
  const input=q('#customName');if(!input)return;
  const isAuto=input.dataset.autoName==='1';
  if(force||isAuto||!input.value.trim()||input.value.trim()==='My HYROX Challenge'){
    input.value=uniqueAutoCustomName();
    input.dataset.autoName='1';
  }
}

function toast(msg){const t=q('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function fmt(sec){sec=Math.max(0,Math.round(Number(sec)||0));const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=sec%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
function isConfigured(){
  return /^https:\/\/.+\.supabase\.co$/i.test(cloudConfig.url) &&
         cloudConfig.key &&
         !/PASTE_|YOUR_/i.test(cloudConfig.key);
}
function configurationMessage(){
  return '網站尚未完成雲端設定。請先在 config.js 填入 Supabase Project URL 與 Publishable key。';
}
async function api(path,opts={}){
  if(!isConfigured()) throw new Error('PUBLIC_CONFIG_MISSING');
  const url=cloudConfig.url.replace(/\/$/,'')+'/rest/v1/'+path;
  const headers={
    apikey:cloudConfig.key,
    Authorization:'Bearer '+cloudConfig.key,
    'Content-Type':'application/json',
    Prefer:'return=representation',
    ...(opts.headers||{})
  };
  const r=await fetch(url,{...opts,headers});
  if(!r.ok)throw new Error(await r.text()||('HTTP '+r.status));
  const txt=await r.text();
  return txt?JSON.parse(txt):null;
}

const VISIT_SESSION_KEY='hybridVisitSession_v1';
const VISIT_SESSION_MS=30*60*1000; // same browser counts at most once per 30 minutes

function scalarRpcValue(value){
  if(Array.isArray(value))value=value[0];
  if(value&&typeof value==='object'){
    const first=Object.values(value)[0];
    if(first!=null)value=first;
  }
  if(typeof value==='string'){
    const trimmed=value.trim().replace(/^"|"$/g,'');
    if(trimmed==='')return null;
    value=trimmed;
  }
  const n=Number(value);
  return Number.isFinite(n)&&n>=0?Math.trunc(n):null;
}

async function updateVisitCounter(){
  const wrap=q('#visitCounter');
  const valueEl=q('#visitCount');
  if(!wrap||!valueEl)return;

  // Never show a placeholder such as "—" while the database request is pending
  // or when the counter backend has not been set up correctly.
  wrap.hidden=true;

  if(!isConfigured())return;

  try{
    const now=Date.now();
    const last=Number(localStorage.getItem(VISIT_SESSION_KEY)||0);
    const shouldCount=!last||(now-last)>=VISIT_SESSION_MS;

    const result=shouldCount
      ?await api('rpc/increment_site_visit',{method:'POST',body:'{}'})
      :await api('rpc/get_site_visits',{method:'POST',body:'{}'});

    const value=scalarRpcValue(result);
    if(value==null)throw new Error('INVALID_VISIT_COUNTER_RESPONSE');

    if(shouldCount)localStorage.setItem(VISIT_SESSION_KEY,String(now));

    valueEl.textContent=value.toLocaleString('zh-TW');
    wrap.hidden=false;
  }catch(e){
    // A statistics failure must never break the rest of the app.
    wrap.hidden=true;
    console.warn('Visit counter unavailable',e);
  }
}

async function loadResults(){
  const ids=['womenResults','menResults','mixedResults','dailyResults'];
  const loading='<div class="score-empty">正在載入成績…</div>';
  ids.forEach(id=>{const el=q('#'+id); if(el)el.innerHTML=loading});

  try{
    if(!isConfigured()){
      allResults=[];
      const msg='<div class="score-empty">網站尚未完成雲端設定。</div>';
      ids.forEach(id=>{const el=q('#'+id); if(el)el.innerHTML=msg});
      return;
    }

    allResults=await api(TABLE+'?select=*&order=created_at.desc&limit=1000');
    renderWall();
  }catch(e){
    console.error(e);
    allResults=[];
    const msg='<div class="score-empty">目前無法載入成績，請稍後再試。</div>';
    ids.forEach(id=>{const el=q('#'+id); if(el)el.innerHTML=msg});
    toast('目前無法連線到成績牆');
  }
}
async function addResult(row){
  const res=await api(TABLE,{method:'POST',body:JSON.stringify(row)});
  return res?.[0]||row;
}
function challengeCooldownMap(){
  try{return JSON.parse(localStorage.getItem(CHALLENGE_COOLDOWN_KEY)||'{}')||{}}catch{return {}}
}
function recentlyCountedChallenge(sourceId){
  const map=challengeCooldownMap();
  const last=Number(map[String(sourceId)]||0);
  return last>0 && Date.now()-last<CHALLENGE_COOLDOWN_MS;
}
function markChallengeCounted(sourceId){
  const map=challengeCooldownMap();
  map[String(sourceId)]=Date.now();
  // Prevent unbounded localStorage growth.
  const cutoff=Date.now()-30*24*60*60*1000;
  Object.keys(map).forEach(k=>{if(Number(map[k])<cutoff)delete map[k]});
  localStorage.setItem(CHALLENGE_COOLDOWN_KEY,JSON.stringify(map));
}
async function recordChallengeEvent(sourceId){
  const source=String(sourceId);
  if(recentlyCountedChallenge(source)){
    return {counted:false,count:Number(allResults.find(r=>String(r.id)===source)?.challenge_count)||0};
  }
  const result=await api('rpc/increment_challenge_count',{
    method:'POST',
    body:JSON.stringify({p_source_result_id:source})
  });
  const newCount=Number(result);
  const row=allResults.find(r=>String(r.id)===source);
  if(row) row.challenge_count=Number.isFinite(newCount)?newCount:(Number(row.challenge_count)||0)+1;
  markChallengeCounted(source);
  return {counted:true,count:Number(row?.challenge_count)||newCount||0};
}
function switchTab(id){qa('nav.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));qa('.page').forEach(p=>p.classList.toggle('active',p.id===id));if(id==='wall')loadResults()}
function injectExerciseBuilderStyles(){
  if(q('#exerciseBuilderStyles'))return;
  const style=document.createElement('style');
  style.id='exerciseBuilderStyles';
  style.textContent=`
    .exercise-tools{display:grid;gap:8px;margin:8px 0 10px}
    .exercise-tools-row{display:grid;grid-template-columns:minmax(0,1fr) 150px auto;gap:7px}
    .exercise-tools-row input,.exercise-tools-row select{min-height:38px}
    .exercise-creator{display:none;grid-template-columns:minmax(0,1fr) 150px auto;gap:7px;padding:9px;border:1px solid #2a3748;border-radius:11px;background:#0a1017}
    .exercise-creator.show{display:grid}
    .exercise-picker-scroll{max-height:340px;overflow:auto;overscroll-behavior:contain;padding-right:2px}
    .picker-empty{padding:16px 10px;border:1px dashed #344052;border-radius:10px;color:#7f8c9f;font-size:11px;text-align:center}
    .user-exercise-note{font-size:9.5px;color:#728094;line-height:1.4}
    @media(max-width:640px){
      .exercise-tools-row{grid-template-columns:1fr 120px}
      .exercise-tools-row .btn{grid-column:1/-1;width:100%}
      .exercise-creator{grid-template-columns:1fr 120px}
      .exercise-creator .btn{grid-column:1/-1;width:100%}
      .exercise-picker-scroll{max-height:300px}
    }
  `;
  document.head.appendChild(style);
}
function exerciseCategoryList(){
  return [...new Set(CUSTOM_EXERCISES.map(x=>x.cat).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'zh-Hant'));
}
function ensureExercisePickerTools(){
  injectExerciseBuilderStyles();
  const picker=q('#stationPicker');
  if(!picker||q('#exerciseTools'))return;
  const tools=document.createElement('div');
  tools.id='exerciseTools';
  tools.className='exercise-tools';
  tools.innerHTML=`
    <div class="exercise-tools-row">
      <input id="exerciseSearch" type="search" placeholder="搜尋動作，例如 TRX、plank、step-up…" autocomplete="off">
      <select id="exerciseCategoryFilter" aria-label="動作分類"></select>
      <button type="button" class="btn small" id="toggleExerciseCreator">＋ 自己新增動作</button>
    </div>
    <div class="exercise-creator" id="exerciseCreator">
      <input id="userExerciseName" maxlength="60" placeholder="動作名稱，例如 TRX Sprinter Start">
      <select id="userExerciseCategory">
        <option value="我的動作">我的動作</option>
        <option value="TRX">TRX</option>
        <option value="Bodyweight">Bodyweight</option>
        <option value="Core">Core</option>
        <option value="Conditioning">Conditioning</option>
        <option value="Kettlebell">Kettlebell</option>
        <option value="Strength">Strength</option>
        <option value="Weighted Core">Weighted Core</option>
      </select>
      <button type="button" class="btn small primary" id="saveUserExerciseBtn">新增並加入</button>
      <div class="user-exercise-note" style="grid-column:1/-1">自己新增的動作會保存在這台裝置，之後仍會出現在自訂挑戰的動作庫。</div>
    </div>`;
  picker.insertAdjacentElement('beforebegin',tools);
  picker.classList.add('exercise-picker-scroll');

  const category=q('#exerciseCategoryFilter');
  category.innerHTML='<option value="全部">全部分類</option>'+exerciseCategoryList().map(cat=>`<option value="${esc(cat)}">${esc(cat)}</option>`).join('');
  q('#exerciseSearch').addEventListener('input',renderPicker);
  category.addEventListener('change',renderPicker);
  q('#toggleExerciseCreator').addEventListener('click',()=>q('#exerciseCreator').classList.toggle('show'));
  q('#saveUserExerciseBtn').addEventListener('click',()=>{
    const name=q('#userExerciseName').value.trim();
    const cat=q('#userExerciseCategory').value;
    if(!name){toast('請輸入動作名稱');return}
    const ex=registerUserExercise(name,cat);
    if(!ex){toast('無法新增動作');return}
    q('#userExerciseName').value='';
    q('#exerciseCreator').classList.remove('show');
    // Refresh categories in case a brand-new category has appeared.
    const current=category.value;
    category.innerHTML='<option value="全部">全部分類</option>'+exerciseCategoryList().map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('');
    if([...category.options].some(o=>o.value===current))category.value=current;
    renderPicker();
    addCustomItem(ex.name);
    toast('已新增並加入挑戰');
  });
  q('#userExerciseName').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();q('#saveUserExerciseBtn').click()}});
}
function renderPicker(){
  ensureExercisePickerTools();
  const search=String(q('#exerciseSearch')?.value||'').trim().toLowerCase();
  const category=q('#exerciseCategoryFilter')?.value||'全部';
  const matches=CUSTOM_EXERCISES.filter(x=>{
    const catOk=category==='全部'||x.cat===category;
    const text=`${x.name} ${x.cat}`.toLowerCase();
    return catOk&&(!search||text.includes(search));
  });
  const groups=[...new Set(matches.map(x=>x.cat))];
  const picker=q('#stationPicker');
  picker.innerHTML=matches.length?groups.map(cat=>`<div class="picker-group"><div class="picker-group-title">${esc(cat)}</div><div class="picker-group-grid">${matches.filter(x=>x.cat===cat).map(x=>`<button type="button" class="pick add-pick" data-add-exercise="${esc(x.name)}"><span>＋ ${esc(x.name)}</span></button>`).join('')}</div></div>`).join(''):'<div class="picker-empty">找不到符合的動作。你可以按「＋ 自己新增動作」。</div>';
  qa('#stationPicker [data-add-exercise]').forEach(b=>b.onclick=()=>addCustomItem(b.dataset.addExercise));
}
function addCustomItem(name,afterId=null){
  const defaultRun=Math.max(0,Number(q('#customRun').value)||500);
  const item={id:uid(),name,distance:name==='Run'?defaultRun:'',weight:'',reps:''};
  if(afterId){const i=customOrder.findIndex(x=>x.id===afterId);if(i>=0)customOrder.splice(i+1,0,item);else customOrder.push(item)}else customOrder.push(item);
  renderCustomOrder();updateCustomPreview(false);
}
function removeCustomItem(id){customOrder=customOrder.filter(x=>x.id!==id);renderCustomOrder();updateCustomPreview(false)}
function duplicateCustomItem(id){
  const item=customOrder.find(x=>x.id===id);if(!item)return;
  const copy={...item,id:uid()};const i=customOrder.findIndex(x=>x.id===id);customOrder.splice(i+1,0,copy);renderCustomOrder();updateCustomPreview(false);
}
function moveCustomItem(id,delta){
  const i=customOrder.findIndex(x=>x.id===id),j=i+delta;if(i<0||j<0||j>=customOrder.length)return;
  [customOrder[i],customOrder[j]]=[customOrder[j],customOrder[i]];renderCustomOrder();
}
function formatCustomDetail(item,fallback='自訂訓練項目'){
  const bits=[];
  if(item.distance!==''&&item.distance!=null&&Number(item.distance)>0)bits.push(`${Number(item.distance)} m`);
  if(String(item.weight||'').trim())bits.push(`${String(item.weight).trim()} kg`);
  if(item.reps!==''&&item.reps!=null&&Number(item.reps)>0)bits.push(`${Number(item.reps)} reps`);
  return bits.length?bits.join(' · '):fallback;
}
function setCustomSpec(id,key,value){
  const item=customOrder.find(x=>x.id===id);if(!item)return;
  if(key==='distance'){
    const n=Math.max(0,Math.min(100000,Number(value)||0)); item[key]=value===''?'':n;
  }else if(key==='reps'){
    const n=Math.max(0,Math.min(10000,Math.round(Number(value)||0))); item[key]=value===''?'':n;
  }else{
    item[key]=String(value||'').slice(0,20);
  }
  updateCustomPreview(false);
  const sub=q(`#customOrderList [data-order-id="${CSS.escape(id)}"] .order-copy > span`);
  if(sub){const ex=CUSTOM_EXERCISES.find(x=>x.name===item.name);sub.textContent=formatCustomDetail(item,ex?.cat||'訓練項目')}
}
function renderCustomOrder(){
  const list=q('#customOrderList');
  if(!customOrder.length){list.innerHTML='<div class="order-empty">先用「＋ 加入跑步」或點選下方訓練項目加入挑戰。</div>';return}
  list.innerHTML=customOrder.map((item,i)=>{
    const ex=CUSTOM_EXERCISES.find(x=>x.name===item.name),detail=formatCustomDetail(item,ex?.cat||'訓練項目');
    return `<div class="order-item" draggable="true" data-order-id="${esc(item.id)}"><div class="drag-handle" title="拖曳排序">☰</div><div class="order-copy"><b>${i+1}. ${esc(item.name)}</b><span>${esc(detail)}</span><div class="order-specs"><div class="order-spec"><label>距離（m）</label><input type="number" min="0" max="100000" step="10" inputmode="decimal" data-spec="distance" data-spec-id="${esc(item.id)}" value="${esc(item.distance??'')}" placeholder="例如 500"></div><div class="order-spec"><label>重量（kg）</label><input type="text" maxlength="20" inputmode="decimal" data-spec="weight" data-spec-id="${esc(item.id)}" value="${esc(item.weight??'')}" placeholder="例如 16 或 2×16"></div><div class="order-spec"><label>次數</label><input type="number" min="0" max="10000" step="1" inputmode="numeric" data-spec="reps" data-spec-id="${esc(item.id)}" value="${esc(item.reps??'')}" placeholder="例如 20"></div></div></div><div class="order-actions"><button class="order-btn" data-duplicate="${esc(item.id)}" title="重複這個項目">＋</button><button class="order-btn" data-move="up" data-id="${esc(item.id)}" ${i===0?'disabled':''}>↑</button><button class="order-btn" data-move="down" data-id="${esc(item.id)}" ${i===customOrder.length-1?'disabled':''}>↓</button><button class="order-btn" data-remove="${esc(item.id)}" title="刪除">×</button></div></div>`
  }).join('');
  qa('#customOrderList [data-move]').forEach(b=>b.onclick=e=>{e.preventDefault();moveCustomItem(b.dataset.id,b.dataset.move==='up'?-1:1)});
  qa('#customOrderList [data-duplicate]').forEach(b=>b.onclick=e=>{e.preventDefault();duplicateCustomItem(b.dataset.duplicate)});
  qa('#customOrderList [data-remove]').forEach(b=>b.onclick=e=>{e.preventDefault();removeCustomItem(b.dataset.remove)});
  qa('#customOrderList [data-spec]').forEach(inp=>{
    inp.addEventListener('input',()=>setCustomSpec(inp.dataset.specId,inp.dataset.spec,inp.value));
    inp.addEventListener('pointerdown',e=>e.stopPropagation());
    inp.addEventListener('mousedown',e=>e.stopPropagation());
  });
  let dragged=null;
  qa('#customOrderList .order-item').forEach(el=>{
    el.addEventListener('dragstart',e=>{if(e.target.closest('input,button')){e.preventDefault();return}dragged=el.dataset.orderId;el.classList.add('dragging')});
    el.addEventListener('dragend',()=>{dragged=null;el.classList.remove('dragging')});
    el.addEventListener('dragover',e=>e.preventDefault());
    el.addEventListener('drop',e=>{e.preventDefault();const target=el.dataset.orderId;if(!dragged||dragged===target)return;const from=customOrder.findIndex(x=>x.id===dragged),to=customOrder.findIndex(x=>x.id===target);if(from<0||to<0)return;const [moved]=customOrder.splice(from,1);customOrder.splice(to,0,moved);renderCustomOrder();updateCustomPreview(false)});
  });
}
function updateCustomPreview(rerender=true){
  const runDistance=customOrder.filter(x=>x.name==='Run').reduce((s,x)=>s+(Number(x.distance)||0),0),stations=customOrder.filter(x=>x.name!=='Run').length;
  if(rerender)renderCustomOrder();q('#customRunPreview').textContent=(runDistance/1000).toFixed(1)+' km';q('#customStationPreview').textContent=stations;q('#customItemPreview').textContent=customOrder.length;
}
function customItems(){return customOrder.map(item=>{const ex=CUSTOM_EXERCISES.find(x=>x.name===item.name);return {name:item.name,detail:formatCustomDetail(item,ex?.cat||'自訂訓練項目'),distance_m:Number(item.distance)||null,weight_kg:String(item.weight||'').trim()||null,reps:Number(item.reps)||null}})}
function startSession(type){
  const isStandard=type==='經典挑戰';
  const isSimulation=isSimulationType(type);

  if(type==='自訂挑戰'&&q('#customName').dataset.autoName==='1')setDefaultCustomName(true);

  let division='Custom',title='',items=[],templateId=null,templateLabel=null;

  if(isStandard){
    const raceFormat=currentStandardRaceFormat();
    division=q('#standardDivision').value;
    title=`經典挑戰｜${standardRaceFormatLabel(raceFormat)}｜${standardDivisionLabel(division,raceFormat)}`;
    items=annotateClassicRounds(raceFormat==='tyrun-s2'?tyrunRaceItems(division):standardRaceItems(division),raceFormat);
    templateId=standardRaceTemplateId(raceFormat);
    templateLabel=raceFormat==='tyrun-s2'?'經典挑戰｜TYRUN Season 2':'經典挑戰｜HYROX';
  }else if(isSimulation){
    const t=currentRaceTemplate();
    division='Open';
    title=t.label;
    items=buildTemplateItems(t);
    templateId=t.id;
    templateLabel=t.label;
  }else{
    division='Custom';
    title=q('#customName').value.trim()||uniqueAutoCustomName();
    items=customItems();
  }

  if(title.length>80){toast('挑戰名稱最多 80 個字');return}
  if(!items.length){toast('請至少設定一個挑戰項目');return}

  session={
    id:uid(),challengeType:type,division,title,templateId,templateLabel,raceFormat:isStandard?currentStandardRaceFormat():null,
    items:items.map((x,i)=>({...x,id:uid(),done:false,index:i+1})),
    startedAt:Date.now(),pausedAt:null,pausedTotal:0,running:true,pageLocked:false
  };

  saveActiveSession();
  showActiveSession();
}
function elapsedMs(){if(!session)return 0;const now=session.running?Date.now():(session.pausedAt||Date.now());return Math.max(0,now-session.startedAt-session.pausedTotal)}

function parseCountdownSeconds(detail,name=''){
  // Time is allowed to live in either the editable detail field or the
  // exercise name.  This keeps cloud-edited Daily Training items compatible
  // with the per-item countdown UI.
  const text=`${String(detail||'')} ${String(name||'')}`
    .replace(/\u00a0/g,' ')
    .toLowerCase();

  let m=text.match(/(\d+(?:\.\d+)?)\s*(min|mins|minute|minutes)\b/);
  if(m){
    const value=Number(m[1]);
    if(Number.isFinite(value)&&value>0)return Math.max(1,Math.round(value*60));
  }

  m=text.match(/(\d+(?:\.\d+)?)\s*(?:分鐘|分)(?!鐘|钟)/);
  if(m){
    const value=Number(m[1]);
    if(Number.isFinite(value)&&value>0)return Math.max(1,Math.round(value*60));
  }

  m=text.match(/(\d+(?:\.\d+)?)\s*(sec|secs|second|seconds)\b/);
  if(m){
    const value=Number(m[1]);
    if(Number.isFinite(value)&&value>0)return Math.max(1,Math.round(value));
  }

  m=text.match(/(\d+(?:\.\d+)?)\s*(?:秒鐘|秒钟|秒)/);
  if(m){
    const value=Number(m[1]);
    if(Number.isFinite(value)&&value>0)return Math.max(1,Math.round(value));
  }

  return null;
}

function countdownFormat(totalSeconds){
  const s=Math.max(0,Math.ceil(Number(totalSeconds)||0));
  const min=Math.floor(s/60);
  const sec=s%60;
  return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

function ensureCountdown(it){
  if(it.countdownInitial!=null)return it.countdownInitial;
  const explicit=Number(it?.duration_seconds);
  const seconds=Number.isFinite(explicit)&&explicit>0
    ?Math.max(1,Math.round(explicit))
    :parseCountdownSeconds(it?.detail,it?.name);
  if(!seconds)return null;
  it.countdownInitial=seconds;
  it.countdownRemaining=seconds;
  it.countdownRunning=false;
  it.countdownEndAt=null;
  it.countdownExpired=false;
  it.countdownAlerted=false;
  it.countdownResumeAfterSessionPause=false;
  return seconds;
}

function getCountdownRemaining(it){
  const initial=ensureCountdown(it);
  if(!initial)return null;
  if(it.countdownRunning&&it.countdownEndAt){
    return Math.max(0,Math.ceil((it.countdownEndAt-Date.now())/1000));
  }
  return Math.max(0,Number(it.countdownRemaining??initial));
}

let countdownAudioCtx=null;
function primeCountdownAudio(){
  try{
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return;
    if(!countdownAudioCtx)countdownAudioCtx=new AC();
    if(countdownAudioCtx.state==='suspended')countdownAudioCtx.resume();
  }catch(e){}
}
function countdownSignal(it){
  if(it.countdownAlerted)return;
  it.countdownAlerted=true;
  try{if(navigator.vibrate)navigator.vibrate([180,90,180])}catch(e){}
  try{
    primeCountdownAudio();
    if(countdownAudioCtx){
      const now=countdownAudioCtx.currentTime;
      [0,0.18].forEach((offset,i)=>{
        const osc=countdownAudioCtx.createOscillator();
        const gain=countdownAudioCtx.createGain();
        osc.type='sine';
        osc.frequency.value=i===0?880:660;
        gain.gain.setValueAtTime(.0001,now+offset);
        gain.gain.exponentialRampToValueAtTime(.12,now+offset+.01);
        gain.gain.exponentialRampToValueAtTime(.0001,now+offset+.12);
        osc.connect(gain);
        gain.connect(countdownAudioCtx.destination);
        osc.start(now+offset);
        osc.stop(now+offset+.13);
      });
    }
  }catch(e){}
  toast(`${it.name}：時間到`);
}

function updateCountdownDisplays(){
  if(!session)return;
  session.items.forEach(it=>{
    const initial=ensureCountdown(it);
    if(!initial)return;

    let remaining=getCountdownRemaining(it);
    if(it.countdownRunning){
      it.countdownRemaining=remaining;
      if(remaining<=0){
        it.countdownRunning=false;
        it.countdownEndAt=null;
        it.countdownExpired=true;
        it.countdownRemaining=0;
        countdownSignal(it);
        saveActiveSession();
      }
    }

    const btn=qa('[data-countdown-id]').find(el=>el.dataset.countdownId===it.id);
    if(btn){
      const display=getCountdownRemaining(it);
      btn.textContent=it.countdownExpired?'時間到':`${it.countdownRunning?'Ⅱ':'▶'} ${countdownFormat(display)}`;
      btn.classList.toggle('running',!!it.countdownRunning);
      btn.classList.toggle('expired',!!it.countdownExpired);
      btn.setAttribute('aria-label',it.countdownRunning?`${it.name} 倒數暫停`:`${it.name} 倒數開始`);
    }
  });
}

function toggleCountdown(itemId){
  if(!session)return;
  const it=session.items.find(x=>x.id===itemId);
  if(!it||!ensureCountdown(it)||it.done)return;
  primeCountdownAudio();

  if(it.countdownRunning){
    it.countdownRemaining=getCountdownRemaining(it);
    it.countdownRunning=false;
    it.countdownEndAt=null;
  }else{
    if(it.countdownExpired||Number(it.countdownRemaining)<=0){
      it.countdownRemaining=it.countdownInitial;
      it.countdownExpired=false;
      it.countdownAlerted=false;
    }
    it.countdownRunning=true;
    it.countdownEndAt=Date.now()+Number(it.countdownRemaining)*1000;
  }
  updateCountdownDisplays();
  saveActiveSession();
}

function resetCountdown(itemId){
  if(!session)return;
  const it=session.items.find(x=>x.id===itemId);
  if(!it||!ensureCountdown(it))return;
  it.countdownRunning=false;
  it.countdownEndAt=null;
  it.countdownRemaining=it.countdownInitial;
  it.countdownExpired=false;
  it.countdownAlerted=false;
  it.countdownResumeAfterSessionPause=false;
  updateCountdownDisplays();
  saveActiveSession();
}

function pauseRunningCountdownsForSession(){
  if(!session)return;
  session.items.forEach(it=>{
    if(ensureCountdown(it)&&it.countdownRunning){
      it.countdownRemaining=getCountdownRemaining(it);
      it.countdownRunning=false;
      it.countdownEndAt=null;
      it.countdownResumeAfterSessionPause=true;
    }
  });
}

function resumeCountdownsAfterSessionPause(){
  if(!session)return;
  session.items.forEach(it=>{
    if(ensureCountdown(it)&&it.countdownResumeAfterSessionPause&&!it.done&&Number(it.countdownRemaining)>0){
      it.countdownResumeAfterSessionPause=false;
      it.countdownRunning=true;
      it.countdownEndAt=Date.now()+Number(it.countdownRemaining)*1000;
    }
  });
}

function startTicker(){
  clearInterval(ticker);
  ticker=setInterval(()=>{
    if(!session)return;
    q('#sessionTimer').textContent=fmt(elapsedMs()/1000);
    updateCountdownDisplays();
  },250);
}


function roundVisual(index){
  const palette=[
    ['#64d8d0','rgba(100,216,208,.10)'],
    ['#ff9b78','rgba(255,155,120,.10)'],
    ['#b894ff','rgba(184,148,255,.10)'],
    ['#7ed9a9','rgba(126,217,169,.10)'],
    ['#efc96f','rgba(239,201,111,.10)'],
    ['#7bb7ff','rgba(123,183,255,.10)'],
    ['#f08fc2','rgba(240,143,194,.10)'],
    ['#9fd073','rgba(159,208,115,.10)']
  ];
  return palette[(Math.max(1,Number(index)||1)-1)%palette.length];
}
function roundStyle(index){
  const [accent,wash]=roundVisual(index);
  return `--round-accent:${accent};--round-wash:${wash}`;
}
function annotateClassicRounds(items,format){
  const groupSize=format==='tyrun-s2'?3:2;
  return (items||[]).map((x,i)=>({
    ...x,
    block_index:Number(x?.block_index)>0?Number(x.block_index):Math.floor(i/groupSize)+1,
    block_round:Number(x?.block_round)>0?Number(x.block_round):1,
    block_rounds:Number(x?.block_rounds)>0?Number(x.block_rounds):1,
    block_rest:x?.block_rest||'—'
  }));
}
function roundIndexForItem(item,index=0,result=null){
  const explicit=Number(item?.block_index);
  if(explicit>0)return explicit;

  const templateId=String(result?.stations?.challenge_template?.id||'');
  if(templateId===TYRUN_TEMPLATE_ID)return Math.floor(index/3)+1;
  if(templateId==='standardRace'||isStandardRaceType(result?.workout_type))return Math.floor(index/2)+1;

  return null;
}
function roundLabelForItem(item,index=0,result=null){
  const round=roundIndexForItem(item,index,result);
  if(!round)return '';

  const totalRounds=Math.max(1,Number(item?.block_rounds)||1);
  const currentRound=Math.max(1,Number(item?.block_round)||1);

  if(result && (isStandardRaceType(result?.workout_type) ||
     ['standardRace',TYRUN_TEMPLATE_ID].includes(String(result?.stations?.challenge_template?.id||'')))){
    return `ROUND ${round}`;
  }

  if(totalRounds>1)return `BLOCK ${round} · R${currentRound}/${totalRounds}`;
  return `BLOCK ${round}`;
}
function roundStripHtml(items,result=null){
  const rounds=[];
  (items||[]).forEach((item,i)=>{
    const round=roundIndexForItem(item,i,result);
    if(round&&!rounds.includes(round))rounds.push(round);
  });
  if(!rounds.length)return '';
  return `<div class="wall-round-strip" aria-label="${rounds.length} 個 Round / Block">
    ${rounds.map(r=>`<span style="${roundStyle(r)};background:var(--round-accent)" title="Round / Block ${r}"></span>`).join('')}
  </div>`;
}

function renderSession(){
  if(!session)return;
  const done=session.items.filter(x=>x.done).length;
  q('#sessionProgress').textContent=`${done} / ${session.items.length}`;
  q('#sessionTimer').textContent=fmt(elapsedMs()/1000);

  q('#sessionList').innerHTML=session.items.map((it,itemIndex)=>{
    const duration=ensureCountdown(it);
    const remaining=duration?getCountdownRemaining(it):null;
    const timerControls=duration
      ?`<div class="countdown-wrap">
          <button class="countdown-btn ${it.countdownRunning?'running':''} ${it.countdownExpired?'expired':''}" data-countdown-id="${it.id}" type="button">
            ${it.countdownExpired?'時間到':`${it.countdownRunning?'Ⅱ':'▶'} ${countdownFormat(remaining)}`}
          </button>
          <button class="countdown-reset" data-countdown-reset="${it.id}" type="button" aria-label="重設 ${esc(it.name)} 倒數">↺</button>
        </div>`
      :'';

    const round=roundIndexForItem(it,itemIndex,null);
    const prevRound=itemIndex>0?roundIndexForItem(session.items[itemIndex-1],itemIndex-1,null):null;
    const roundStart=round&&round!==prevRound;
    const roundLabel=roundLabelForItem(it,itemIndex,null);

    return `<div class="session-item ${it.done?'done':''} ${round?'round-coded':''} ${roundStart?'round-start':''}" ${round?`style="${roundStyle(round)}"`:''}>
      <div class="session-index">${it.index}</div>
      <div>
        <div class="session-name">${roundLabel?`<span class="session-round-badge">${esc(roundLabel)}</span>`:''}${esc(it.name)}</div>
        <div class="session-detail">${esc(it.detail)}</div>
      </div>
      <div class="session-actions">
        ${timerControls}
        <button class="btn check-btn ${it.done?'primary':''}" data-item-done="${it.id}">${it.done?'已完成':'完成'}</button>
      </div>
    </div>`;
  }).join('');

  qa('[data-item-done]').forEach(b=>b.onclick=()=>{
    const it=session.items.find(x=>x.id===b.dataset.itemDone);
    if(!it)return;
    it.done=!it.done;
    if(it.done&&ensureCountdown(it)){
      it.countdownRemaining=getCountdownRemaining(it);
      it.countdownRunning=false;
      it.countdownEndAt=null;
      it.countdownResumeAfterSessionPause=false;
    }
    renderSession();
  });
  qa('[data-countdown-id]').forEach(b=>b.onclick=()=>toggleCountdown(b.dataset.countdownId));
  qa('[data-countdown-reset]').forEach(b=>b.onclick=()=>resetCountdown(b.dataset.countdownReset));

  q('#finishChallengeBtn').disabled=done!==session.items.length;
  q('#pauseBtn').textContent=session.running?'暫停':'繼續';
  syncSessionLockUI();
  updateCountdownDisplays();
  saveActiveSession();
}

function pauseToggle(){
  if(!session)return;
  if(session.running){
    pauseRunningCountdownsForSession();
    session.pausedAt=Date.now();
    session.running=false;
  }else{
    session.pausedTotal+=Date.now()-session.pausedAt;
    session.pausedAt=null;
    session.running=true;
    resumeCountdownsAfterSessionPause();
  }
  renderSession();
}
function abandon(){if(!session)return;if(!confirm('確定放棄這次挑戰？本次不會登錄到成績牆。'))return;clearInterval(ticker);if(session.pageLocked)disarmSessionHistoryGuard();session=null;clearActiveSession();q('#trainingModal').classList.remove('open');syncSessionLockUI();toast('已放棄挑戰')}
function finishChallenge(){
  if(!session||session.items.some(x=>!x.done))return;
  if(session.running){session.pausedAt=Date.now();session.running=false}
  const completed={...session,totalSeconds:Math.round(elapsedMs()/1000)};
  clearInterval(ticker);
  if(session.pageLocked)disarmSessionHistoryGuard();
  clearActiveSession();
  q('#trainingModal').classList.remove('open');

  if(completed.isWallChallenge&&Number(completed.targetSeconds)>0&&completed.totalSeconds>Number(completed.targetSeconds)){
    q('#failureYourTime').textContent=fmt(completed.totalSeconds);
    q('#failureTargetTime').textContent=fmt(completed.targetSeconds);
    q('#challengeFailureModal').classList.add('open');
    finishedSession=null;
    session=null;
    syncSessionLockUI();
    return;
  }

  finishedSession=completed;
  q('#finishTime').textContent=fmt(finishedSession.totalSeconds);
  q('#finishType').textContent=finishedSession.challengeType;
  q('#finishItems').textContent=finishedSession.items.length;
  const custom=finishedSession.challengeType==='自訂挑戰';
  q('#finishChallengeNameWrap').style.display=custom?'grid':'none';
  q('#finishChallengeName').value=finishedSession.title||uniqueAutoCustomName();
  q('#finishNickname').value=localStorage.getItem('hyroxChallenge_lastNickname')||'';
  q('#finishNotes').value='';
  q('#finishModal').classList.add('open');
  session=null;
  syncSessionLockUI();
}
function skipLog(){finishedSession=null;q('#finishModal').classList.remove('open');toast('本次挑戰未登錄')}
async function saveLog(){
  if(!finishedSession)return;
  const nickname=q('#finishNickname').value.trim();
  if(!nickname){toast('請先輸入選手暱稱');return}
  if(nicknameLength(nickname)>NICKNAME_MAX_LENGTH){toast(`選手暱稱最多 ${NICKNAME_MAX_LENGTH} 字`);return}
  const isCustom=finishedSession.challengeType==='自訂挑戰';
  const editedTitle=isCustom?q('#finishChallengeName').value.trim():finishedSession.title;
  if(isCustom&&!editedTitle){toast('請替這個自訂挑戰取一個名稱');return}
  if(String(editedTitle||'').length>80){toast('挑戰名稱最多 80 個字');return}
  const cleanNotes=q('#finishNotes').value.trim();
  if(cleanNotes.length>500){toast('備註最多 500 個字');return}
  const baseTitle=stripChallengePrefix(editedTitle||finishedSession.title||'Challenge');
  const finalTitle=finishedSession.isWallChallenge?`發起挑戰：${baseTitle}`:baseTitle;
  const challengeSource=finishedSession.isWallChallenge?{
    source_result_id:String(finishedSession.sourceResultId||''),
    source_nickname:finishedSession.sourceNickname||'',
    source_title:baseTitle
  }:null;
  const row={
    id:uid(),created_at:new Date().toISOString(),nickname,
    session_date:new Date().toISOString().slice(0,10),
    division:finishedSession.division,
    workout_type:finishedSession.challengeType,
    workout_name:finalTitle,
    total_seconds:finishedSession.totalSeconds,
    run_distance_m:finishedSession.items.filter(x=>x.name==='Run').reduce((s,x)=>{
      if(Number(x.distance_m)>0)return s+Number(x.distance_m);
      const mm=String(x.detail||'').match(/[\d.]+/);return s+(mm?Number(mm[0])*1000:0)
    },0),
    stations:{
      challenge_items:finishedSession.items.map((x,i)=>({name:x.name,detail:x.detail,order:i+1,duration_seconds:x.duration_seconds??parseCountdownSeconds(x.detail,x.name),distance_m:x.distance_m??null,weight_kg:x.weight_kg??null,reps:x.reps??null,block_index:x.block_index??null,block_round:x.block_round??null,block_rounds:x.block_rounds??null,block_rest:x.block_rest??null})),
      ...(finishedSession.templateId?{challenge_template:{id:finishedSession.templateId,label:finishedSession.templateLabel||''}}:{}),
      ...(challengeSource?{challenge_source:challengeSource}:{})
    },
    notes:cleanNotes,completion_pct:100
  };
  q('#saveLogBtn').disabled=true;q('#saveLogBtn').textContent='登錄中…';
  try{
    const nicknameClaim=await claimNicknameForThisDevice(nickname);
    if(nicknameClaim==='taken'){
      toast('這個暱稱已由其他裝置使用，請換一個名字');
      return;
    }
    if(nicknameClaim!=='ok'){
      throw new Error('NICKNAME_CLAIM_'+(nicknameClaim||'UNKNOWN'));
    }
    await addResult(row);
    localStorage.setItem('hyroxChallenge_lastNickname',nickname);
    q('#finishModal').classList.remove('open');finishedSession=null;
    toast('已登錄到成績牆');switchTab('wall')
  }catch(e){
    console.error(e);
    if(String(e?.message||'').includes('NICKNAME_CLAIM_')) toast('暱稱保護尚未啟用，請先執行 nickname-lock.sql');
    else toast('登錄失敗，請稍後再試');
  }finally{
    q('#saveLogBtn').disabled=false;q('#saveLogBtn').textContent='登錄到成績牆';
  }
}
function challengeCount(id){
  const source=String(id);
  const row=allResults.find(r=>String(r.id)===source);
  return Math.max(0,Number(row?.challenge_count)||0);
}
function stripChallengePrefix(title){return String(title||'').replace(/^(?:發起挑戰：)+/,'').trim()}
function isChallengeResult(r){return !!(r?.stations?.challenge_source?.source_result_id)||/^發起挑戰：/.test(String(r?.workout_name||''))}

function normalizeDailyTemplateId(id){
  const map={heavyDay:'moverDay',dualEngine:'aerobicMax',noStop:'fatBurn'};
  return map[id]||id;
}
function simulationTemplateIdForRow(r){
  const saved=normalizeDailyTemplateId(String(r?.stations?.challenge_template?.id||'').trim());
  if(saved&&RACE_TEMPLATES[saved])return saved;

  const name=String(r?.workout_name||'');
  const legacyNames={
    '重裝日':'moverDay',
    '雙引擎':'aerobicMax',
    '不准停':'fatBurn'
  };
  for(const [oldName,newId] of Object.entries(legacyNames)){
    if(name.includes(oldName))return newId;
  }

  const found=Object.entries(RACE_TEMPLATES)
    .filter(([,t])=>t&&t.label)
    .find(([,t])=>name.includes(t.label));
  return normalizeDailyTemplateId(found?.[0]||'easyHybrid');
}
function wallGroup(r){
  if(r.workout_type==='自訂挑戰')return 'custom';

  if(isStandardRaceType(r.workout_type) || ['standardRace',TYRUN_TEMPLATE_ID].includes(String(r?.stations?.challenge_template?.id||''))){
    const templateId=String(r?.stations?.challenge_template?.id||'standardRace');
    const prefix=templateId===TYRUN_TEMPLATE_ID?'tyrun':'standard';
    const d=String(r.division||'').toLowerCase();
    if(d.includes('mixed'))return `${prefix}-mixed`;
    if(d.includes('women'))return `${prefix}-women`;
    if(d.includes('men'))return `${prefix}-men`;
    return `${prefix}-other`;
  }

  if(isSimulationType(r.workout_type)){
    return `simulation-${simulationTemplateIdForRow(r)}`;
  }

  return 'other';
}

function groupLabel(key){
  if(key==='standard-women')return 'HYROX｜女子';
  if(key==='standard-men')return 'HYROX｜男子';
  if(key==='standard-mixed')return 'HYROX｜Mixed';
  if(key==='tyrun-women')return 'TYRUN｜女子';
  if(key==='tyrun-men')return 'TYRUN｜男子';
  if(key==='tyrun-mixed')return 'TYRUN｜Mixed';
  if(String(key||'').startsWith('simulation-')){
    const id=String(key).replace('simulation-','');
    return RACE_TEMPLATES[id]?.label||'日常訓練';
  }
  return '挑戰';
}

function getChallengeItems(r){
  const items=r?.stations?.challenge_items;
  if(Array.isArray(items)&&items.length){
    const templateId=String(r?.stations?.challenge_template?.id||'');
    return applyLockedTemplateCorrections(
      templateId,
      items,
      {
        label: r?.stations?.challenge_template?.label || r?.workout_name || '',
        intensity: RACE_TEMPLATES?.[templateId]?.intensity
      }
    ).sort((a,b)=>(a.order||0)-(b.order||0));
  }

  const standardTemplateId=String(r?.stations?.challenge_template?.id||'');
  if(standardTemplateId===TYRUN_TEMPLATE_ID){
    return tyrunRaceItems(r.division||'Women Open').map((x,i)=>({...x,order:i+1}));
  }
  if(isStandardRaceType(r?.workout_type) || standardTemplateId==='standardRace'){
    return standardRaceItems(r.division||'Women Open').map((x,i)=>({...x,order:i+1}));
  }

  if(isSimulationType(r?.workout_type)){
    const tid=simulationTemplateIdForRow(r);
    return simulationItems(tid).map((x,i)=>({...x,order:i+1}));
  }

  return [];
}

function compactChallengeContent(r){
  const items=getChallengeItems(r);
  if(!items.length)return '';
  const parts=items.map(x=>[String(x.name||'').trim(),String(x.detail||'').trim()].filter(Boolean).join(' ')).filter(Boolean);
  return parts.join(' ｜ ');
}

function wallNoteText(r){
  return String(r?.notes||'').trim();
}

function rankText(rank){
  return '#'+String(Math.max(1,Number(rank)||1)).padStart(2,'0');
}

function rankToneClass(rank){
  const n=Number(rank)||999;
  return n===1?'wall-rank-1':n===2?'wall-rank-2':n===3?'wall-rank-3':'wall-rank-other';
}

function classicRows(groupKey){
  return allResults
    .filter(r=>wallGroup(r)===groupKey && Number(r.total_seconds)>0)
    .sort((a,b)=>(Number(a.total_seconds)||1e12)-(Number(b.total_seconds)||1e12)
      ||String(b.created_at||'').localeCompare(String(a.created_at||'')));
}

function dailyRows(){
  return allResults
    .filter(r=>isSimulationType(r.workout_type) && Number(r.total_seconds)>0)
    .sort((a,b)=>String(b.created_at||'').localeCompare(String(a.created_at||''))
      || (Number(a.total_seconds)||1e12)-(Number(b.total_seconds)||1e12));
}

function dailyTemplateRankMap(){
  const groups=new Map();
  allResults
    .filter(r=>isSimulationType(r.workout_type) && Number(r.total_seconds)>0)
    .forEach(r=>{
      const key=simulationTemplateIdForRow(r);
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(r);
    });
  const ranks=new Map();
  groups.forEach(rows=>{
    rows.sort((a,b)=>(Number(a.total_seconds)||1e12)-(Number(b.total_seconds)||1e12)
      ||String(b.created_at||'').localeCompare(String(a.created_at||'')));
    rows.forEach((r,i)=>ranks.set(String(r.id),i+1));
  });
  return ranks;
}

function publicChallengeTitle(value){
  let s=String(value||'Challenge');
  const legacy=/\b(?:STYREKX|HARCO)\b/gi;
  return s.replace(legacy,'Hybrid');
}

function cleanStoredTitle(r){
  return publicChallengeTitle(stripChallengePrefix(r?.workout_name||'Challenge'));
}

function wallNoteText(r){
  return String(r?.notes||'').trim();
}

function classicResultRow(r,rank,groupKey){
  const typeClass=`classic-${groupKey.replace('standard-','')}`;
  const note=wallNoteText(r);
  return `<div class="score-row classic-score-row ${typeClass} ${rankToneClass(rank)}" data-result-id="${esc(String(r.id||''))}" role="button" tabindex="0" title="點一下查看菜單內容" aria-label="查看 ${esc(cleanStoredTitle(r))} 菜單內容">
    <div class="wall-entry">
      <div class="wall-entry-rank" aria-label="第 ${rank} 名">
        <span>名次</span><strong>${rankText(rank)}</strong>
      </div>
      <div class="wall-entry-core">
        <div class="wall-entry-athlete" title="${esc(r.nickname||'未命名選手')}">${esc(r.nickname||'未命名選手')}</div>
        <div class="wall-entry-subline">
          <span class="wall-entry-title">${esc(cleanStoredTitle(r))}</span>
          <span class="wall-entry-date">${esc(r.session_date||'')}</span>
        </div>
        ${note?`<div class="wall-entry-note">${esc(note)}</div>`:''}
        ${roundStripHtml(getChallengeItems(r),r)}
      </div>
      <div class="wall-entry-result">
        <span>完成時間</span><strong>${fmt(r.total_seconds)}</strong>
      </div>
    </div>
  </div>`;
}

function dailyResultRow(r,templateRank){
  const id=simulationTemplateIdForRow(r);
  const t=RACE_TEMPLATES[id]||RACE_TEMPLATES.easyHybrid;
  const note=wallNoteText(r);
  return `<div class="score-row daily-score-row daily-${esc(id)} ${rankToneClass(templateRank)}" data-result-id="${esc(String(r.id||''))}" role="button" tabindex="0" title="點一下查看菜單內容" aria-label="查看 ${esc(t.label)} 菜單內容">
    <div class="wall-entry">
      <div class="wall-entry-rank" aria-label="同項訓練第 ${templateRank} 名">
        <span>同項排名</span><strong>${rankText(templateRank)}</strong>
      </div>
      <div class="wall-entry-core">
        <div class="wall-entry-athlete" title="${esc(r.nickname||'未命名選手')}">${esc(r.nickname||'未命名選手')}</div>
        <div class="wall-entry-subline">
          <span class="wall-entry-title">${esc(`Level ${levelNumber(t.intensity)}: ${t.label}`)}</span>
          <span class="wall-entry-date">${esc(r.session_date||'')}</span>
        </div>
        ${note?`<div class="wall-entry-note">${esc(note)}</div>`:''}
        ${roundStripHtml(getChallengeItems(r),r)}
      </div>
      <div class="wall-entry-result">
        <span>完成時間</span><strong>${fmt(r.total_seconds)}</strong>
      </div>
    </div>
  </div>`;
}


function renderClassicWall(){
  const groups=[
    ['standard-women','#womenResults','#womenCount'],
    ['standard-men','#menResults','#menCount'],
    ['standard-mixed','#mixedResults','#mixedCount'],
    ['tyrun-women','#tyrunWomenResults','#tyrunWomenCount'],
    ['tyrun-men','#tyrunMenResults','#tyrunMenCount'],
    ['tyrun-mixed','#tyrunMixedResults','#tyrunMixedCount']
  ];

  groups.forEach(([groupKey,boxSel,countSel])=>{
    const rows=classicRows(groupKey);
    const box=q(boxSel);
    const count=q(countSel);
    if(count)count.textContent=`${rows.length} 筆`;
    if(!box)return;

    if(groupKey.startsWith('tyrun-')){
      if(!rows.length){
        box.innerHTML='<div class="score-empty compact-empty">目前還沒有成績。</div>';
        return;
      }
      box.innerHTML=['Scaled','Open','Pro'].map(level=>{
        const levelRows=rows.filter(r=>tyrunDivisionParts(r.division).level===level);
        if(!levelRows.length)return '';
        return `<div class="classic-subgroup">
          <div class="classic-subgroup-head"><span>${level}</span><b>${levelRows.length} 筆</b></div>
          ${levelRows.map((r,i)=>classicResultRow(r,i+1,groupKey)).join('')}
        </div>`;
      }).join('');
      return;
    }

    if(groupKey.startsWith('standard-')){
      if(!rows.length){
        box.innerHTML='<div class="score-empty compact-empty">目前還沒有成績。</div>';
        return;
      }

      const levels=groupKey==='standard-mixed'?['Open']:['Open','Pro'];
      box.innerHTML=levels.map(level=>{
        const levelRows=rows.filter(r=>hyroxDivisionParts(r.division).level===level);
        if(!levelRows.length)return '';
        return `<div class="classic-subgroup">
          <div class="classic-subgroup-head"><span>${level}</span><b>${levelRows.length} 筆</b></div>
          ${levelRows.map((r,i)=>classicResultRow(r,i+1,groupKey)).join('')}
        </div>`;
      }).join('');
      return;
    }
  });
}

function renderDailyWall(){
  const box=q('#dailyResults');
  const count=q('#dailyCount');
  const rows=dailyRows();
  if(count)count.textContent=`${rows.length} 筆`;
  if(!box)return;
  const rankMap=dailyTemplateRankMap();
  box.innerHTML=rows.length
    ?rows.map(r=>dailyResultRow(r,rankMap.get(String(r.id))||1)).join('')
    :'<div class="score-empty compact-empty">目前還沒有日常訓練成績。</div>';
}

function openWorkoutDetail(resultId){
  const r=allResults.find(x=>String(x.id)===String(resultId));
  if(!r){toast('找不到這筆成績');return}
  const items=getChallengeItems(r);
  const templateId=isSimulationType(r.workout_type)?simulationTemplateIdForRow(r):null;
  const title=templateId&&RACE_TEMPLATES[templateId]
    ?RACE_TEMPLATES[templateId].label
    :cleanStoredTitle(r);
  q('#workoutDetailTitle').textContent=title||'菜單內容';
  q('#workoutDetailMeta').textContent=[r.nickname||'未命名選手',r.session_date||'',`完成時間 ${fmt(r.total_seconds)}`].filter(Boolean).join(' · ');
  q('#workoutDetailSummary').textContent=`共 ${items.length} 個項目${Number(r.run_distance_m)>0?` · Run ${(Number(r.run_distance_m)/1000).toFixed(1)} km`:' · No Run'}`;

  q('#workoutDetailList').innerHTML=items.length
    ?items.map((x,i)=>{
      const round=roundIndexForItem(x,i,r);
      const prevRound=i>0?roundIndexForItem(items[i-1],i-1,r):null;
      const start=round&&round!==prevRound;
      const label=roundLabelForItem(x,i,r);
      return `<div class="workout-detail-item ${round?'round-coded':''} ${start?'round-start':''}" ${round?`style="${roundStyle(round)}"`:''}>
        <div class="workout-detail-index">${i+1}</div>
        <div>
          ${label?`<div class="workout-detail-round">${esc(label)}</div>`:''}
          <div class="workout-detail-name">${esc(x.name||'Training')}</div>
          ${x.detail?`<div class="workout-detail-spec">${esc(x.detail)}</div>`:''}
        </div>
      </div>`;
    }).join('')
    :'<div class="score-empty compact-empty">這筆舊紀錄沒有保存菜單內容。</div>';

  q('#workoutDetailModal').classList.add('open');
}

function closeWorkoutDetail(){q('#workoutDetailModal').classList.remove('open')}

function wallCardStats(){
  const configs=[
    {key:'standard-women',rows:classicRows('standard-women'),fallback:1},
    {key:'standard-men',rows:classicRows('standard-men'),fallback:2},
    {key:'standard-mixed',rows:classicRows('standard-mixed'),fallback:3},
    {key:'tyrun-women',rows:classicRows('tyrun-women'),fallback:4},
    {key:'tyrun-men',rows:classicRows('tyrun-men'),fallback:5},
    {key:'tyrun-mixed',rows:classicRows('tyrun-mixed'),fallback:6},
    {key:'daily',rows:dailyRows(),fallback:0}
  ];
  return configs.map(cfg=>{
    const latest=cfg.rows.reduce((max,r)=>{
      const t=Date.parse(r?.created_at||r?.session_date||'')||0;
      return Math.max(max,t);
    },0);
    return {...cfg,count:cfg.rows.length,latest};
  });
}

function sortWallCards(){
  const grid=q('.wall-grid');
  if(!grid)return;
  // Most recently updated category first. Total record count does not matter.
  // Example: new result in A -> A first; then new result in B -> B first, A second.
  const stats=wallCardStats().sort((a,b)=>
    (b.latest-a.latest) ||
    (a.fallback-b.fallback)
  );
  stats.forEach(stat=>{
    const card=grid.querySelector(`[data-wall-card="${stat.key}"]`);
    if(card)grid.appendChild(card);
  });
}

function renderWall(){
  renderClassicWall();
  renderDailyWall();
  sortWallCards();
}
window.addEventListener('popstate',()=>{
  if(session?.pageLocked){
    sessionHistoryGuardArmed=false;
    armSessionHistoryGuard();
    q('#trainingModal').classList.add('open');
    renderSession();
    toast('挑戰頁面已鎖定');
  }else{
    sessionHistoryGuardArmed=false;
  }
});
window.addEventListener('beforeunload',e=>{
  if(!session)return;
  saveActiveSession();
  if(session.pageLocked){
    e.preventDefault();
    e.returnValue='';
  }
});
window.addEventListener('pagehide',()=>saveActiveSession());
document.addEventListener('visibilitychange',()=>{
  saveActiveSession();
  if(!document.hidden&&session?.pageLocked){
    q('#trainingModal').classList.add('open');
    renderSession();
  }
});


/* ===== CLEAN CHALLENGE HOME + DAILY MENU POPUP ===== */
function dailyTemplateLockedForHome(templateId){
  return typeof templateHasCompletedResult==='function'
    ?templateHasCompletedResult(templateId)
    :false;
}

function syncDailyHomeSummary(){
  const t=currentRaceTemplate();
  if(!t)return;

  const blocks=templateItemsToBlocks(rawTemplateItems(t,selectedDailyCardio()));
  const level=q('#dailyLevelStat');
  const duration=q('#dailyDurationStat');
  const block=q('#dailyBlockStat');

  if(level)level.textContent=`Level ${levelNumber(t.intensity)}`;
  if(duration){
    const raw=String(t.duration||'').trim();
    duration.textContent=raw
      .replace(/^約\s*/,'')
      .replace(/\s*分鐘$/,'')
      || '—';
  }
  if(block)block.textContent=String(blocks.length||0);
}

function syncDailyLauncher(){
  syncDailyHomeSummary();
}
function syncDailyModalCardio(){
  const source=q('#dailyCardioChoice');
  const modal=q('#dailyModalCardioChoice');
  if(!source||!modal)return;

  if(!modal.options.length){
    modal.innerHTML=[...source.options].map(opt=>`<option value="${esc(opt.value)}">${esc(opt.textContent||opt.value)}</option>`).join('');
  }
  modal.value=source.value;
}

function dailyModalBlocksHtml(t){
  const blocks=templateItemsToBlocks(rawTemplateItems(t,selectedDailyCardio()));
  return blocks.map((block,bi)=>{
    const [accent,wash]=roundVisual(bi+1);
    const rounds=Math.max(1,Number(block.rounds)||1);
    const rest=String(block.rest||'—');
    const meta=[
      `${rounds} round${rounds>1?'s':''}`,
      rest&&rest!=='—'?`休息 ${rest}`:''
    ].filter(Boolean).join(' · ');

    return `<div class="daily-modal-block" style="--round-accent:${accent};--round-wash:${wash}">
      <div class="daily-modal-block-head"><strong>BLOCK ${bi+1}</strong><span>${esc(meta)}</span></div>
      <div>
        ${block.items.map((x,ii)=>`<div class="daily-modal-item">
          <div class="daily-modal-item-num">${ii+1}</div>
          <b>${esc(x.name)}</b>
          <span>${esc(x.detail||'')}</span>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

function syncDailyMenuModalActions(){
  const t=currentRaceTemplate();
  const edit=q('#dailyModalEditBtn');
  const lock=q('#dailyModalLockState');
  if(!t)return;

  const locked=typeof templateHasCompletedResult==='function'
    ?templateHasCompletedResult(t.id)
    :false;
  const isAdmin=!!dailyMenuAdminName;

  if(lock){
    lock.textContent=locked?'🔒 已鎖定':'可修改';
    lock.classList.toggle('locked',locked);
    lock.hidden=!isAdmin&&!locked;
  }

  if(edit){
    edit.hidden=!isAdmin;
    edit.disabled=locked;
    edit.classList.toggle('locked',locked);
    edit.textContent=locked?'🔒 已鎖定':'修改菜單';
  }
}

function renderDailyMenuModal(){
  const t=currentRaceTemplate();
  if(!t)return;

  syncDailyLauncher();
  syncDailyModalCardio();

  q('#dailyModalLevel').textContent=`Level ${levelNumber(t.intensity)}`;
  q('#dailyModalTitle').textContent=t.label||t.id;
  q('#dailyModalDescription').textContent=t.description||'';
  q('#dailyModalEquipment').textContent=t.equipment?`器材：${t.equipment}`:'';
  q('#dailyModalBlocks').innerHTML=dailyModalBlocksHtml(t);
  q('#dailyModalTotal').textContent=t.total||'';

  const cardioWrap=q('#dailyModalCardioWrap');
  if(cardioWrap)cardioWrap.hidden=t.id!=='coreSculpt';

  syncDailyMenuModalActions();
}

function syncClassicMenuModalTitle(){
  const title=q('#classicMenuModalTitle');
  if(!title)return;
  title.textContent=standardRaceFormatLabel(currentStandardRaceFormat());
}

function openClassicMenuModal(){
  renderStandardRacePreview();
  syncClassicMenuModalTitle();
  q('#classicMenuModal')?.classList.add('open');
  const body=q('#classicMenuModal .menu-popup-body');
  if(body)body.scrollTop=0;
}

function closeClassicMenuModal(){
  q('#classicMenuModal')?.classList.remove('open');
}

function openDailyMenuModal(){
  renderDailyMenuModal();
  const modal=q('#dailyMenuModal');
  modal?.classList.add('open');
  const preview=q('#dailyMenuModal .single-menu-preview');
  if(preview)preview.scrollTop=0;
}
function closeDailyMenuModal(){
  q('#dailyMenuModal')?.classList.remove('open');
}


/* ===== DAILY MENU ADMIN INTEGRATION v1 ===== */
/* ============================================================
   DAILY MENU ADMIN PATCH
   Paste this INSIDE the existing (() => { ... }) block,
   immediately BEFORE the final initialization line that starts:
       renderPicker();updateCustomPreview();...
   ============================================================ */

let dailyMenuAdminName = '';
let editingDailyTemplateId = null;
let editingDailyTemplateMeta = null;
let baseDailyTemplateIds = [];
let cloudDailyTemplateIds = [];

const DAILY_CARDIO_PLACEHOLDER = 'Cardio 自選';
const DAILY_CARDIO_DB_TOKEN = '__CARDIO__';

// Let the existing Custom Builder represent a replaceable cardio station.
if (!CUSTOM_EXERCISES.some(x => x.name === DAILY_CARDIO_PLACEHOLDER)) {
  CUSTOM_EXERCISES.push({name: DAILY_CARDIO_PLACEHOLDER, cat: 'Cardio'});
}

function templateHasCompletedResult(templateId) {
  const id = String(templateId || '');
  return (allResults || []).some(r =>
    Number(r?.completion_pct) === 100 &&
    String(r?.stations?.challenge_template?.id || '') === id
  );
}


/* ===== LOCKED TEMPLATE DATA CORRECTIONS =====
   These are factual corrections to already-completed/locked templates.
   They do NOT unlock the template or allow general editing.
*/
function applyLockedTemplateCorrections(templateId, items, meta={}) {
  const id = String(templateId || '');
  const list = Array.isArray(items) ? items.map(x => ({...x})) : [];

  const knownTemplate =
    (typeof RACE_TEMPLATES !== 'undefined' && RACE_TEMPLATES && RACE_TEMPLATES[id])
      ? RACE_TEMPLATES[id]
      : null;

  const label = String(
    meta?.label ??
    knownTemplate?.label ??
    ''
  ).trim();

  const rawIntensity = Number(
    meta?.intensity ??
    knownTemplate?.intensity
  );
  const intensity = Number.isFinite(rawIntensity) ? Math.round(rawIntensity) : null;

  const normalizedName = value => String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  const setDistance = (item, metres) => {
    const distance = Math.max(0, Number(metres) || 0);
    if (!distance) return;

    const oldDetail = String(item?.detail || '').trim();
    const distancePattern = /\b\d+(?:\.\d+)?\s*m\b/i;

    item.distance_m = distance;
    item.detail = distancePattern.test(oldDetail)
      ? oldDetail.replace(distancePattern, `${distance} m`)
      : `${distance} m${oldDetail ? ` · ${oldDetail}` : ''}`;
  };

  // 平凡的一次訓練 (engineBuilder):
  // The completed session used 10 reps for Band Assisted Pull Up,
  // but the saved template omitted the rep prescription.
  if (id === 'engineBuilder') {
    list.forEach(x => {
      if (normalizedName(x?.name) === 'bandassistedpullup') {
        if (!String(x?.detail || '').trim()) x.detail = '10 reps';
        if (!(Number(x?.reps) > 0)) x.reps = 10;
      }
    });
  }

  /*
    Level 7「無跑步模擬賽」— factual corrections recorded 2026-09-13.
    This template has already been completed, so it stays locked.
    We correct the factual distances at read/render time instead of
    reopening historical content for general editing.

      Block 2 · Sled Pull       = 80 m
      Block 4 · Sandbag Lunges = 80 m
  */
  const isLevel7NoRunSimulation =
    label.includes('無跑步模擬賽') &&
    (intensity == null || intensity === 7);

  if (isLevel7NoRunSimulation) {
    list.forEach(x => {
      const block = Number(x?.block_index) || 0;
      const name = normalizedName(x?.name);

      if (block === 2 && name === 'sledpull') {
        setDistance(x, 80);
      }

      if (block === 4 && name === 'sandbaglunges') {
        setDistance(x, 80);
      }
    });
  }

  return list;
}

function dailyTemplateFromCloud(row) {
  const rawItems = applyLockedTemplateCorrections(
    row?.template_id,
    Array.isArray(row?.items) ? row.items : [],
    {label: row?.label, intensity: row?.intensity}
  );
  return {
    id: String(row.template_id),
    label: String(row.label || row.template_id),
    intensity: levelNumber(row.intensity),
    duration: String(row.duration || '自訂'),
    description: String(row.description || ''),
    equipment: String(row.equipment || ''),
    total: String(row.total || ''),
    cloudManaged: true,
    build(cardioChoice) {
      const cardio = cardioChoice || selectedDailyCardio();
      return rawItems.map(x => ({
        name: x?.name === DAILY_CARDIO_DB_TOKEN ? cardio : String(x?.name || ''),
        detail: String(x?.detail || ''),
        duration_seconds: Number(x?.duration_seconds) > 0 ? Number(x.duration_seconds) : null,
        distance_m: Number(x?.distance_m) > 0 ? Number(x.distance_m) : null,
        weight_kg: x?.weight_kg ?? null,
        reps: Number(x?.reps) > 0 ? Number(x.reps) : null,
        block_index: Number(x?.block_index) > 0 ? Number(x.block_index) : null,
        block_rounds: Number(x?.block_rounds) > 0 ? Number(x.block_rounds) : 1,
        block_rest: String(x?.block_rest || '—')
      }));
    }
  };
}

async function loadCloudDailyTemplates() {
  if (!isConfigured()) return;

  const rows = await api(
    'daily_templates?select=template_id,label,intensity,duration,description,equipment,total,items,updated_by,updated_at&order=intensity.asc,updated_at.asc'
  );

  cloudDailyTemplateIds = [];

  (rows || []).forEach(row => {
    const t = dailyTemplateFromCloud(row);
    RACE_TEMPLATES[t.id] = t;
    cloudDailyTemplateIds.push(t.id);
  });
}

function rebuildDailyTemplateSelect() {
  const select = q('#raceTemplate');
  if (!select) return;

  const previous = select.value;
  const ids = [...new Set([...baseDailyTemplateIds, ...cloudDailyTemplateIds])]
    .filter(id => RACE_TEMPLATES[id]);

  select.innerHTML = ids.map(id => {
    const t = RACE_TEMPLATES[id];
    return `<option value="${esc(id)}" data-level="${levelNumber(t.intensity)}">Level ${levelNumber(t.intensity)} | ${esc(t.label)}</option>`;
  }).join('');

  if (ids.includes(previous)) select.value = previous;
  else if (ids.length) select.value = ids[0];
}

function rpcStringValue(value) {
  if (Array.isArray(value)) value = value[0];
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const vals = Object.values(value);
    if (vals.length === 1 && typeof vals[0] !== 'object') value = vals[0];
  }
  if (value == null) return '';
  return String(value).replace(/^"|"$/g, '').trim();
}

async function detectDailyMenuAdmin() {
  dailyMenuAdminName = '';
  if (!isConfigured()) return;

  try {
    const result = await api('rpc/menu_admin_for_device', {
      method: 'POST',
      body: JSON.stringify({
        p_device_secret: getNicknameDeviceSecret()
      })
    });
    dailyMenuAdminName = rpcStringValue(result);
  } catch (e) {
    console.warn('Daily menu admin check unavailable', e);
    dailyMenuAdminName = '';
  }
}

async function ensureDailyMenuAdminDetected(maxAttempts=3) {
  for (let attempt=1; attempt<=maxAttempts; attempt++) {
    await detectDailyMenuAdmin();
    if (dailyMenuAdminName) return true;
    if (attempt < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 450 * attempt));
    }
  }
  return false;
}

function injectDailyAdminStyles() {
  if (q('#dailyMenuAdminStyles')) return;

  const style = document.createElement('style');
  style.id = 'dailyMenuAdminStyles';
  style.textContent = `
    .daily-admin-tools{
      display:none;
      margin-top:10px;
      padding:10px;
      border:1px solid #2b3849;
      background:#0b1119;
      border-radius:11px;
    }
    .daily-admin-tools.show{display:block}
    .daily-admin-row{
      display:flex;
      gap:8px;
      align-items:center;
      justify-content:space-between;
      flex-wrap:wrap;
    }
    .daily-admin-copy{
      color:#8f9dad;
      font-size:10px;
      line-height:1.45;
    }
    .daily-admin-copy strong{color:#c8d2dd}
    .daily-admin-locked{
      color:#d5a79c;
    }
    .daily-admin-custom{
      display:none;
      grid-column:1/-1;
      padding:10px;
      border:1px solid #2b3849;
      background:#0b1119;
      border-radius:11px;
    }
    .daily-admin-custom.show{display:grid;gap:8px}
    .daily-admin-meta-grid{
      display:grid;
      grid-template-columns:120px 1fr;
      gap:8px;
    }
    .daily-admin-meta-grid .full{grid-column:1/-1}
    .custom-detail-admin{
      display:grid;
      gap:3px;
      margin-top:6px;
    }
    .custom-detail-admin label{
      font-size:8px;
      color:#738094;
      font-weight:850;
    }
    .custom-detail-admin input{
      min-height:31px;
      padding:6px 7px;
      border-radius:7px;
      font-size:10px;
      background:#0a0f16;
    }
    #saveDailyTemplateBtn{display:none}
    #saveDailyTemplateBtn.show{display:inline-flex}
    @media(max-width:640px){
      .daily-admin-meta-grid{grid-template-columns:1fr}
      .daily-admin-meta-grid .full{grid-column:auto}
    }
  `;
  document.head.appendChild(style);
}

function ensureDailyAdminUI() {
  injectDailyAdminStyles();

  if (!q('#dailyAdminTools')) {
    const preview = q('#dailyPreview');
    if (preview) {
      const wrap = document.createElement('div');
      wrap.id = 'dailyAdminTools';
      wrap.className = 'daily-admin-tools';
      wrap.innerHTML = `
        <div class="daily-admin-row">
          <div class="daily-admin-copy" id="dailyAdminStatus"></div>
          <button type="button" class="btn small" id="editDailyTemplateBtn">✏ 修改菜單</button>
        </div>
      `;
      preview.insertAdjacentElement('afterend', wrap);

      q('#editDailyTemplateBtn').addEventListener('click', editCurrentDailyTemplate);
    }
  }

  const customCard = q('#customName')?.closest('.challenge-card.custom');
  const customGrid = customCard?.querySelector('.challenge-grid');

  if (customGrid && !q('#dailyAdminCustomSettings')) {
    const wrap = document.createElement('div');
    wrap.id = 'dailyAdminCustomSettings';
    wrap.className = 'daily-admin-custom';
    wrap.innerHTML = `
      <div class="helper"><strong>日常訓練設定</strong>｜只有管理員裝置看得到</div>
      <div class="daily-admin-meta-grid">
        <div class="field">
          <label>Level</label>
          <select id="customDailyLevel">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div class="field">
          <label>時間說明</label>
          <input id="customDailyDuration" maxlength="80" placeholder="例如 35–45 min">
        </div>
        <div class="field full">
          <label>簡介</label>
          <input id="customDailyDescription" maxlength="500" placeholder="例如 中等強度 mixed conditioning">
        </div>
        <div class="field full">
          <label>器材</label>
          <input id="customDailyEquipment" maxlength="300" placeholder="例如 跑步機／TRX／壺鈴">
        </div>
      </div>
      <div class="helper" id="dailyEditorModeText">建立完成後可加入日常訓練。</div>
    `;
    customGrid.appendChild(wrap);
  }

  if (!q('#saveDailyTemplateBtn')) {
    const startBtn = q('#startCustomBtn');
    if (startBtn) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'saveDailyTemplateBtn';
      btn.className = 'btn small';
      btn.textContent = '＋ 加入日常訓練';
      btn.addEventListener('click', saveCustomBuilderAsDailyTemplate);
      startBtn.insertAdjacentElement('beforebegin', btn);
    }
  }
}

function updateDailyAdminUI() {
  ensureDailyAdminUI();

  const tools = q('#dailyAdminTools');
  const status = q('#dailyAdminStatus');
  const editBtn = q('#editDailyTemplateBtn');
  const customSettings = q('#dailyAdminCustomSettings');
  const saveBtn = q('#saveDailyTemplateBtn');

  const isAdmin = !!dailyMenuAdminName;
  tools?.classList.toggle('show', isAdmin);
  customSettings?.classList.toggle('show', isAdmin);
  saveBtn?.classList.toggle('show', isAdmin);

  if (!isAdmin) return;

  const t = currentRaceTemplate();
  const locked = templateHasCompletedResult(t?.id);

  if (status) {
    status.innerHTML = locked
      ? `<strong>${esc(dailyMenuAdminName)}</strong>｜<span class="daily-admin-locked">🔒 這份菜單已有完成紀錄，不能修改</span>`
      : `<strong>${esc(dailyMenuAdminName)}</strong>｜這份菜單尚未被完成，可以修改`;
  }

  if (editBtn) {
    editBtn.disabled = locked;
    editBtn.textContent = locked ? '🔒 已鎖定' : '✏ 修改菜單';
  }

  if (saveBtn) {
    saveBtn.textContent = editingDailyTemplateId ? '✓ 儲存菜單修改' : '＋ 加入日常訓練';
  }

  const mode = q('#dailyEditorModeText');
  if (mode) {
    mode.textContent = editingDailyTemplateId
      ? `正在修改：${RACE_TEMPLATES[editingDailyTemplateId]?.label || editingDailyTemplateId}`
      : '建立完成後可加入日常訓練。';
  }

  if(typeof syncDailyMenuModalActions==='function')syncDailyMenuModalActions();
  if(typeof syncDailyLauncher==='function')syncDailyLauncher();
}

function customItemForEditor(x) {
  return {
    id: uid(),
    name: String(x?.name || ''),
    distance: Number(x?.distance_m) > 0 ? Number(x.distance_m) : '',
    weight: x?.weight_kg ?? '',
    reps: Number(x?.reps) > 0 ? Number(x.reps) : '',
    detailText: String(x?.detail || '')
  };
}

let dailyEditorBlocks=[];
let dailyEditorActiveBlock=0;
let dailyEditorPickerTarget=null;

function dailyEditorItemFromTemplate(x){
  return {
    id:uid(),
    name:String(x?.name||''),
    detail:String(x?.detail||''),
    distance_m:x?.distance_m??null,
    weight_kg:x?.weight_kg??null,
    reps:x?.reps??null
  };
}
function dailyEditorBlocksFromItems(items){
  return templateItemsToBlocks(items,4).map(block=>({
    id:uid(),
    rounds:Math.max(1,Math.min(20,Number(block.rounds)||1)),
    rest:String(block.rest||'—'),
    collapsed:false,
    items:block.items.map(dailyEditorItemFromTemplate)
  }));
}
function ensureFriendlyDailyEditorStyles(){
  if(q('#friendlyDailyEditorStyles'))return;
  const style=document.createElement('style');
  style.id='friendlyDailyEditorStyles';
  style.textContent=`
    .daily-editor-card{width:min(960px,100%);max-height:94vh;display:flex;flex-direction:column;overflow:hidden}
    .daily-editor-body{overflow:auto;padding:2px 1px 12px}
    .daily-editor-meta{display:grid;grid-template-columns:1.3fr 110px 180px;gap:9px;margin-top:14px}
    .daily-editor-meta .full{grid-column:1/-1}
    .daily-editor-section{margin-top:15px;padding-top:13px;border-top:1px solid #273345}
    .daily-editor-section-head{display:flex;justify-content:space-between;align-items:end;gap:10px;margin-bottom:9px}
    .daily-editor-section-head b{font-size:13px}.daily-editor-section-head span{font-size:9.5px;color:#778597}
    .daily-block-nav-wrap{position:sticky;top:0;z-index:8;margin-bottom:10px;padding:7px;border:1px solid #263243;border-radius:11px;background:rgba(13,19,28,.96);backdrop-filter:blur(10px)}
    .daily-block-nav{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none}.daily-block-nav::-webkit-scrollbar{display:none}
    .daily-block-tab{flex:0 0 auto;min-width:76px;min-height:39px;padding:6px 9px;border:1px solid #344255;border-radius:9px;background:#111923;color:#aab6c3;font-size:9.5px;font-weight:900;text-align:center}
    .daily-block-tab span{display:block;margin-top:2px;font-size:7.5px;color:#718093;font-weight:700}
    .daily-block-tab.active{color:#fff;border-color:var(--accent,#70ded8);box-shadow:inset 0 -3px 0 var(--accent,#70ded8);background:#17202b}
    .daily-editor-blocks{display:grid;gap:13px}
    .daily-editor-block{--accent:#70ded8;--wash:rgba(112,222,216,.08);border:1px solid var(--accent);border-radius:14px;overflow:hidden;background:#0d141d}
    .daily-editor-block-head{display:grid;grid-template-columns:72px minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px 11px;border-top:4px solid var(--accent);border-bottom:1px solid rgba(255,255,255,.065);background:linear-gradient(90deg,var(--wash),transparent 48%),#121a24}
    .daily-editor-block-index{display:flex;align-items:baseline;gap:5px}.daily-editor-block-index span{font-size:7.5px;letter-spacing:.11em;color:#758397;font-weight:900}.daily-editor-block-index strong{font-size:22px;line-height:1;color:var(--accent);font-weight:950}
    .daily-editor-block-meta{display:flex;gap:6px;flex-wrap:wrap}.daily-editor-block-pill{display:flex;align-items:center;gap:5px;min-height:30px;padding:4px 7px;border:1px solid #344255;border-radius:8px;background:#0d141d}.daily-editor-block-pill label{font-size:7.5px;color:#7f8d9f}.daily-editor-block-pill select,.daily-editor-block-pill input{width:auto;min-width:48px;min-height:22px;padding:2px 4px;border:0;background:transparent;box-shadow:none;font-size:9.5px}.daily-editor-block-pill input{min-width:82px}
    .daily-editor-block-actions{display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end}.daily-editor-block-actions button{min-height:29px;padding:5px 7px;font-size:9px}
    .daily-editor-block-body{padding:10px 11px 11px}.daily-editor-block.collapsed .daily-editor-block-body{display:none}.daily-editor-block.collapsed .daily-editor-block-head{border-bottom:0}
    .daily-editor-items{display:grid;gap:6px}.daily-editor-item{display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:8px;align-items:center;padding:9px;border:1px solid #293648;background:#0a1017;border-radius:10px}
    .daily-editor-index{width:27px;height:27px;display:grid;place-items:center;border-radius:7px;background:#172230;color:var(--accent);font-size:9px;font-weight:950}
    .daily-editor-item-main{min-width:0}.daily-editor-item-name{font-size:11.5px;font-weight:900;line-height:1.25}.daily-editor-detail{width:100%;margin-top:5px;min-height:31px;padding:5px 7px;border-radius:7px;font-size:10px}
    .daily-editor-item-actions{display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end}.daily-editor-replace{min-height:29px;padding:5px 7px;border:1px solid #6c5047;border-radius:8px;background:#211814;color:#ffc0aa;font-size:9px;font-weight:900}.daily-editor-item-actions .order-btn{width:29px;height:29px;min-height:29px}
    .daily-editor-insert-row{display:flex;justify-content:center}.daily-editor-insert{margin:-1px 0;border:1px dashed #3b4a5d;border-radius:999px;background:#0d141c;color:#8796aa;padding:4px 10px;font-size:8px}
    .daily-editor-add-to-block{width:100%;margin-top:8px;min-height:34px;border:1px dashed var(--accent);border-radius:8px;background:#0c131b;color:#aebac7;font-size:9.5px;font-weight:850}
    .daily-editor-add-block{width:100%;margin-top:11px;min-height:40px;border:1px dashed #675249;border-radius:10px;background:#171315;color:#ffc0aa;font-size:10px;font-weight:900}
    .daily-editor-footer{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap;margin:12px -17px -17px;padding:12px 17px 17px;border-top:1px solid #303b4d;background:#111722}
    .daily-picker-card{width:min(760px,100%);max-height:88vh;display:flex;flex-direction:column;overflow:hidden}.daily-picker-body{overflow:auto}.daily-picker-tools{display:grid;grid-template-columns:minmax(0,1fr) 150px;gap:7px;margin:12px 0 9px}.daily-picker-picks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.daily-picker-pick{min-height:42px;text-align:left;padding:8px 10px;border:1px solid #324054;background:#0d151f;color:#d6dee8;border-radius:9px}.daily-picker-pick b{display:block;font-size:10.5px}.daily-picker-pick span{display:block;margin-top:3px;color:#788698;font-size:8px}.daily-picker-custom{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px;margin-top:11px;padding-top:11px;border-top:1px solid #263244}
    @media(max-width:640px){
      .daily-editor-card{height:100dvh;max-height:100dvh;border-radius:0;padding-top:calc(14px + env(safe-area-inset-top))}
      .daily-editor-meta{grid-template-columns:1fr}.daily-editor-meta .full{grid-column:auto}
      .daily-editor-section-head span{display:none}.daily-editor-blocks{gap:8px}.daily-editor-block{display:none}.daily-editor-block.mobile-active{display:block}
      .daily-editor-block-head{grid-template-columns:64px minmax(0,1fr);gap:7px;padding:9px}.daily-editor-block-actions{grid-column:2;justify-content:flex-start}.daily-editor-block-meta{gap:4px}.daily-editor-block-pill{min-height:28px;padding:3px 5px}.daily-editor-block-pill input{min-width:70px}
      .daily-editor-block-body{padding:9px}.daily-editor-item{grid-template-columns:28px minmax(0,1fr);padding:8px}.daily-editor-item-actions{grid-column:2;justify-content:flex-start}.daily-editor-footer{margin:10px -12px calc(-12px - env(safe-area-inset-bottom));padding:10px 12px calc(10px + env(safe-area-inset-bottom))}.daily-editor-footer .btn{flex:1 1 45%}
      .daily-picker-card{height:86dvh;max-height:86dvh;border-radius:20px 20px 0 0}.daily-picker-tools{grid-template-columns:1fr 120px}.daily-picker-picks{grid-template-columns:1fr}.daily-picker-custom{grid-template-columns:1fr}
    }
  `;
  document.head.appendChild(style);
}
function dailyEditorAccent(index){return dailyBlockAccent(index)}
function ensureDailyTemplateEditorModal(){
  if(q('#dailyTemplateEditorModal'))return;
  ensureFriendlyDailyEditorStyles();
  const modal=document.createElement('div');
  modal.className='modal';modal.id='dailyTemplateEditorModal';
  modal.innerHTML=`
    <div class="modal-card daily-editor-card">
      <div class="modal-head"><div><h3>修改日常菜單</h3><div class="modal-sub">以 Block 編排。手機可直接切換 Block，不需要一路往下滑。</div></div><button class="btn small ghost" id="closeDailyEditorBtn" type="button">關閉</button></div>
      <div class="daily-editor-body">
        <div class="daily-editor-meta">
          <div class="field"><label>菜單名稱</label><input id="dailyEditorName" maxlength="80"></div>
          <div class="field"><label>Level</label><select id="dailyEditorLevel">${[1,2,3,4,5,6,7,8,9,10].map(n=>`<option value="${n}">${n}</option>`).join('')}</select></div>
          <div class="field"><label>預估時間</label><input id="dailyEditorDuration" maxlength="80" placeholder="例如 45–60 分鐘"></div>
          <div class="field full"><label>簡介</label><textarea id="dailyEditorDescription" maxlength="500" placeholder="訓練目的、強度、安排方式…"></textarea></div>
          <div class="field full"><label>器材</label><input id="dailyEditorEquipment" maxlength="300" placeholder="例如 TRX／Box／Medicine Ball"></div>
        </div>
        <div class="daily-editor-section">
          <div class="daily-editor-section-head"><b>菜單內容</b><span>Block 依序編號；每個現有動作都可直接替換</span></div>
          <div class="daily-block-nav-wrap"><div class="daily-block-nav" id="dailyEditorBlockNav"></div></div>
          <div class="daily-editor-blocks" id="dailyEditorBlocks"></div>
          <button type="button" class="daily-editor-add-block" id="dailyEditorAddBlockBtn">＋ 新增 Block</button>
        </div>
      </div>
      <div class="daily-editor-footer"><button class="btn" id="cancelDailyEditorBtn" type="button">取消</button><button class="btn primary" id="saveDailyEditorBtn" type="button">儲存修改</button></div>
    </div>`;
  document.body.appendChild(modal);
  const cancelEditor=e=>{if(e){e.preventDefault();e.stopPropagation()}cancelDailyTemplateEditor()};
  q('#closeDailyEditorBtn').onclick=cancelEditor;
  q('#cancelDailyEditorBtn').onclick=cancelEditor;
  q('#saveDailyEditorBtn').onclick=saveEditedDailyTemplate;
  q('#dailyEditorAddBlockBtn').onclick=addDailyEditorBlock;
  modal.addEventListener('click',e=>{if(e.target===modal)cancelDailyTemplateEditor()});
  ensureDailyExercisePickerModal();
}
function ensureDailyExercisePickerModal(){
  if(q('#dailyExercisePickerModal'))return;
  const modal=document.createElement('div');modal.className='modal';modal.id='dailyExercisePickerModal';
  modal.innerHTML=`<div class="modal-card daily-picker-card"><div class="modal-head"><div><h3 id="dailyPickerTitle">替換動作</h3><div class="modal-sub" id="dailyPickerSub"></div></div><button class="btn small ghost" id="closeDailyPickerBtn" type="button">關閉</button></div><div class="daily-picker-body"><div class="daily-picker-tools"><input id="dailyEditorSearch" type="search" placeholder="搜尋 TRX、core、step-up…"><select id="dailyEditorCategory"></select></div><div class="daily-picker-picks" id="dailyEditorExercisePicker"></div><div class="daily-picker-custom"><input id="dailyEditorCustomExercise" maxlength="60" placeholder="找不到？直接輸入自己的動作"><button type="button" class="btn small" id="dailyEditorAddCustomBtn">＋ 新增</button></div></div></div>`;
  document.body.appendChild(modal);
  q('#closeDailyPickerBtn').onclick=closeDailyExercisePicker;q('#dailyEditorSearch').addEventListener('input',renderDailyEditorExercisePicker);q('#dailyEditorCategory').addEventListener('change',renderDailyEditorExercisePicker);
  q('#dailyEditorAddCustomBtn').onclick=()=>{const input=q('#dailyEditorCustomExercise'),name=input.value.trim();if(!name){toast('請輸入動作名稱');return}registerUserExercise(name,'我的動作');applyDailyEditorExerciseChoice(name);input.value='';renderPicker();refreshDailyEditorCategoryOptions()};
  q('#dailyEditorCustomExercise').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();q('#dailyEditorAddCustomBtn').click()}});
  modal.addEventListener('click',e=>{if(e.target===modal)closeDailyExercisePicker()});
}
function refreshDailyEditorCategoryOptions(){
  const select=q('#dailyEditorCategory');if(!select)return;const prev=select.value||'全部';select.innerHTML='<option value="全部">全部分類</option>'+exerciseCategoryList().map(cat=>`<option value="${esc(cat)}">${esc(cat)}</option>`).join('');if([...select.options].some(o=>o.value===prev))select.value=prev;
}
function renderDailyEditorExercisePicker(){
  const box=q('#dailyEditorExercisePicker');if(!box)return;const search=String(q('#dailyEditorSearch')?.value||'').trim().toLowerCase(),category=q('#dailyEditorCategory')?.value||'全部';
  const matches=CUSTOM_EXERCISES.filter(ex=>{const catOk=category==='全部'||ex.cat===category,text=`${ex.name} ${ex.cat}`.toLowerCase();return catOk&&(!search||text.includes(search))}).slice(0,100);
  box.innerHTML=matches.length?matches.map(ex=>`<button type="button" class="daily-picker-pick" data-editor-pick="${esc(ex.name)}"><b>${esc(ex.name)}</b><span>${esc(ex.cat||'Training')}</span></button>`).join(''):'<div class="order-empty">沒有符合的動作，可在下方直接新增。</div>';
  qa('#dailyEditorExercisePicker [data-editor-pick]').forEach(btn=>btn.onclick=()=>applyDailyEditorExerciseChoice(btn.dataset.editorPick));
}
function renderDailyEditorNav(){
  const nav=q('#dailyEditorBlockNav');if(!nav)return;nav.innerHTML=dailyEditorBlocks.map((b,i)=>{const [accent]=dailyEditorAccent(i+1);return `<button type="button" class="daily-block-tab ${i===dailyEditorActiveBlock?'active':''}" style="--accent:${accent}" data-daily-block-tab="${i}">BLOCK ${i+1}<span>${b.items.length} 站 · ${b.rounds} round${b.rounds>1?'s':''}</span></button>`}).join('');qa('[data-daily-block-tab]').forEach(btn=>btn.onclick=()=>{dailyEditorActiveBlock=Number(btn.dataset.dailyBlockTab)||0;renderDailyEditorBlocks();requestAnimationFrame(()=>q('.daily-editor-block.mobile-active')?.scrollIntoView({block:'nearest'}))});
}
function renderDailyEditorBlocks(){
  renderDailyEditorNav();const root=q('#dailyEditorBlocks');if(!root)return;
  if(!dailyEditorBlocks.length){root.innerHTML='<div class="order-empty">目前沒有 Block，請新增一個。</div>';return}
  root.innerHTML=dailyEditorBlocks.map((block,bi)=>{const [accent,wash]=dailyEditorAccent(bi+1);return `<section class="daily-editor-block ${block.collapsed?'collapsed':''} ${bi===dailyEditorActiveBlock?'mobile-active':''}" style="--accent:${accent};--wash:${wash}"><div class="daily-editor-block-head"><div class="daily-editor-block-index"><span>BLOCK</span><strong>${bi+1}</strong></div><div class="daily-editor-block-meta"><div class="daily-editor-block-pill"><label>輪數</label><select data-block-rounds="${block.id}">${[1,2,3,4,5,6,8,10].map(n=>`<option value="${n}" ${Number(block.rounds)===n?'selected':''}>${n}</option>`).join('')}</select></div><div class="daily-editor-block-pill"><label>休息</label><input data-block-rest="${block.id}" maxlength="40" value="${esc(block.rest||'—')}" placeholder="60 sec"></div></div><div class="daily-editor-block-actions"><button type="button" class="btn small" data-block-collapse="${block.id}">${block.collapsed?'展開':'收合'}</button><button type="button" class="btn small" data-block-up="${block.id}" ${bi===0?'disabled':''}>↑</button><button type="button" class="btn small" data-block-down="${block.id}" ${bi===dailyEditorBlocks.length-1?'disabled':''}>↓</button><button type="button" class="btn small" data-block-copy="${block.id}">複製</button><button type="button" class="btn small danger" data-block-remove="${block.id}">×</button></div></div><div class="daily-editor-block-body"><div class="daily-editor-items">${block.items.map((item,ii)=>`<div><div class="daily-editor-item"><div class="daily-editor-index">${ii+1}</div><div class="daily-editor-item-main"><div class="daily-editor-item-name">${esc(item.name)}</div><input class="daily-editor-detail" data-item-detail="${item.id}" maxlength="120" value="${esc(item.detail||'')}" placeholder="時間／距離／次數／RPE"></div><div class="daily-editor-item-actions"><button type="button" class="daily-editor-replace" data-item-replace="${item.id}" data-block-id="${block.id}">⇄ 替換</button><button type="button" class="order-btn" data-item-copy="${item.id}" data-block-id="${block.id}" title="複製">＋</button><button type="button" class="order-btn" data-item-up="${item.id}" data-block-id="${block.id}" ${ii===0?'disabled':''}>↑</button><button type="button" class="order-btn" data-item-down="${item.id}" data-block-id="${block.id}" ${ii===block.items.length-1?'disabled':''}>↓</button><button type="button" class="order-btn" data-item-remove="${item.id}" data-block-id="${block.id}">×</button></div></div>${ii<block.items.length-1?`<div class="daily-editor-insert-row"><button type="button" class="daily-editor-insert" data-item-insert="${item.id}" data-block-id="${block.id}">＋ 在這裡插入</button></div>`:''}</div>`).join('')}</div><button type="button" class="daily-editor-add-to-block" data-add-to-block="${block.id}">＋ 加到 Block ${bi+1}</button></div></section>`}).join('');
  bindDailyEditorBlockEvents();
}
function dailyEditorBlockById(id){return dailyEditorBlocks.find(b=>String(b.id)===String(id))}
function dailyEditorItemPosition(block,itemId){return block?.items.findIndex(x=>String(x.id)===String(itemId))??-1}
function bindDailyEditorBlockEvents(){
  qa('[data-block-rounds]').forEach(el=>el.onchange=()=>{const b=dailyEditorBlockById(el.dataset.blockRounds);if(b)b.rounds=Math.max(1,Number(el.value)||1);renderDailyEditorNav()});
  qa('[data-block-rest]').forEach(el=>el.oninput=()=>{const b=dailyEditorBlockById(el.dataset.blockRest);if(b)b.rest=el.value});
  qa('[data-block-collapse]').forEach(btn=>btn.onclick=()=>{const b=dailyEditorBlockById(btn.dataset.blockCollapse);if(b)b.collapsed=!b.collapsed;renderDailyEditorBlocks()});
  qa('[data-block-up]').forEach(btn=>btn.onclick=()=>moveDailyEditorBlock(btn.dataset.blockUp,-1));qa('[data-block-down]').forEach(btn=>btn.onclick=()=>moveDailyEditorBlock(btn.dataset.blockDown,1));
  qa('[data-block-copy]').forEach(btn=>btn.onclick=()=>duplicateDailyEditorBlock(btn.dataset.blockCopy));qa('[data-block-remove]').forEach(btn=>btn.onclick=()=>removeDailyEditorBlock(btn.dataset.blockRemove));
  qa('[data-item-detail]').forEach(inp=>inp.oninput=()=>{for(const b of dailyEditorBlocks){const item=b.items.find(x=>String(x.id)===String(inp.dataset.itemDetail));if(item){item.detail=inp.value;break}}});
  qa('[data-item-replace]').forEach(btn=>btn.onclick=()=>openDailyExercisePicker(btn.dataset.blockId,btn.dataset.itemReplace,'replace'));
  qa('[data-item-insert]').forEach(btn=>btn.onclick=()=>openDailyExercisePicker(btn.dataset.blockId,btn.dataset.itemInsert,'insert'));
  qa('[data-add-to-block]').forEach(btn=>btn.onclick=()=>openDailyExercisePicker(btn.dataset.addToBlock,null,'append'));
  qa('[data-item-copy]').forEach(btn=>btn.onclick=()=>duplicateDailyEditorItem(btn.dataset.blockId,btn.dataset.itemCopy));qa('[data-item-up]').forEach(btn=>btn.onclick=()=>moveDailyEditorItem(btn.dataset.blockId,btn.dataset.itemUp,-1));qa('[data-item-down]').forEach(btn=>btn.onclick=()=>moveDailyEditorItem(btn.dataset.blockId,btn.dataset.itemDown,1));qa('[data-item-remove]').forEach(btn=>btn.onclick=()=>removeDailyEditorItem(btn.dataset.blockId,btn.dataset.itemRemove));
}
function addDailyEditorBlock(){dailyEditorBlocks.push({id:uid(),rounds:1,rest:'60 sec',collapsed:false,items:[]});dailyEditorActiveBlock=dailyEditorBlocks.length-1;renderDailyEditorBlocks()}
function moveDailyEditorBlock(id,delta){const i=dailyEditorBlocks.findIndex(b=>String(b.id)===String(id)),j=i+delta;if(i<0||j<0||j>=dailyEditorBlocks.length)return;[dailyEditorBlocks[i],dailyEditorBlocks[j]]=[dailyEditorBlocks[j],dailyEditorBlocks[i]];dailyEditorActiveBlock=j;renderDailyEditorBlocks()}
function duplicateDailyEditorBlock(id){const i=dailyEditorBlocks.findIndex(b=>String(b.id)===String(id));if(i<0)return;const src=dailyEditorBlocks[i],copy={id:uid(),rounds:src.rounds,rest:src.rest,collapsed:false,items:src.items.map(x=>({...x,id:uid()}))};dailyEditorBlocks.splice(i+1,0,copy);dailyEditorActiveBlock=i+1;renderDailyEditorBlocks()}
function removeDailyEditorBlock(id){if(dailyEditorBlocks.length<=1){toast('至少保留一個 Block');return}const i=dailyEditorBlocks.findIndex(b=>String(b.id)===String(id));if(i<0)return;dailyEditorBlocks.splice(i,1);dailyEditorActiveBlock=Math.min(dailyEditorActiveBlock,dailyEditorBlocks.length-1);renderDailyEditorBlocks()}
function duplicateDailyEditorItem(blockId,itemId){const b=dailyEditorBlockById(blockId),i=dailyEditorItemPosition(b,itemId);if(!b||i<0)return;b.items.splice(i+1,0,{...b.items[i],id:uid()});renderDailyEditorBlocks()}
function moveDailyEditorItem(blockId,itemId,delta){const b=dailyEditorBlockById(blockId),i=dailyEditorItemPosition(b,itemId),j=i+delta;if(!b||i<0||j<0||j>=b.items.length)return;[b.items[i],b.items[j]]=[b.items[j],b.items[i]];renderDailyEditorBlocks()}
function removeDailyEditorItem(blockId,itemId){const b=dailyEditorBlockById(blockId);if(!b)return;b.items=b.items.filter(x=>String(x.id)!==String(itemId));renderDailyEditorBlocks()}
function openDailyExercisePicker(blockId,itemId,mode){ensureDailyExercisePickerModal();dailyEditorPickerTarget={blockId,itemId,mode};const b=dailyEditorBlockById(blockId),bi=dailyEditorBlocks.findIndex(x=>String(x.id)===String(blockId)),item=b?.items.find(x=>String(x.id)===String(itemId));q('#dailyPickerTitle').textContent=mode==='replace'?'替換動作':'新增動作';q('#dailyPickerSub').textContent=mode==='replace'?`直接取代「${item?.name||''}」，位置仍留在 Block ${bi+1}。`:`加入 Block ${bi+1}`;q('#dailyEditorSearch').value='';q('#dailyEditorCustomExercise').value='';refreshDailyEditorCategoryOptions();q('#dailyEditorCategory').value='全部';renderDailyEditorExercisePicker();q('#dailyExercisePickerModal').classList.add('open')}
function closeDailyExercisePicker(){q('#dailyExercisePickerModal')?.classList.remove('open')}
function applyDailyEditorExerciseChoice(name){const t=dailyEditorPickerTarget;if(!t)return;const b=dailyEditorBlockById(t.blockId);if(!b)return;const newItem={id:uid(),name:String(name||'').trim(),detail:'',distance_m:null,weight_kg:null,reps:null};if(t.mode==='replace'){const i=dailyEditorItemPosition(b,t.itemId);if(i>=0)b.items[i]=newItem}else if(t.mode==='insert'){const i=dailyEditorItemPosition(b,t.itemId);b.items.splice(i>=0?i+1:b.items.length,0,newItem)}else b.items.push(newItem);closeDailyExercisePicker();renderDailyEditorBlocks()}
function parseDistanceMeters(detail){const text=String(detail||'').toLowerCase(),km=text.match(/(\d+(?:\.\d+)?)\s*km\b/);if(km)return Math.round(Number(km[1])*1000);const m=text.match(/(\d+(?:\.\d+)?)\s*m\b/);return m?Math.round(Number(m[1])):null}
function flattenDailyEditorBlocks(){const out=[];dailyEditorBlocks.forEach((block,bi)=>block.items.forEach(item=>{const name=String(item.name||'').trim(),detail=String(item.detail||'').trim();if(name){const storedName=name===DAILY_CARDIO_PLACEHOLDER?DAILY_CARDIO_DB_TOKEN:name;out.push({name:storedName,detail,duration_seconds:parseCountdownSeconds(detail,name),distance_m:parseDistanceMeters(detail),weight_kg:null,reps:null,block_index:bi+1,block_rounds:Math.max(1,Number(block.rounds)||1),block_rest:String(block.rest||'—')})}}));return out}
function openDailyTemplateEditor(t){
  ensureDailyTemplateEditorModal();editingDailyTemplateId=t.id;const sourceItems=rawTemplateItems(t,t.id==='coreSculpt'?DAILY_CARDIO_PLACEHOLDER:selectedDailyCardio());dailyEditorBlocks=dailyEditorBlocksFromItems(sourceItems);if(!dailyEditorBlocks.length)dailyEditorBlocks=[{id:uid(),rounds:1,rest:'—',collapsed:false,items:[]}];dailyEditorActiveBlock=0;q('#dailyEditorName').value=t.label||'';q('#dailyEditorLevel').value=String(Number(t.intensity)||1);q('#dailyEditorDuration').value=t.duration||'';q('#dailyEditorDescription').value=t.description||'';q('#dailyEditorEquipment').value=t.equipment||'';renderDailyEditorBlocks();q('#dailyTemplateEditorModal').classList.add('open');
}
function cancelDailyTemplateEditor(){
  closeDailyExercisePicker();
  q('#dailyTemplateEditorModal')?.classList.remove('open');
  editingDailyTemplateId=null;
  dailyEditorBlocks=[];
  dailyEditorActiveBlock=0;
  dailyEditorPickerTarget=null;
  if(typeof updateRaceTemplateUI==='function')updateRaceTemplateUI();
  if(typeof updateDailyAdminUI==='function')updateDailyAdminUI();
}
function closeDailyTemplateEditor(){cancelDailyTemplateEditor()}
async function saveEditedDailyTemplate(){
  if(!dailyMenuAdminName){toast('這台裝置沒有菜單管理權限');return}const templateId=editingDailyTemplateId;if(!templateId)return;if(templateHasCompletedResult(templateId)){toast('這份菜單已有完成紀錄，不能修改');closeDailyTemplateEditor();updateDailyAdminUI();return}const label=q('#dailyEditorName').value.trim();if(!label){toast('請輸入菜單名稱');return}const items=flattenDailyEditorBlocks();if(!items.length){toast('請至少保留一個動作');return}const btn=q('#saveDailyEditorBtn');btn.disabled=true;btn.textContent='儲存中…';try{const result=await api('rpc/save_daily_template',{method:'POST',body:JSON.stringify({p_device_secret:getNicknameDeviceSecret(),p_template_id:templateId,p_label:label,p_intensity:Number(q('#dailyEditorLevel').value)||1,p_duration:q('#dailyEditorDuration').value.trim()||'自訂',p_description:q('#dailyEditorDescription').value.trim(),p_equipment:q('#dailyEditorEquipment').value.trim(),p_total:buildDailyTotal(items),p_items:items})});if(!result?.ok){const reason=String(result?.reason||'unknown');if(reason==='locked')toast('這份菜單已經有人完成，現在已永久鎖定');else if(reason==='forbidden')toast('這台裝置沒有菜單管理權限');else toast(`無法儲存菜單：${reason}`);return}toast('菜單修改已儲存');setTimeout(()=>location.reload(),450)}catch(e){console.error(e);toast('菜單儲存失敗，請稍後再試')}finally{btn.disabled=false;btn.textContent='儲存修改'}
}

function editCurrentDailyTemplate() {
  if (!dailyMenuAdminName) {
    toast('這台裝置沒有菜單管理權限');
    return;
  }
  const t = currentRaceTemplate();
  if (!t) return;
  if (templateHasCompletedResult(t.id)) {
    toast('這份菜單已有完成紀錄，不能修改');
    updateDailyAdminUI();
    return;
  }
  openDailyTemplateEditor(t);
}

function buildDailyTotal(items) {
  const expandedCount=(items||[]).reduce((sum,x)=>sum+Math.max(1,Number(x?.block_rounds)||1),0);
  const runM=(items||[]).filter(x=>x.name==='Run').reduce((sum,x)=>sum+(Number(x.distance_m)||0)*Math.max(1,Number(x?.block_rounds)||1),0);
  const itemText=`實際執行 ${expandedCount} 個項目`;
  return runM>0?`總 Run：${(runM/1000).toFixed(runM%1000===0?0:1)} km｜${itemText}`:itemText;
}

function makeNewDailyTemplateId() {
  const random = (crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`)
    .replace(/[^A-Za-z0-9]/g, '');
  return `daily_${random}`.slice(0, 80);
}

async function saveCustomBuilderAsDailyTemplate() {
  if (!dailyMenuAdminName) {
    toast('這台裝置沒有菜單管理權限');
    return;
  }

  const label = q('#customName').value.trim();
  if (!label) {
    toast('請先輸入挑戰名稱');
    return;
  }
  if (label.length > 80) {
    toast('挑戰名稱最多 80 個字');
    return;
  }

  const items = customItems().map(x => ({
    name: x.name === DAILY_CARDIO_PLACEHOLDER ? DAILY_CARDIO_DB_TOKEN : x.name,
    detail: x.detail || '',
    distance_m: x.distance_m ?? null,
    weight_kg: x.weight_kg ?? null,
    reps: x.reps ?? null
  }));

  if (!items.length) {
    toast('請至少設定一個挑戰項目');
    return;
  }

  const templateId = editingDailyTemplateId || makeNewDailyTemplateId();

  // Local early check for immediate feedback.
  if (templateHasCompletedResult(templateId)) {
    toast('這份菜單已有完成紀錄，不能修改');
    updateDailyAdminUI();
    return;
  }

  const saveBtn = q('#saveDailyTemplateBtn');
  if (saveBtn) saveBtn.disabled = true;

  try {
    const result = await api('rpc/save_daily_template', {
      method: 'POST',
      body: JSON.stringify({
        p_device_secret: getNicknameDeviceSecret(),
        p_template_id: templateId,
        p_label: label,
        p_intensity: Number(q('#customDailyLevel').value) || 1,
        p_duration: q('#customDailyDuration').value.trim() || '自訂',
        p_description: q('#customDailyDescription').value.trim(),
        p_equipment: q('#customDailyEquipment').value.trim(),
        p_total: buildDailyTotal(items),
        p_items: items
      })
    });

    if (!result?.ok) {
      const reason = String(result?.reason || 'unknown');
      if (reason === 'locked') {
        toast('這份菜單已經有人完成，現在已永久鎖定');
      } else if (reason === 'forbidden') {
        toast('這台裝置沒有菜單管理權限');
      } else {
        toast(`無法儲存菜單：${reason}`);
      }
      return;
    }

    toast(editingDailyTemplateId ? '菜單修改已儲存' : '已加入日常訓練');

    // Reload so the picker is rebuilt exactly once and all devices read the
    // same cloud version next time they open/refresh the app.
    setTimeout(() => location.reload(), 450);
  } catch (e) {
    console.error(e);
    toast('菜單儲存失敗，請檢查 Supabase 設定');
  } finally {
    if (saveBtn) saveBtn.disabled = false;
  }
}


// ----- Extend the existing Custom Builder with a free-text detail field -----

const _originalFormatCustomDetail = formatCustomDetail;
formatCustomDetail = function(item, fallback='自訂訓練項目') {
  const manual = String(item?.detailText || '').trim();
  if (manual) return manual;
  return _originalFormatCustomDetail(item, fallback);
};

const _originalRenderCustomOrder = renderCustomOrder;
renderCustomOrder = function() {
  _originalRenderCustomOrder();

  qa('#customOrderList .order-item').forEach(el => {
    const id = el.dataset.orderId;
    const item = customOrder.find(x => String(x.id) === String(id));
    const copy = el.querySelector('.order-copy');

    if (!item || !copy || copy.querySelector('.custom-detail-admin')) return;

    const wrap = document.createElement('div');
    wrap.className = 'custom-detail-admin';
    wrap.innerHTML = `
      <label>細節／時間／RPE（有填就優先使用）</label>
      <input type="text"
             maxlength="120"
             value="${esc(item.detailText || '')}"
             placeholder="例如 30 sec · controlled pace / RPE 6">
    `;

    const input = wrap.querySelector('input');
    input.addEventListener('input', () => {
      item.detailText = input.value;
    });
    input.addEventListener('pointerdown', e => e.stopPropagation());
    input.addEventListener('mousedown', e => e.stopPropagation());

    copy.appendChild(wrap);
  });
};


// ----- Keep lock/admin UI in sync with score-wall loading and template changes -----

const _originalLoadResultsForDailyAdmin = loadResults;
loadResults = async function() {
  const out = await _originalLoadResultsForDailyAdmin();
  updateDailyAdminUI();
  return out;
};

const _originalUpdateRaceTemplateUIForAdmin = updateRaceTemplateUI;
updateRaceTemplateUI = function() {
  const out = _originalUpdateRaceTemplateUIForAdmin();
  updateDailyAdminUI();
  return out;
};


// ----- One-time initialization -----

async function initDailyTemplateAdmin() {
  ensureDailyAdminUI();

  const select = q('#raceTemplate');
  baseDailyTemplateIds = select
    ? [...select.options].map(opt => opt.value).filter(Boolean)
    : [];

  try {
    await loadCloudDailyTemplates();
  } catch (e) {
    console.warn('Cloud daily templates unavailable; using built-in templates', e);
  }

  rebuildDailyTemplateSelect();

  // IMPORTANT: build picker only after cloud templates have been merged.
  buildTemplatePicker();
  updateRaceTemplateUI();

  await ensureDailyMenuAdminDetected();
  updateDailyAdminUI();
}


renderPicker();updateCustomPreview();setDefaultCustomName(true);updateStandardRaceUI();initDailyTemplateAdmin();
q('#publicConfigWarning').classList.toggle('show',!isConfigured());
q('#customName').addEventListener('input',()=>{q('#customName').dataset.autoName='0'});
q('#raceTemplate').addEventListener('change',updateRaceTemplateUI);
q('#standardRaceFormat').addEventListener('change',updateStandardRaceUI);
q('#standardDivision').addEventListener('change',renderStandardRacePreview);
q('#dailyCardioChoice').addEventListener('change',updateRaceTemplateUI);
q('#openClassicMenuBtn').addEventListener('click',openClassicMenuModal);
q('#closeClassicMenuBtn').addEventListener('click',closeClassicMenuModal);
q('#classicModalCloseBtn').addEventListener('click',closeClassicMenuModal);
q('#classicMenuModal').addEventListener('click',e=>{if(e.target===q('#classicMenuModal'))closeClassicMenuModal()});
q('#classicModalStartBtn').addEventListener('click',()=>{
  closeClassicMenuModal();
  startSession('經典挑戰');
});
q('#openDailyMenuBtn').addEventListener('click',openDailyMenuModal);
q('#closeDailyMenuBtn').addEventListener('click',closeDailyMenuModal);
q('#dailyModalCloseBtn').addEventListener('click',closeDailyMenuModal);
q('#dailyMenuModal').addEventListener('click',e=>{if(e.target===q('#dailyMenuModal'))closeDailyMenuModal()});
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if(q('#classicMenuModal')?.classList.contains('open'))closeClassicMenuModal();
  if(q('#dailyMenuModal')?.classList.contains('open'))closeDailyMenuModal();
});
q('#dailyModalStartBtn').addEventListener('click',()=>{
  closeDailyMenuModal();
  startSession('日常訓練');
});
q('#dailyModalEditBtn').addEventListener('click',()=>{
  const t=currentRaceTemplate();
  if(!t)return;
  if(templateHasCompletedResult(t.id)){
    toast('這份菜單已有完成紀錄，不能修改');
    syncDailyMenuModalActions();
    return;
  }
  closeDailyMenuModal();
  editCurrentDailyTemplate();
});
q('#dailyModalCardioChoice').addEventListener('change',e=>{
  const source=q('#dailyCardioChoice');
  if(source){
    source.value=e.target.value;
    source.dispatchEvent(new Event('change',{bubbles:true}));
  }
  renderDailyMenuModal();
});
q('#wall').addEventListener('click',e=>{
  const row=e.target.closest('[data-result-id]');
  if(row)openWorkoutDetail(row.dataset.resultId);
});
q('#wall').addEventListener('keydown',e=>{
  if(e.key!=='Enter'&&e.key!==' ')return;
  const row=e.target.closest('[data-result-id]');
  if(!row)return;
  e.preventDefault();
  openWorkoutDetail(row.dataset.resultId);
});
q('#closeWorkoutDetailBtn').onclick=closeWorkoutDetail;
q('#workoutDetailModal').addEventListener('click',e=>{if(e.target===q('#workoutDetailModal'))closeWorkoutDetail()});

loadResults();
updateVisitCounter();
qa('nav.tabs button').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));q('#startStandardRaceBtn').onclick=()=>startSession('經典挑戰');q('#startSimulationBtn').onclick=()=>startSession('日常訓練');q('#startCustomBtn').onclick=()=>startSession('自訂挑戰');q('#customRun').oninput=()=>{};q('#addRunBtn').onclick=()=>addCustomItem('Run');q('#pauseBtn').onclick=pauseToggle;q('#abandonBtn').onclick=abandon;q('#finishChallengeBtn').onclick=finishChallenge;q('#lockSessionBtn').onclick=toggleSessionPageLock;q('#closeSessionBtn').onclick=closeSessionView;q('#skipLogBtn').onclick=skipLog;q('#saveLogBtn').onclick=saveLog;q('#refreshBtn').onclick=loadResults;
restoreActiveSession();
})();
