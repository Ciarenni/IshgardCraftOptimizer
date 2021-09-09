//#region Members

//#region Constants

let COUNT_OF_CRAFTERS = 8;
let LEVEL_80_MATERIAL_COST = 10;
let LEVEL_70_MATERIAL_COST = 10;
let LEVEL_60_MATERIAL_COST = 5;
let LEVEL_40_MATERIAL_COST = 5;
let LEVEL_20_MATERIAL_COST = 5;
let CRAFTERS = [ "CRP", "BSM", "ARM", "GSM", "LTW", "WVR", "ALC", "CUL" ]

//#endregion

//#region Level 80 variables

let _level80CrafterMatrix = [
    {
        "Crafter": "CRP",
        "WhiteCedarLogs": true,
        "PrimordialResin": false,
        "Wheat": true,
        "GossamerCottonBolls": true,
        "Tortoises": false,
        "GoldOre": false,
        "FinestRockSalt": false,
        "TruespringWater": false,
        "MineralSand": false,
        "BluespiritOre": false
    },
    {
        "Crafter": "BSM",
        "WhiteCedarLogs": true,
        "PrimordialResin": false,
        "Wheat": false,
        "GossamerCottonBolls": false,
        "Tortoises": false,
        "GoldOre": true,
        "FinestRockSalt": false,
        "TruespringWater": false,
        "MineralSand": false,
        "BluespiritOre": true
    },
    {
        "Crafter": "ARM",
        "WhiteCedarLogs": false,
        "PrimordialResin": false,
        "Wheat": false,
        "GossamerCottonBolls": false,
        "Tortoises": false,
        "GoldOre": true,
        "FinestRockSalt": false,
        "TruespringWater": false,
        "MineralSand": true,
        "BluespiritOre": true
    },
    {
        "Crafter": "GSM",
        "WhiteCedarLogs": false,
        "PrimordialResin": true,
        "Wheat": false,
        "GossamerCottonBolls": false,
        "Tortoises": false,
        "GoldOre": false,
        "FinestRockSalt": false,
        "TruespringWater": false,
        "MineralSand": true,
        "BluespiritOre": true
    },
    {
        "Crafter": "LTW",
        "WhiteCedarLogs": true,
        "PrimordialResin": false,
        "Wheat": false,
        "GossamerCottonBolls": true,
        "Tortoises": true,
        "GoldOre": false,
        "FinestRockSalt": false,
        "TruespringWater": false,
        "MineralSand": false,
        "BluespiritOre": false
    },
    {
        "Crafter": "WVR",
        "WhiteCedarLogs": false,
        "PrimordialResin": true,
        "Wheat": false,
        "GossamerCottonBolls": true,
        "Tortoises": false,
        "GoldOre": false,
        "FinestRockSalt": false,
        "TruespringWater": true,
        "MineralSand": false,
        "BluespiritOre": false
    },
    {
        "Crafter": "ALC",
        "WhiteCedarLogs": false,
        "PrimordialResin": false,
        "Wheat": false,
        "GossamerCottonBolls": false,
        "Tortoises": true,
        "GoldOre": false,
        "FinestRockSalt": true,
        "TruespringWater": true,
        "MineralSand": false,
        "BluespiritOre": false
    },
    {
        "Crafter": "CUL",
        "WhiteCedarLogs": false,
        "PrimordialResin": false,
        "Wheat": true,
        "GossamerCottonBolls": false,
        "Tortoises": false,
        "GoldOre": false,
        "FinestRockSalt": true,
        "TruespringWater": true,
        "MineralSand": false,
        "BluespiritOre": false
    }
];
let _level80UserCraftingInventory = {

    "WhiteCedarLogs": 0,
    "PrimordialResin": 0,
    "Wheat": 0,
    "GossamerCottonBolls": 0,
    "Tortoises": 0,
    "GoldOre": 0,
    "FinestRockSalt": 0,
    "TruespringWater": 0,
    "MineralSand": 0,
    "BluespiritOre": 0

};

//#endregion

//#region Level 70 variables

let _level70CrafterMatrix = [
    {
        "Crafter": "CRP",
        "SpruceLogs": true,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": true,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": true,
        "SpringWater": false,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "BSM",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": true,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": true,
        "Ragstone": true
    },
    {
        "Crafter": "ARM",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": true,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": true,
        "Ragstone": true
    },
    {
        "Crafter": "GSM",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": true,
        "SpringWater": false,
        "GoldSand": true,
        "Ragstone": true
    },
    {
        "Crafter": "LTW",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": true,
        "Vines": true,
        "Toads": true,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "WVR",
        "SpruceLogs": false,
        "Mistletoe": true,
        "TeaLeaves": false,
        "Vines": true,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": true,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "ALC",
        "SpruceLogs": true,
        "Mistletoe": true,
        "TeaLeaves": true,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "CUL",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": true,
        "Vines": false,
        "Toads": true,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": true,
        "GoldSand": false,
        "Ragstone": false
    }
];
let _level70UserCraftingInventory = {

    "SpruceLogs": 0,
    "Mistletoe": 0,
    "TeaLeaves": 0,
    "Vines": 0,
    "Toads": 0,
    "ElectrumOre": 0,
    "Alumen": 0,
    "SpringWater": 0,
    "GoldSand": 0,
    "Ragstone": 0
};

