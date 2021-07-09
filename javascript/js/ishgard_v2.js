//#region Members
let COUNT_OF_CRAFTERS = 8;//constant
let PER_MATERIAL_COST = 10;//constant
let _lvl80CrafterMatrix = [
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
let _lvl80CraftingPathDictionary = [];//stores the various possible crafting permutations, used to find crafter priority
let _lvl80CrafterPriorityDictionary = [];//stores which crafter has what priority, higher is better
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

let _level80RecursiveCrafterCountDictionary = [];//baseCrafter, List<KeyValuePair<Crafter id, int>>
let _level80RecursiveCrafterList = [];//List<KeyValuePair<crafterId, int>>
let _level80AllowedCrafters = [];//crafter strings

class Level80CraftingPath
{
    FirstCraft = "";
    SecondCraft = "";
    ThirdCraft = "";

    constructor(first, second, third)
    {
        this.FirstCraft = first;
        this.SecondCraft = second;
        this.ThirdCraft = third;
    }

    ToString()
    {
        if(this.ThirdCraft != "")
        {
            return this.FirstCraft + " -> " + this.SecondCraft + " -> " + this.ThirdCraft;
        }

        return this.FirstCraft + " -> " + this.SecondCraft;

    }
}

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
    // document.getElementById("lvl80Logs").value = 90;
    // document.getElementById("lvl80Wheat").value = 140;
    // document.getElementById("lvl80Bolls").value = 10;
    // document.getElementById("lvl80Resin").value = 60;
    // document.getElementById("lvl80Tortoises").value = 40;
    // document.getElementById("lvl80Bluespirit").value = 200;
    // document.getElementById("lvl80Gold").value = 170;
    // document.getElementById("lvl80Sand").value = 100;
    // document.getElementById("lvl80Water").value = 80;
    // document.getElementById("lvl80Salt").value = 190;

    //simulated user input #3
    document.getElementById("lvl80Logs").value = 375;
    document.getElementById("lvl80Wheat").value = 410;
    document.getElementById("lvl80Bolls").value = 861;
    document.getElementById("lvl80Resin").value = 1415;
    document.getElementById("lvl80Tortoises").value = 345;
    document.getElementById("lvl80Bluespirit").value = 400;
    document.getElementById("lvl80Gold").value = 300;
    document.getElementById("lvl80Sand").value = 285;
    document.getElementById("lvl80Water").value = 330;
    document.getElementById("lvl80Salt").value = 300;

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
    

    //InitialCrafterPathAndPriorityCalculation();
}

