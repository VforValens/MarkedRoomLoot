export interface ModConfig
{
    containersInMarkedRoom: Containers;
}

export interface Containers
{
    RelativeProbability: RelativeProbability;
}

export interface RelativeProbability
{
    SICCpouch: number;
    MagazineCase: number;
    WeaponCase: number;
    THICCWeaponCase: number;
    ItemCase: number;
    THICCItemCase: number;
    MoneyCase: number;
    MrHolodilnick: number;
    MedicineCase: number;
    Junkbox: number;
    GrenadeCase: number;
    SecureGamma: number;
    SecureBeta: number;
    SecureAlpha: number;
    SecureEpsilon: number;
    SecureKappa: number;
}