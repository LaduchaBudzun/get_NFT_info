// import Web3 from "web3";
// const url = "https://eth-mainnet.g.alchemy.com/v2/oAvC-QZ0fDaNuIpu1revxEeoZJVyQA-m";
// const web3 = new Web3(url);
// const Address = '0x495f947276749Ce646f68AC8c248420045cb7b5e';


import fetch from 'node-fetch';
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
const apiKey = "uS2dkhvzXrWbj8IqHRY862geLlerqauw"
const contractAddr = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";

const rl = readline.createInterface({ input, output });

console.log('Hello, welcome to the nft screener, please enter an NFT Token id and press enter:')
rl.on('line', (input) => {
  getNFT(input)
  rl.close();
});


function getNFT(tokenId){
    const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTMetadata`;
  // const tokenId = "133";

  const fetchURL = `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}`;

  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then( async result => {
      const owner = await fetOwnerofNFT(result.id.tokenId)
      console.log(
`Name: ${result.title}  \n
Contract: ${result.contract.address} \n
Token: ${result.id.tokenId} \n
Standard: ${result.id.tokenMetadata.tokenType} \n
Raw Media: ${result.media[0].raw} \n
Blockchain: Ethereum \n
Owner Wallet: ${owner.owners[0]}
      `)
      
    }).catch(error => console.log('error', error));

}

async function fetOwnerofNFT(tokenId){
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getOwnersForToken`;
    const url = `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}`;

    const requestOptions = {
      method: 'get',
      redirect: 'follow'
    };

    const response = await fetch(url, requestOptions)
    const result = await response.json()
    return result
      
}
