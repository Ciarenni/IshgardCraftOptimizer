//#region Members
let COUNT_OF_CRAFTERS = 8;//constant
let PER_MATERIAL_COST = 10;//constant
let _level80CrafterMatrix = [
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
let _level80UserCraftingInventory = {

    "Logs": 10,
    "Wheat": 10,
    "Bolls": 10,
    "Resin": 10,
    "Tortoises": 10,
    "Bluespirit": 10,
    "Gold": 10,
    "Sand": 10,
    "Water": 10,
    "Salt": 10

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
let _level80OptimizedCraftingPlan = [];//stores the user's calculated crafting plan
let _level80OptimizedCraftingPlanString = "";

let _level80RecursiveCrafterCountDictionary = [];//baseCrafter, List<KeyValuePair<CrafterTLA, int>>, countSum 
let _level80RecursiveCrafterList = [];//List<KeyValuePair<crafterTLA, int>>
let _level80AllowedCrafters = [];//crafter strings

//#region Web controls

let _resultsTextarea = document.getElementById("resultsTextarea");
let _errorTextarea = document.getElementById("errorTextArea");
let _errorTextareaDiv = document.getElementById("errorTextAreaDiv");

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
    
    _errorTextareaDiv.style.display = "none";
    _resultsTextarea.style.visibility = "hidden";
    
    //put values in the text boxes for testing because im not typing that over and over
    //simulated user input #1
    // document.getElementById("lvl80Logs").value = 100;
    // document.getElementById("lvl80Wheat").value = 20;
    // document.getElementById("lvl80Bolls").value = 90;
    // document.getElementById("lvl80Resin").value = 80;
    // document.getElementById("lvl80Tortoises").value = 30;
    // document.getElementById("lvl80Bluespirit").value = 70;
    // document.getElementById("lvl80Gold").value = 90;
    // document.getElementById("lvl80Sand").value = 40;
    // document.getElementById("lvl80Water").value = 120;
    // document.getElementById("lvl80Salt").value = 110;
    
    //simulated user input #2
    document.getElementById("lvl80Logs").value = 90;
    document.getElementById("lvl80Wheat").value = 140;
    document.getElementById("lvl80Bolls").value = 10;
    document.getElementById("lvl80Resin").value = 60;
    document.getElementById("lvl80Tortoises").value = 40;
    document.getElementById("lvl80Bluespirit").value = 200;
    document.getElementById("lvl80Gold").value = 170;
    document.getElementById("lvl80Sand").value = 100;
    document.getElementById("lvl80Water").value = 80;
    document.getElementById("lvl80Salt").value = 190;

    //simulated user input #3
    // document.getElementById("lvl80Logs").value = 375;
    // document.getElementById("lvl80Wheat").value = 410;
    // document.getElementById("lvl80Bolls").value = 861;
    // document.getElementById("lvl80Resin").value = 1415;
    // document.getElementById("lvl80Tortoises").value = 345;
    // document.getElementById("lvl80Bluespirit").value = 400;
    // document.getElementById("lvl80Gold").value = 300;
    // document.getElementById("lvl80Sand").value = 285;
    // document.getElementById("lvl80Water").value = 330;
    // document.getElementById("lvl80Salt").value = 300;

    //simulated user input #4
    // document.getElementById("lvl80Logs").value = 100;
    // document.getElementById("lvl80Wheat").value = 100;
    // document.getElementById("lvl80Bolls").value = 100;
    // document.getElementById("lvl80Resin").value = 100;
    // document.getElementById("lvl80Tortoises").value = 100;
    // document.getElementById("lvl80Bluespirit").value = 100;
    // document.getElementById("lvl80Gold").value = 100;
    // document.getElementById("lvl80Sand").value = 100;
    // document.getElementById("lvl80Water").value = 100;
    // document.getElementById("lvl80Salt").value = 100;
}

function Level80CalculateButtonClick()
{
    //clear out the crafting plan
    _level80OptimizedCraftingPlan = [];

    if(!GetAndValidateLevel80UserInput())
    {
        return;
    }

    _resultsTextarea.style.borderWidth = "1px";

    FindLevel80CraftingPaths();

    let maxCount = 0;
    //get the highest count from the crafting dictionary
    _level80RecursiveCrafterCountDictionary.forEach(item =>
        {
            if(item.countSum > maxCount)
            {
                maxCount = item.countSum;
            }
        });

    var craftString = "The optimal crafting path(s) that offer the max number of crafts, " + maxCount + ", are:\r\n";
    //loop over the entries in the dictionary that have the same number of crafts as the maximum found, then make the output pretty. ish.
    _level80RecursiveCrafterCountDictionary.filter(d => d.countSum === maxCount).forEach(maxCrafter =>
    {
        //sort the crafts of each path in descending count
        maxCrafter.craftingCountList = maxCrafter.craftingCountList.sort(
            function(a,b)
            {
                return b.crafterCount - a.crafterCount;
            }
        );

        maxCrafter.craftingCountList.forEach(ccl => 
        {
            craftString = (craftString + ccl.crafter + "-" + ccl.crafterCount +" -> ")
        });
        craftString = craftString.substring(0, craftString.length - 4) + "\r\n";
    });
    resultsTextarea.textContent = craftString;
}

function GetAndValidateLevel80UserInput()
{
    let errorExists = false;
    let textboxValue = -1;
    let errorString = "The following fields are not positive whole numbers:\r\n";

    for(let mat in _level80UserCraftingInventory)
    {
        //this will return the value of the text box, or NaN if it contains non-numeric characters
        textboxValue = Number(document.getElementById("lvl80" + mat).value);
        
        //if the textbox value isn't a positive whole number
        if(Number.isNaN(textboxValue) || textboxValue < 0 || !Number.isInteger(textboxValue))
        {
            errorString += mat + "\r\n";
            errorExists = true;
        }
        //the value is valid, but check if there are existing errors. no need to do calculations or assign variables if there are
        else if(!errorExists)
        {
            //get the value from the appropriate textbox, i.e. lvl80Logs
            //then reduce it to the number of crafts it can be used in by dividing by how many are used per craft
            _level80UserCraftingInventory[mat] = parseInt(textboxValue / PER_MATERIAL_COST);//using parseInt here forces integer division
        }
    }

    //clear the list of allowed crafters
    _level80AllowedCrafters = [];

    //update the list of crafters the user is able to use
    _level80CrafterMatrix.forEach(matrix => {
        if(document.getElementById("checkboxUse" + matrix.Crafter).checked)
        {
            _level80AllowedCrafters.push(matrix.Crafter);
        }
    });

    //if an error exists, hide the results and show the error content
    if(errorExists)
    {
        _errorTextarea.textContent = errorString;
        _errorTextareaDiv.style.display = "block";
        _resultsTextarea.style.visibility = "hidden";
        return false;
    }
    
    //if there's not an error, hide the error and show the results
    _errorTextarea.textContent = "";
    _errorTextareaDiv.style.display = "none";
    _resultsTextarea.style.visibility = "visible";
    return true;
}

function ResetLevel80Fields()
{
    _errorTextarea.textContent = "";
    _errorTextareaDiv.style.display = "none";
    _resultsTextarea.style.visibility = "hidden";

    //im not making variable names for these because im only addressing them here
    document.getElementById("lvl80Logs").value = "";
    document.getElementById("lvl80Wheat").value = "";
    document.getElementById("lvl80Bolls").value = "";
    document.getElementById("lvl80Resin").value = "";
    document.getElementById("lvl80Tortoises").value = "";
    document.getElementById("lvl80Bluespirit").value = "";
    document.getElementById("lvl80Gold").value = "";
    document.getElementById("lvl80Sand").value = "";
    document.getElementById("lvl80Water").value = "";
    document.getElementById("lvl80Salt").value = "";
}

//#region Level 80 Recursive Crafter calculations

//kicks off the recursive search for each of the crafters with selected checkboxes
function FindLevel80CraftingPaths()
{
    //clear out the dictionary
    _level80RecursiveCrafterCountDictionary = [];
    
    _level80AllowedCrafters.forEach(baseCrafter =>
    {
        //add initial dictionary item
        _level80RecursiveCrafterCountDictionary.push({
            baseCrafter: baseCrafter,//the TLA for the starting crafter
            craftingCountList: [],//the list of crafters and counts for them, including the starting crafter
            countSum: 0 //the sum of the counts of all the crafters currently in the craftingCountList
        });

        //clear current list, just to be sure
        _level80RecursiveCrafterList = [];

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
    var usedMaterials = GetMaterialsUsedByLevel80Craft(GetLevel80CrafterRowFromStringName(currentCrafter));
    var lowestCount = GetLevel80LowestMaterialCountByMaterialList(usedMaterials);

    //add the craft to the list and remove the materials from the inventory
    _level80RecursiveCrafterList.push({
        crafter: currentCrafter,
        crafterCount: lowestCount,
        sumToNow: recursiveSum + lowestCount
    });
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
        let listSum = _level80RecursiveCrafterList[_level80RecursiveCrafterList.length - 1].sumToNow;
        //the current best count for the base crafter
        let currentSum = _level80RecursiveCrafterCountDictionary.find(d => d.baseCrafter === baseCrafter).countSum;
        
        //if the path being evaluated is better than the current count, or the current count is the same but uses fewer crafters in the paths, save it as the new best
        if((listSum > currentSum) ||
            (listSum == currentSum && _level80RecursiveCrafterList.length < _level80RecursiveCrafterCountDictionary.find(d => d.baseCrafter === baseCrafter).craftingCountList.length))
        {
            //create a copy of the crafting list from the current recursion iteration into the dictionary as the new best
            _level80RecursiveCrafterCountDictionary.find(d => d.baseCrafter === baseCrafter).craftingCountList = DeepCopyAnArray(_level80RecursiveCrafterList);
            //set the new best count
            _level80RecursiveCrafterCountDictionary.find(d => d.baseCrafter === baseCrafter).countSum = listSum;
        }
    }

    //restore the materials to the inventory for the next loop and remove the craft from the list
    UnRemoveLevel80CrafterMaterials(currentCrafter, lowestCount);
    _level80RecursiveCrafterList.pop();
}

//find which materials are used by a crafter and remove the passed-in value from the inventory
//it is assumed the inventory has been reduced to 1 material per craft already
//crafter: a crafter TLA
//count (int): the number of materials to remove
function RemoveLevel80CrafterMaterials(crafter, count)
{
    var usedMaterials = GetMaterialsUsedByLevel80Craft(GetLevel80CrafterRowFromStringName(crafter));

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
    var usedMaterials = GetMaterialsUsedByLevel80Craft(GetLevel80CrafterRowFromStringName(crafter));

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
        let mats = GetMaterialsUsedByLevel80Craft(GetLevel80CrafterRowFromStringName(crafter));
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

//takes in a crafter row returns a crafter row (the crafter TLA, which materials it uses) from the crafter matrix
//returns a list of which materials the passed-in crafter row uses
//crafterRow: a row from the crafter matrix
function GetMaterialsUsedByLevel80Craft(crafterRow)
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

//#endregion

//#region Universal methods

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

//#endregion
