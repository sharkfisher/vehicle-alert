var Migrations = artifacts.require("./Migrations.sol");
var VehicleAlert = artifacts.require("./VehicleAlert.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(VehicleAlert);
};
