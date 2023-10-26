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

  test('should mark the caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    expect(manager).toEqual(accounts[0]);
  });

  test('should allow people to contribute money and mark them as approvers', async () => {
    await campaign.methods
      .contribute()
      .send({ value: '200', from: accounts[1] });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();

    expect(isContributor).toBeTruthy();
  });

  test('should require a minimum contribution', async () => {
    await expect(
      campaign.methods.contribute().send({ value: '10', from: accounts[1] }),
    ).rejects.toBeDefined();
  });

  test('should allow a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy Batteries', '100', accounts[1])
      .send({ from: accounts[0], gas: '1000000' });

    const request = await campaign.methods.requests(0).call();

    expect(request.description).toBe('Buy Batteries');
  });

  test('should process requests', async () => {
    const fiveEther = web3.utils.toWei('5', 'ether');
    const tenEther = web3.utils.toWei('10', 'ether');

    await campaign.methods
      .contribute()
      .send({ from: accounts[0], value: tenEther });

    await campaign.methods
      .createRequest('Buy Batteries', fiveEther, accounts[2])
      .send({ from: accounts[0], gas: '1000000' });

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[0], gas: '1000000' });

    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: '1000000' });

    let balance = await web3.eth.getBalance(accounts[2]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);

    console.log(balance);

    expect(balance).toEqual(1005);
  });
});
