import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { IPmcData } from "@spt/models/eft/common/IPmcData";
import { IHideoutImprovement, IMoneyTransferLimits, IProductive, ITraderInfo } from "@spt/models/eft/common/tables/IBotBase";
import { ITraderData } from "@spt/models/eft/itemEvent/IItemEventRouterBase";
import { IItemEventRouterResponse } from "@spt/models/eft/itemEvent/IItemEventRouterResponse";
import { TimeUtil } from "@spt/utils/TimeUtil";
import type { ICloner } from "@spt/utils/cloners/ICloner";
export declare class EventOutputHolder {
    protected profileHelper: ProfileHelper;
    protected timeUtil: TimeUtil;
    protected cloner: ICloner;
    /**
     * What has client been informed of this game session
     * Key = sessionId, then second key is prod id
     */
    protected clientActiveSessionStorage: Record<string, Record<string, {
        clientInformed: boolean;
    }>>;
    protected outputStore: Record<string, IItemEventRouterResponse>;
    constructor(profileHelper: ProfileHelper, timeUtil: TimeUtil, cloner: ICloner);
    getOutput(sessionID: string): IItemEventRouterResponse;
    /**
     * Reset the response object to a default state
     * Occurs prior to event being handled by server
     * @param sessionID Players id
     */
    resetOutput(sessionID: string): void;
    /**
     * Update output object with most recent values from player profile
     * @param sessionId Session id
     */
    updateOutputProperties(sessionId: string): void;
    protected resetMoneyTransferLimit(limit: IMoneyTransferLimits): void;
    /**
     * Convert the internal trader data object into an object we can send to the client
     * @param traderData server data for traders
     * @returns dict of trader id + TraderData
     */
    protected constructTraderRelations(traderData: Record<string, ITraderInfo>): Record<string, ITraderData>;
    /**
     * Return all hideout Improvements from player profile, adjust completed Improvements' completed property to be true
     * @param pmcData Player profile
     * @returns dictionary of hideout improvements
     */
    protected getImprovementsFromProfileAndFlagComplete(pmcData: IPmcData): Record<string, IHideoutImprovement>;
    /**
     * Return productions from player profile except those completed crafts the client has already seen
     * @param pmcData Player profile
     * @returns dictionary of hideout productions
     */
    protected getProductionsFromProfileAndFlagComplete(productions: Record<string, IProductive>, sessionId: string): Record<string, IProductive> | undefined;
    /**
     * Required as continuous productions don't reset and stay at 100% completion but client thinks it hasn't started
     * @param productions Productions in a profile
     */
    protected cleanUpCompleteCraftsInProfile(productions: Record<string, IProductive>): void;
}
