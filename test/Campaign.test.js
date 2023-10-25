const fs = require('fs');
const path = require('path');

const ganache = require('ganache');
const { Web3 } = require('web3');

const compiledCampaign = require('../ethereum/dist/Campaign.json');
const compiledFactory = require('../ethereum/dist/CampaignFactory.json');

// Set up a connection to the Ethereum network
const { provider } = ganache;
const web3 = new Web3(provider());

const contracts = ['Campaign.sol', 'CampaignFactory.sol'];

// Read the bytecode from the file system
const [campaignBytecode, factoryBytecode] = contracts.map(contract => {
  const filename = contract.replace('.sol', '.bin');
  const bytecodePath = path.join(__dirname, '..', 'ethereum', 'dist', filename);
  return fs.readFileSync(bytecodePath, 'utf8');
});

let accounts, factory, campaignAddress, campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory)
    .deploy({ data: '0x' + factoryBytecode })
    .send({ from: accounts[0], gas: '2000000' });

  await factory.methods
    .createCampaign('100')
    .send({ from: accounts[0], gas: '1000000' });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = new web3.eth.Contract(compiledCampaign, campaignAddress);
});

describe('Campaign', () => {
  test('should deploy a factory and a campaign contract', () => {
    expect(factory.options.address).toBeDefined();
    expect(campaign.options.address).toBeDefined();
  });
});
