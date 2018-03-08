module.exports = {
    DB:'ETH_SCANNER_DB',
    ENTITIES_COLLECTION : 'cached_entities_collection',
    ANALYTICS_COLLECTION : 'user_analytics_collection',
    CURATED_ARTICLES_COLLECTION : 'user_curated_articles',
    DB_CONNECTION_STRING : 'mongodb://localhost:27017',
    BEGINNER : 'beginner',
    MEDIUM: 'medium',
    EXPERT: 'expert',
    ENTITIES:{
        user : 'user',
        distributer :'distribuer',
        erc20 :"erc20" ,
        contract_non_erc : "contract_non_erc",
        miner : 'miner',
        exchange :'exchange'
    }
}
