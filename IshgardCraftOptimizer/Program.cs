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

        //static DataTable _postFirstCraftMaterialCalcTable;
        //static DataTable _postSecondCraftMaterialCalcTable;
        //static Dictionary<Crafters, List<CraftingPath>> _craftingPathDictionary = new Dictionary<Crafters, List<CraftingPath>>();
        //static Dictionary<Crafters, int> _crafterPriorityDict = new Dictionary<Crafters, int>();
        //static List<KeyValuePair<Crafters, int>> _crafterPriority = new List<KeyValuePair<Crafters, int>>();
        
        static Dictionary<Materials, int> _craftingInventory = new Dictionary<Materials, int>();
        //static Dictionary<Crafters, int> _craftsAvailablePerCrafter = new Dictionary<Crafters, int>();
        static int _perMaterialCost = 10;

        //static List<KeyValuePair<Crafters, int>> _optimizedCraftingPath = new List<KeyValuePair<Crafters, int>>();

        //static List<Crafters> _recursiveCrafterList = new List<Crafters>();
        //static Dictionary<Crafters, List<Crafters>> _recursiveCrafterCountDictionary = new Dictionary<Crafters, List<Crafters>>();
        static Dictionary<Crafters, List<KeyValuePair<Crafters, int>>> _recursiveCrafterCountDictionary2 = new Dictionary<Crafters, List<KeyValuePair<Crafters, int>>>();
        static List<KeyValuePair<Crafters, int>> _recursiveCrafterList2 = new List<KeyValuePair<Crafters, int>>();
        static List<Crafters> _allowedCrafters = new List<Crafters>() { Crafters.CRP, Crafters.BSM, Crafters.ARM, Crafters.GSM, Crafters.LTW, Crafters.WVR, Crafters.ALC, Crafters.CUL };

        static void Main(string[] args)
        {
            //zhu li, do the thing!
            //InitalCraftingMatrixCreationAndCrafterPriorityCalculation();
            

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
            //_allowedCrafters.Remove(Crafters.CRP);
            //_allowedCrafters.Remove(Crafters.BSM);
            //_allowedCrafters.Remove(Crafters.ARM);
            //_allowedCrafters.Remove(Crafters.GSM);
            //_allowedCrafters.Remove(Crafters.LTW);
            //_allowedCrafters.Remove(Crafters.WVR);
            //_allowedCrafters.Remove(Crafters.ALC);
            //_allowedCrafters.Remove(Crafters.CUL);

            InitalCraftingMatrixCreationAndCrafterPriorityCalculationV3();

            

            foreach (var item in _recursiveCrafterCountDictionary2)//.Where(r => r.Value.Count == countMax))
            {
                var sum = item.Value.Sum(i => i.Value);
                Console.WriteLine($"{item.Key} - {sum}");
                foreach(var segment in item.Value)
                {
                    Console.Write($"{segment.Key}-{segment.Value} -> ");
                }
                Console.WriteLine();
            }

            //Console.WriteLine("Your optimized crafting path is:");
            //var finalCraftCount = 0;
            //foreach(var item in _optimizedCraftingPath)
            //{
            //    Console.WriteLine($"Craft {item.Key} {item.Value} time(s)");
            //    finalCraftCount += item.Value;
            //}
            //Console.WriteLine($"for a total count of {finalCraftCount} crafts.");
            Console.ReadKey();
        }

        //encapsulating this logic as it will not change based on user inputs
        //private static void InitalCraftingMatrixCreationAndCrafterPriorityCalculation()
        //{
        //    //create the crafting matrix of which craft uses which materials
        //    DataTableCreation();

        //    //calculate the crafting paths for each Crafter
        //    for (int i = 0; i < COUNT_OF_CRAFTERS; i++)
        //    {
        //        _craftingPathDictionary.Add((Crafters)i, new List<CraftingPath>());
        //        CalculateCraftingPaths(i);
        //    }

        //    //based on path count for a Crafter, assign it a priority
        //    foreach (var pathDictItem in _craftingPathDictionary)
        //    {
        //        //_crafterPriority.Add(new KeyValuePair<Crafters, int>(pathDictItem.Key, pathDictItem.Value.Count()));
        //        _crafterPriorityDict.Add(pathDictItem.Key, pathDictItem.Value.Count());
        //    }
        //    //_crafterPriority.Sort((x, y) => y.Value.CompareTo(x.Value));//compare second element (y) to first (x) to get descending ordering
        //}

        //good idea, takes far too long to calculate for even 1 crafter
        //private static void InitalCraftingMatrixCreationAndCrafterPriorityCalculationV2()
        //{
        //    //create the crafting matrix of which craft uses which materials
        //    DataTableCreation();

        //    //calculate the crafting paths for each Crafter
        //    for (int i = 0; i < COUNT_OF_CRAFTERS; i++)
        //    {
        //        _recursiveCrafterCountDictionary.Add((Crafters)i, new List<Crafters>());

                
        //        RecursiveCrafterFinder((Crafters)i, (Crafters)i);
        //    }
        //}

        private static void InitalCraftingMatrixCreationAndCrafterPriorityCalculationV3()
        {
            //create the crafting matrix of which craft uses which materials
            DataTableCreation();

            //calculate the crafting paths for each Crafter
            foreach (var crafter in _allowedCrafters)
            {
                _recursiveCrafterCountDictionary2.Add(crafter, new List<KeyValuePair<Crafters, int>>());
                _recursiveCrafterList2.Clear();//shouldnt need, but just to be sure
                CalculateCraftingPathsV2(crafter, crafter);
            }
        }

        private static void CalculateCraftingPathsV2(Crafters firstCrafter, Crafters currentCrafter)
        {
            //identify which materials(columns) are affected by the craft
            List<Materials> usedMaterials = GetMaterialsAffectedByCrafter(currentCrafter);
            int lowestCount = Int32.MaxValue;

            foreach(var mat in usedMaterials)
            {
                if (_craftingInventory[mat] < lowestCount)
                {
                    lowestCount = _craftingInventory[mat];
                }
            }

            //add the craft to the list and remove the materials from the inventory
            _recursiveCrafterList2.Add(new KeyValuePair<Crafters, int>(currentCrafter, lowestCount));
            RemoveCrafterMaterials(currentCrafter, lowestCount);

            //get crafters that can still make stuff and loop over them
            var remainingCrafters = GetCraftersRemainingV2();
            if (remainingCrafters.Count > 0)
            {
                foreach (var remainingCraft in remainingCrafters)
                {
                    CalculateCraftingPathsV2(firstCrafter, remainingCraft);
                }
            }
            //or, if no crafters remain, check to see if this is a new best, save it if it is
            else
            {
                var listSum = _recursiveCrafterList2.Sum(r => r.Value);
                var currentSum = _recursiveCrafterCountDictionary2[firstCrafter].Sum(d => d.Value);

                if(listSum > currentSum)
                {
                    //_recursiveCrafterList2.CopyTo(_recursiveCrafterCountDictionary2[firstCrafter]);
                    _recursiveCrafterCountDictionary2[firstCrafter] = new List<KeyValuePair<Crafters, int>>(_recursiveCrafterList2);
                }
                else if(listSum == currentSum && _recursiveCrafterList2.Count() < _recursiveCrafterCountDictionary2[firstCrafter].Count())
                {
                    _recursiveCrafterCountDictionary2[firstCrafter] = new List<KeyValuePair<Crafters, int>>(_recursiveCrafterList2);
                }
            }

            //restore the materials to the inventory for the next loop and remove the craft from the list
            UnRemoveCrafterMaterials(currentCrafter, lowestCount);
            _recursiveCrafterList2.RemoveAt(_recursiveCrafterList2.Count - 1);
        }

        //private static void RecursiveCrafterFinder(Crafters originalCrafter, Crafters crafter)
        //{
        //    _recursiveCrafterList.Add(crafter);
        //    //consume the materials for the passed-in crafter
        //    RemoveCrafterMaterials(crafter);

        //    //get the list of crafters that can make at least 1 craft
        //    //for (int i = 0; i < COUNT_OF_CRAFTERS; i++)
        //    //{
        //    //_recursiveCrafterList.Add(crafter);
        //    //RemoveCrafterMaterials((Crafters)i);

        //    var craftersRemain = GetCraftersRemaining();
        //    //if no crafts remain, get the length of the crafter chain. if its a new max, store that as the max for this crafter 
        //    if (craftersRemain.Count > 0)
        //    {
        //        foreach (var nextCraft in craftersRemain)
        //        {
        //            RecursiveCrafterFinder(originalCrafter, nextCraft);
        //        }
        //    }
        //    else
        //    {
        //        if (_recursiveCrafterList.Count() > _recursiveCrafterCountDictionary[originalCrafter].Count())
        //        {
        //            _recursiveCrafterCountDictionary[originalCrafter] = _recursiveCrafterList;
        //        }
        //    }

        //    //unremove crafter materials
        //    UnRemoveCrafterMaterials(crafter);

        //    //remove the crafter from the recursive list
        //    _recursiveCrafterList.RemoveAt(_recursiveCrafterList.Count - 1);
        //    //}
        //}

        private static void RemoveCrafterMaterials(Crafters crafter, int countToRemove)
        {
            var usedMaterials = GetMaterialsAffectedByCrafter(crafter);

            foreach (var mat in usedMaterials)
            {
                _craftingInventory[mat]-= countToRemove;
            }
        }

        private static void UnRemoveCrafterMaterials(Crafters crafter, int countToUnremove)
        {
            var usedMaterials = GetMaterialsAffectedByCrafter(crafter);

            foreach (var mat in usedMaterials)
            {
                _craftingInventory[mat] += countToUnremove;
            }
        }

        //private static List<Crafters> GetCraftersRemaining()
        //{
        //    var returnList = new List<Crafters>();
        //    bool crafterStillAvailable;

        //    //loop through the crafters so we can see which ones are still available
        //    foreach (var crafter in _allowedCrafters)
        //    {
        //        crafterStillAvailable = true;

        //        //check the count of each of the materials
        //        foreach(var mat in GetMaterialsAffectedByCrafter(crafter))
        //        {
        //            if(_craftingInventory[mat] <= 0)
        //            {
        //                crafterStillAvailable = false;
        //                break;
        //            }
        //        }

        //        if(crafterStillAvailable)
        //        {
        //            returnList.Add(crafter);
        //        }
        //    }

        //    return returnList;
        //}

        private static List<Crafters> GetCraftersRemainingV2()
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

        //private static void CalculateCraftingPaths(int crafterId)
        //{
        //    bool[] possibleCraftAfterFirstCraft = new bool[] { true, true, true, true, true, true, true, true };
        //    bool[] possibleCraftAfterSecondCraft = new bool[] { true, true, true, true, true, true, true, true };

        //    var firstCrafter = (Crafters)crafterId;

        //    //identify which materials(columns) are affected by the first craft
        //    List<string> usedMaterials = new List<string>();

        //    foreach (DataColumn col in _constCrafterMaterialTable.Columns)
        //    {
        //        if ((bool)_constCrafterMaterialTable.Rows[crafterId][col.ColumnName])
        //        {
        //            usedMaterials.Add(col.ColumnName);
        //        }
        //    }
            
        //    //now we need to see if there are possible crafts remaining, check each row and see if there are 3 materials available
        //    _postFirstCraftMaterialCalcTable = _constCrafterMaterialTable.Copy();//because we're modifying the table being passed to this method, we need to use one other than the const
        //    RemoveInvalidCrafts(_postFirstCraftMaterialCalcTable, usedMaterials, possibleCraftAfterFirstCraft);

        //    //with invalid crafts removed, we need to store possible second crafts to be put into the path
        //    var secondCraftList = new List<Crafters>();
        //    for (int i = 0; i < possibleCraftAfterFirstCraft.Length; i++)
        //    {
        //        if (possibleCraftAfterFirstCraft[i])//if this is true, the craft is still doable, so add it
        //        {
        //            secondCraftList.Add((Crafters)i);
        //        }
        //    }

        //    //with the second crafts identified, we now need to check each branch of those possible paths to see if a third is available
        //    bool craftsRemain;
        //    foreach(var secondCraft in secondCraftList)
        //    {
        //        usedMaterials.Clear();
        //        //identify which materials are being used by the second craft
        //        foreach (DataColumn col in _constCrafterMaterialTable.Columns)
        //        {
        //            if ((bool)_constCrafterMaterialTable.Rows[(int)secondCraft][col.ColumnName])
        //            {
        //                usedMaterials.Add(col.ColumnName);
        //            }
        //        }

        //        //we need to see if there are possible crafts remaining 
        //        _postSecondCraftMaterialCalcTable = _postFirstCraftMaterialCalcTable.Copy();
        //        possibleCraftAfterFirstCraft.CopyTo(possibleCraftAfterSecondCraft, 0);
        //        //even though this post-second craft table variable isn't being used later, we don't want to touch the post-first craft table because
        //        //we need to use it for more than 1 craft and the following method will modify the passed-in table.
        //        //there are other solutions, yes. i chose this one over adding a bunch of code to save minimal space in memory in a time when people have GBs of it
        //        craftsRemain = RemoveInvalidCrafts(_postSecondCraftMaterialCalcTable, usedMaterials, possibleCraftAfterSecondCraft);

        //        if (craftsRemain)
        //        {
        //            //with invalid crafts removed, we need to store possible final crafts to be put into the path
        //            for (int i = 0; i < possibleCraftAfterSecondCraft.Length; i++)
        //            {
        //                if (possibleCraftAfterSecondCraft[i])//if this is true, the craft is still doable, so add it
        //                {
        //                    _craftingPathDictionary[firstCrafter].Add(new CraftingPath(firstCrafter, secondCraft, (Crafters)i));
        //                }
        //            }
        //        }
        //        else
        //        {
        //            //if there are no possible crafts after the second craft, we still need to make a path of those 2 crafts
        //            _craftingPathDictionary[firstCrafter].Add(new CraftingPath(firstCrafter, secondCraft, null));
        //        }
        //    }
        //}

        //the primary function of this method is to remove crafts from the pool that are no longer possible based on the current state of the pool and
        //the materials used by the previous craft. if no possible crafts remain, it will return false
        private static bool RemoveInvalidCrafts(DataTable calcTable, List<string> usedMaterials, bool[] possibleCraft)
        {
            bool possibleCraftsRemain = false;
            //remove all crafts that were affected by the materials used in the previous craft

            //while this is effectively a foreach loop, i wanted the counting variable for the row number, so this is a for loop
            for (int i = 0; i < calcTable.Rows.Count; i++)
            {
                //for the given row, in each column that was affected by the previous craft, set it to false
                foreach (var colName in usedMaterials)
                {
                    if((bool)calcTable.Rows[i][colName])
                    {
                        //this row uses a column that was used by the previous craft, meaning this craft can no longer be used
                        //remove it as a possible craft
                        possibleCraft[i] = false;//<-- this is why i wanted the counting variable
                    }

                    //regardless of if it was initially true, this material(column) was used, so it needs to be set to false for every craft
                    calcTable.Rows[i][colName] = false;
                }

                //possibleCraftsRemain is defaulted to false, but if any craft is listed as a possible craft, set it to true so we know there's more to do
                if (possibleCraft[i])
                {
                    possibleCraftsRemain = true;
                }
            }

            return possibleCraftsRemain;
        }

        //private static void CalculateCraftingInventoryAndCounts()
        //{
        //    for (int i = 0; i < COUNT_OF_CRAFTERS; i++)
        //    {
        //        //TODO: add the logic for ignoring a crafter(s) specified by the user, do so by setting the crafts available to 0

        //        //set the crafts available for the given crafter to max, so that we will for sure find a value lower than it
        //        if (_craftsAvailablePerCrafter.ContainsKey((Crafters)i))
        //        {
        //            _craftsAvailablePerCrafter[(Crafters)i] = int.MaxValue;
        //        }
        //        else
        //        {
        //            _craftsAvailablePerCrafter.Add((Crafters)i, int.MaxValue);
        //        }

        //        //get the Materials the Crafter uses and find the lowest count of those Materials, store that as crafts available
        //        foreach(var mat in GetMaterialsAffectedByCrafter((Crafters)i))
        //        {
        //            if(_craftingInventory[mat] < _craftsAvailablePerCrafter[(Crafters)i])
        //            {
        //                _craftsAvailablePerCrafter[(Crafters)i] = _craftingInventory[mat];
        //            }
        //        }
        //    }
        //}

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
    }
    
    //This class is a single instance of a "path" through the Crafters, constructed based off which Crafters impact which others.
    //The idea is to create a list of these CraftingPaths to have an idea of which Crafters are more beneficial to prioritize than others,
    //that is to say which Crafters impact the fewest other Crafters have a higher priority, as that will yield more crafts overall.
    //When the entire crafting matrix is run through the CalculateCraftingBranches method above, the end result should be a list of CraftingPaths.
    //The number of CraftingPaths associated with a specific Crafter (stored as the First property of a CraftingPath) is effectively the priority
    //for that Crafter, with higher numbers being better. however, the CraftingPaths only come into play in tiebreak scenarios.
    //In general, picking the Crafter with the most amount of crafts possible and exhausting its materials will yield the best results
    public class CraftingPath
    {
        public Crafters First { get; private set; }
        public Crafters Second { get; private set; }
        public Crafters? Final { get; private set; }

        public CraftingPath(Crafters first, Crafters second, Crafters? final)
        {
            First = first;
            Second = second;
            Final = final;
        }
    }
}
