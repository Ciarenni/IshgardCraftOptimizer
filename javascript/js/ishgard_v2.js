//#region Members

//#region Constants

let COUNT_OF_CRAFTERS = 8;//constant
let LEVEL_80_MATERIAL_COST = 10;
let LEVEL_70_MATERIAL_COST = 10;
let LEVEL_60_MATERIAL_COST = 5;
let LEVEL_40_MATERIAL_COST = 5;
let LEVEL_20_MATERIAL_COST = 5;
let CRAFTERS = [ "CRP", "BSM", "ARM", "GSM", "LTW", "WVR", "ALC", "CUL" ]//constant

//#endregion

//#region Level 80 variables

let _level80CrafterMatrix = [
    {
        "Crafter": "CRP",
        "CedarLogs": true,
        "Wheat": true,
        "CottonBolls": true,
        "Resin": false,
        "Tortoises": false,
        "BluespiritOre": false,
        "GoldOre": false,
        "MineralSand": false,
        "TruespringWater": false,
        "RockSalt": false
    },
    {
        "Crafter": "BSM",
        "CedarLogs": true,
        "Wheat": false,
        "CottonBolls": false,
        "Resin": false,
        "Tortoises": false,
        "BluespiritOre": true,
        "GoldOre": true,
        "MineralSand": false,
        "TruespringWater": false,
        "RockSalt": false
    },
    {
        "Crafter": "ARM",
        "CedarLogs": false,
        "Wheat": false,
        "CottonBolls": false,
        "Resin": false,
        "Tortoises": false,
        "BluespiritOre": true,
        "GoldOre": true,
        "MineralSand": true,
        "TruespringWater": false,
        "RockSalt": false
    },
    {
        "Crafter": "GSM",
        "CedarLogs": false,
        "Wheat": false,
        "CottonBolls": false,
        "Resin": true,
        "Tortoises": false,
        "BluespiritOre": true,
        "GoldOre": false,
        "MineralSand": true,
        "TruespringWater": false,
        "RockSalt": false
    },
    {
        "Crafter": "LTW",
        "CedarLogs": true,
        "Wheat": false,
        "CottonBolls": true,
        "Resin": false,
        "Tortoises": true,
        "BluespiritOre": false,
        "GoldOre": false,
        "MineralSand": false,
        "TruespringWater": false,
        "RockSalt": false
    },
    {
        "Crafter": "WVR",
        "CedarLogs": false,
        "Wheat": false,
        "CottonBolls": true,
        "Resin": true,
        "Tortoises": false,
        "BluespiritOre": false,
        "GoldOre": false,
        "MineralSand": false,
        "TruespringWater": true,
        "RockSalt": false
    },
    {
        "Crafter": "ALC",
        "CedarLogs": false,
        "Wheat": false,
        "CottonBolls": false,
        "Resin": false,
        "Tortoises": true,
        "BluespiritOre": false,
        "GoldOre": false,
        "MineralSand": false,
        "TruespringWater": true,
        "RockSalt": true
    },
    {
        "Crafter": "CUL",
        "CedarLogs": false,
        "Wheat": true,
        "CottonBolls": false,
        "Resin": false,
        "Tortoises": false,
        "BluespiritOre": false,
        "GoldOre": false,
        "MineralSand": false,
        "TruespringWater": true,
        "RockSalt": true
    }
];
let _level80UserCraftingInventory = {

    "CedarLogs": 0,
    "Wheat": 0,
    "CottonBolls": 0,
    "Resin": 0,
    "Tortoises": 0,
    "BluespiritOre": 0,
    "GoldOre": 0,
    "MineralSand": 0,
    "TruespringWater": 0,
    "RockSalt": 0

};
let _level80CraftsAvailablePerCrafter = {
    "CRP": 0,
    "BSM": 0,
    "ARM": 0,
    "GSM": 0,
    "LTW": 0,
    "WVR": 0,
    "ALC": 0,
    "CUL": 0
}

