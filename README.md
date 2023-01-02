
# iBuilder

IBuilder is a decentralised platform for indie builders to pitch their products and launch their own crowdfund, with crowdfund contract.


## 👩‍💻 Authors

- Sampriti - [@sampriti026](https://www.github.com/sampriti026)


## 🔖 Features

- Builders can pitch their product to public
- Get reviews and upvotes from users in a decentralised way
- Demo video can be uploaded and streamed using Livepeer
- Builders can start crowdfunding program on their own
- Users can provide reviews and contribute to the project using crypto coins
- Presence of Sybil resistant identification and signup makes sure that the reviews are transparent and made by a real person
- Presence of On-chain credits boosts the builders' credibility overtime


## 🚧 Problem Statement and Approach

 - The project was inspired by lack of platform for people building in public, who needs funds and necessary belief capital to iterate on their product. Additionally, the pitch video or demo video helps in gaining more accurate insight about the product, thus providing useful feedbacks. 

 - The video is updated through Livepeer and reviews are issued as Krebit credential. These credentials help establish indie builders portable reputation to build trust as they launch products or enhance exisiting one, thus establishing a trusted crowdfund. 

 - Further, the app is Sybil resistant as only people with verified Twitter on Krebit are allowed to upvote on products. Upvotes on products help reach more visibility to the indie builders.

 - Crowdfund contract allows user to raise funds by setting a deadline and the goal they seek to achieve from the deadline. Ethers.js is used to fetch the amount raised so far, the amount the user seek to achieve and the deadline by which the crowdfund contract would accept fund raising.
## 🛠 Tech Stack and Integrations
- NextJS, Javascript, Solidity, Etherjs
- GitHub Passport, Lit Protocol, Livepeer, Krebit


## 🚀 Installation and Running

Clone the project

```bash
  git clone https://github.com/sampriti026/Orbis-Hackathon
```

Go to the project directory

```bash
  cd Orbis-Hackathon
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Licenses


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


