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
let _userCraftingInventory = {

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
let _craftsAvailablePerCrafter = {
    "CRP": 0,
    "BSM": 0,
    "ARM": 0,
    "GSM": 0,
    "LTW": 0,
    "WVR": 0,
    "ALC": 0,
    "CUL": 0
}
let _optimizedCraftingPlan = [];//stores the user's calculated crafting plan
let _optimizedCraftingPlanString = "";

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
    //  document.getElementById("lvl80Logs").value = 375;
    //  document.getElementById("lvl80Wheat").value = 410;
    //  document.getElementById("lvl80Bolls").value = 861;
    //  document.getElementById("lvl80Resin").value = 1415;
    //  document.getElementById("lvl80Tortoises").value = 345;
    //  document.getElementById("lvl80Bluespirit").value = 400;
    //  document.getElementById("lvl80Gold").value = 300;
    //  document.getElementById("lvl80Sand").value = 285;
    //  document.getElementById("lvl80Water").value = 330;
    //  document.getElementById("lvl80Salt").value = 300;

    InitialCrafterPathAndPriorityCalculation();
}

function Level80CalculateButtonClick()
{
    //clear out the crafting plan
    _optimizedCraftingPlan = [];

    if(!GetAndValidateUserInput())
    {
        return;
    }

    _resultsTextarea.style.borderWidth = "1px";

    //simulated user input #1
    // _userCraftingInventory["Logs"] = 100;
    // _userCraftingInventory["Wheat"] = 20;
    // _userCraftingInventory["Bolls"] = 90;
    // _userCraftingInventory["Resin"] = 80;
    // _userCraftingInventory["Tortoises"] = 30;
    // _userCraftingInventory["Bluespirit"] = 70;
    // _userCraftingInventory["Gold"] = 90;
    // _userCraftingInventory["Sand"] = 40;
    // _userCraftingInventory["Water"] = 120;
    // _userCraftingInventory["Salt"] = 110;
    
    //simulated user input #2
    // _userCraftingInventory["Logs"] = 90;
    // _userCraftingInventory["Wheat"] = 140;
    // _userCraftingInventory["Bolls"] = 10;
    // _userCraftingInventory["Resin"] = 60;
    // _userCraftingInventory["Tortoises"] = 40;
    // _userCraftingInventory["Bluespirit"] = 200;
    // _userCraftingInventory["Gold"] = 170;
    // _userCraftingInventory["Sand"] = 100;
    // _userCraftingInventory["Water"] = 80;
    // _userCraftingInventory["Salt"] = 190;

    //simulated user input #3
    // _userCraftingInventory["Logs"] = 375;
    // _userCraftingInventory["Wheat"] = 410;
    // _userCraftingInventory["Bolls"] = 861;
    // _userCraftingInventory["Resin"] = 1415;
    // _userCraftingInventory["Tortoises"] = 345;
    // _userCraftingInventory["Bluespirit"] = 400;
    // _userCraftingInventory["Gold"] = 300;
    // _userCraftingInventory["Sand"] = 285;
    // _userCraftingInventory["Water"] = 330;
    // _userCraftingInventory["Salt"] = 300;

    //simulated user input #4
    // _userCraftingInventory["Logs"] = 100;
    // _userCraftingInventory["Wheat"] = 100;
    // _userCraftingInventory["Bolls"] = 100;
    // _userCraftingInventory["Resin"] = 100;
    // _userCraftingInventory["Tortoises"] = 100;
    // _userCraftingInventory["Bluespirit"] = 100;
    // _userCraftingInventory["Gold"] = 100;
    // _userCraftingInventory["Sand"] = 100;
    // _userCraftingInventory["Water"] = 100;
    // _userCraftingInventory["Salt"] = 100;

    CalculateLevel80CraftingInventoryAndCounts();

    let maxCrafterAndCount = GetLevel80CrafterWithHighestCount();
    while(maxCrafterAndCount.maxCount > 0)
    {
        //get the list of used materials
        let affectedMaterials = GetMaterialsUsedByLevel80Craft(_lvl80CrafterMatrix.find(x => x.Crafter === maxCrafterAndCount.maxCrafter));
        //update the user's inventory
        for(let i = 0; i < affectedMaterials.length; i++)
        {
            if(_userCraftingInventory[affectedMaterials[i]] < maxCrafterAndCount.maxCount)
            {
                //somehow a craft is trying to use more materials than are available for the craft, throw an error
            }
            else
            {
                _userCraftingInventory[affectedMaterials[i]] -= maxCrafterAndCount.maxCount;
            }
        }

        //add to the optimized path list
        _optimizedCraftingPlan.push(
        {
            "Crafter": maxCrafterAndCount.maxCrafter,
            "Count": maxCrafterAndCount.maxCount
        });
        //recalculate available crafts
        CalculateLevel80CraftingInventoryAndCounts();
        //get highest crafter count
        maxCrafterAndCount = GetLevel80CrafterWithHighestCount();
    }

    _optimizedCraftingPlanString = "Your optimized crafting plan is:\r\n";
    let finalCraftCount = 0;
    for(let i = 0; i < _optimizedCraftingPlan.length; i++)
    {
        _optimizedCraftingPlanString += "Craft " + _optimizedCraftingPlan[i].Crafter + " " + _optimizedCraftingPlan[i].Count + " time(s)\r\n";
        finalCraftCount += _optimizedCraftingPlan[i].Count;
    }
    _optimizedCraftingPlanString += "for a total of " + finalCraftCount + " craft(s)";

    resultsTextarea.textContent = _optimizedCraftingPlanString;
}

