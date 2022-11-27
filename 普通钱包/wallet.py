import os
from eth_account import Account   #需要导入web3模块
import pandas as pd

if __name__ == '__main__':

   
    # 请输入想要生成的钱包数量
    n = 5

    addressList = []
    privateKeyList = []
    mnemonicList = []
    for i in range(n):
        Account.enable_unaudited_hdwallet_features()
        account, mnemonic = Account.create_with_mnemonic()
        # num = '第%d个钱包' % j
        addressList.append(account.address)
        privateKeyList.append(account.key.hex())
        mnemonicList.append(mnemonic)
        line =('%s,%s,%s,%d' % (account.address, account.key.hex(), mnemonic, i)) #mnemonic助记词
        print(line)
    

    df = pd.DataFrame({'Address': addressList, 'PrivateKey': privateKeyList, 'Mnemonic': mnemonicList})

    csvfile = f"./{n}_Account.xlsx"
    print(csvfile)
    
    df.to_excel(csvfile, index=False)
           