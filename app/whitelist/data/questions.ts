import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "Have you read through our rules?",
    options: [
      { text: "No, I already have experience in gta roleplay", isCorrect: false },
      { text: "Yes, but not all of them. Just the basic ones", isCorrect: false },
      { text: "Yes, I have gone through all of the rules", isCorrect: true },
    ],
  },
  {
    id: 2,
    text: "What is vehicle deathmatch? [VDM]",
    options: [
      { text: "Entering TDM game with a vehicle", isCorrect: false },
      { text: "Using vehicles to intentionally pit or run over other players", isCorrect: true },
      { text: "Pitting other vehicles while inside a safezone", isCorrect: false },
    ],
  },
  {
    id: 3,
    text: "What is random deathmatch? [RDM]",
    options: [
      { text: "Killing another player without any prior roleplay such as a prior interaction", isCorrect: true },
      { text: "Randomly entering TDM deathmatch game without prior roleplay interactions", isCorrect: false },
      { text: "Camping outside a safezone with intention to kill someone coming out of it", isCorrect: false },
    ],
  },
  {
    id: 4,
    text: "What is voice IDing?",
    options: [
      { text: "Identifying who a character is by the clothes they usually wear. Even just by a mask", isCorrect: false },
      { text: "Identifying who a character is with their voice even when they have their face covered", isCorrect: true },
      { text: "Asking for another player's server ID through ingame voice", isCorrect: false },
    ],
  },
  {
    id: 5,
    text: "What is fear roleplay?",
    options: [
      { text: "Fearing to play roleplay because it requires communication with other real human beings", isCorrect: false },
      { text: "Fearing to join city on a day because a rival gang is already active with multiple members online", isCorrect: false },
      { text: "Showing fear for your character's life. For example, when gun aimed, putting your hands up", isCorrect: true },
    ],
  },
  {
    id: 6,
    text: "What is out of character? [OOC]",
    options: [
      { text: "Talking about things that are outside of nolimits. For example, talking about what part of india you are from", isCorrect: true },
      { text: "Adding the people you met in nolimits on discord and having casual conversations with them outside of your rp character", isCorrect: false },
      { text: "Talking about your characters lore and backstory while in an active and ongoing roleplay situation", isCorrect: false },
    ],
  },
  {
    id: 7,
    text: "What is new life rule? [NLR]",
    options: [
      { text: "When your Character has been killed and body burned, your character forgets all informations like how he/she died", isCorrect: true },
      { text: "When joining nolimits for the first time, your character is a person who is new to life. So this interprets new life rule", isCorrect: false },
      { text: "After every server restart, your character is new to life. They forget all informations about their life which was before the restart", isCorrect: false },
    ],
  },
  {
    id: 8,
    text: "What is server degradation?",
    options: [
      { text: "Degrading the server by modifying your cars in a bad way to ruin the city's car culture", isCorrect: false },
      { text: "Talking to other people or using swear words to intentionally ruin the server's public outlook", isCorrect: true },
      { text: "DDOSing the server while an event or special day to annoy everybody like a little dog", isCorrect: false },
    ],
  },
  {
    id: 9,
    text: "Is NOLIMITS responsible for issues dragged out to real life?",
    options: [
      { text: "Yes, NOLIMITS is completely responsible if an issue inside city is dragged outside to real life!", isCorrect: false },
      { text: "No, NOLIMITS is not at all responsible for player dragging issues outside to real life!", isCorrect: true },
    ],
  },
  {
    id: 10,
    text: "Do you agree to NOLIMITS anticheat TOS?",
    options: [
      { text: "No, I do not accept it at all!", isCorrect: false },
      { text: "Yes, I accept it as I have nothing to hide!", isCorrect: true },
    ],
  },
  {
    id: 11,
    text: "Is civilian VS gang situations allowed in nolimits?",
    options: [
      { text: "No, civilian vs gang situations have zero tolerance in nolimits. It is the responsibility of the gang to avoid civilians", isCorrect: true },
      { text: "Yes, civilian vs gang situations are allowd in nolimits. But the gang should only have 5 members involved in the situation", isCorrect: false },
      { text: "Yes, it is allowd when the civilian have initiated the situation. But gangs should try their best to avoid them", isCorrect: false },
    ],
  },
  {
    id: 12,
    text: "What locations are official safezones in nolimits?",
    options: [
      { text: "All Garages, Hospital, Police Station, Job Areas, Event Locations & Meeting Area", isCorrect: true },
      { text: "Legion Square, Naveda Island, Cayo Perico, Car Dealership", isCorrect: false },
    ],
  },
  {
    id: 13,
    text: "What is cop baiting?",
    options: [
      { text: "Baiting cops into traps to take them hostage", isCorrect: false },
      { text: "Intentionally triggering unwanted situations with pd", isCorrect: true },
      { text: "Rage baiting cops with cringe and brainrotting jokes", isCorrect: false },
    ],
  },
  {
    id: 14,
    text: "What will you do if you find a bug?",
    options: [
      { text: "I will abuse it as much as I can and then later report it to the admins", isCorrect: false },
      { text: "I will make a video about it on youtube to help out everybody grind", isCorrect: false },
      { text: "I will create a bug report ticket on nolimitsindia.com right away", isCorrect: true },
    ],
  },
  {
    id: 15,
    text: "What level of swearing (BAD WORDS) are you allowed to use?",
    options: [
      { text: "It is okay to use any level of swearing while in an intense rp situation", isCorrect: false },
      { text: "Some level of swearig is fine if you are a gang member in an gang situation", isCorrect: false },
      { text: "No amount of swearing at all is allowed in nolimits city", isCorrect: true },
    ],
  },
  {
    id: 16,
    text: "Are you joining for pvp?",
    options: [
      { text: "Yes, my main focus is on pvp and not roleplay", isCorrect: false },
      { text: "No, my main focus is on roleplay. Pvp is just a side", isCorrect: true },
    ],
  },
  {
    id: 17,
    text: "What is combat logging?",
    options: [
      { text: "Disconnecting from server while not inside a safezone", isCorrect: false },
      { text: "Leaving the server when in an active roleplay or pvp situation", isCorrect: true },
    ],
  },
];