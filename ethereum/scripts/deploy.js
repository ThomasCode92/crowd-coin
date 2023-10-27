const path = require('path');
const fs = require('fs');

const { Web3 } = require('web3');
const dotenv = require('dotenv');

const campaignFactoryAbi = require('../dist/CampaignFactory.json');

// Load Environment variables
dotenv.config();

// Read the bytecode from the file system
const bytecodePath = path.join(__dirname, '..', 'dist', 'CampaignFactory.bin');
const campaignFactoryBytecode = fs.readFileSync(bytecodePath, 'utf8');

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const networkRpcUrl = `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`;
  const web3 = new Web3(new Web3.providers.HttpProvider(networkRpcUrl));

  // Creating a signing account from a private key
  const privateKey = '0x' + process.env.SIGNER_PRIVATE_KEY;
  const signer = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(signer);

  // Using the signing account to deploy the contract
  const contract = new web3.eth.Contract(campaignFactoryAbi);
  const deployTx = contract.deploy({ data: campaignFactoryBytecode });

  const deployedContract = await deployTx
    .send({ from: signer.address, gas: await deployTx.estimateGas() })
    .once('transactionHash', txhash => {
      console.log(`Mining deployment transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });

  const { address } = deployedContract.options;

  // The contract is now deployed on chain!
  console.log(`Contract deployed at ${address}`);
  console.log(`
    Add CAMPAIGN_FACTORY_CONTRACT to the .env file
    to store the contract address: ${address}
  `);
}

main().catch(error => {
  console.log('Deployment failed');
  console.error(error);
});
