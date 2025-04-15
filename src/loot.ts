import { ItemDistribution, ISpawnpoint } from "@spt/models/eft/common/ILooseLoot";
import { IItem } from "@spt/models/eft/common/tables/IItem";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ILogger } from "@spt/models/spt/utils/ILogger";

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
        
        this.containersInMarkedRoom();
        this.logger.info("Marked Room Loot has been updated.");
    }

    /**
     * Changes the loot database/tables to include containers in marked rooms.
     * 
     * @variable containersInMarkedRoom Enables common containers (items case, weapon case, etc.) in Marked Rooms.
     */
    private containersInMarkedRoom(): void
    {
        // Customs Marked Room Loot.
        let spawnPoints = this.tables.getTables().locations.bigmap.looseLoot.spawnpoints;
        let customsMarked1: ISpawnpoint = null;
        let customsMarked8: ISpawnpoint = null;
        let customsMarked9: ISpawnpoint = null;
        let customsMarked10: ISpawnpoint = null;
        let customsMarked11: ISpawnpoint = null;
        let customsMarked12: ISpawnpoint = null;

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
        for (const spawnPoint of spawnPoints)
        {
            if (spawnPoint.template.Id.startsWith("Loot 135 (1)"))
            {
                customsMarked1 = spawnPoint;
                customsMarked1.template.Items.push(...this.itemId());
                customsMarked1.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (8)"))
            {
                customsMarked8 = spawnPoint;
                customsMarked8.template.Items.push(...this.itemId());
                customsMarked8.itemDistribution.push(...this.itemDistribution());
                this.fixCustomsProbability(spawnPoint);
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (9)"))
            {
                customsMarked9 = spawnPoint;
                customsMarked9.template.Items.push(...this.itemId());
                customsMarked9.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 10)"))
            {
                customsMarked10 = spawnPoint;
                customsMarked10.template.Items.push(...this.itemId());
                customsMarked10.itemDistribution.push(...this.itemDistribution());
                this.fixCustomsProbability(spawnPoint);
                continue;
            } 
            
            if (spawnPoint.template.Id.startsWith("Loot 135 11)"))
            {
                customsMarked11 = spawnPoint;
                customsMarked11.template.Items.push(...this.itemId());
                customsMarked11.itemDistribution.push(...this.itemDistribution());
                this.fixCustomsProbability(spawnPoint);
                continue;
            } 
            
            if (spawnPoint.template.Id.startsWith("Loot 135 12)"))
            {
                customsMarked12 = spawnPoint;
                customsMarked12.template.Items.push(...this.itemId());
                customsMarked12.itemDistribution.push(...this.itemDistribution());
                this.fixCustomsProbability(spawnPoint);
                continue;
            }
        }    
        
                
        // Reserve Marked Room Loot.
        spawnPoints = this.tables.getTables().locations.rezervbase.looseLoot.spawnpoints;
        let reserveMarked1: ISpawnpoint = null;
        let reserveMarked2: ISpawnpoint = null;
        let reserveMarked3: ISpawnpoint = null;
        let reserveMarked4: ISpawnpoint = null;
        let reserveMarked5: ISpawnpoint = null;
        let reserveMarked6: ISpawnpoint = null;
        let reserveMarked7: ISpawnpoint = null;
        let reserveMarked8: ISpawnpoint = null;
        let reserveMarked9: ISpawnpoint = null;
        let reserveMarked10: ISpawnpoint = null;
        let reserveMarked11: ISpawnpoint = null;
        let reserveMarked12: ISpawnpoint = null;

        //* Reserve Marked Room Loot.
        // Loot 135 (10)51646628 is 
        // Loot 135 (8) is 
        // Loot 135 (9) is 
        // Cult Loot 135 (11) is
        // Cult Loot 135 (12) is
        // Loot 135 (10)51658080 is
        // Loot 135 (11) is
        // Loot 135 (12) is
        // Loot 135 (1) is
        // Loot 135 (2)51646104 is
        // Loot 135 (2)51648120 is
        // Loot 135 (3) is 
        // */
        
        // For loop through the Spawnpoints
        for (const spawnPoint of spawnPoints)
        {
            if (spawnPoint.template.Id.startsWith("Loot 135 (10)51646628"))
            {
                reserveMarked1 = spawnPoint;
                reserveMarked1.template.Items.push(...this.itemId());
                reserveMarked1.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (8)"))
            {
                reserveMarked2 = spawnPoint;
                reserveMarked2.template.Items.push(...this.itemId());
                reserveMarked2.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (9)"))
            {
                reserveMarked3 = spawnPoint;
                reserveMarked3.template.Items.push(...this.itemId());
                reserveMarked3.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("cult_Loot 135 (11)"))
            {
                reserveMarked4 = spawnPoint;
                reserveMarked4.template.Items.push(...this.itemId());
                reserveMarked4.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("cult_Loot 135 (12)"))
            {
                reserveMarked5 = spawnPoint;
                reserveMarked5.template.Items.push(...this.itemId());
                reserveMarked5.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (10)51658080"))
            {
                reserveMarked6 = spawnPoint;
                reserveMarked6.template.Items.push(...this.itemId());
                reserveMarked6.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (11)"))
            {
                reserveMarked7 = spawnPoint;
                reserveMarked7.template.Items.push(...this.itemId());
                reserveMarked7.itemDistribution.push(...this.itemDistribution());        
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (12)"))
            {
                reserveMarked8 = spawnPoint;
                reserveMarked8.template.Items.push(...this.itemId());
                reserveMarked8.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (1)"))
            {
                reserveMarked9 = spawnPoint;
                reserveMarked9.template.Items.push(...this.itemId());
                reserveMarked9.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (2)51646104"))
            {
                reserveMarked10 = spawnPoint;
                reserveMarked10.template.Items.push(...this.itemId());
                reserveMarked10.itemDistribution.push(...this.itemDistribution());        
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (2)51648120"))
            {
                reserveMarked11 = spawnPoint;
                reserveMarked11.template.Items.push(...this.itemId());
                reserveMarked11.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135 (3)"))
            {
                reserveMarked12 = spawnPoint;
                reserveMarked12.template.Items.push(...this.itemId());
                reserveMarked12.itemDistribution.push(...this.itemDistribution());        
                continue;
            }

        }
        

        // Streets Marked Room Loot.
        spawnPoints = this.tables.getTables().locations.tarkovstreets.looseLoot.spawnpoints;
        let streets: ISpawnpoint = null;
        let streets1: ISpawnpoint = null;
        let streets2: ISpawnpoint = null;
        let streets3: ISpawnpoint = null;
        let streets4: ISpawnpoint = null;
        let streets5: ISpawnpoint = null;
        let streets6: ISpawnpoint = null;
        let streets7: ISpawnpoint = null;
        let streets8: ISpawnpoint = null;
        let streets9: ISpawnpoint = null;
        let streets10: ISpawnpoint = null;
        let streets11: ISpawnpoint = null;
        let streets12: ISpawnpoint = null;
        let streets13: ISpawnpoint = null;
        let streets14: ISpawnpoint = null;
        let streets15: ISpawnpoint = null;

        //* Streets Marked Room Loot.
        // Loot 135_Leo_Rare2741538 is 
        // Loot 135_Leo_Rare (1) is 
        // Loot 135_Leo_Rare (2) is
        // Loot 135_Leo_Rare (3) is
        // Loot 135_Leo_Rare (4) is
        // Loot 135_Leo_Rare (5) is
        // Loot 135_Leo_Rare (6) is
        // Loot 135_Leo_Rare (7) is
        // Loot 135_Leo_Rare (8) is
        // Loot 135_Leo_Rare (9) is
        // Loot 135_Leo_Rare (10) is
        // Loot 135_Leo_Rare (11) is
        // Loot 135_Leo_Rare (12) is
        // Loot 135_Leo_Rare (13) is
        // Loot 135_Leo_Rare (14) is
        // Loot 135_Leo_Rare (15) is 
        // */


        // For loop through the Spawnpoints
        for (const spawnPoint of spawnPoints)
        {
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare2741538"))
            {
                streets = spawnPoint;
                streets.template.Items.push(...this.itemId());
                streets.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (1)"))
            {
                streets1 = spawnPoint;
                streets1.template.Items.push(...this.itemId());
                streets1.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (2)"))
            {
                streets2 = spawnPoint;
                streets2.template.Items.push(...this.itemId());
                streets2.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (3)"))
            {
                streets3 = spawnPoint;
                streets3.template.Items.push(...this.itemId());
                streets3.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (4)"))
            {
                streets4 = spawnPoint;
                streets4.template.Items.push(...this.itemId());
                streets4.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (5)"))
            {
                streets5 = spawnPoint;
                streets5.template.Items.push(...this.itemId());
                streets5.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (6)"))
            {
                streets6 = spawnPoint;
                streets6.template.Items.push(...this.itemId());
                streets6.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (7)"))
            {
                streets7 = spawnPoint;
                streets7.template.Items.push(...this.itemId());
                streets7.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (8)"))
            {
                streets8 = spawnPoint;
                streets8.template.Items.push(...this.itemId());
                streets8.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (9)"))
            {
                streets9 = spawnPoint;
                streets9.template.Items.push(...this.itemId());
                streets9.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (10)"))
            {
                streets10 = spawnPoint;
                streets10.template.Items.push(...this.itemId());
                streets10.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (11)"))
            {
                streets11 = spawnPoint;                
                streets11.template.Items.push(...this.itemId());
                streets11.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (12)"))
            {
                streets12 = spawnPoint;
                streets12.template.Items.push(...this.itemId());
                streets12.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (13)"))
            {
                streets13 = spawnPoint;
                streets13.template.Items.push(...this.itemId());
                streets13.itemDistribution.push(...this.itemDistribution());
                continue;
            }

            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (14)"))
            {
                streets14 = spawnPoint;
                streets14.template.Items.push(...this.itemId());
                streets14.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (15)"))
            {
                streets15 = spawnPoint;
                streets15.template.Items.push(...this.itemId());
                streets15.itemDistribution.push(...this.itemDistribution());
                continue;
            }
        }      
    }

    
    private itemId(): IItem[]
    {
        const itemId: IItem[] = [];
        itemId.push({ "_id": "1337774434331278", "_tpl": "5d235bb686f77443f4331278" });
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

    
    private itemDistribution(): ItemDistribution[]
    {
        const relativeProbability = this.modConfig.containersInMarkedRoom.RelativeProbability;
        const itemDistribution: ItemDistribution[] = [];
        itemDistribution.push({ "composedKey": { "key": "1337774434331278" }, "relativeProbability": relativeProbability.SICCpouch });
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

    private fixCustomsProbability(spawnPoint: ISpawnpoint): void
    {
        const relativeProbability = this.modConfig.containersInMarkedRoom.RelativeProbability;

        spawnPoint.itemDistribution.find(x => x.composedKey.key === "412439036").relativeProbability = relativeProbability.AmmoCase;
        spawnPoint.itemDistribution.find(x => x.composedKey.key === "124471609").relativeProbability = relativeProbability.DocsCase;
        spawnPoint.itemDistribution.find(x => x.composedKey.key === "1036505762").relativeProbability = relativeProbability.DogtagsCase;
        spawnPoint.itemDistribution.find(x => x.composedKey.key === "344660402").relativeProbability = relativeProbability.InjectorCase;
        spawnPoint.itemDistribution.find(x => x.composedKey.key === "1714132912").relativeProbability = relativeProbability.Keytool;
        spawnPoint.itemDistribution.find(x => x.composedKey.key === "1251084789").relativeProbability = relativeProbability.KeycardHolder;
    }
    
}
