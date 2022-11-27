import {Contract, ethers, utils} from 'ethers';
import fs from 'fs';
import xlsx from 'node-xlsx';


// 输入想生成钱包数量
const numWallet = 5;

const mnemonic = ethers.utils.entropyToMnemonic(utils.randomBytes(16));

const main = async () => {
    const hdwallet = ethers.utils.HDNode.fromMnemonic(mnemonic);
    console.log(hdwallet)

    
    // 派生路径：m / purpose' / coin_type' / account' / change / address_index
    // 我们只需要切换最后一位address_index，就可以从hdNode派生出新钱包
    let basePath = "m/44'/60'/0'/0";
    let datas = [];
    datas.push(["address", "privateKey", "mnemonic"]);
    for (let i=0;i<numWallet;i++){
        let hdNode = hdwallet.derivePath(basePath +'/'+ i);
        let walletNew = new ethers.Wallet(hdNode.privateKey);
        console.log(`第 ${i} 个钱包地址为: ${walletNew.address}`);
        datas.push([walletNew.address,walletNew.privateKey, mnemonic]);
    }

    let xlsxObj = [
      {
          name: 'sheet',
          data: datas,
      }
    ];
    fs.writeFileSync(`./${numWallet}_Account.xlsx`,xlsx.build(xlsxObj),"binary");


}
main();



