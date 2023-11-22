# Crowd Coin

A groundbreaking platform leveraging web3 technology for seamless campaign management. Empower creators and backers alike in the world of decentralized fundraising. 🌐✨

**About this Repository**<br />
This project is part of the _[Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/)_ course from [Stephen Grider](https://www.udemy.com/user/sgslo/).<br />
It serves as a demonstrative project illustrating the process of developing a fullstack Web3 project using _Smart Contracts_ and [Next.js](https://nextjs.org/).

**Run the application**<br />
Make sure you have a `.env` and `.env.local` file with the following keys:<br />

```bash
  # .env
  ETHEREUM_NETWORK=<Ethereum testnet>
  INFURA_API_KEY=<Infura API key>
  SIGNER_PRIVATE_KEY=<You private (metamask) key>

  # .env.local, edit after contract deployment
  CAMPAIGN_FACTORY_CONTRACT=<deployed contract address>
```

Deploy the contract first: `npm run compile` & `npm run deploy`.<br />
Start the development server with with `npm run dev`.<br />
Open your browser at [http://localhost:3000](http://localhost:3000).<br />
