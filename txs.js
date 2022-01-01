import axios from 'axios';
import { ethers } from 'ethers';
import { INFURA_URL } from './config';

window.onload = async function(){
    let blockNumber = new URLSearchParams(window.location.search).get("blockNumber");
    $("#block-no").attr("href",`/block-details.html?blockNumber=${blockNumber}`);
    $("#block-no").html(blockNumber);
    let hexBlockNumber = ethers.utils.hexValue(Number(blockNumber));
    const response = await axios.post(INFURA_URL, {
        "jsonrpc": "2.0",
        "method": "eth_getBlockByNumber",
        "params": [hexBlockNumber, true],
        "id": 0
    });
    if (response.data.error) {
        console.log(JSON.stringify(response.data.error));
    } else {
        const block = response.data.result;
        for(let i=0;i<block.transactions.length;i++){
            let transaction = block.transactions[i];
            let tbody = $("#tbody");
            let tr = $("<tr></tr>").appendTo(tbody);
            tr.append(`<td>${transaction.hash.substr(0,15)}...</td>`);
            tr.append(`<td><a href='/block-details.html?blockNumber=${Number(transaction.blockNumber)}'>${Number(transaction.blockNumber)}</td>`);
            tr.append(`<td>${transaction.from ? `${transaction.from.substr(0,15)}...`:''}</td>`);
            tr.append(`<td>${transaction.to ? `${transaction.to.substr(0,15)}...`:'contract'}</td>`);
            tr.append(`<td>${ethers.utils.formatEther(transaction.value)} Ether</td>`);
        }
    }
}