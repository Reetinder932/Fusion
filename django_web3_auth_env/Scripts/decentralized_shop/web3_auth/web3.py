from web3 import Web3

def get_web3():
    # Replace with your Ethereum node URL
    w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/your-project-id'))
    return w3