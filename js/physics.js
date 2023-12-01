//Copyright 2013-2023 Gilgamech Technologies
//physics.js v1.0 
//Author: Stephen Gillie
//Created on: 12/1/2023
//Last updated: 12/1/2023
//Notes:
//Version history:
//1.0 - Let's get this party started.


function returnLorentzFactor(Velocity) {
	return 1 / Math.sqrt( (1- (Math.pow(Velocity,2) / c_Squared)));
}

function returnLorentzMultiple(Velocity) {
	return (Velocity * (returnLorentzFactor(Velocity)));
}

function returnRMomentum(Mass,Velocity) {
	return 1 / Math.sqrt(1+ (Math.pow(Velocity,2)/(Math.pow(Mass,2) * c_Squared)));
}

function returnTimeDilation(timeObserver,Velocity) {
	return (returnLorentzFactor(Velocity)) * timeObserver;
}

function returnLengthContraction(Length,Velocity) {
	return Length/(returnLorentzFactor(Velocity));
}

function returnRMass(restMass,Velocity) {
	return (returnLorentzFactor(Velocity))* restMass;
}

function returnRMomentum(restMass,Velocity) {
	return (returnLorentzFactor(Velocity)) * restMass * Velocity;
}

function returnRKE(restMass,Velocity) {
	return ((returnLorentzFactor(Velocity)) -1) * restMass * c_Squared;
}

function returnEscapeVelocity(restMass = EarthMass,Radius = EarthRadius) {
//Escape velocity is the minimum speed a ballistic object needs to escape from a massive body such as Earth. It represents the kinetic energy that, when added to the object's gravitational potential energy, (which is always negative) is equal to zero. The general formula for the escape velocity of an object at a distance r from the center of a planet with mass M is
	return returnLorentzMultiple (Math.sqrt( (2 * GravitationalConstant * restMass) / Radius))
}

function returnUnits(FirstUnit,SecondUnit) {
	var out = FirstUnit;
	if(out.Contains(SecondUnit)) {
		out = out.Replace("SecondUnit^-1","");
		out = out.Replace(" "," ");
	}
	return out;
}

function returnGasMoleculeMetersPerSecond(Kelvins,restMassKG,units="JK") {
	//in meters/sec
	var Velocity = {};
	var useUnits = BoltzmannConstantJK;
	switch (units) {
		case "JK":
		useUnits = BoltzmannConstantJK;
		break;
		case "EVK":
		useUnits = BoltzmannConstantEVK;
		break;
		case "Ideal":
		useUnits = IdealGasConstant;
		break;
		default:
		return "error"
		break;
	}
	Velocity.Avg = (returnLorentzMultiple (Math.sqrt(3 * useUnits * Kelvins / restMassKG )));
	Velocity.Min = Velocity.Avg * .20; 
	Velocity.Max = Velocity.Avg * 2;
	return Velocity;
}

function returnGasMoleculeKelvins(metersPerSecond,restMassKG) {
	return restMassKG * Math.pow(metersPerSecond,2) /  IdealGasConstant/ 3;
}

function returnEVMetersPerSecond(EV,restMassKG) {
	return EV*eVperJoules/restMassKG
}

function returnComptonWavelength(mass) {
	return Math.sqrt(PlanckConstant/(mass*c_Light));
}

function returnComptonFrequency(mass) {
	return Math.sqrt((mass*c_Squared/PlanckConstant));
}

function returnEntropy(states) {
	return BoltzmannConstant*Math.log(states);
}

//Constants

//ConstantValues
//Conversion
const eVperJoules = 1.609E-19; //ENERGY
const eVc = 5.36E-28; //MOMENTUM
const eVc2 = 1.79E-36; //MASS
const eVperKG = 5.6095883571872E35; //MASS
const amuToKG = 1.660540199E-27; //Atomic Mass Unit

//Massive bodies
var EarthMass = 5.97237E24;
var EarthRadius = 6.378137E6;
var SunMass = 1.99E30;
var SunRadius = 7E8;
var SunSurfaceTemp = 5800;

var WattsPerHorsepower = 745.7;

//Axioms
const e = Math.e;
const pi = Math.PI;
const cs133HTF = 9192631770; //caesium-133 Hyperfine Transition Frequency
const AvogadroConstant = 6.02214129E23;
const BoltzmannConstant = 1.3806488E-23;
const elementaryCharge = 1.602176565E-19;
const PlanckConstant = 6.62607015E-34;
const GravitationalConstant = 6.67430E-11;
const c_Light = 299792458;