//#endregion

//#region Level 60 variables

let _level60CrafterMatrix = [
    {
        "Crafter": "CRP",
        "SpruceLogs": true,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": true,
        "SpringWater": false,
        "GoldSand": false,
        "Ragstone": true
    },
    {
        "Crafter": "BSM",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": true,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": true,
        "Ragstone": true
    },
    {
        "Crafter": "ARM",
        "SpruceLogs": true,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": true,
        "Alumen": true,
        "SpringWater": false,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "GSM",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": true,
        "Toads": false,
        "ElectrumOre": true,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": true,
        "Ragstone": false
    },
    {
        "Crafter": "LTW",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": true,
        "Vines": false,
        "Toads": true,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": true,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "WVR",
        "SpruceLogs": true,
        "Mistletoe": true,
        "TeaLeaves": false,
        "Vines": true,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "ALC",
        "SpruceLogs": false,
        "Mistletoe": true,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": true,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": true,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "CUL",
        "SpruceLogs": false,
        "Mistletoe": true,
        "TeaLeaves": true,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": true,
        "GoldSand": false,
        "Ragstone": false
    }
];
let _level60UserCraftingInventory = {

    "SpruceLogs": 0,
    "Mistletoe": 0,
    "TeaLeaves": 0,
    "Vines": 0,
    "Toads": 0,
    "ElectrumOre": 0,
    "Alumen": 0,
    "SpringWater": 0,
    "GoldSand": 0,
    "Ragstone": 0

};

//#endregion

//#region Level 40 variables

let _level40CrafterMatrix = [
    {
        "Crafter": "CRP",
        "MahoganyLogs": true,
        "CottonBolls": false,
        "Sesame": false,
        "Ore": false,
        "RockSalt": true,
        "MythriteSand": false
    },
    {
        "Crafter": "BSM",
        "MahoganyLogs": false,
        "CottonBolls": false,
        "Sesame": false,
        "Ore": true,
        "RockSalt": false,
        "MythriteSand": true
    },
    {
        "Crafter": "ARM",
        "MahoganyLogs": false,
        "CottonBolls": false,
        "Sesame": false,
        "Ore": true,
        "RockSalt": false,
        "MythriteSand": true
    },
    {
        "Crafter": "GSM",
        "MahoganyLogs": false,
        "CottonBolls": false,
        "Sesame": false,
        "Ore": true,
        "RockSalt": false,
        "MythriteSand": true
    },
    {
        "Crafter": "LTW",
        "MahoganyLogs": true,
        "CottonBolls": true,
        "Sesame": false,
        "Ore": false,
        "RockSalt": false,
        "MythriteSand": false
    },
    {
        "Crafter": "WVR",
        "MahoganyLogs": false,
        "CottonBolls": true,
        "Sesame": true,
        "Ore": false,
        "RockSalt": false,
        "MythriteSand": false
    },
    {
        "Crafter": "ALC",
        "MahoganyLogs": false,
        "CottonBolls": false,
        "Sesame": true,
        "Ore": false,
        "RockSalt": true,
        "MythriteSand": false
    },
    {
        "Crafter": "CUL",
        "MahoganyLogs": false,
        "CottonBolls": false,
        "Sesame": true,
        "Ore": false,
        "RockSalt": true,
        "MythriteSand": false
    }
];
let _level40UserCraftingInventory = {

    "MahoganyLogs": 0,
    "CottonBolls": 0,
    "Sesame": 0,
    "Ore": 0,
    "RockSalt": 0,
    "MythriteSand": 0

};

//#endregion

//#region Level 20 variables

let _level20CrafterMatrix = [
    {
        "Crafter": "CRP",
        "Switch": true,
        "Hemp": false,
        "IronOre": false,
        "IronSand": false
    },
    {
        "Crafter": "BSM",
        "Switch": false,
        "Hemp": false,
        "IronOre": true,
        "IronSand": false
    },
    {
        "Crafter": "ARM",
        "Switch": false,
        "Hemp": false,
        "IronOre": true,
        "IronSand": false
    },
    {
        "Crafter": "GSM",
        "Switch": false,
        "Hemp": false,
        "IronOre": false,
        "IronSand": true
    },
    {
        "Crafter": "LTW",
        "Switch": true,
        "Hemp": false,
        "IronOre": false,
        "IronSand": false
    },
    {
        "Crafter": "WVR",
        "Switch": false,
        "Hemp": true,
        "IronOre": false,
        "IronSand": false
    },
    {
        "Crafter": "ALC",
        "Switch": false,
        "Hemp": false,
        "IronOre": false,
        "IronSand": true
    },
    {
        "Crafter": "CUL",
        "Switch": false,
        "Hemp": true,
        "IronOre": false,
        "IronSand": false
    }
];
let _level20UserCraftingInventory = {

    "Switch": 0,
    "Hemp": 0,
    "IronOre": 0,
    "IronSand": 0
};

//#endregion

let _currentTabLevelBracket = "80";
let _allowedCrafters = [];//crafter TLAs
let _crafterDictionary = [];//a list of CrafterDictionaryItems
let _crafterListForCalculation = [];//a list of CrafterListItems

