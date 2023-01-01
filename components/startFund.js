import { ethers } from "ethers";
import crowdfunding from "../contract/crowdfunding.json";
import bytecode  from "../contract/bytecode";

const startFund = async (targetAmount, deadline) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const factory = new ethers.ContractFactory(
        crowdfunding.abi,
        bytecode,
        signer
      );
      const contract = await factory.deploy(targetAmount, deadline);
      //await setContractAddress(auctionContract.address);
      await contract.deployed();
      await console.log("Contract Address:", contract.address);
      contractAddress = await contract.address;

      // await setContractAddress(contract);
      // await console.log(contractAddress);
      return{
        contractAddress
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
    return {
        error,
      };
    
  }
  
};

export default startFund;
