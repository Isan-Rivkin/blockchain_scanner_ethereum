export var test_data= {
    "nodes": [
    {"id": "1", "address" : "0x1","type" : "miner", "balance" : "12.2", "group": 1},
    {"id": "2", "address" : "0x2","type" : "miner", "balance" : "12.2", "group": 1},
    {"id": "3", "address" : "0x3","type" : "contract", "balance" : "12.2", "group": 2},
    {"id": "4", "address" : "0x4","type" : "account", "balanc:" : "12.2", "group": 3},
    {"id": "5", "address" : "0x5","type" : "miner", "balance" : "12.2", "group": 2},
    {"id": "6", "address" : "0x6","type" : "exchange", "balance" : "12.2", "group": 4},
    {"id": "7", "address" : "0x7","type" : "contract", "balance" : "12.2", "group": 2},
    {"id": "8", "address" : "0x8","type" : "account", "balance": "12.2", "group": 3},
    {"id": "9", "address" : "0x9","type" : "erc20", "balance" : "12.2", "group": 5},
    {"id": "10", "address" : "0x10","type" : "contract", "balance": "12.2", "group": 2},
    {"id": "11", "address" : "0x11","type" : "account", "balance" : "12.2", "group": 3},
    {"id": "12", "address" : "0x12","type" : "miner", "balance" : "12.2", "group": 1},
    {"id": "13", "address" : "0x13","type" : "erc20", "balance" : "12.2", "group": 5},
    {"id": "14", "address" : "0x14","type" : "contract", "balance" : "12.2", "group": 2},
    {"id": "15", "address" : "0x15","type" : "exchange", "balance" : "12.2", "group": 4}
],
    "edges": [
    {"source": "1", "target": "4", "value": 2},
    {"source": "1", "target": "3", "value": 1.5},
    {"source": "1", "target": "2", "value": 7},
    {"source": "2", "target": "5", "value": 0.4},
    {"source": "2", "target": "6", "value": 0.3},
    {"source": "2", "target": "7", "value": 22},
    {"source": "3", "target": "8", "value": 1.5},
    {"source": "4", "target": "9", "value": 5.7},
    {"source": "8", "target": "11", "value": 4.98},
    {"source": "8", "target": "12", "value": 1.55},
    {"source": "9", "target": "10", "value": 3.56},
    {"source": "10", "target": "13", "value": 25.7},
    {"source": "12", "target": "14", "value": 68.8},
    {"source": "12", "target": "15", "value": 95.2}
]
}