class CrafterListItem
{
    Crafter = "";//the TLA for the crafter
    CrafterCount = 0;//the number of times to craft this craft
    SumToNow = 0;//the sum of all crafterCounts up to this point, only used in calculating paths, not shown to user

    constructor(crafter, count, sum)
    {
        this.Crafter = crafter;
        this.CrafterCount = count;
        this.SumToNow = sum;
    }
}

//despite that this class has 3 items in it, i am still treating it as a dictionary because most of the time
//i only care about the BaseCrafter (key), and the CrafterList (value)
//the CountSum is just on there to make calculation easier/faster for which CrafterList on a given BaseCrafter is better
class CrafterDictionaryItem
{
    BaseCrafter = "";//the TLA for the starting crafter
    CrafterList = [];//a list of CrafterListItems
    CountSum = 0;//the sum of the counts of all the crafters currently in the CrafterList

    constructor(base, list, count)
    {
        this.BaseCrafter = base;
        this.CrafterList = list;
        this.CountSum = count;
    }
}

//#region Web controls

let _lvl80InfoTextarea = document.getElementById("lvl80InfoTextArea");
let _lvl80InfoTextareaDiv = document.getElementById("lvl80InfoTextAreaDiv");

let _lvl70InfoTextarea = document.getElementById("lvl70InfoTextArea");
let _lvl70InfoTextareaDiv = document.getElementById("lvl70InfoTextAreaDiv");

let _lvl60InfoTextarea = document.getElementById("lvl60InfoTextArea");
let _lvl60InfoTextareaDiv = document.getElementById("lvl60InfoTextAreaDiv");

let _lvl40InfoTextarea = document.getElementById("lvl40InfoTextArea");
let _lvl40InfoTextareaDiv = document.getElementById("lvl40InfoTextAreaDiv");

let _lvl20InfoTextarea = document.getElementById("lvl20InfoTextArea");
let _lvl20InfoTextareaDiv = document.getElementById("lvl20InfoTextAreaDiv");

let _useAllCraftersCheckbox = document.getElementById("checkboxUseAll");

// let _checkboxUseCRP = document.getElementById("checkboxUseCRP");
// let _checkboxUseBSM = document.getElementById("checkboxUseBSM");
// let _checkboxUseARM = document.getElementById("checkboxUseARM");
// let _checkboxUseGSM = document.getElementById("checkboxUseGSM");
// let _checkboxUseLTW = document.getElementById("checkboxUseLTW");
// let _checkboxUseWVR = document.getElementById("checkboxUseWVR");
// let _checkboxUseALC = document.getElementById("checkboxUseALC");
// let _checkboxUseCUL = document.getElementById("checkboxUseCUL");

//#endregion

//#endregion

OnLoad();//i know i could just have this method's contents here, since i only call them once, but it helps me mentally encapsulate