function Level80CalculateButtonClick()
{
    //clear out the crafting plan
    _level80OptimizedCraftingPlan = [];

    if(!GetAndValidateUserInput())
    {
        return;
    }

    _resultsTextarea.style.borderWidth = "1px";

    // CalculateLevel80CraftingInventoryAndCounts();

    // let usedMaterialsDebug = "";
    // let maxCrafterAndCount = GetLevel80CrafterWithHighestCount();
    // while(maxCrafterAndCount.maxCount > 0)
    // {
    //     //get the list of used materials
    //     let affectedMaterials = GetMaterialsUsedByLevel80Craft(_lvl80CrafterMatrix.find(x => x.Crafter === maxCrafterAndCount.maxCrafter));
    //     usedMaterialsDebug += "(" + maxCrafterAndCount.maxCrafter + ") - ";
    //     //update the user's inventory
    //     for(let i = 0; i < affectedMaterials.length; i++)
    //     {
    //         if(_level80UserCraftingInventory[affectedMaterials[i]] < maxCrafterAndCount.maxCount)
    //         {
    //             //somehow a craft is trying to use more materials than are available for the craft, throw an error
    //         }
    //         else
    //         {
    //             _level80UserCraftingInventory[affectedMaterials[i]] -= maxCrafterAndCount.maxCount;
    //             usedMaterialsDebug += affectedMaterials[i] + " " + maxCrafterAndCount.maxCount;
    //         }
    //     }

    //     //add to the optimized path list
    //     _level80OptimizedCraftingPlan.push(
    //     {
    //         "Crafter": maxCrafterAndCount.maxCrafter,
    //         "Count": maxCrafterAndCount.maxCount
    //     });

    //     usedMaterialsDebug += "\r\n";
    //     //recalculate available crafts
    //     CalculateLevel80CraftingInventoryAndCounts();
    //     //get highest crafter count
    //     maxCrafterAndCount = GetLevel80CrafterWithHighestCount();
    // }

    FindCraftingPaths();


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
        maxCrafter.craftingCountList.forEach(ccl => 
        {
            craftString = (craftString + ccl.crafter + "-" + ccl.crafterCount +" -> ")
        });
        craftString = craftString.substring(0, craftString.length - 4) + "\r\n";
    });
    resultsTextarea.textContent = craftString;

    // Console.WriteLine($"The optimal crafting path(s) that offer the max number of crafts, {maxCount}, are:");
    // foreach (var item in _crafterCountDictionary.Where(c => c.Value.Sum(s => s.Value) == maxCount))
    // {
    //     craftString = "";

    //     foreach(var segment in item.Value)
    //     {
    //         craftString += $"{segment.Key}-{segment.Value} -> ";
    //     }
    //     //possible enhancement, display the crafts of each path in descending count. not putting in the effort because the final product is the javascript version
    //     craftString = craftString.Substring(0, craftString.Length - 4);
    //     Console.WriteLine(craftString);
    // }





    // _level80OptimizedCraftingPlanString = "Your optimized crafting plan is:\r\n";
    // let finalCraftCount = 0;
    // for(let i = 0; i < _level80OptimizedCraftingPlan.length; i++)
    // {
    //     _level80OptimizedCraftingPlanString += "Craft " + _level80OptimizedCraftingPlan[i].Crafter + " " + _level80OptimizedCraftingPlan[i].Count + " time(s)\r\n";
    //     finalCraftCount += _level80OptimizedCraftingPlan[i].Count;
    // }
    // _level80OptimizedCraftingPlanString += "for a total of " + finalCraftCount + " craft(s)";

    // resultsTextarea.textContent = _level80OptimizedCraftingPlanString;// + "\r\n" + usedMaterialsDebug;
}

