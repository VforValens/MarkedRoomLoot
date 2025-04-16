import { ItemDistribution, ISpawnpoint } from "@spt/models/eft/common/ILooseLoot";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { BaseClasses } from "@spt/models/enums/BaseClasses";

import { ModConfig } from "../config/ts/config";

export class Loot
{
    private modConfig: ModConfig = require("../config/config.json");
    private logger: ILogger;
    private tables: DatabaseServer;
    private locationConfig: ILocationConfig;

    constructor (logger: ILogger, databaseServer: DatabaseServer, locationConfig: ILocationConfig)
    {
        this.logger = logger;
        this.locationConfig = locationConfig;
        this.tables = databaseServer;
    }

    public updateLoot(): void
    {
        this.disableBackpackExcludedFilters();
        this.logger.info("Backpack Excluded Filters have been disabled.");
        this.containersInMarkedRoom();
        this.logger.info("Marked Room Loot has been updated.");
    }

    private disableBackpackExcludedFilters(): void
    {
        const items = this.tables.getTables().templates.items;
        for (const item of Object.keys(items))
        {
            if (items[item]._parent === BaseClasses.BACKPACK && items[item]?._props?.Grids[0]?._props?.filters?.length > 0)
            {
                items[item]._props.Grids[0]._props.filters[0].ExcludedFilter = [];
            }
            
            if (items[item]._parent === BaseClasses.BACKPACK && items[item]?._props?.Grids[1]?._props?.filters?.length > 0)
            {
                items[item]._props.Grids[1]._props.filters[0].ExcludedFilter = [];
            }
            
            if (items[item]._parent === BaseClasses.BACKPACK && items[item]?._props?.Grids[2]?._props?.filters?.length > 0)
            {
                items[item]._props.Grids[2]._props.filters[0].ExcludedFilter = [];
            }
            
            if (items[item]._parent === BaseClasses.BACKPACK && items[item]?._props?.Grids[3]?._props?.filters?.length > 0)
            {
                items[item]._props.Grids[3]._props.filters[0].ExcludedFilter = [];
            }
            
            if (items[item]._parent === BaseClasses.BACKPACK && items[item]?._props?.Grids[4]?._props?.filters?.length > 0)
            {
                items[item]._props.Grids[4]._props.filters[0].ExcludedFilter = [];
            }
            
            if (items[item]._parent === BaseClasses.BACKPACK && items[item]?._props?.Grids[5]?._props?.filters?.length > 0)
            {
                items[item]._props.Grids[5]._props.filters[0].ExcludedFilter = [];
            }
        }
    }

    /**
     * Changes the loot database/tables to include containers in marked rooms.
     * 
     * @variable containersInMarkedRoom Enables common containers (items case, weapon case, etc.) in Marked Rooms.
     */
    private containersInMarkedRoom(): void
    {
        // Customs Marked Room Loot.
        const database = this.tables?.getTables();
        const customs = database?.locations?.bigmap?.looseLoot?.spawnpoints;

        if (customs)
        {
            let customsMarked1: ISpawnpoint;
            let customsMarked8: ISpawnpoint;
            let customsMarked9: ISpawnpoint;
            let customsMarked10: ISpawnpoint;
            let customsMarked11: ISpawnpoint;
            let customsMarked12: ISpawnpoint;

            //* Customs Marked Room Loot.
            // Loot 135 (1) is electronics, and other small items like GPU, Motor, etc.
            // Loot 135 (2) is $, Euro, Roubles
            // Loot 135 (4) is GP Coin, Roubles, $
            // Loot 135 (7) is Euro, Roubles, GP Coin
            // Loot 135 (8) is containers (ammo, dogtag, docs, key tool, injector case, keycard holder)
            // Loot 135 (9) is weapons and ammunition case
            // Loot 135 (10) is containers
            // Loot 135 (11) is containers
            // Loot 135 (12) is containers
            // */
            

            // For loop through the Spawnpoints
            for (const spawnPoint of customs)
            {
                if (spawnPoint.template.Id.startsWith("Loot 135 (1)"))
                {
                    customsMarked1 = spawnPoint;
                    customsMarked1.template.Items.push(...this.containers());
                    customsMarked1.itemDistribution.push(...this.containerDistribution());
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (8)"))
                {
                    customsMarked8 = spawnPoint;
                    customsMarked8.template.Items.push(...this.containers());
                    customsMarked8.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "bigmap");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (9)"))
                {
                    customsMarked9 = spawnPoint;
                    customsMarked9.template.Items.push(...this.containers());
                    customsMarked9.itemDistribution.push(...this.containerDistribution());
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (10)"))
                {
                    customsMarked10 = spawnPoint;
                    customsMarked10.template.Items.push(...this.containers());
                    customsMarked10.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "bigmap");
                    continue;
                }
                
                if (spawnPoint.template.Id.startsWith("Loot 135 (11)"))
                {
                    customsMarked11 = spawnPoint;
                    customsMarked11.template.Items.push(...this.containers());
                    customsMarked11.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "bigmap");
                    continue;
                }
                
                if (spawnPoint.template.Id.startsWith("Loot 135 (12)"))
                {
                    customsMarked12 = spawnPoint;
                    customsMarked12.template.Items.push(...this.containers());
                    customsMarked12.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "bigmap");
                    continue;
                }
            }
        }
        
                
        // Reserve Marked Room Loot.
        const rezervbase = database.locations?.rezervbase?.looseLoot?.spawnpoints;
        
