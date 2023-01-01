import { ethers } from 'ethers';
import Krebit from '@krebitdao/reputation-passport';

export const getWalletInformation = async () => {
  if (!(window).ethereum) return;

  const addresses = await (window).ethereum.request({
    method: 'eth_requestAccounts'
  });
  const address = addresses[0];
  const provider = new ethers.providers.Web3Provider((window).ethereum);
  await Krebit.lib.ethereum.switchNetwork((window).ethereum);
  const wallet = provider.getSigner();

  return {
    ethProvider: provider.provider,
    address,
    wallet
  };
};