function GetAndValidateUserInput()
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
    _lvl80CrafterMatrix.forEach(matrix => {
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

function FindCraftingPaths()
{
    _level80RecursiveCrafterCountDictionary = [];
    //for (let i = 0; i < COUNT_OF_CRAFTERS; i++)
    _level80AllowedCrafters.forEach(crafter =>
    {
        let base = crafter;
        //add initial dictionary item
        _level80RecursiveCrafterCountDictionary.push({
            baseCrafter: base,
            craftingCountList: [],
            countSum: 0
        });

        //clear current list, just to be sure
        _level80RecursiveCrafterList = [];

        CalculateCraftingPaths(base, base, 0);
    });
}

function CalculateCraftingPaths(baseCrafter, currentCrafter, sumToNow)
{
    //identify which materials(columns) are affected by the craft
    var usedMaterials = GetMaterialsUsedByLevel80Craft(GetLevel80CrafterRowFromStringName(currentCrafter));// [currentCrafter]);
    var lowestCount = GetLevel80LowestMaterialCountByMaterialList(usedMaterials);

    //add the craft to the list and remove the materials from the inventory
    _level80RecursiveCrafterList.push({
        crafter: currentCrafter,
        crafterCount: lowestCount,
        sumToNow: sumToNow + lowestCount
    });
    RemoveCrafterMaterials(currentCrafter, lowestCount);

    //get crafters that can still make stuff and loop over them
    var remainingCrafters = GetCraftersRemaining();
    if(remainingCrafters.length > 0)
    {
        remainingCrafters.forEach(remainingCraft => {
            CalculateCraftingPaths(baseCrafter, remainingCraft, sumToNow + lowestCount);
        });
    }
    //or, if no crafters remain, check to see if this is a new best, save it if it is
    else
    {
        let listSum = _level80RecursiveCrafterList[_level80RecursiveCrafterList.length - 1].sumToNow;
        let currentSum = _level80RecursiveCrafterCountDictionary.find(d => d.baseCrafter === baseCrafter).countSum;
        
        //if the path being evaluated is better than the current count, or the current count is the same but uses fewer crafters in the paths, save it as the new best
        if((listSum > currentSum) ||
            (listSum == currentSum && _level80RecursiveCrafterList.length < _level80RecursiveCrafterCountDictionary.find(d => d.baseCrafter === baseCrafter).craftingCountList.length))
        {
            _level80RecursiveCrafterCountDictionary.find(d => d.baseCrafter === baseCrafter).craftingCountList = DeepCopyAnArray(_level80RecursiveCrafterList);
            _level80RecursiveCrafterCountDictionary.find(d => d.baseCrafter === baseCrafter).countSum = listSum;
        }
    }

    //restore the materials to the inventory for the next loop and remove the craft from the list
    UnRemoveCrafterMaterials(currentCrafter, lowestCount);
    _level80RecursiveCrafterList.pop();
}

//find which materials are used by a crafter and remove the passed-in value from the inventory
//it is assumed the inventory has been reduced to 1 material per craft already
function RemoveCrafterMaterials(crafter, count)
{
    var usedMaterials = GetMaterialsUsedByLevel80Craft(GetLevel80CrafterRowFromStringName(crafter));//[crafter]);

    usedMaterials.forEach(mat => {
            _level80UserCraftingInventory[mat] -= count;
    });
}

//find which materials are used by a crafter and add back the passed-in value from the inventory
//once again, it is assumed the inventory has been reduced to 1 material per craft already
function UnRemoveCrafterMaterials(crafter, count)
{
    var usedMaterials = GetMaterialsUsedByLevel80Craft(GetLevel80CrafterRowFromStringName(crafter));//[crafter]);

    usedMaterials.forEach(mat => {
        _level80UserCraftingInventory[mat] += count;
    });
}

function GetCraftersRemaining()
{
    let returnList = [];//crafters
    
    //for(let crafter in _level80AllowedCrafters)
    _level80AllowedCrafters.forEach(crafter => 
    {
        let mats = GetMaterialsUsedByLevel80Craft(GetLevel80CrafterRowFromStringName(crafter));//[crafter]);
        let lowest = GetLevel80LowestMaterialCountByMaterialList(mats);
        
        if(lowest > 0)
        {
            returnList.push(crafter);
        }
    });

    return returnList;
}

function GetLevel80CrafterRowFromStringName(crafterName)
{
    return _lvl80CrafterMatrix.find(f => f.Crafter === crafterName);
}

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

function InitialCrafterPathAndPriorityCalculation()//change this to take in a variable of which level crafter to calculate?
{
    for (let i = 0; i < COUNT_OF_CRAFTERS; i++)
    {
        CalculateLeveL80CraftingPaths(i);
    }
}

//copies the values of one array into another so we have a ByValue copy rather than a reference
function DeepCopyAnArray(sourceArray)
{
    let returnArray = [];
    for (let i = 0; i < sourceArray.length; i++)
    {
        returnArray.push(JSON.parse(JSON.stringify(sourceArray[i])));
    }

    return returnArray;
}

//this function is meant to be run after it has been determined which materials were used in the previous craft.
//it will then update both the passed-in calcTable (NOTE: it is important this is NOT the base crafting matrix table
//  as this function will modify what is passed in to reflect what materials are no longer available) and it will
//modify the possibleCraft array, which is an 8-length array of booleans indicating if the crafter of the same index
//is still available to be used.
//it will return a boolean indicating if more crafts can be made after the used materials are removed from the pool
function RemoveInvalidCrafts(calcTable, usedMaterials, possibleCraft)
{
    var possibleCraftsRemain = false;
    //remove all crafts that were affected by the materials used in the previous craft

    //do a counting loop over each crafter in the matrix. i want a counting loop so i can use the count variable
    for (let i = 0; i < COUNT_OF_CRAFTERS; i++)
    {
        //for the given row, in each column that was affected by the previous craft, set it to false
        for(let j = 0; j < usedMaterials.length; j++)//let usedCol in usedMaterials)
        {
            if(calcTable[i][usedMaterials[j]] == true)
            {
                //this row uses a column that was used by the previous craft, meaning this craft can no longer be used
                //remove it as a possible craft
                possibleCraft[i] = false;//<-- this is why i wanted the counting variable
            }

            //regardless of if it was initially true, this material(column) was used, so it needs to be set to false for every craft
            calcTable[i][usedMaterials[j]] = false;            
        }

        //possibleCraftsRemain is defaulted to false, but if any craft is listed as a possible craft, set it to true so we know there's more to do
        if(possibleCraft[i])
        {
            possibleCraftsRemain = true;
        }
    }

    return possibleCraftsRemain;
}

//#endregion

//#region Level 80 Crafter calculations

function CalculateLeveL80CraftingPaths(crafterId)//crafterId is an int
{
    let possibleCraftAfterFirstCraft = [ true, true, true, true, true, true, true, true ];
    let possibleCraftAfterSecondCraft = [ true, true, true, true, true, true, true, true ];

    let firstCrafterRow = _lvl80CrafterMatrix[crafterId];

    //identify which materials are affectec by the first craft
    let usedMaterials = GetMaterialsUsedByLevel80Craft(firstCrafterRow);

    let postFirstCraftTable = [];
    postFirstCraftTable = DeepCopyAnArray(_lvl80CrafterMatrix);

    RemoveInvalidCrafts(postFirstCraftTable, usedMaterials, possibleCraftAfterFirstCraft);

    //with invalid crafts removed, we need to store possible second crafts to be put into the path
    let secondCraftRowList = [];
    for(let i = 0; i < possibleCraftAfterFirstCraft.length; i++)
    {

        if(possibleCraftAfterFirstCraft[i])
        {
            secondCraftRowList.push(_lvl80CrafterMatrix[i]);
        }
    }

    //with the second crafts identified, we now need to check each branch of those possible paths to see if a third is available
    let craftsRemain = true;
    let postSecondCraftTable = [];
    let numberOfPaths = 0;
    for(let i = 0; i < secondCraftRowList.length; i++)
    {
        usedMaterials = [];
        //identify which materials are being used by the second craft
        usedMaterials = GetMaterialsUsedByLevel80Craft(secondCraftRowList[i]);

        postSecondCraftTable = [];
        postSecondCraftTable = DeepCopyAnArray(postFirstCraftTable);
        possibleCraftAfterSecondCraft = DeepCopyAnArray(possibleCraftAfterFirstCraft);

        //even though this post-second craft table variable isn't being used later, we don't want to touch the post-first craft table because
        //we need to use it for more than 1 craft and the following method will modify the passed-in table.
        //there are other solutions, yes. i chose this one over adding a bunch of code to save minimal space in memory in a time when people have GBs of it
        craftsRemain = RemoveInvalidCrafts(postSecondCraftTable, usedMaterials, possibleCraftAfterSecondCraft);

        //with invalid crafts removed, we need to store possible final crafts to be put into the path
        if(craftsRemain)
        {
            //since this is only for level 80 crafts, there's a max of 3 possible crafters before the pool is exhausted
            //so if a craft is still possible at this point, there's only one it could be
            for (let j = 0; j < possibleCraftAfterSecondCraft.length; j++)
            {
                if (possibleCraftAfterSecondCraft[j])//if this is true, the craft is still doable, so add it
                {
                    _lvl80CraftingPathDictionary.push({
                        "StartingCrafter" : firstCrafterRow.Crafter,
                        "CraftingPath" : new Level80CraftingPath(firstCrafterRow.Crafter, secondCraftRowList[i].Crafter, _lvl80CrafterMatrix[j].Crafter)
                    });
                    numberOfPaths++;
                }
            }
        }
        else
        {
            _lvl80CraftingPathDictionary.push({
                "StartingCrafter" : firstCrafterRow.Crafter,
                "CraftingPath" : new Level80CraftingPath(firstCrafterRow.Crafter, secondCraftRowList[i].Crafter, "")
            });
            numberOfPaths++;
        }
    }

    //store the priority (number of paths) of the crafter that paths are being calculated for
    _lvl80CrafterPriorityDictionary.push(
        {
            "Crafter": firstCrafterRow.Crafter,
            "Priority": numberOfPaths
        }
    );
}

//takes in a crafter row from the base crafting matrix and returns a list of which materials it uses
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

function CalculateLevel80CraftingInventoryAndCounts()
{
    let selectedCrafterRow = [];
    for(let crafter in _level80CraftsAvailablePerCrafter)
    {
        //set the crafts available for the given crafter to max, so that we will for sure find a value lower than it
        if(document.getElementById("checkboxUse" + crafter).checked)
        {
            _level80CraftsAvailablePerCrafter[crafter] = Number.MAX_SAFE_INTEGER;
        }
        else
        {
            _level80CraftsAvailablePerCrafter[crafter] = 0;
            continue;//if we aren't using this crafter, just say it can't craft anything and skip it
        }
        
        //find the crafter row for the crafter we're calculating
        selectedCrafterRow = _lvl80CrafterMatrix.find(x => x.Crafter === crafter);

        //get the Materials the Crafter uses and find the lowest count of those Materials, store that as crafts available
        let materialsUsed = GetMaterialsUsedByLevel80Craft(selectedCrafterRow);
        for(let i = 0; i < materialsUsed.length; i++)
        {
            if(_level80UserCraftingInventory[materialsUsed[i]] < _level80CraftsAvailablePerCrafter[crafter])
            {
                _level80CraftsAvailablePerCrafter[crafter] = _level80UserCraftingInventory[materialsUsed[i]];
            }
        }
    }
}

function GetLevel80CrafterWithHighestCount()
{
    let maxCount = -1;
    let maxCrafter = "";
    
    let tiedCrafter = [];
    let previousMaxCrafter = "";

    for(let craftName in _level80CraftsAvailablePerCrafter)
    {
        //if the count for this crafter is higher, we have a new max
        if(_level80CraftsAvailablePerCrafter[craftName] > maxCount)
        {
            maxCount = _level80CraftsAvailablePerCrafter[craftName];
            maxCrafter = craftName;
            tiedCrafter = [];//if there's a new max count, any ties we had need to be discarded
            //set the previous crafter to the current max-count crafter so we can add it to the list in case of ties
            previousMaxCrafter = craftName;
        }
        //if the counts are equal, we have a tie and need to apply priority for the tiebreaker
        else if(_level80CraftsAvailablePerCrafter[craftName] == maxCount)
        {
            if(previousMaxCrafter != "")
            {
                //add the previous crafter that was max to the list of ties
                tiedCrafter.push(previousMaxCrafter);
                //then clear the string so we don't add it multiple times
                previousMaxCrafter = "";
            }
            tiedCrafter.push(craftName);
        }
    }

    //if we have a tie for max count crafter
    if(tiedCrafter.length >= 2)
    {
        //set initial values so we have something to compare against
        maxCrafter = tiedCrafter[0];
        let maxPriority = _lvl80CrafterPriorityDictionary.find(x => x.Crafter === maxCrafter).Priority;
        let currentPriority = -1;

        //loop over all the tied crafters
        for(let i = 0; i < tiedCrafter.length; i++)
        {
            //get the priority of the current crafter
            currentPriority = _lvl80CrafterPriorityDictionary.find(x => x.Crafter === tiedCrafter[i]).Priority;
            //if it has a higher priority, set it to the max
            if(currentPriority > maxPriority)
            {
                //as a side note, this will skew priority to the crafters who were calculated first but share the same priority
                //i don't really consider it an issue as the goal of this is to maximaze the number of crafts regardless of what crafts are used
                //but i do want to note it here in case i want to change it later
                maxPriority = currentPriority;
                maxCrafter = tiedCrafter[i];
            }
        }
    }

    return { maxCrafter, maxCount };
}

//#endregion
