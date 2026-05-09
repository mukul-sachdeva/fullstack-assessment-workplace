const { SnippingDetail, FrontDetail } = require('../models');

module.exports = {

    front(req, res) {

        FrontDetail.findAll({})
            .then(transactions => res.status(201).json({
                error: false,
                data: transactions
            }))
            .catch(error => res.json({
                error: true,
                message: error
            }));
    },

    snipping(req, res) {

        SnippingDetail.findAll({})
            .then(transactions => res.status(201).json({
                error: false,
                data: transactions
            }))
            .catch(error => res.json({
                error: true,
                message: error
            }));

    },

    getNFTStats: async (req, res) => {
        try {
            // MOCK LOGIC (can be replaced with DB later)
            const totalNFTs = 128;
            const walletConnected = true;

            return res.status(200).json({
                totalNFTs,
                walletConnected
            });
        } catch (error) {
            console.error('Error fetching NFT stats:', error);

            return res.status(500).json({
                error: true,
                message: 'Internal server error'
            });
        }
    }

}