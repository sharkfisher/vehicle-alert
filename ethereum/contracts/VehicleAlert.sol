pragma solidity ^0.4.4;

contract VehicleAlert {
	mapping (address => uint) balances;
	struct Hit {
		int lat;
		int lng;
		uint ts;
	}
	struct Reports {
		uint numHits;
		mapping (uint => Hit) hits; 
	}
	mapping (bytes32 => bool) alerts;
	mapping (bytes32 => Reports) reports;

//	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function addAlert(string veh_id) {
		alerts[idToKey(veh_id)] = true;
	}

	function getHitsCount(string veh_id) constant returns(uint) {
		return reports[idToKey(veh_id)].numHits;
	}

	function getHitAt(string veh_id, uint idx) constant returns(int, int, uint) {
		Hit storage hit = reports[idToKey(veh_id)].hits[idx];
		return (hit.lat, hit.lng, hit.ts);
	}

	function queryPlate(string veh_id) constant returns(bool) {
		return alerts[idToKey(veh_id)];
	}

	function reportHit(string veh_id, int lat, int lng, uint ts) {
		bytes32 key = idToKey(veh_id);
		if (reports[key].numHits == 0) {
			reports[key] = Reports(0);
		}
		Reports storage rpt = reports[key];
		rpt.hits[rpt.numHits++] = Hit(lat, lng, ts);
	}

	function idToKey(string veh_id) constant returns(bytes32) {
		return keccak256(veh_id);
	}
}
