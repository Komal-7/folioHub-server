const { getHtmlFromS3 } = require("../middlewares/s3");

const PortfolioService = {
    async getProjectHtml(sitename) {
        return await getHtmlFromS3(sitename);
    }
};

module.exports = PortfolioService;
