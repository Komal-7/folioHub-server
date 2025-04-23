const PortfolioService = require("../services/portfolio");

const PortfolioController = {
    async getUserPortfolio(req,res) {
        const { sitename } = req.params;
        try {
            const html = await PortfolioService.getHtmlFromS3(sitename);
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        } catch (err) {
            console.error('Portfolio fetch error:', err);
            res.status(500).json({ message: 'Failed to fetch portfolio' });
        }
    }
};

module.exports = PortfolioController;
