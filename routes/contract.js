const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));


const abi = require('../ethereum/build/contracts/VehicleAlert.json').abi;
const address = '0x14273e6800bee8870fc8372ab2048719f27b1e26';
const account = '0x4bb05efb6a9542cc07c00be969d135f172249232';

const vehicelAlert = new web3.eth.Contract(abi, address);

function addAlert(veh_id) {
	return vehicelAlert.methods.addAlert(veh_id).send({from: account});
}

function getHits(veh_id) {
	let count = 0;
	return vehicelAlert.methods.getHitsCount(veh_id).call({from: account}).then(result => {
		const p_hits = [];
		for (let i = 0; i < result; i++) {
			p_hits.push(vehicelAlert.methods.getHitAt(veh_id, i).call({from: account}));
		}
		return Promise.all(p_hits).then(results => {
			return results.map(r => ({lat: r['0']/1e6, lng: r['1']/1e6, ts: r['2']}));
		});
	});
}

function queryPlate(veh_id) {
	return vehicelAlert.methods.queryPlate(veh_id).call({from: account});
}

function reportHit(veh_id, lat, lng, ts) {
	return vehicelAlert.methods.reportHit(veh_id, Math.trunc(lat*1e6), Math.trunc(lng*1e6), ts).send({from: account, gas: 120000});
}
/*
	function getHitAt(string veh_id, uint idx) constant returns(uint, uint, uint) {
		Hit storage hit = reports[idToKey(veh_id)].hits[idx];
		return (hit.lat, hit.lng, hit.ts);
	}
*/
module.exports = {addAlert, getHits, queryPlate, reportHit};