        if (rezervbase)
        {
            let reserveMarked1: ISpawnpoint;
            let reserveMarked2: ISpawnpoint;
            let reserveMarked3: ISpawnpoint;
            let reserveMarked4: ISpawnpoint;
            let reserveMarked5: ISpawnpoint;
            let reserveMarked6: ISpawnpoint;
            let reserveMarked7: ISpawnpoint;
            let reserveMarked8: ISpawnpoint;
            let reserveMarked9: ISpawnpoint;
            let reserveMarked10: ISpawnpoint;
            let reserveMarked11: ISpawnpoint;
            let reserveMarked12: ISpawnpoint;
            let reserveMarked13: ISpawnpoint;

            //* Reserve Marked Room Loot.
            // Loot 135 (1) is general items. Motor, pcb, gpu, etc.
            // Loot 135 (2)11b8069f is electronics GPU, motor, VPX, etc.
            // Loot 135 (2)5bf63cd1 is btc, figurines, etc.
            // Loot 135 (3) is general items. Motor, pcb, gpu, etc.
            // Loot 135 (8) is is btc, figurines, etc.
            // Loot 135 (9) is container
            // Loot 135 (10)317af6ee is container
            // Loot 135 (10)c643b1b4 is container
            // Cult Loot 135 (11) is container
            // Cult Loot 135 (12) is container
            // Cult Loot 135 (13) is container
            // Loot 135 (11)4d454522 is container
            // Loot 135 (11)515d00d4 is container
            // Loot 135 (12)473ac088 is container
            // Loot 135 (12)4be723ec is container
            // Loot 135 (13)73278017 is container
            // Loot 135 (13)a1defdc6 is container
            // Loot 135 (14) is container
            // */
            
            // For loop through the Spawnpoints
            for (const spawnPoint of rezervbase)
            {
                if (spawnPoint.template.Id.startsWith("Loot 135 (9"))
                {
                    reserveMarked1 = spawnPoint;
                    reserveMarked1.template.Items.push(...this.containers());
                    reserveMarked1.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (10) [317af6ee"))
                {
                    reserveMarked2 = spawnPoint;
                    reserveMarked2.template.Items.push(...this.containers());
                    reserveMarked2.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (10) [c643b1b4"))
                {
                    reserveMarked3 = spawnPoint;
                    reserveMarked3.template.Items.push(...this.containers());
                    reserveMarked3.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("cult_Loot 135 (11)"))
                {
                    reserveMarked4 = spawnPoint;
                    reserveMarked4.template.Items.push(...this.containers());
                    reserveMarked4.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("cult_Loot 135 (12)"))
                {
                    reserveMarked5 = spawnPoint;
                    reserveMarked5.template.Items.push(...this.containers());
                    reserveMarked5.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("cult_Loot 135 (13)"))
                {
                    reserveMarked6 = spawnPoint;
                    reserveMarked6.template.Items.push(...this.containers());
                    reserveMarked6.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (11) [4d454522"))
                {
                    reserveMarked7 = spawnPoint;
                    reserveMarked7.template.Items.push(...this.containers());
                    reserveMarked7.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (11) [515d00d4"))
                {
                    reserveMarked8 = spawnPoint;
                    reserveMarked8.template.Items.push(...this.containers());
                    reserveMarked8.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (12) [473ac088"))
                {
                    reserveMarked9 = spawnPoint;
                    reserveMarked9.template.Items.push(...this.containers());
                    reserveMarked9.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (12) [4be723ec"))
                {
                    reserveMarked10 = spawnPoint;
                    reserveMarked10.template.Items.push(...this.containers());
                    reserveMarked10.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (13) [73278017"))
                {
                    reserveMarked11 = spawnPoint;
                    reserveMarked11.template.Items.push(...this.containers());
                    reserveMarked11.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (13) [a1defdc6"))
                {
                    reserveMarked12 = spawnPoint;
                    reserveMarked12.template.Items.push(...this.containers());
                    reserveMarked12.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135 (14)"))
                {
                    reserveMarked13 = spawnPoint;
                    reserveMarked13.template.Items.push(...this.containers());
                    reserveMarked13.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "rezervbase");
                    continue;
                }
            }
        }
        

        // Streets Marked Room Loot.
        const tarkovstreets = database?.locations?.tarkovstreets?.looseLoot?.spawnpoints;
        if (tarkovstreets)
        {
            let streets1: ISpawnpoint;
            let streets2: ISpawnpoint;
            let streets3: ISpawnpoint;
            let streets4: ISpawnpoint;
            let streets5: ISpawnpoint;
            let streets6: ISpawnpoint;
            let streets7: ISpawnpoint;
            let streets8: ISpawnpoint;

            //* Streets Marked Room Loot.
            // Loot 135_Leo_Rare2741538 is 
            // Loot 135_Leo_Rare (1) is general items
            // Loot 135_Leo_Rare (2) is general items
            // Loot 135_Leo_Rare (3) is general items
            // Loot 135_Leo_Rare (4) is general items
            // Loot 135_Leo_Rare (5) is general items
            // Loot 135_Leo_Rare (6) is general items
            // Loot 135_Leo_Rare (7) is general items
            // Loot 135_Leo_Rare (8) is container
            // Loot 135_Leo_Rare (9) is weapons
            // Loot 135_Leo_Rare (10) is container
            // Loot 135_Leo_Rare (11) is general items
            // Loot 135_Leo_Rare (12) is armor
            // Loot 135_Leo_Rare (13) is weapons
            // Loot 135_Leo_Rare (14) is general items
            // Loot 135_Leo_Rare (15) is container
            // Loot 135_Leo_Rare (29) is container
            // Loot 135_Leo_Rare (30) is container
            // Loot 135_Leo_Rare (31) is container
            // Loot 135_Leo_Rare (41) is container
            // Loot 135_Leo_Rare (43) is container
            // */


            // For loop through the Spawnpoints
            for (const spawnPoint of tarkovstreets)
            {
                if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (8)"))
                {
                    streets1 = spawnPoint;
                    streets1.template.Items.push(...this.containers());
                    streets1.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "tarkovstreets");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (10)"))
                {
                    streets2 = spawnPoint;
                    streets2.template.Items.push(...this.containers());
                    streets2.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "tarkovstreets");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (15)"))
                {
                    streets3 = spawnPoint;
                    streets3.template.Items.push(...this.containers());
                    streets3.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "tarkovstreets");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (29)"))
                {
                    streets4 = spawnPoint;
                    streets4.template.Items.push(...this.containers());
                    streets4.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "tarkovstreets");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (30)"))
                {
                    streets5 = spawnPoint;
                    streets5.template.Items.push(...this.containers());
                    streets5.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "tarkovstreets");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (31)"))
                {
                    streets6 = spawnPoint;
                    streets6.template.Items.push(...this.containers());
                    streets6.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "tarkovstreets");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (41)"))
                {
                    streets7 = spawnPoint;
                    streets7.template.Items.push(...this.containers());
                    streets7.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "tarkovstreets");
                    continue;
                }

                if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (43)"))
                {
                    streets8 = spawnPoint;
                    streets8.template.Items.push(...this.containers());
                    streets8.itemDistribution.push(...this.containerDistribution());
                    this.fixLocationProbabilities(spawnPoint, "tarkovstreets");
                    continue;
                }
            }
        }
    }
    
    private containers(): IItem[]
    {
        const itemId: IItem[] = [];
        itemId.push({ "_id": "1337774434331278", "_tpl": "5d235bb686f77443f4331278" });
        itemId.push({ "_id": "1337774334345621", "_tpl": "67600929bd0a0549d70993f6" });
        itemId.push({ "_id": "1337774234354652", "_tpl": "66bc98a01a47be227a5e956e" });
        itemId.push({ "_id": "1337774134385416", "_tpl": "567143bf4bdc2d1a0f8b4567" });
        itemId.push({ "_id": "1337774562535613", "_tpl": "5c127c4486f7745625356c13" });
        itemId.push({ "_id": "1337774604423522", "_tpl": "59fb023c86f7746d0d4b423c" });
        itemId.push({ "_id": "1337450112255242", "_tpl": "5b6d9ce188a4501afc1b2b25" });
        itemId.push({ "_id": "1337774650057273", "_tpl": "59fb042886f7746c5005a7b2" });
        itemId.push({ "_id": "1337774242482726", "_tpl": "5c0a840b86f7742ffa4f2482" });
        itemId.push({ "_id": "1337774604423825", "_tpl": "59fb016586f7746d0d4b423a" });
        itemId.push({ "_id": "1337774012617384", "_tpl": "5c093db286f7740a1b2617e3" });
        itemId.push({ "_id": "1337774559023584", "_tpl": "5aafbcd986f7745e590fff23" });
        itemId.push({ "_id": "1337450601595759", "_tpl": "5b7c710788a4506dec015957" });
        itemId.push({ "_id": "1337774641590776", "_tpl": "5e2af55f86f7746d4159f07c" });
        itemId.push({ "_id": "1337977215293479", "_tpl": "5857a8bc2459772bad15db29" });
        itemId.push({ "_id": "1337977290079844", "_tpl": "5857a8b324597729ab0a0e7d" });
        itemId.push({ "_id": "1337247084564564", "_tpl": "544a11ac4bdc2d470e8b456a" });
        itemId.push({ "_id": "1337774485952621", "_tpl": "59db794186f77448bc595262" });
        itemId.push({ "_id": "1337774018671223", "_tpl": "5c093ca986f7740a1867ab12" });
        
        return itemId;
    }

    
    private containerDistribution(): ItemDistribution[]
    {
        const relativeProbability = this.modConfig.containersInMarkedRoom.relativeProbability;
        const itemDistribution: ItemDistribution[] = [];
        itemDistribution.push({ "composedKey": { "key": "1337774434331278" }, "relativeProbability": relativeProbability.SICCpouch });
        itemDistribution.push({ "composedKey": { "key": "1337774334345621" }, "relativeProbability": relativeProbability.BallisticPlateCase });
        itemDistribution.push({ "composedKey": { "key": "1337774234354652" }, "relativeProbability": relativeProbability.StreamerItemCase });
        itemDistribution.push({ "composedKey": { "key": "1337774134385416" }, "relativeProbability": relativeProbability.PistolCase });
        itemDistribution.push({ "composedKey": { "key": "1337774562535613" }, "relativeProbability": relativeProbability.MagazineCase });
        itemDistribution.push({ "composedKey": { "key": "1337774604423522" }, "relativeProbability": relativeProbability.WeaponCase });
        itemDistribution.push({ "composedKey": { "key": "1337450112255242" }, "relativeProbability": relativeProbability.THICCWeaponCase });
        itemDistribution.push({ "composedKey": { "key": "1337774650057273" }, "relativeProbability": relativeProbability.ItemCase });
        itemDistribution.push({ "composedKey": { "key": "1337774242482726" }, "relativeProbability": relativeProbability.THICCItemCase });
        itemDistribution.push({ "composedKey": { "key": "1337774604423825" }, "relativeProbability": relativeProbability.MoneyCase });
        itemDistribution.push({ "composedKey": { "key": "1337774012617384" }, "relativeProbability": relativeProbability.MrHolodilnick });
        itemDistribution.push({ "composedKey": { "key": "1337774559023584" }, "relativeProbability": relativeProbability.MedicineCase });
        itemDistribution.push({ "composedKey": { "key": "1337450601595759" }, "relativeProbability": relativeProbability.Junkbox });
        itemDistribution.push({ "composedKey": { "key": "1337774641590776" }, "relativeProbability": relativeProbability.GrenadeCase });
        itemDistribution.push({ "composedKey": { "key": "1337977215293479" }, "relativeProbability": relativeProbability.SecureGamma });
        itemDistribution.push({ "composedKey": { "key": "1337977290079844" }, "relativeProbability": relativeProbability.SecureBeta });
        itemDistribution.push({ "composedKey": { "key": "1337247084564564" }, "relativeProbability": relativeProbability.SecureAlpha });
        itemDistribution.push({ "composedKey": { "key": "1337774485952621" }, "relativeProbability": relativeProbability.SecureEpsilon });
        itemDistribution.push({ "composedKey": { "key": "1337774018671223" }, "relativeProbability": relativeProbability.SecureKappa });

        return itemDistribution;
    }

    private fixLocationProbabilities(spawnPoint: ISpawnpoint, locationName: string): void
    {
        const relativeProbability = this.modConfig.containersInMarkedRoom.relativeProbability;
        const locationToChange = this.modConfig.locations[locationName];
        
        for (const spawnPointKey in locationToChange)
        {
            const matchedSpawnpoint = spawnPoint.itemDistribution.find(x => x.composedKey.key === spawnPointKey);
            if (!matchedSpawnpoint)
            {
                console.log(`${spawnPointKey} not found`);
                continue;
            }

            const spawnPointType = locationToChange[spawnPointKey];
            const newProbability = relativeProbability[spawnPointType];
            matchedSpawnpoint.relativeProbability = newProbability;
        }
    }
    
}
