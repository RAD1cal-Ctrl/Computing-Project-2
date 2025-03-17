// main.js

import { braveTalk } from './minigames/braveTalk.js';
import { coolDownCoach } from './minigames/coolDownCoach.js';
import { happyAccidents } from './minigames/happyAccidents.js';

//Trigger the mini-games
document.getElementById("startBraveTalk").addEventListener("click", braveTalk);
document.getElementById("startCoolDownCoach").addEventListener("click", coolDownCoach);
document.getElementById("startHappyAccidents").addEventListener("click", happyAccidents);
