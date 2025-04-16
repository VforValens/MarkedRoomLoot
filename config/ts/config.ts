export interface ModConfig
{
    containersInMarkedRoom: Containers;
    
}

export interface Containers
{
    relativeProbability: RelativeProbability;
}

export interface RelativeProbability
{
    SICCpouch: number;
    BallisticPlateCase: number;
    StreamerItemCase: number;
    PistolCase: number;
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
    AmmoCase: number;
    DocsCase: number;
    DogtagsCase: number;
    InjectorCase: number;
    Keytool: number;
    KeycardHolder: number;
}
