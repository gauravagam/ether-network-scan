import { ethers,providers } from 'ethers';
import moment from 'moment'
import { INFURA_URL } from './config.js';
let provider = new providers.JsonRpcProvider(INFURA_URL)

window.onload = async function(){
    let blockNumber = await provider.getBlockNumber();
    for(let i=0;i<10;i++){
        const block =  await provider.getBlockWithTransactions(blockNumber-i);
        let tbody = $("#tbody");
        let tr = $("<tr></tr>").appendTo(tbody)
        const blockTime = moment(block.timestamp*1000);
        tr.append(`<td><a href='/block-details.html?blockNumber=${block.number}'>${block.number}</td>`);
        tr.append(`<td>${blockTime.fromNow()}</td>`);
        tr.append(`<td>${block.transactions.length}</td>`);
        tr.append(`<td>${block.miner}</td>`);
        tr.append(`<td>${Number(block.gasUsed).toLocaleString()}<span class='text-muted'>(${Number(Number(block.gasUsed)/Number(block.gasLimit)*100).toFixed(2)}%)</span></td>`);
        tr.append(`<td>${Number(block.gasLimit).toLocaleString()}</td>`);
        tr.append(`<td>${(+ethers.utils.formatUnits(block.baseFeePerGas,"gwei")).toFixed(0)} Gwei</td>`);
        tr.append(`<td>${ethers.utils.formatEther(Number(block.gasLimit)*Number(block.baseFeePerGas))}</td>`);
    }
};