function OnLoad()
{
    document.getElementById("lvl80calculateButton").onclick = CalculateButtonClick;
    document.getElementById("lvl70calculateButton").onclick = CalculateButtonClick;
    document.getElementById("lvl60calculateButton").onclick = CalculateButtonClick;
    document.getElementById("lvl40calculateButton").onclick = CalculateButtonClick;
    document.getElementById("lvl20calculateButton").onclick = CalculateButtonClick;

    document.getElementById("lvl80resetButton").onclick = ResetLevel80Fields;
    document.getElementById("lvl70resetButton").onclick = ResetLevel70Fields;
    document.getElementById("lvl60resetButton").onclick = ResetLevel60Fields;
    document.getElementById("lvl40resetButton").onclick = ResetLevel40Fields;
    document.getElementById("lvl20resetButton").onclick = ResetLevel20Fields;


    let helpCheckboxLabelElement = document.getElementById("help-checkbox-label");
    let helpFlyoutDiv = document.getElementById("help-flyout-div");
    let helpCheckbox = document.getElementById("help-checkbox");
    
    //setting the default left of the help flyout to the width of the crafter checkboxes, plus the width of the "button" plus a margin of 5px
    //the default top, opacity, and pointer events are set in the CSS because those are not dependent on window size
    helpFlyoutDiv.style.left = helpCheckboxLabelElement.offsetLeft + helpCheckboxLabelElement.offsetWidth + 5 + "px";

    helpCheckbox.addEventListener("change", function() {
        helpFlyoutDiv.style.left = helpCheckboxLabelElement.offsetLeft + helpCheckboxLabelElement.offsetWidth + 5 + "px";//update the left position in case of window resize

        //if the checkbox is "checked", the help button has been clicked, so it needs to show the help flyout. otherwise, hide it
        if(helpCheckbox.checked)
        {
            //setting the top of the help flyout to the same Y value as the div that contains the crafter checkboxes
            helpFlyoutDiv.style.top = document.getElementById("crafter-use-div").offsetTop + "px";
            helpFlyoutDiv.style.opacity = "100%";
            helpFlyoutDiv.style.pointerEvents = "all";
        }
        else
        {
            helpFlyoutDiv.style.top = "0px";
            helpFlyoutDiv.style.opacity = "0%";
            helpFlyoutDiv.style.pointerEvents = "none";
        }
    });


    _useAllCraftersCheckbox.onclick = ToggleAllCrafterCheckboxes;
    for(let i = 0; i < CRAFTERS.length; i++)
    {
        document.getElementById("checkboxUse" + CRAFTERS[i]).onclick = UpdateUseAllCraftersCheckbox;   
    }
    
    SetUpTabs();
    
    //put values in the text boxes for testing because im not typing that over and over
    //simulated user input #1
    // document.getElementById("lvl80WhiteCedarLogs").value = 100;
    // document.getElementById("lvl80PrimordialResin").value = 80;
    // document.getElementById("lvl80Wheat").value = 20;
    // document.getElementById("lvl80GossamerCottonBolls").value = 90;
    // document.getElementById("lvl80Tortoises").value = 30;
    // document.getElementById("lvl80GoldOre").value = 90;
    // document.getElementById("lvl80FinestRockSalt").value = 110;
    // document.getElementById("lvl80TruespringWater").value = 120;
    // document.getElementById("lvl80MineralSand").value = 40;
    // document.getElementById("lvl80BluespiritOre").value = 70;
    
    //simulated user input #2
    // document.getElementById("lvl80WhiteCedarLogs").value = 90;
    // document.getElementById("lvl80PrimordialResin").value = 60;
    // document.getElementById("lvl80Wheat").value = 140;
    // document.getElementById("lvl80GossamerCottonBolls").value = 10;
    // document.getElementById("lvl80Tortoises").value = 40;
    // document.getElementById("lvl80GoldOre").value = 170;
    // document.getElementById("lvl80FinestRockSalt").value = 190;
    // document.getElementById("lvl80TruespringWater").value = 80;
    // document.getElementById("lvl80MineralSand").value = 100;
    // document.getElementById("lvl80BluespiritOre").value = 200;

    //simulated user input #3
    // document.getElementById("lvl80WhiteCedarLogs").value = 375;
    // document.getElementById("lvl80PrimordialResin").value = 1415;
    // document.getElementById("lvl80Wheat").value = 410;
    // document.getElementById("lvl80GossamerCottonBolls").value = 861;
    // document.getElementById("lvl80Tortoises").value = 345;
    // document.getElementById("lvl80GoldOre").value = 300;
    // document.getElementById("lvl80FinestRockSalt").value = 300;
    // document.getElementById("lvl80TruespringWater").value = 330;
    // document.getElementById("lvl80MineralSand").value = 285;
    // document.getElementById("lvl80BluespiritOre").value = 400;

    //simulated user input #4
    // document.getElementById("lvl80WhiteCedarLogs").value = 100;
    // document.getElementById("lvl80PrimordialResin").value = 100;
    // document.getElementById("lvl80Wheat").value = 100;
    // document.getElementById("lvl80GossamerCottonBolls").value = 100;
    // document.getElementById("lvl80Tortoises").value = 100;
    // document.getElementById("lvl80GoldOre").value = 100;
    // document.getElementById("lvl80FinestRockSalt").value = 100;
    // document.getElementById("lvl80TruespringWater").value = 100;
    // document.getElementById("lvl80MineralSand").value = 100;
    // document.getElementById("lvl80BluespiritOre").value = 100;
}

function SetUpTabs()
{
    document.querySelectorAll(".tab_button").forEach(button => {
        button.addEventListener("click", () => {
            const tabBar = button.parentElement;
            const tabContainer = tabBar.parentElement;
            const tabNumber = button.dataset.forTab;
            _currentTabLevelBracket = tabNumber;
            const tabToActivate = tabContainer.querySelector(`.tab_content[data-tab="${tabNumber}"]`);

            tabBar.querySelectorAll(".tab_button").forEach(button2 => {
                button2.classList.remove("tab_button--active");
            });

            tabContainer.querySelectorAll(".tab_content").forEach(tab => {
                tab.classList.remove("tab_content--active");
            });

            button.classList.add("tab_button--active");
            tabToActivate.classList.add("tab_content--active");
            
        });
    });
}

