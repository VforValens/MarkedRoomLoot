import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ILogger } from "@spt/models/spt/utils/ILogger";

import { Loot } from "./loot";

class MarkedRoomLoot implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void
    {
        // Get database from server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // Get config from server
        const configServer = container.resolve<ConfigServer>("ConfigServer");

        // Get location config from server
        const locationConfig = configServer.getConfig<ILocationConfig>(ConfigTypes.LOCATION);

        // Get the logger
        const logger = container.resolve<ILogger>("WinstonLogger");

        const loot = new Loot(logger, databaseServer, locationConfig);
        loot.updateLoot();
    }
}

export const mod = new MarkedRoomLoot();
