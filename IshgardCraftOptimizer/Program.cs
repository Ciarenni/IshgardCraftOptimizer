using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IshgardCraftOptimizer
{
    public enum Materials
    {
        LOGS,
        WHEAT,
        BOLLS,
        RESIN,
        TORTOISES,
        BLUESPIRIT,
        GOLD,
        SAND,
        WATER,
        SALT
    }

    public enum Crafters
    {
        CRP,
        BSM,
        ARM,
        GSM,
        LTW,
        WVR,
        ALC,
        CUL
    }

    class Program
    {
        static int COUNT_OF_MATERIALS = Enum.GetValues(typeof(Materials)).Length;
        static int COUNT_OF_CRAFTERS = Enum.GetValues(typeof(Crafters)).Length;
        const int MAX_DIFFERENT_MATERIALS_PER_CRAFT = 3;
        static DataTable _constCrafterMaterialTable = new DataTable();
        //        //LOGS  WHEAT BOLLS RESIN TORTS BLUES GOLD  SAND  WATER SALT
        ///*CRP*/ { true, true, true, false,false,false,false,false,false,false },
        ///*BSM*/ { true, false,false,false,false,true, true, false,false,false },
        ///*ARM*/ { false,false,false,false,false,true, true, true, false,false },
        ///*GSM*/ { false,false,false,true, false,true, false,true, false,false },
        ///*LTW*/ { true, false,true, false,true, false,false,false,false,false },
        ///*WVR*/ { false,false,true, true, false,false,false,false,true, false },
        ///*ALC*/ { false,false,false,false,true, false,false,false,true, true },
        ///*CUL*/ { false,true, false,false,false,false,false,false,true, true }
        //};
        
        static Dictionary<Materials, int> _craftingInventory = new Dictionary<Materials, int>();
        static int _perMaterialCost = 10;

        static Dictionary<Crafters, List<KeyValuePair<Crafters, int>>> _crafterCountDictionary = new Dictionary<Crafters, List<KeyValuePair<Crafters, int>>>();
        static List<KeyValuePair<Crafters, int>> _recursiveCrafterList = new List<KeyValuePair<Crafters, int>>();
        static List<Crafters> _allowedCrafters = new List<Crafters>() { Crafters.CRP, Crafters.BSM, Crafters.ARM, Crafters.GSM, Crafters.LTW, Crafters.WVR, Crafters.ALC, Crafters.CUL };

        static void Main(string[] args)
        {
            //simulated user input 1
            //_craftingInventory.Add(Materials.LOGS, 100);
            //_craftingInventory.Add(Materials.WHEAT, 20);
            //_craftingInventory.Add(Materials.BOLLS, 90);
            //_craftingInventory.Add(Materials.RESIN, 80);
            //_craftingInventory.Add(Materials.TORTOISES, 30);
            //_craftingInventory.Add(Materials.BLUESPIRIT, 70);
            //_craftingInventory.Add(Materials.GOLD, 90);
            //_craftingInventory.Add(Materials.SAND, 40);
            //_craftingInventory.Add(Materials.WATER, 120);
            //_craftingInventory.Add(Materials.SALT, 110);

            //simulated user input 2
            //_craftingInventory.Add(Materials.LOGS, 90);
            //_craftingInventory.Add(Materials.WHEAT, 140);
            //_craftingInventory.Add(Materials.BOLLS, 10);
            //_craftingInventory.Add(Materials.RESIN, 60);
            //_craftingInventory.Add(Materials.TORTOISES, 40);
            //_craftingInventory.Add(Materials.BLUESPIRIT, 200);
            //_craftingInventory.Add(Materials.GOLD, 170);
            //_craftingInventory.Add(Materials.SAND, 100);
            //_craftingInventory.Add(Materials.WATER, 80);
            //_craftingInventory.Add(Materials.SALT, 190);

            //simulated user input 3
            _craftingInventory.Add(Materials.LOGS, 375);
            _craftingInventory.Add(Materials.WHEAT, 410);
            _craftingInventory.Add(Materials.BOLLS, 861);
            _craftingInventory.Add(Materials.RESIN, 1415);
            _craftingInventory.Add(Materials.TORTOISES, 345);
            _craftingInventory.Add(Materials.BLUESPIRIT, 400);
            _craftingInventory.Add(Materials.GOLD, 300);
            _craftingInventory.Add(Materials.SAND, 285);
            _craftingInventory.Add(Materials.WATER, 330);
            _craftingInventory.Add(Materials.SALT, 300);


            //reduce the user's inventory based on how many of each material is needed for craft (i.e. level 80 crafts take 10 of each material they use)
            for (int i = 0; i < COUNT_OF_MATERIALS; i++)
            {
                //don't care about the remainder, so integer division is fine here
                _craftingInventory[(Materials)i] = _craftingInventory[(Materials)i] / _perMaterialCost;
            }

            //use these lines to remove specific crafters from the crafter pool
            _allowedCrafters.Remove(Crafters.CRP);
            //_allowedCrafters.Remove(Crafters.BSM);
            _allowedCrafters.Remove(Crafters.ARM);
            //_allowedCrafters.Remove(Crafters.GSM);
            _allowedCrafters.Remove(Crafters.LTW);
            //_allowedCrafters.Remove(Crafters.WVR);
            //_allowedCrafters.Remove(Crafters.ALC);
            //_allowedCrafters.Remove(Crafters.CUL);

            //zhu li, do the thing!
            CreateDataTableAndFindCraftingPaths();

            var maxCount = 0;
            foreach (var item in _crafterCountDictionary)
            {
                var sum = item.Value.Sum(i => i.Value);
                if (sum > maxCount)
                {
                    maxCount = sum;
                }
            }

            var craftString = "";
            //loop over the entries in the dictionary that have the same number of crafts as the maximum found, then make the output pretty. ish.
            Console.WriteLine($"The optimal crafting path(s) that offer the max number of crafts, {maxCount}, are:");
            foreach (var item in _crafterCountDictionary.Where(c => c.Value.Sum(s => s.Value) == maxCount))
            {
                craftString = "";

                foreach(var segment in item.Value)
                {
                    craftString += $"{segment.Key}-{segment.Value} -> ";
                }
                //possible enhancement, display the crafts of each path in descending count. not putting in the effort because the final product is the javascript version
                craftString = craftString.Substring(0, craftString.Length - 4);
                Console.WriteLine(craftString);
            }

            Console.ReadKey();
        }

        //method to call the data table creation and loop through each crafter and kick off the recursive loop to find its optimal crafting path
        private static void CreateDataTableAndFindCraftingPaths()
        {
            //create the crafting matrix of which craft uses which materials
            DataTableCreation();

            //calculate the crafting paths for each Crafter
            foreach (var crafter in _allowedCrafters)
            {
                //add the initial dictionary entry for the crafter so it exists during the recursive loop
                _crafterCountDictionary.Add(crafter, new List<KeyValuePair<Crafters, int>>());
                _recursiveCrafterList.Clear();//shouldnt need, but just to be sure
                CalculateCraftingPaths(crafter, crafter);
            }
        }

        //recursive function to find/build the best crafting path for a given crafter (baseCrafter, the dictionary key)
        //second parameter is the one being evaluated during each call of the method.
        //we're going to remove materials from the inventory, add the crafter to the crafting path list, and then do the same check until we can craft anything else.
        //once we hit the bottom, see if it provides a better count than the existing one for the base crafter. if it does, save it.
        //finally, because most of the time this will not be the last crafter being evaluated, we need to remove the crafter from the list and add the materials used back to the inventory.
        //this is a long-winded way to say I'm basically pushing and popping crafters and materials used for a given step
        private static void CalculateCraftingPaths(Crafters baseCrafter, Crafters currentCrafter)
        {
            //identify which materials(columns) are affected by the craft
            List<Materials> usedMaterials = GetMaterialsAffectedByCrafter(currentCrafter);
            int lowestCount = Int32.MaxValue;

            //find the material with the lowest count that is used by the craft (this will be the most we can craft for a given crafter at a given point)
            foreach(var mat in usedMaterials)
            {
                if (_craftingInventory[mat] < lowestCount)
                {
                    lowestCount = _craftingInventory[mat];
                }
            }

            //add the craft to the list and remove the materials from the inventory
            _recursiveCrafterList.Add(new KeyValuePair<Crafters, int>(currentCrafter, lowestCount));
            RemoveCrafterMaterials(currentCrafter, lowestCount);

            //get crafters that can still make stuff and loop over them
            var remainingCrafters = GetCraftersRemaining();
            if (remainingCrafters.Count > 0)
            {
                foreach (var remainingCraft in remainingCrafters)
                {
                    CalculateCraftingPaths(baseCrafter, remainingCraft);
                }
            }
            //or, if no crafters remain, check to see if this is a new best, save it if it is
            else
            {
                //get the count of both the path being evaluated and the current best
                var listSum = _recursiveCrafterList.Sum(r => r.Value);
                var currentSum = _crafterCountDictionary[baseCrafter].Sum(d => d.Value);
                
                //if the path being evaluated is better than the current count, or the current count is the same but uses fewer crafters in the paths, save it as the new best
                if((listSum > currentSum) || (listSum == currentSum && _recursiveCrafterList.Count() < _crafterCountDictionary[baseCrafter].Count()))
                {
                    _crafterCountDictionary[baseCrafter] = new List<KeyValuePair<Crafters, int>>(_recursiveCrafterList);
                }
            }

            //restore the materials to the inventory for the next loop and remove the craft from the list
            UnRemoveCrafterMaterials(currentCrafter, lowestCount);
            _recursiveCrafterList.RemoveAt(_recursiveCrafterList.Count - 1);
        }

        //find which materials are used by a crafter and remove the passed-in value from the inventory
        //it is assumed the inventory has been reduced to 1 material per craft already
        private static void RemoveCrafterMaterials(Crafters crafter, int countToRemove)
        {
            var usedMaterials = GetMaterialsAffectedByCrafter(crafter);

            foreach (var mat in usedMaterials)
            {
                _craftingInventory[mat] -= countToRemove;
            }
        }

        //find which materials are used by a crafter and add back the passed-in value from the inventory
        //once again, it is assumed the inventory has been reduced to 1 material per craft already
        private static void UnRemoveCrafterMaterials(Crafters crafter, int countToUnremove)
        {
            var usedMaterials = GetMaterialsAffectedByCrafter(crafter);

            foreach (var mat in usedMaterials)
            {
                _craftingInventory[mat] += countToUnremove;
            }
        }

        //see what crafters can still craft using the current state of _craftingInventory. note that this is not passed in
        private static List<Crafters> GetCraftersRemaining()
        {
            var returnList = new List<Crafters>();
            bool crafterStillAvailable;

            //loop through the crafters so we can see which ones are still available
            foreach(var crafter in _allowedCrafters)
            {
                crafterStillAvailable = true;

                //check the count of each of the materials
                foreach (var mat in GetMaterialsAffectedByCrafter(crafter))
                {
                    if (_craftingInventory[mat] <= 0)
                    {
                        crafterStillAvailable = false;
                        break;
                    }
                }

                if (crafterStillAvailable)
                {
                    returnList.Add(crafter);
                }
            }

            return returnList;
        }

        //return a list of Materials that a given Crafter uses, based on _constCrafterMaterialTable 
        private static List<Materials> GetMaterialsAffectedByCrafter(Crafters crafter)
        {
            var materialsList = new List<Materials>();
            int materialsFound = 0;

            for (int j = 0; j < COUNT_OF_MATERIALS; j++)
            {
                if ((bool)_constCrafterMaterialTable.Rows[(int)crafter][j])
                {
                    materialsFound++;
                    materialsList.Add((Materials)j);

                    //if we have found all the Materials for the craft, break out of the material loop early
                    if (materialsFound == MAX_DIFFERENT_MATERIALS_PER_CRAFT)
                    {
                        break;
                    }
                }
            }

            return materialsList;
        }

        //create the data table of which Crafters use which Materials
        private static void DataTableCreation()
        {
            /*
            _constCrafterMaterialTable.Columns.Add(nameof(Materials.LOGS), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(nameof(Materials.WHEAT), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(nameof(Materials.BOLLS), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(nameof(Materials.RESIN), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(nameof(Materials.TORTOISES), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(nameof(Materials.BLUESPIRIT), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(nameof(Materials.GOLD), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(nameof(Materials.SAND), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(nameof(Materials.WATER), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(nameof(Materials.SALT), typeof(bool));

            var crp = _constCrafterMaterialTable.NewRow();
            crp[nameof(Materials.LOGS)] = 1;
            crp[nameof(Materials.WHEAT)] = 1;
            crp[nameof(Materials.BOLLS)] = 1;
            crp[nameof(Materials.RESIN)] = 0;
            crp[nameof(Materials.TORTOISES)] = 0;
            crp[nameof(Materials.BLUESPIRIT)] = 0;
            crp[nameof(Materials.GOLD)] = 0;
            crp[nameof(Materials.SAND)] = 0;
            crp[nameof(Materials.WATER)] = 0;
            crp[nameof(Materials.SALT)] = 0;

            var bsm = _constCrafterMaterialTable.NewRow();
            bsm[nameof(Materials.LOGS)] = 1;
            bsm[nameof(Materials.WHEAT)] = 0;
            bsm[nameof(Materials.BOLLS)] = 0;
            bsm[nameof(Materials.RESIN)] = 0;
            bsm[nameof(Materials.TORTOISES)] = 0;
            bsm[nameof(Materials.BLUESPIRIT)] = 1;
            bsm[nameof(Materials.GOLD)] = 1;
            bsm[nameof(Materials.SAND)] = 0;
            bsm[nameof(Materials.WATER)] = 0;
            bsm[nameof(Materials.SALT)] = 0;

            var arm = _constCrafterMaterialTable.NewRow();
            arm[nameof(Materials.LOGS)] = 0;
            arm[nameof(Materials.WHEAT)] = 0;
            arm[nameof(Materials.BOLLS)] = 0;
            arm[nameof(Materials.RESIN)] = 0;
            arm[nameof(Materials.TORTOISES)] = 0;
            arm[nameof(Materials.BLUESPIRIT)] = 1;
            arm[nameof(Materials.GOLD)] = 1;
            arm[nameof(Materials.SAND)] = 1;
            arm[nameof(Materials.WATER)] = 0;
            arm[nameof(Materials.SALT)] = 0;

            var gsm = _constCrafterMaterialTable.NewRow();
            gsm[nameof(Materials.LOGS)] = 0;
            gsm[nameof(Materials.WHEAT)] = 0;
            gsm[nameof(Materials.BOLLS)] = 0;
            gsm[nameof(Materials.RESIN)] = 1;
            gsm[nameof(Materials.TORTOISES)] = 0;
            gsm[nameof(Materials.BLUESPIRIT)] = 1;
            gsm[nameof(Materials.GOLD)] = 0;
            gsm[nameof(Materials.SAND)] = 1;
            gsm[nameof(Materials.WATER)] = 0;
            gsm[nameof(Materials.SALT)] = 0;

            var ltw = _constCrafterMaterialTable.NewRow();
            ltw[nameof(Materials.LOGS)] = 1;
            ltw[nameof(Materials.WHEAT)] = 0;
            ltw[nameof(Materials.BOLLS)] = 1;
            ltw[nameof(Materials.RESIN)] = 0;
            ltw[nameof(Materials.TORTOISES)] = 1;
            ltw[nameof(Materials.BLUESPIRIT)] = 0;
            ltw[nameof(Materials.GOLD)] = 0;
            ltw[nameof(Materials.SAND)] = 0;
            ltw[nameof(Materials.WATER)] = 0;
            ltw[nameof(Materials.SALT)] = 0;

            var wvr = _constCrafterMaterialTable.NewRow();
            wvr[nameof(Materials.LOGS)] = 0;
            wvr[nameof(Materials.WHEAT)] = 0;
            wvr[nameof(Materials.BOLLS)] = 1;
            wvr[nameof(Materials.RESIN)] = 1;
            wvr[nameof(Materials.TORTOISES)] = 0;
            wvr[nameof(Materials.BLUESPIRIT)] = 0;
            wvr[nameof(Materials.GOLD)] = 0;
            wvr[nameof(Materials.SAND)] = 0;
            wvr[nameof(Materials.WATER)] = 1;
            wvr[nameof(Materials.SALT)] = 0;

            var alc = _constCrafterMaterialTable.NewRow();
            alc[nameof(Materials.LOGS)] = 0;
            alc[nameof(Materials.WHEAT)] = 0;
            alc[nameof(Materials.BOLLS)] = 0;
            alc[nameof(Materials.RESIN)] = 0;
            alc[nameof(Materials.TORTOISES)] = 1;
            alc[nameof(Materials.BLUESPIRIT)] = 0;
            alc[nameof(Materials.GOLD)] = 0;
            alc[nameof(Materials.SAND)] = 0;
            alc[nameof(Materials.WATER)] = 1;
            alc[nameof(Materials.SALT)] = 1;

            var cul = _constCrafterMaterialTable.NewRow();
            cul[nameof(Materials.LOGS)] = 0;
            cul[nameof(Materials.WHEAT)] = 1;
            cul[nameof(Materials.BOLLS)] = 0;
            cul[nameof(Materials.RESIN)] = 0;
            cul[nameof(Materials.TORTOISES)] = 0;
            cul[nameof(Materials.BLUESPIRIT)] = 0;
            cul[nameof(Materials.GOLD)] = 0;
            cul[nameof(Materials.SAND)] = 0;
            cul[nameof(Materials.WATER)] = 1;
            cul[nameof(Materials.SALT)] = 1;

            _constCrafterMaterialTable.Rows.Add(crp);
            _constCrafterMaterialTable.Rows.Add(bsm);
            _constCrafterMaterialTable.Rows.Add(arm);
            _constCrafterMaterialTable.Rows.Add(gsm);
            _constCrafterMaterialTable.Rows.Add(ltw);
            _constCrafterMaterialTable.Rows.Add(wvr);
            _constCrafterMaterialTable.Rows.Add(alc);
            _constCrafterMaterialTable.Rows.Add(cul);
            */
            _constCrafterMaterialTable.Columns.Add(Materials.LOGS.ToString(), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(Materials.WHEAT.ToString(), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(Materials.BOLLS.ToString(), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(Materials.RESIN.ToString(), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(Materials.TORTOISES.ToString(), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(Materials.BLUESPIRIT.ToString(), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(Materials.GOLD.ToString(), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(Materials.SAND.ToString(), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(Materials.WATER.ToString(), typeof(bool));
            _constCrafterMaterialTable.Columns.Add(Materials.SALT.ToString(), typeof(bool));

            var crp = _constCrafterMaterialTable.NewRow();
            crp[Materials.LOGS.ToString()] = 1;
            crp[Materials.WHEAT.ToString()] = 1;
            crp[Materials.BOLLS.ToString()] = 1;
            crp[Materials.RESIN.ToString()] = 0;
            crp[Materials.TORTOISES.ToString()] = 0;
            crp[Materials.BLUESPIRIT.ToString()] = 0;
            crp[Materials.GOLD.ToString()] = 0;
            crp[Materials.SAND.ToString()] = 0;
            crp[Materials.WATER.ToString()] = 0;
            crp[Materials.SALT.ToString()] = 0;

            var bsm = _constCrafterMaterialTable.NewRow();
            bsm[Materials.LOGS.ToString()] = 1;
            bsm[Materials.WHEAT.ToString()] = 0;
            bsm[Materials.BOLLS.ToString()] = 0;
            bsm[Materials.RESIN.ToString()] = 0;
            bsm[Materials.TORTOISES.ToString()] = 0;
            bsm[Materials.BLUESPIRIT.ToString()] = 1;
            bsm[Materials.GOLD.ToString()] = 1;
            bsm[Materials.SAND.ToString()] = 0;
            bsm[Materials.WATER.ToString()] = 0;
            bsm[Materials.SALT.ToString()] = 0;

            var arm = _constCrafterMaterialTable.NewRow();
            arm[Materials.LOGS.ToString()] = 0;
            arm[Materials.WHEAT.ToString()] = 0;
            arm[Materials.BOLLS.ToString()] = 0;
            arm[Materials.RESIN.ToString()] = 0;
            arm[Materials.TORTOISES.ToString()] = 0;
            arm[Materials.BLUESPIRIT.ToString()] = 1;
            arm[Materials.GOLD.ToString()] = 1;
            arm[Materials.SAND.ToString()] = 1;
            arm[Materials.WATER.ToString()] = 0;
            arm[Materials.SALT.ToString()] = 0;

            var gsm = _constCrafterMaterialTable.NewRow();
            gsm[Materials.LOGS.ToString()] = 0;
            gsm[Materials.WHEAT.ToString()] = 0;
            gsm[Materials.BOLLS.ToString()] = 0;
            gsm[Materials.RESIN.ToString()] = 1;
            gsm[Materials.TORTOISES.ToString()] = 0;
            gsm[Materials.BLUESPIRIT.ToString()] = 1;
            gsm[Materials.GOLD.ToString()] = 0;
            gsm[Materials.SAND.ToString()] = 1;
            gsm[Materials.WATER.ToString()] = 0;
            gsm[Materials.SALT.ToString()] = 0;

            var ltw = _constCrafterMaterialTable.NewRow();
            ltw[Materials.LOGS.ToString()] = 1;
            ltw[Materials.WHEAT.ToString()] = 0;
            ltw[Materials.BOLLS.ToString()] = 1;
            ltw[Materials.RESIN.ToString()] = 0;
            ltw[Materials.TORTOISES.ToString()] = 1;
            ltw[Materials.BLUESPIRIT.ToString()] = 0;
            ltw[Materials.GOLD.ToString()] = 0;
            ltw[Materials.SAND.ToString()] = 0;
            ltw[Materials.WATER.ToString()] = 0;
            ltw[Materials.SALT.ToString()] = 0;

            var wvr = _constCrafterMaterialTable.NewRow();
            wvr[Materials.LOGS.ToString()] = 0;
            wvr[Materials.WHEAT.ToString()] = 0;
            wvr[Materials.BOLLS.ToString()] = 1;
            wvr[Materials.RESIN.ToString()] = 1;
            wvr[Materials.TORTOISES.ToString()] = 0;
            wvr[Materials.BLUESPIRIT.ToString()] = 0;
            wvr[Materials.GOLD.ToString()] = 0;
            wvr[Materials.SAND.ToString()] = 0;
            wvr[Materials.WATER.ToString()] = 1;
            wvr[Materials.SALT.ToString()] = 0;

            var alc = _constCrafterMaterialTable.NewRow();
            alc[Materials.LOGS.ToString()] = 0;
            alc[Materials.WHEAT.ToString()] = 0;
            alc[Materials.BOLLS.ToString()] = 0;
            alc[Materials.RESIN.ToString()] = 0;
            alc[Materials.TORTOISES.ToString()] = 1;
            alc[Materials.BLUESPIRIT.ToString()] = 0;
            alc[Materials.GOLD.ToString()] = 0;
            alc[Materials.SAND.ToString()] = 0;
            alc[Materials.WATER.ToString()] = 1;
            alc[Materials.SALT.ToString()] = 1;

            var cul = _constCrafterMaterialTable.NewRow();
            cul[Materials.LOGS.ToString()] = 0;
            cul[Materials.WHEAT.ToString()] = 1;
            cul[Materials.BOLLS.ToString()] = 0;
            cul[Materials.RESIN.ToString()] = 0;
            cul[Materials.TORTOISES.ToString()] = 0;
            cul[Materials.BLUESPIRIT.ToString()] = 0;
            cul[Materials.GOLD.ToString()] = 0;
            cul[Materials.SAND.ToString()] = 0;
            cul[Materials.WATER.ToString()] = 1;
            cul[Materials.SALT.ToString()] = 1;

            _constCrafterMaterialTable.Rows.Add(crp);
            _constCrafterMaterialTable.Rows.Add(bsm);
            _constCrafterMaterialTable.Rows.Add(arm);
            _constCrafterMaterialTable.Rows.Add(gsm);
            _constCrafterMaterialTable.Rows.Add(ltw);
            _constCrafterMaterialTable.Rows.Add(wvr);
            _constCrafterMaterialTable.Rows.Add(alc);
            _constCrafterMaterialTable.Rows.Add(cul);
        }
    }
}
