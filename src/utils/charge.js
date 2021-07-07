import Web3 from 'web3';
import abi from '@/assets/abi.json';

const emitCharge = (amount, targetAddress) => new Promise((resolve, reject) => {
  const web3 = new Web3(Web3.givenProvider);
  web3.eth.getAccounts().then((res) => {
    const userAddress = res[0];
    const USDT = new web3.eth.Contract(abi, process.env.VUE_APP_USDT_CONTRACT, {
      gasPrice: 5000000000, // 1gwei
      gasLimit: 100000,
    });
    USDT.methods
      .transfer(targetAddress, amount * 1000000)
      .send({
        from: userAddress,
      })
      .on('transactionHash', (result) => {
        if (result.indexOf('0x') > -1) {
          resolve(result);
        } else {
          // 安卓密码错误也会触发该回调
          reject(result);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
});

export default emitCharge;