function CalculateButtonClick()
{
    let infoTextArea;
    switch(_currentTabLevelBracket)
    {
        case "80": infoTextArea = _lvl80InfoTextarea;
            break;
        case "70": infoTextArea = _lvl70InfoTextarea;
            break;
        case "60": infoTextArea = _lvl60InfoTextarea;
            break;
        case "40": infoTextArea = _lvl40InfoTextarea;
            break;
        case "20": infoTextArea = _lvl20InfoTextarea;
            break;
    }

    if(!GetAndValidateUserInput())
    {
        return;
    }

    FindCraftingPaths();

    infoTextArea.style.borderWidth = "1px";

    let maxCount = 0;
    //get the highest count from the crafting dictionary
    _crafterDictionary.forEach(item =>
    {
        if(item.CountSum > maxCount)
        {
            maxCount = item.CountSum;
        }
    });

    if(maxCount != 0)
    {
        var craftString = "The crafting path(s) that offer the max number of crafts, " + maxCount + ", are:\r\n";
        //store all the crafters that tie for max count in their own array, with their crafting lists sorted
        let maxCountCrafterDictionary = _crafterDictionary.filter(d => d.CountSum === maxCount);
        maxCountCrafterDictionary.forEach(maxCrafter =>
        {
            //sort the crafts of each path in descending count
            maxCrafter.CrafterList = maxCrafter.CrafterList.sort(
                function(a,b)
                {
                    return b.CrafterCount - a.CrafterCount;
                }
            );
        });
                
        //now that the crafting lists are sorted, the duplicate paths will be more apparent and should be removed
        let maxCountNoDupesCrafterDictionary = []
        //put the first crafting path from the max count dictionary in the no-dupe list, because it can't be a dupe and we need something to compare against.
        //this will result in the first check in the for-each below always being a duplicate, but the code to avoid that isn't as readable
        //and i dont need to care about performance much for this. not yet, at least.
        maxCountNoDupesCrafterDictionary.push(maxCountCrafterDictionary[0]);
        
        let notADupe = true;
        maxCountCrafterDictionary.forEach(maxCountCrafter =>
        {
            notADupe = true;

            //TODO is it worth trying to order crafters with the same count so that "duplicates" as well as duplicates are removed?
            //i.e. CRP (5) -> ARM (5) is effectively the same as ARM (5) -> CRP (5) for the user, even though its not a duplicate by my current logic

            //loop over the list of non-dupes to see if the crafting path already exists
            for(let i = 0; i < maxCountNoDupesCrafterDictionary.length; i++)
            {
                let listBeingChecked = maxCountCrafter.CrafterList;
                let listToCheckAgainst = maxCountNoDupesCrafterDictionary[i].CrafterList;

                //if the lists are equal, set the variable to skip adding it to the list and break out of the loop
                if(CrafterListsAreEqual(listBeingChecked, listToCheckAgainst))
                {
                    notADupe = false;
                    break;
                }
            }

            //if it was not found in the current list of not-dupes, add it to the list of not-dupes
            if(notADupe)
            {
                maxCountNoDupesCrafterDictionary.push(maxCountCrafter);
            }
        });

        //sort the non-dupes by the number of crafters they use, in ascending order. people probably want to use the fewer number of different crafters first
        maxCountNoDupesCrafterDictionary = maxCountNoDupesCrafterDictionary.sort(
            function(a,b)
            {
                return a.CrafterList.length - b.CrafterList.length;
            }
        );

        //loop over the entries in the dictionary that have the same number of crafts as the maximum found, then make the output pretty. ish.
        maxCountNoDupesCrafterDictionary.forEach(noDupeMaxCrafter => 
        {
            noDupeMaxCrafter.CrafterList.forEach(cl => 
            {
                craftString = (craftString + cl.Crafter + "-" + cl.CrafterCount +" -> ")
            });
            craftString = craftString.substring(0, craftString.length - 4) + "\r\n";
        });

        infoTextArea.textContent = craftString;
    }
    else
    {
        infoTextArea.textContent = "No crafting paths were found with the given materials and selected crafters."
    }
}

function GetAndValidateUserInput()
{
    let invalidValueErrorExists = false;
    let tooLargeErrorExists = false;
    let textboxValue = -1;
    let invalidValueErrorString = "The following fields are not positive whole numbers:\r\n";
    let tooLargeErrorString = "The following fields are too large.\r\nWhy do you have more than 100,000 of these:\r\n";
    let friendlyMatName = "";
    let levelBracketPrefix = "lvl" + _currentTabLevelBracket;

    //since javascript loves pass by reference, i can create these variables and then assign the appropriate level-bracket variables to them
    //i use this pattern several times in this script
    let userCraftingInventory;
    let materialCost;
    let infoTextarea;
    let infoTextareaDiv;

    switch(_currentTabLevelBracket)
    {
        case "80": userCraftingInventory = _level80UserCraftingInventory;
            materialCost = LEVEL_80_MATERIAL_COST;
            infoTextarea = _lvl80InfoTextarea;
            infoTextareaDiv = _lvl80InfoTextareaDiv;
            break;
        case "70": userCraftingInventory = _level70UserCraftingInventory;
            materialCost = LEVEL_70_MATERIAL_COST;
            infoTextarea = _lvl70InfoTextarea;
            infoTextareaDiv = _lvl70InfoTextareaDiv;
            break;
        case "60": userCraftingInventory = _level60UserCraftingInventory;
            materialCost = LEVEL_60_MATERIAL_COST;
            infoTextarea = _lvl60InfoTextarea;
            infoTextareaDiv = _lvl60InfoTextareaDiv;
            break;
        case "40": userCraftingInventory = _level40UserCraftingInventory;
            materialCost = LEVEL_40_MATERIAL_COST;
            infoTextarea = _lvl40InfoTextarea;
            infoTextareaDiv = _lvl40InfoTextareaDiv;
            break;
        case "20": userCraftingInventory = _level20UserCraftingInventory;
            materialCost = LEVEL_20_MATERIAL_COST;
            infoTextarea = _lvl20InfoTextarea;
            infoTextareaDiv = _lvl20InfoTextareaDiv;
            break;
    }

    for(let mat in userCraftingInventory)
    {
        //this will return the value of the text box, or NaN if it contains non-numeric characters
        textboxValue = Number(document.getElementById(levelBracketPrefix + mat).value);
        
        //if the textbox value isn't a positive whole number
        if(Number.isNaN(textboxValue) || textboxValue < 0 || !Number.isInteger(textboxValue))
        {
            friendlyMatName = GetFriendlyMatName(mat);
            invalidValueErrorString += friendlyMatName + "\r\n";
            invalidValueErrorExists = true;   
        }
        else if(textboxValue > 100000)
        {
            friendlyMatName = GetFriendlyMatName(mat);
            tooLargeErrorString += friendlyMatName + "\r\n";
            tooLargeErrorExists = true;
        }
        //the value is valid, but check if there are existing errors. no need to do calculations or assign variables if there are
        else if(!invalidValueErrorExists && !tooLargeErrorExists)
        {
            //get the value from the appropriate textbox, i.e. lvl80Logs
            //then reduce it to the number of crafts it can be used in by dividing by how many are used per craft
            userCraftingInventory[mat] = parseInt(textboxValue / materialCost);//using parseInt here forces integer division
        }
    }

    //clear the list of allowed crafters
    _allowedCrafters = [];

    //update the list of crafters the user is able to use
    CRAFTERS.forEach(crafter => {
        if(document.getElementById("checkboxUse" + crafter).checked)
        {
            _allowedCrafters.push(crafter);
        }
    });

    //if an error exists, set the error content and ensure the field is shown
    if(invalidValueErrorExists || tooLargeErrorExists)
    {
        if(invalidValueErrorExists)
        {
            infoTextarea.textContent = invalidValueErrorString;
        }
        else if(tooLargeErrorExists)
        {
            infoTextarea.textContent = tooLargeErrorString;
        }

        infoTextareaDiv.style.display = "block";
        return false;
    }
    
    //if there's not an error, still need to ensure the field is shown after a reset
    infoTextareaDiv.style.display = "block";
    return true;
}