const electricConstant = 8.854187817E-12;
const FaradayConstant = 96485.3365;
const FermiCouplingConstant = 1.166364E-5;
const FineStructureConstant = 7.2973525698E-3;
const FirstRadiationConstant = 3.74177153E-16;
const IdealGasConstant = 8.314;
const RydbergConstant = 10973731.568;

const BohrMagneton = 927.400968E-26;
const BohrRadius = 0.52917721092E-10;
const HydrogenMass = 1.67E-24;
const classicalElectronRadius = 2.8179403267E-15;
const electronGfactor = -2.00231930436153;
const electronMass = 9.10938291E-31;
const electronCharge = 1.602176634E-19;
const MuonComptonWavelength = 11.73444103E-15;
const neutronGfactor = -3.82608545;
const neutronMassKG = 1.674927351E-27;
const nuclearMagneton = 5.05078353E-27;
const protonChargetoMassQuotient = 9.57883358E7;
const protonComptonWavelength = 1.32140985623E-15;
const protonGfactor = 5.585694713;
const protonElectronMassRatio = 1836.15267245;
const solarPhotonsPerSecond = 1.00E+45;

const PlanckMassEnergy = 1.220932E19;

//DerivedValues
const c_Squared = Math.pow(c_Light,2);
const MagneticConstant = 1/(electricConstant*c_Squared);
const InverseFineStructureConstant = 1/FineStructureConstant;

//Conversion
const KGperJoule = 1/c_Squared;
const JoulesPerEV = 1/eVperJoules;
const KGpereV = JoulesPerEV/KGperJoule;

const protonMass = electronMass*protonElectronMassRatio;

const PlanckReduced = PlanckConstant/(2*pi);
const PlanckLength = Math.sqrt(PlanckReduced*GravitationalConstant/Math.pow(c_Light,3));
const PlanckMass = Math.sqrt((PlanckReduced*c_Light)/GravitationalConstant);
const PlanckTemperature = Math.sqrt((PlanckReduced*Math.pow(c_Light,5))/(GravitationalConstant*Math.pow(BoltzmannConstant,2)));
const PlanckTime = Math.sqrt(PlanckReduced*GravitationalConstant/Math.pow(c_Light,5));
const PlanckForce = Math.pow(c_Light,4)/GravitationalConstant;

const BoltzmannConstantEVK = BoltzmannConstant/eVperJoules;
const CharacteristicImpedanceofVacuum = Math.sqrt(MagneticConstant/electricConstant);


//Units
const eVperJoulesunits = "J";
const eVcUnits ="kg-m/s";
const eVc2Units = "kg";

const AvogadroConstantUnits = "mol^-1";
const BohrMagnetonUnits = "J T^-1";
const BohrRadiusUnits = "m";
const BoltzmannConstantUnits = "g cm2 sec-2 deg-1";
const cUnits = "m s^-1";
const CharacteristicEmpedanceofVacuumUnits = "ohm";
const classicalElectronRadiusUnits = "m";
const ComptonWavelengthUnits = "m";
const EarthMassUnits = "g";
const EarthRadiusUnits = "m";
const SunMassUnits = "g";
const SunRadiusUnits = "m";
const SunSurfaceTempUnits = "K";
const HydrogenMassUnits = "g";
const electricConstantUnits = "F m^-1";
const electronGfactorUnits = "{dimensionless}";
const electronMassUnits = "kg";
const electronChargeUnits = "C";
const elementaryChargeUnits = "C";
const FaradayConstantUnits = "C mol^-1";
const FermiCouplingConstantUnits = "GeV^-2";
const FineStructureConstantUnits = "{dimensionless}";
const FirstRadiationConstantUnits = "W m^2";
const GravitationalConstantUnits = "m^3 kg^-1 s^-2";
const IdealGasConstantUnits = "kg*m2/s2*mol*K";
const InverseFineStructureConstantUnits = "{dimensionless}";
const MagneticConstantUnits = "N A^-2";
const MuonComptonWavelengthUnits = "m";
const neutronGfactorUnits = "{dimensionless}";
const neutronMassUnits = "kg";
const nuclearMagnetonUnits = "J T^-1";
const PlanckConstantUnits = "J s";
const PlanckForceUnits = "N";
const PlanckLengthUnits = "m";
const PlanckMassEnergyUnits = "GeV";
const PlanckMassUnits = "kg";
const PlanckTemperatureUnits = "K";
const PlanckTimeUnits = "s";
const protonChargetoMassQuotientUnits = "C kg^-1";
const protonComptonWavelengthUnits = "m";
const protonGfactorUnits = "{dimensionless}";
const protonElectronEassRatioUnits = "{dimensionless}";
const RydbergConstantUnits = "m^-1";


