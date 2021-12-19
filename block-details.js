console.log('hi');
import axios from 'axios';
import { BigNumber, ethers } from 'ethers';
import { INFURA_URL } from './config';
import moment from 'moment'
window.onload = async function () {
    let blockNumber = new URLSearchParams(window.location.search).get("blockNumber");
    $("caption").append(`<span class='text-dark'>Block</span>&nbsp;&nbsp;#${blockNumber}`);
    console.log('hash ', blockNumber, ethers.utils.hexValue(Number(blockNumber)))
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
        let tbody = $("#tbody");
        let tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Block Height:</th>");
        tr.append(`<td>${blockNumber}</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Timestamp</th>")
        const blockTime = moment(block.timestamp*1000);
        console.log('age ',blockTime.fromNow(),blockTime.utc().format("MMM-DD-YYYY LTS"));
        tr.append(`<td>${blockTime.fromNow()} (${blockTime.utc().format("MMM-DD-YYYY LTS")} +UTC)</td>`)
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Transactions: </th>");
        tr.append(`<td>${block.transactions.length}</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Mined by:</th>");
        tr.append(`<td>${block.miner}</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Difficulty:</th>");
        tr.append(`<td>${Number(block.difficulty).toLocaleString()}</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Total Difficulty:</th>");
        tr.append(`<td>${Number(block.totalDifficulty).toLocaleString()}</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Size:</th>");
        tr.append(`<td>${Number(block.size)} bytes</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Gas Used:</th>");
        tr.append(`<td>${Number(block.gasUsed).toLocaleString()} (${Number(Number(block.gasUsed)/Number(block.gasLimit)*100).toFixed(2)}%)</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Gas Limit:</th>");
        tr.append(`<td>${block.gasLimit}/<td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Base Fee Per Gas:</th>");
        tr.append(`<td>${Number(block.baseFeePerGas)} wei (${ethers.utils.formatUnits(BigNumber.from(block.baseFeePerGas),"gwei")} Gwei)</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Burned Fees:</th>");
        tr.append(`<td>${ethers.utils.formatEther(Number(block.baseFeePerGas)*Number(block.gasUsed))} Ether</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Extra Data:</th>");
        tr.append(`<td>${ethers.utils.toUtf8String(block.extraData)} (Hex: ${block.extraData})</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Hash:</th>");
        tr.append(`<td>${block.hash})</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Parent Hash:</th>");
        tr.append(`<td>${block.parentHash}</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>Shs3Uncles:</th>");
        tr.append(`<td>${block.sha3Uncles}</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>State Root:</th>");
        tr.append(`<td>${block.stateRoot}</td>`);
        tr = $("<tr></tr>").appendTo(tbody);
        tr.append("<th>State Root:</th>");
        tr.append(`<td>${block.nonce}</td>`);
    }
}