//i could definitely make this function level-agnostic, but it doesnt seem worth it for multiple reasons
function ResetLevel80Fields()
{
    _lvl80InfoTextarea.textContent = "";
    _lvl80InfoTextareaDiv.style.display = "none";

    //im not making variable names for these because im only addressing them here
    document.getElementById("lvl80WhiteCedarLogs").value = "";
    document.getElementById("lvl80PrimordialResin").value = "";
    document.getElementById("lvl80Wheat").value = "";
    document.getElementById("lvl80GossamerCottonBolls").value = "";
    document.getElementById("lvl80Tortoises").value = "";
    document.getElementById("lvl80BluespiritOre").value = "";
    document.getElementById("lvl80GoldOre").value = "";
    document.getElementById("lvl80MineralSand").value = "";
    document.getElementById("lvl80TruespringWater").value = "";
    document.getElementById("lvl80FinestRockSalt").value = "";
}

function ResetLevel70Fields()
{
    _lvl70InfoTextarea.textContent = "";
    _lvl70InfoTextareaDiv.style.display = "none";

    //im not making variable names for these because im only addressing them here
    document.getElementById("lvl70SpruceLogs").value = "";
    document.getElementById("lvl70Mistletoe").value = "";
    document.getElementById("lvl70TeaLeaves").value = "";
    document.getElementById("lvl70Vines").value = "";
    document.getElementById("lvl70Toads").value = "";
    document.getElementById("lvl70ElectrumOre").value = "";
    document.getElementById("lvl70Alumen").value = "";
    document.getElementById("lvl70SpringWater").value = "";
    document.getElementById("lvl70GoldSand").value = "";
    document.getElementById("lvl70Ragstone").value = "";
}

function ResetLevel60Fields()
{
    _lvl60InfoTextarea.textContent = "";
    _lvl60InfoTextareaDiv.style.display = "none";

    //im not making variable names for these because im only addressing them here
    document.getElementById("lvl60SpruceLogs").value = "";
    document.getElementById("lvl60Mistletoe").value = "";
    document.getElementById("lvl60TeaLeaves").value = "";
    document.getElementById("lvl60Vines").value = "";
    document.getElementById("lvl60Toads").value = "";
    document.getElementById("lvl60ElectrumOre").value = "";
    document.getElementById("lvl60Alumen").value = "";
    document.getElementById("lvl60SpringWater").value = "";
    document.getElementById("lvl60GoldSand").value = "";
    document.getElementById("lvl60Ragstone").value = "";
}

function ResetLevel40Fields()
{
    _lvl40InfoTextarea.textContent = "";
    _lvl40InfoTextareaDiv.style.display = "none";

    //im not making variable names for these because im only addressing them here
    document.getElementById("lvl40MahoganyLogs").value = "";
    document.getElementById("lvl40CottonBolls").value = "";
    document.getElementById("lvl40Sesame").value = "";
    document.getElementById("lvl40Ore").value = "";
    document.getElementById("lvl40RockSalt").value = "";
    document.getElementById("lvl40MythriteSand").value = "";
}

function ResetLevel20Fields()
{
    _lvl20InfoTextarea.textContent = "";
    _lvl20InfoTextareaDiv.style.display = "none";

    //im not making variable names for these because im only addressing them here
    document.getElementById("lvl20Switch").value = "";
    document.getElementById("lvl20Hemp").value = "";
    document.getElementById("lvl20IronOre").value = "";
    document.getElementById("lvl20IronSand").value = "";
}

//#region Level 80 Recursive Crafter calculations

//kicks off the recursive search for each of the crafters with selected checkboxes
function FindCraftingPaths()
{
    //clear out the dictionary
    _crafterDictionary = [];
    
    _allowedCrafters.forEach(baseCrafter =>
    {
        //add initial dictionary item
        _crafterDictionary.push(new CrafterDictionaryItem(baseCrafter, [], 0));

        //clear current list, just to be sure
        _crafterListForCalculation = [];

        CalculateCraftingPaths(baseCrafter, baseCrafter, 0);
    });
}