let _level80CrafterDictionary = [];//a list of CrafterDictionaryItems
let _level80CrafterList = [];//a list of CrafterListItems, it will hold 
let _level80AllowedCrafters = [];//crafter TLAs

//#endregion

//#region Level 70 variables - update values

let _level70CrafterMatrix = [
    {
        "Crafter": "CRP",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": false,
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
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "ARM",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "GSM",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "LTW",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": false,
        "GoldSand": false,
        "Ragstone": false
    },
    {
        "Crafter": "WVR",
        "SpruceLogs": false,
        "Mistletoe": false,
        "TeaLeaves": false,
        "Vines": false,
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
        "Mistletoe": false,
        "TeaLeaves": false,
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
        "TeaLeaves": false,
        "Vines": false,
        "Toads": false,
        "ElectrumOre": false,
        "Alumen": false,
        "SpringWater": false,
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
let _level70CraftsAvailablePerCrafter = {
    "CRP": 0,
    "BSM": 0,
    "ARM": 0,
    "GSM": 0,
    "LTW": 0,
    "WVR": 0,
    "ALC": 0,
    "CUL": 0
}

let _level70CrafterDictionary = [];//a list of CrafterDictionaryItems
let _level70CrafterList = [];//a list of CrafterListItems, it will hold 
let _level70AllowedCrafters = [];//crafter TLAs

//#endregion

//#region Level 60 variables - update values

let _level60CrafterMatrix = [
    {
        "Crafter": "CRP",
        "Logs": true,
        "Wheat": true,
        "Bolls": true,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "BSM",
        "Logs": true,
        "Wheat": false,
        "Bolls": false,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": true,
        "Gold": true,
        "Sand": false,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "ARM",
        "Logs": false,
        "Wheat": false,
        "Bolls": false,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": true,
        "Gold": true,
        "Sand": true,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "GSM",
        "Logs": false,
        "Wheat": false,
        "Bolls": false,
        "Resin": true,
        "Tortoises": false,
        "Bluespirit": true,
        "Gold": false,
        "Sand": true,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "LTW",
        "Logs": true,
        "Wheat": false,
        "Bolls": true,
        "Resin": false,
        "Tortoises": true,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "WVR",
        "Logs": false,
        "Wheat": false,
        "Bolls": true,
        "Resin": true,
        "Tortoises": false,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": true,
        "Salt": false
    },
    {
        "Crafter": "ALC",
        "Logs": false,
        "Wheat": false,
        "Bolls": false,
        "Resin": false,
        "Tortoises": true,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": true,
        "Salt": true
    },
    {
        "Crafter": "CUL",
        "Logs": false,
        "Wheat": true,
        "Bolls": false,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": true,
        "Salt": true
    }
];
let _level60UserCraftingInventory = {

    "Logs": 0,
    "Wheat": 0,
    "Bolls": 0,
    "Resin": 0,
    "Tortoises": 0,
    "Bluespirit": 0,
    "Gold": 0,
    "Sand": 0,
    "Water": 0,
    "Salt": 0

};
let _level60CraftsAvailablePerCrafter = {
    "CRP": 0,
    "BSM": 0,
    "ARM": 0,
    "GSM": 0,
    "LTW": 0,
    "WVR": 0,
    "ALC": 0,
    "CUL": 0
}

let _level60CrafterDictionary = [];//a list of CrafterDictionaryItems
let _level60CrafterList = [];//a list of CrafterListItems, it will hold 
let _level60AllowedCrafters = [];//crafter TLAs

//#endregion

//#region Level 40 variables - update values

let _level40CrafterMatrix = [
    {
        "Crafter": "CRP",
        "Logs": true,
        "Wheat": true,
        "Bolls": true,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "BSM",
        "Logs": true,
        "Wheat": false,
        "Bolls": false,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": true,
        "Gold": true,
        "Sand": false,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "ARM",
        "Logs": false,
        "Wheat": false,
        "Bolls": false,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": true,
        "Gold": true,
        "Sand": true,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "GSM",
        "Logs": false,
        "Wheat": false,
        "Bolls": false,
        "Resin": true,
        "Tortoises": false,
        "Bluespirit": true,
        "Gold": false,
        "Sand": true,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "LTW",
        "Logs": true,
        "Wheat": false,
        "Bolls": true,
        "Resin": false,
        "Tortoises": true,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "WVR",
        "Logs": false,
        "Wheat": false,
        "Bolls": true,
        "Resin": true,
        "Tortoises": false,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": true,
        "Salt": false
    },
    {
        "Crafter": "ALC",
        "Logs": false,
        "Wheat": false,
        "Bolls": false,
        "Resin": false,
        "Tortoises": true,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": true,
        "Salt": true
    },
    {
        "Crafter": "CUL",
        "Logs": false,
        "Wheat": true,
        "Bolls": false,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": true,
        "Salt": true
    }
];
let _level40UserCraftingInventory = {

    "Logs": 0,
    "Wheat": 0,
    "Bolls": 0,
    "Resin": 0,
    "Tortoises": 0,
    "Bluespirit": 0,
    "Gold": 0,
    "Sand": 0,
    "Water": 0,
    "Salt": 0

};
let _level40CraftsAvailablePerCrafter = {
    "CRP": 0,
    "BSM": 0,
    "ARM": 0,
    "GSM": 0,
    "LTW": 0,
    "WVR": 0,
    "ALC": 0,
    "CUL": 0
}

let _level40CrafterDictionary = [];//a list of CrafterDictionaryItems
let _level40CrafterList = [];//a list of CrafterListItems, it will hold 
let _level40AllowedCrafters = [];//crafter TLAs

//#endregion

//#region Level 20 variables - update values

let _level20CrafterMatrix = [
    {
        "Crafter": "CRP",
        "Logs": true,
        "Wheat": true,
        "Bolls": true,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "BSM",
        "Logs": true,
        "Wheat": false,
        "Bolls": false,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": true,
        "Gold": true,
        "Sand": false,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "ARM",
        "Logs": false,
        "Wheat": false,
        "Bolls": false,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": true,
        "Gold": true,
        "Sand": true,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "GSM",
        "Logs": false,
        "Wheat": false,
        "Bolls": false,
        "Resin": true,
        "Tortoises": false,
        "Bluespirit": true,
        "Gold": false,
        "Sand": true,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "LTW",
        "Logs": true,
        "Wheat": false,
        "Bolls": true,
        "Resin": false,
        "Tortoises": true,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": false,
        "Salt": false
    },
    {
        "Crafter": "WVR",
        "Logs": false,
        "Wheat": false,
        "Bolls": true,
        "Resin": true,
        "Tortoises": false,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": true,
        "Salt": false
    },
    {
        "Crafter": "ALC",
        "Logs": false,
        "Wheat": false,
        "Bolls": false,
        "Resin": false,
        "Tortoises": true,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": true,
        "Salt": true
    },
    {
        "Crafter": "CUL",
        "Logs": false,
        "Wheat": true,
        "Bolls": false,
        "Resin": false,
        "Tortoises": false,
        "Bluespirit": false,
        "Gold": false,
        "Sand": false,
        "Water": true,
        "Salt": true
    }
];
let _level20UserCraftingInventory = {

    "Logs": 0,
    "Wheat": 0,
    "Bolls": 0,
    "Resin": 0,
    "Tortoises": 0,
    "Bluespirit": 0,
    "Gold": 0,
    "Sand": 0,
    "Water": 0,
    "Salt": 0

};
let _level20CraftsAvailablePerCrafter = {
    "CRP": 0,
    "BSM": 0,
    "ARM": 0,
    "GSM": 0,
    "LTW": 0,
    "WVR": 0,
    "ALC": 0,
    "CUL": 0
}

let _level20CrafterDictionary = [];//a list of CrafterDictionaryItems
let _level20CrafterList = [];//a list of CrafterListItems, it will hold 
let _level20AllowedCrafters = [];//crafter TLAs

//#endregion

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
    document.getElementById("calculateButton").onclick = Level80CalculateButtonClick;
    document.getElementById("resetButton").onclick = ResetLevel80Fields;
    _useAllCraftersCheckbox.onclick = ToggleAllCrafterCheckboxes;
    for(let i = 0; i < CRAFTERS.length; i++)
    {
        document.getElementById("checkboxUse" + CRAFTERS[i]).onclick = UpdateUseAllCraftersCheckbox;   
    }
    
    _lvl80InfoTextareaDiv.style.display = "none";

    SetUpTabs();
    
    //put values in the text boxes for testing because im not typing that over and over
    //simulated user input #1
    // document.getElementById("lvl80CedarLogs").value = 100;
    // document.getElementById("lvl80Wheat").value = 20;
    // document.getElementById("lvl80CottonBolls").value = 90;
    // document.getElementById("lvl80Resin").value = 80;
    // document.getElementById("lvl80Tortoises").value = 30;
    // document.getElementById("lvl80BluespiritOre").value = 70;
    // document.getElementById("lvl80GoldOre").value = 90;
    // document.getElementById("lvl80MineralSand").value = 40;
    // document.getElementById("lvl80TruespringWater").value = 120;
    // document.getElementById("lvl80RockSalt").value = 110;
    
    //simulated user input #2
    // document.getElementById("lvl80CedarLogs").value = 90;
    // document.getElementById("lvl80Wheat").value = 140;
    // document.getElementById("lvl80CottonBolls").value = 10;
    // document.getElementById("lvl80Resin").value = 60;
    // document.getElementById("lvl80Tortoises").value = 40;
    // document.getElementById("lvl80BluespiritOre").value = 200;
    // document.getElementById("lvl80GoldOre").value = 170;
    // document.getElementById("lvl80MineralSand").value = 100;
    // document.getElementById("lvl80TruespringWater").value = 80;
    // document.getElementById("lvl80RockSalt").value = 190;

    //simulated user input #3
    // document.getElementById("lvl80CedarLogs").value = 375;
    // document.getElementById("lvl80Wheat").value = 410;
    // document.getElementById("lvl80CottonBolls").value = 861;
    // document.getElementById("lvl80Resin").value = 1415;
    // document.getElementById("lvl80Tortoises").value = 345;
    // document.getElementById("lvl80BluespiritOre").value = 400;
    // document.getElementById("lvl80GoldOre").value = 300;
    // document.getElementById("lvl80MineralSand").value = 285;
    // document.getElementById("lvl80TruespringWater").value = 330;
    // document.getElementById("lvl80RockSalt").value = 300;

    //simulated user input #4
    // document.getElementById("lvl80CedarLogs").value = 100;
    // document.getElementById("lvl80Wheat").value = 100;
    // document.getElementById("lvl80CottonBolls").value = 100;
    // document.getElementById("lvl80Resin").value = 100;
    // document.getElementById("lvl80Tortoises").value = 100;
    // document.getElementById("lvl80BluespiritOre").value = 100;
    // document.getElementById("lvl80GoldOre").value = 100;
    // document.getElementById("lvl80MineralSand").value = 100;
    // document.getElementById("lvl80TruespringWater").value = 100;
    // document.getElementById("lvl80RockSalt").value = 100;
}

function SetUpTabs()
{
    document.querySelectorAll(".tab_button").forEach(button => {
        button.addEventListener("click", () => {
            const tabBar = button.parentElement;
            const tabContainer = tabBar.parentElement;
            const tabNumber = button.dataset.forTab;
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

function Level80CalculateButtonClick()
{
    if(!GetAndValidateLevel80UserInput())
    {
        return;
    }

    _lvl80InfoTextarea.style.borderWidth = "1px";

    FindLevel80CraftingPaths();

    let maxCount = 0;
    //get the highest count from the crafting dictionary
    _level80CrafterDictionary.forEach(item =>
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
        let maxCountLevel80CrafterDictionary = _level80CrafterDictionary.filter(d => d.CountSum === maxCount);
        maxCountLevel80CrafterDictionary.forEach(maxCrafter =>
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
        let maxCountNoDupesLevel80CrafterDictionary = []
        //put the first crafting path from the max count dictionary in the no-dupe list, because it can't be a dupe and we need something to compare against.
        //this will result in the first check in the for-each below always being a duplicate, but the code to avoid that isn't as readable
        //and i dont need to care about performance much for this. not yet, at least.
        maxCountNoDupesLevel80CrafterDictionary.push(maxCountLevel80CrafterDictionary[0]);
        
        let notADupe = true;
        maxCountLevel80CrafterDictionary.forEach(maxCountCrafter =>
        {
            notADupe = true;

            //TODO is it worth trying to order crafters with the same count so that "duplicates" as well as duplicates are removed?
            //i.e. CRP (5) -> ARM (5) is effectively the same as ARM (5) -> CRP (5) for the user, even though its not a duplicate by my current logic

            //loop over the list of non-dupes to see if the crafting path already exists
            for(let i = 0; i < maxCountNoDupesLevel80CrafterDictionary.length; i++)
            {
                let listBeingChecked = maxCountCrafter.CrafterList;
                let listToCheckAgainst = maxCountNoDupesLevel80CrafterDictionary[i].CrafterList;

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
                maxCountNoDupesLevel80CrafterDictionary.push(maxCountCrafter);
            }
        });

        //sort the non-dupes by the number of crafters they use, in ascending order. people probably want to use the fewer number of different crafters first
        maxCountNoDupesLevel80CrafterDictionary = maxCountNoDupesLevel80CrafterDictionary.sort(
            function(a,b)
            {
                return a.CrafterList.length - b.CrafterList.length;
            }
        );

        //loop over the entries in the dictionary that have the same number of crafts as the maximum found, then make the output pretty. ish.
        maxCountNoDupesLevel80CrafterDictionary.forEach(noDupeMaxCrafter => 
        {
            noDupeMaxCrafter.CrafterList.forEach(cl => 
            {
                craftString = (craftString + cl.Crafter + "-" + cl.CrafterCount +" -> ")
            });
            craftString = craftString.substring(0, craftString.length - 4) + "\r\n";
        });

        _lvl80InfoTextarea.textContent = craftString;
    }
    else
    {
        _lvl80InfoTextarea.textContent = "No crafting paths were found with the given materials and selected crafters."
    }
}

function GetAndValidateLevel80UserInput()
{
    let invalidValueErrorExists = false;
    let tooLargeErrorExists = false;
    let textboxValue = -1;
    let invalidValueErrorString = "The following fields are not positive whole numbers:\r\n";
    let tooLargeErrorString = "The following fields are too large.\r\nWhy do you have more than 100,000 of these:\r\n";

    for(let mat in _level80UserCraftingInventory)
    {
        //this will return the value of the text box, or NaN if it contains non-numeric characters
        textboxValue = Number(document.getElementById("lvl80" + mat).value);
        
        //if the textbox value isn't a positive whole number
        if(Number.isNaN(textboxValue) || textboxValue < 0 || !Number.isInteger(textboxValue))
        {
            invalidValueErrorString += mat + "\r\n";
            invalidValueErrorExists = true;   
        }
        else if(textboxValue > 100000)
        {
            tooLargeErrorString += mat + "\r\n";
            tooLargeErrorExists = true;
        }
        //the value is valid, but check if there are existing errors. no need to do calculations or assign variables if there are
        else if(!invalidValueErrorExists && !tooLargeErrorExists)
        {
            //get the value from the appropriate textbox, i.e. lvl80Logs
            //then reduce it to the number of crafts it can be used in by dividing by how many are used per craft
            _level80UserCraftingInventory[mat] = parseInt(textboxValue / LEVEL_80_MATERIAL_COST);//using parseInt here forces integer division
        }
    }

    //clear the list of allowed crafters
    _level80AllowedCrafters = [];

    //update the list of crafters the user is able to use
    CRAFTERS.forEach(crafter => {
        if(document.getElementById("checkboxUse" + crafter).checked)
        {
            _level80AllowedCrafters.push(crafter);
        }
    });

    //if an error exists, set the error content and ensure the field is shown
    if(invalidValueErrorExists || tooLargeErrorExists)
    {
        if(invalidValueErrorExists)
        {
            _lvl80InfoTextarea.textContent = invalidValueErrorString;
        }
        else if(tooLargeErrorExists)
        {
            _lvl80InfoTextarea.textContent = tooLargeErrorString;
        }

        _lvl80InfoTextareaDiv.style.display = "block";
        return false;
    }
    
    //if there's not an error, still need to ensure the field is shown after a reset
    _lvl80InfoTextareaDiv.style.display = "block";
    return true;
}

function ResetLevel80Fields()
{
    _lvl80InfoTextarea.textContent = "";
    _lvl80InfoTextareaDiv.style.display = "none";

    //im not making variable names for these because im only addressing them here
    document.getElementById("lvl80CedarLogs").value = "";
    document.getElementById("lvl80Wheat").value = "";
    document.getElementById("lvl80CottonBolls").value = "";
    document.getElementById("lvl80Resin").value = "";
    document.getElementById("lvl80Tortoises").value = "";
    document.getElementById("lvl80BluespiritOre").value = "";
    document.getElementById("lvl80GoldOre").value = "";
    document.getElementById("lvl80MineralSand").value = "";
    document.getElementById("lvl80TruespringWater").value = "";
    document.getElementById("lvl80RockSalt").value = "";
}

function ToggleAllCrafterCheckboxes()
{
    CRAFTERS.forEach(crafter => {
        document.getElementById("checkboxUse" + crafter).checked = _useAllCraftersCheckbox.checked
    });
}

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

//#region Level 80 Recursive Crafter calculations

//kicks off the recursive search for each of the crafters with selected checkboxes
function FindLevel80CraftingPaths()
{
    //clear out the dictionary
    _level80CrafterDictionary = [];
    
    _level80AllowedCrafters.forEach(baseCrafter =>
    {
        //add initial dictionary item
        _level80CrafterDictionary.push(new CrafterDictionaryItem(baseCrafter, [], 0));

        //clear current list, just to be sure
        _level80CrafterList = [];

        CalculateLevel80CraftingPaths(baseCrafter, baseCrafter, 0);
    });
}

//the main recursive function for calculating crafting paths. this will return the single best crafting path for a given base crafter
//baseCrafter: a crafter TLA, does not get changed. it is used to reference the dictionary
//currentCrafter: a crafter TLA, provides the crafter that is currently being recursed on
//recursiveSum (int): the current sum of crafting counts in the recursion
function CalculateLevel80CraftingPaths(baseCrafter, currentCrafter, recursiveSum)
{
    //identify which materials(columns) are affected by the craft
    var usedMaterials = GetMaterialsUsedByCraft(GetLevel80CrafterRowFromStringName(currentCrafter));
    var lowestCount = GetLevel80LowestMaterialCountByMaterialList(usedMaterials);

    //add the craft to the list and remove the materials from the inventory
    _level80CrafterList.push(new CrafterListItem(currentCrafter, lowestCount, recursiveSum + lowestCount));
    RemoveLevel80CrafterMaterials(currentCrafter, lowestCount);

    //get crafters that can still make stuff and loop over them
    var remainingCrafters = GetLevel80CraftersRemaining();
    if(remainingCrafters.length > 0)
    {
        remainingCrafters.forEach(remainingCraft => {
            CalculateLevel80CraftingPaths(baseCrafter, remainingCraft, recursiveSum + lowestCount);
        });
    }
    //or, if no crafters remain, check to see if this is a new best, save it if it is
    else
    {
        //the sum of the current crafting path being evaluated
        let listSum = _level80CrafterList[_level80CrafterList.length - 1].SumToNow;
        //the current best count for the base crafter
        let currentSum = _level80CrafterDictionary.find(d => d.BaseCrafter === baseCrafter).CountSum;
        
        //if the path being evaluated is better than the current count, or the current count is the same but uses fewer crafters in the paths, save it as the new best
        if((listSum > currentSum) ||
            (listSum == currentSum && _level80CrafterList.length < _level80CrafterDictionary.find(d => d.BaseCrafter === baseCrafter).CrafterList.length))
        {
            //create a copy of the crafting list from the current recursion iteration into the dictionary as the new best
            _level80CrafterDictionary.find(d => d.BaseCrafter === baseCrafter).CrafterList = DeepCopyAnArray(_level80CrafterList);
            //set the new best count
            _level80CrafterDictionary.find(d => d.BaseCrafter === baseCrafter).CountSum = listSum;
        }
    }

    //restore the materials to the inventory for the next loop and remove the craft from the list
    UnRemoveLevel80CrafterMaterials(currentCrafter, lowestCount);
    _level80CrafterList.pop();
}

//find which materials are used by a crafter and remove the passed-in value from the inventory
//it is assumed the inventory has been reduced to 1 material per craft already
//crafter: a crafter TLA
//count (int): the number of materials to remove
function RemoveLevel80CrafterMaterials(crafter, count)
{
    var usedMaterials = GetMaterialsUsedByCraft(GetLevel80CrafterRowFromStringName(crafter));

    usedMaterials.forEach(mat => {
            _level80UserCraftingInventory[mat] -= count;
    });
}

//find which materials are used by a crafter and add back the passed-in value from the inventory
//once again, it is assumed the inventory has been reduced to 1 material per craft already
//crafter: a crafter TLA
//count (int): the number of materials to add back
function UnRemoveLevel80CrafterMaterials(crafter, count)
{
    var usedMaterials = GetMaterialsUsedByCraft(GetLevel80CrafterRowFromStringName(crafter));

    usedMaterials.forEach(mat => {
        _level80UserCraftingInventory[mat] += count;
    });
}

//returns a list of crafter TLAs that can still be crafted based on the state of the UserCraftingInventory
function GetLevel80CraftersRemaining()
{
    let returnList = [];//list of crafter TLAs
    
    _level80AllowedCrafters.forEach(crafter => 
    {
        let mats = GetMaterialsUsedByCraft(GetLevel80CrafterRowFromStringName(crafter));
        let lowest = GetLevel80LowestMaterialCountByMaterialList(mats);
        
        if(lowest > 0)
        {
            returnList.push(crafter);
        }
    });

    return returnList;
}

//returns a crafter row (the crafter TLA, which materials it uses) from the crafter matrix
//crafterName: a crafter TLA
function GetLevel80CrafterRowFromStringName(crafterName)
{
    return _level80CrafterMatrix.find(f => f.Crafter === crafterName);
}

//returns an int that has the lowest count of the passed-in list in the user inventory
//materialList: a list of materials names matching the key for UserCraftingInventory
function GetLevel80LowestMaterialCountByMaterialList(materialList)
{
    var lowestCount = Number.MAX_SAFE_INTEGER;

    materialList.forEach(mat => {
        if(_level80UserCraftingInventory[mat] < lowestCount)
        {
            lowestCount = _level80UserCraftingInventory[mat];
        }
    });

    return lowestCount;
}

//#endregion

//#region Universal methods

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
