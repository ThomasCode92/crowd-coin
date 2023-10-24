const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contracts = ['Campaign.sol', 'CampaignFactory.sol'];

// Read the Solidity source code from the file system
const sourceCode = contracts.map(contract => {
  const contractPath = path.join(__dirname, '..', 'contracts', contract);
  return fs.readFileSync(contractPath, 'utf8');
});

// solc compiler config
const input = {
  language: 'Solidity',
  sources: Object.fromEntries(
    contracts.map((contract, idx) => [contract, { content: sourceCode[idx] }]),
  ),
  settings: { outputSelection: { '*': { '*': ['*'] } } },
};

// Compile the Solidity code using solc
const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));

// Write the bytecode and abi to a new file
contracts.forEach(contract => {
  const name = contract.replace('.sol', '');

  const bytecode = compiledCode.contracts[contract][name].evm.bytecode.object;
  const abi = compiledCode.contracts[contract][name].abi;

  const bytecodePath = path.join(__dirname, '..', 'dist', `${name}.bin`);
  const abiPath = path.join(__dirname, '..', 'dist', `${name}.json`);

  fs.writeFileSync(bytecodePath, bytecode);
  fs.writeFileSync(abiPath, JSON.stringify(abi, null, '\t'));
});