//the main recursive function for calculating crafting paths. this will return the single best crafting path for a given base crafter
//baseCrafter: a crafter TLA, does not get changed. it is used to reference the dictionary
//currentCrafter: a crafter TLA, provides the crafter that is currently being recursed on
//recursiveSum (int): the current sum of crafting counts in the recursion
function CalculateCraftingPaths(baseCrafter, currentCrafter, recursiveSum)
{
    //identify which materials(columns) are affected by the craft
    var usedMaterials = GetMaterialsUsedByCraft(GetCrafterRowFromStringName(currentCrafter));
    var lowestCount = GetLowestMaterialCountByMaterialList(usedMaterials);

    //add the craft to the list and remove the materials from the inventory
    _crafterListForCalculation.push(new CrafterListItem(currentCrafter, lowestCount, recursiveSum + lowestCount));
    RemoveOrUnremoveCrafterMaterials(currentCrafter, lowestCount, true);

    //get crafters that can still make stuff and loop over them
    var remainingCrafters = GetCraftersRemaining();
    if(remainingCrafters.length > 0)
    {
        remainingCrafters.forEach(remainingCraft => {
            CalculateCraftingPaths(baseCrafter, remainingCraft, recursiveSum + lowestCount);
        });
    }
    //or, if no crafters remain, check to see if this is a new best, save it if it is
    else
    {
        //the sum of the current crafting path being evaluated
        let listSum = _crafterListForCalculation[_crafterListForCalculation.length - 1].SumToNow;
        //the current best count for the base crafter
        let currentSum = _crafterDictionary.find(d => d.BaseCrafter === baseCrafter).CountSum;
        
        //if the path being evaluated is better than the current count, or the current count is the same but uses fewer crafters in the paths, save it as the new best
        if((listSum > currentSum) ||
            (listSum == currentSum && _crafterListForCalculation.length < _crafterDictionary.find(d => d.BaseCrafter === baseCrafter).CrafterList.length))
        {
            //create a copy of the crafting list from the current recursion iteration into the dictionary as the new best
            _crafterDictionary.find(d => d.BaseCrafter === baseCrafter).CrafterList = DeepCopyAnArray(_crafterListForCalculation);
            //set the new best count
            _crafterDictionary.find(d => d.BaseCrafter === baseCrafter).CountSum = listSum;
        }
    }

    //restore the materials to the inventory for the next loop and remove the craft from the list
    RemoveOrUnremoveCrafterMaterials(currentCrafter, lowestCount, false);
    _crafterListForCalculation.pop();
}

//find which materials are used by a crafter and remove or unremove the passed-in value from the inventory, based on the passed-in bool
//it is assumed the inventory has been reduced to 1 material per craft already
//crafter: a crafter TLA
//count (int): the number of materials to remove
//isRemoving: flag for if this method is removing or unremoving. true if subtracting from the inventory, false if returning materials to it
function RemoveOrUnremoveCrafterMaterials(crafter, count, isRemoving)
{
    var usedMaterials = GetMaterialsUsedByCraft(GetCrafterRowFromStringName(crafter));
    let userCraftingInventory;
    
    switch(_currentTabLevelBracket)
    {
        case "80": userCraftingInventory = _level80UserCraftingInventory;
            break;
        case "70": userCraftingInventory = _level70UserCraftingInventory;
            break;
        case "60": userCraftingInventory = _level60UserCraftingInventory;
            break;
        case "40": userCraftingInventory = _level40UserCraftingInventory;
            break;
        case "20": userCraftingInventory = _level20UserCraftingInventory;
            break;
    }

    if(isRemoving)
    {
        usedMaterials.forEach(mat => {
            userCraftingInventory[mat] -= count;
        });
    }
    else
    {
        usedMaterials.forEach(mat => {
            userCraftingInventory[mat] += count;
        });
    }
}

//returns a list of crafter TLAs that can still be crafted based on the state of the UserCraftingInventory
function GetCraftersRemaining()
{
    let returnList = [];//list of crafter TLAs
    
    _allowedCrafters.forEach(crafter => 
    {
        let mats = GetMaterialsUsedByCraft(GetCrafterRowFromStringName(crafter));
        let lowest = GetLowestMaterialCountByMaterialList(mats);
        
        if(lowest > 0)
        {
            returnList.push(crafter);
        }
    });

    return returnList;
}

//returns a crafter row (the crafter TLA, which materials it uses) from the crafter matrix
//crafterName: a crafter TLA
function GetCrafterRowFromStringName(crafterName)
{
    switch(_currentTabLevelBracket)
    {
        case "80":
            return _level80CrafterMatrix.find(f => f.Crafter === crafterName);
        case "70":
            return _level70CrafterMatrix.find(f => f.Crafter === crafterName);
        case "60":
            return _level60CrafterMatrix.find(f => f.Crafter === crafterName);
        case "40":
            return _level40CrafterMatrix.find(f => f.Crafter === crafterName);
        case "20":
            return _level20CrafterMatrix.find(f => f.Crafter === crafterName);
    }
}

