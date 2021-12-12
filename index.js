import { ethers, providers } from 'ethers';
import moment from 'moment'
let provider = new providers.JsonRpcProvider("https://ropsten.infura.io/v3/dd35b701f8bf4e6cbdfc5deb1a38fb1d")
// console.log('provider ',provider);
window.onload = async function(){
    let blockNumber = await provider.getBlockNumber();
    console.log('blockNumber ',blockNumber)
    for(let i=0;i<10;i++){
        const block =  await provider.getBlockWithTransactions(blockNumber-i);
        // console.log(JSON.stringify(block))
        let tbody = $("#tbody");
        let tr = $("<tr></tr>").appendTo(tbody)
        const blockTime = moment(block.timestamp*1000);
        const currentTime = moment();
        const diff = currentTime.diff(blockTime);
        const age = diff<60000?`${currentTime.diff(blockTime,'seconds')} secs ago`:`${currentTime.diff(blockTime,'minutes')} mins ago`;
        tr.append(`<td><a href='/block-details.html'>${block.number}</td>`);
        tr.append(`<td>${age}</td>`);
        tr.append(`<td>${block.transactions.length}</td>`);
        tr.append(`<td>${block.miner}</td>`);
        tr.append(`<td>${Number(block.gasUsed).toLocaleString()}<span class='text-muted'>(${Number(Number(block.gasUsed)/Number(block.gasLimit)*100).toFixed(2)}%)</span></td>`);
        tr.append(`<td>${Number(block.gasLimit).toLocaleString()}</td>`);
        tr.append(`<td>${(+ethers.utils.formatUnits(block.baseFeePerGas,"gwei")).toFixed(0)} Gwei</td>`);
        tr.append(`<td>${ethers.utils.formatEther(Number(block.gasLimit)*Number(block.baseFeePerGas))}</td>`);
    }
};