function GetAndValidateUserInput()
{
    let errorExists = false;
    let textboxValue = -1;
    let errorString = "The following fields are not positive whole numbers:\r\n";

    for(let mat in _userCraftingInventory)
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
            _userCraftingInventory[mat] = parseInt(textboxValue / PER_MATERIAL_COST);//using parseInt here forces integer division
        }
    }

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

function CalculateLeveL80CraftingPaths(crafterId)//previously this was an int, should be the 3-letter abbreviation here
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
    for(let crafter in _craftsAvailablePerCrafter)
    {
        //TODO: add the logic for ignoring a crafter(s) specified by the user, do so by setting the crafts available to 0

        //set the crafts available for the given crafter to max, so that we will for sure find a value lower than it
        _craftsAvailablePerCrafter[crafter] = Number.MAX_SAFE_INTEGER
        
        //find the crafter row for the crafter we're calculating
        selectedCrafterRow = _lvl80CrafterMatrix.find(x => x.Crafter === crafter);

        //get the Materials the Crafter uses and find the lowest count of those Materials, store that as crafts available
        let materialsUsed = GetMaterialsUsedByLevel80Craft(selectedCrafterRow);
        for(let i = 0; i < materialsUsed.length; i++)
        {
            if(_userCraftingInventory[materialsUsed[i]] < _craftsAvailablePerCrafter[crafter])
            {
                _craftsAvailablePerCrafter[crafter] = _userCraftingInventory[materialsUsed[i]];
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

    for(let craftName in _craftsAvailablePerCrafter)
    {
        //if the count for this crafter is higher, we have a new max
        if(_craftsAvailablePerCrafter[craftName] > maxCount)
        {
            maxCount = _craftsAvailablePerCrafter[craftName];
            maxCrafter = craftName;
            tiedCrafter = [];//if there's a new max count, any ties we had need to be discarded
            //set the previous crafter to the current max-count crafter so we can add it to the list in case of ties
            previousMaxCrafter = craftName;
        }
        //if the counts are equal, we have a tie and need to apply priority for the tiebreaker
        else if(_craftsAvailablePerCrafter[craftName] == maxCount)
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