//returns an int that has the lowest count of the passed-in list in the user inventory
//materialList: a list of materials names matching the key for UserCraftingInventory
function GetLowestMaterialCountByMaterialList(materialList)
{
    var lowestCount = Number.MAX_SAFE_INTEGER;
    let craftingInvetory;

    switch(_currentTabLevelBracket)
    {
        case "80": craftingInvetory = _level80UserCraftingInventory;
            break;
        case "70": craftingInvetory = _level70UserCraftingInventory;
            break;
        case "60": craftingInvetory = _level60UserCraftingInventory;
            break;
        case "40": craftingInvetory = _level40UserCraftingInventory;
            break;
        case "20": craftingInvetory = _level20UserCraftingInventory;
            break;
    }

    materialList.forEach(mat => {
        if(craftingInvetory[mat] < lowestCount)
        {
            lowestCount = craftingInvetory[mat];
        }
    });

    return lowestCount;
}

//#endregion

//#region Universal methods

//takes in the name of a material (that is in Pascal case) and injects spaces before the capital letters to create a friendly name
//returns the name of the material with spaces before each capital (except at the start of the name)
//matName: the name of the material in Pascal case
function GetFriendlyMatName(matName)
{
    //list of friendly words to become the friendly name
    let wordList = [];
    //variable for building a friendly word
    let nextWord = "";
    //variable to return the full friendly name of the material
    let returnName = "";

    //loop over the material name one character at a time
    for(let i = 0; i < matName.length; i++)
    {
        //if the character is uppercase, begin creating a new word for the friendly name
        if(IsUpperCase(matName.charAt(i)))
        {
            //add the character to the friendly word
            nextWord = matName.charAt(i);
            //increment i since the character has been processed
            i++;

            //loop over the rest of the name until an uppercase letter is found, indicating the end of the friendly word
            for(let j = i; j < matName.length && !IsUpperCase(matName.charAt(j)); j++)
            {
                //add the character to the friendly word
                nextWord += matName.charAt(j);
                //increment i since the character has been processed
                i++;
            }

            //decrement i because it was just incremented at the end of the loop (the index is now on an uppercase character)
            //and it is about to be incremented again (outer for loop)
            i--;

            //add the friendly word to the list that will become the friendly name
            wordList.push(nextWord);
        }
    }

    //concatenate the friendly words in the list, along with a space, into the friendly name
    wordList.forEach(wl => {
        returnName = returnName + wl + " ";
    });

    //remove the trailing space added in the above for-each loop
    returnName = returnName.substring(0, returnName.length - 1);

    return returnName;
}

//returns whether a character is uppercase or not
//char: the character to be checked
function IsUpperCase(char)    
{    
    return (char >= 'A') && (char <= 'Z');
}

//toggles all the crafter checkboxes based on the state of the "use all crafters" checkbox
function ToggleAllCrafterCheckboxes()
{
    CRAFTERS.forEach(crafter => {
        document.getElementById("checkboxUse" + crafter).checked = _useAllCraftersCheckbox.checked
    });
}

//update the "use all crafters" checkbox based on the state of the rest of the crafter checkboxes
function UpdateUseAllCraftersCheckbox()
{
    let allChecked = true;

    //loop over all the checkboxes and if one is not checked, set the allChecked to false
    for(let i = 0; i < CRAFTERS.length; i++)
    {
        if(!document.getElementById("checkboxUse" + CRAFTERS[i]).checked)
        {
            allChecked = false;
            break;
        }
    }

    //update the checkboxUseAll based on the state of the variable
    _useAllCraftersCheckbox.checked = allChecked;
}

//takes in a crafter row returns a crafter row (the crafter TLA, which materials it uses) from the crafter matrix
//returns a list of which materials the passed-in crafter row uses
//crafterRow: a row from the crafter matrix
function GetMaterialsUsedByCraft(crafterRow)
{
    //the list of used materials to be returned by the function
    let returnList = [];

    //identify which materials are used by the level 80 craft
    for(let material in crafterRow)
    {
        //material is the name of the "key"
        //crafterRow[material] is the "value" of the key
        if(crafterRow[material] == true)
        {
            //if the craft uses the material, add it to the list
            returnList.push(material);
        }
    }

    return returnList;
}

//returns a copy of the passed-in array so we have a ByValue copy rather than a reference
function DeepCopyAnArray(sourceArray)
{
    let returnArray = [];
    for (let i = 0; i < sourceArray.length; i++)
    {
        returnArray.push(JSON.parse(JSON.stringify(sourceArray[i])));
    }

    return returnArray;
}

//returns whether the passed in lists (which are expected to be sorted CrafterLists) hold the same value
//firstList: a sorted CrafterList
//secondList: a sorted CrafterList
function CrafterListsAreEqual(firstList, secondList)
{
    //if the lengths are different, they're clearly not the same
    if(firstList.length != secondList.length)
    {
        return false;
    }

    for(let i = 0; i< firstList.length; i++)
    {
        if(firstList[i].Crafter === secondList[i].Crafter)
        {
            if(firstList[i].CrafterCount === secondList[i].CrafterCount)
            {
                //if the crafter and the count are the same, the indexes are identical, check the next one
                //if they're different, it should hit the return false at the bottom of the loop block
                continue;
            }
        }
        //if at any point the same indexes dont have the same crafter, the lists are distinct
        return false;
    }

    return true;
}

//#endregion
