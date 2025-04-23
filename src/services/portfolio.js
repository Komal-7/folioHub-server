const { getProjectHtml } = require("../middlewares/s3");

const PortfolioService = {
    async getHtmlFromS3(sitename) {
        return await getProjectHtml(sitename);
    }
};

module.exports = PortfolioService;
