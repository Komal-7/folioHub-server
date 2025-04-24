const express = require("express");
const multer = require('multer');
const UserController = require("../controllers/user");
const authenticateUser = require("../middlewares/authenticateUser");
const TemplateController = require("../controllers/template");
const ProjectController = require("../controllers/project");
const PortfolioController = require("../controllers/portfolio");
const AssetsController = require("../controllers/assets")

const upload = multer();
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/user", authenticateUser, UserController.getUser);
router.post("/logout", UserController.logout);

router.get("/templates", TemplateController.getTemplates);
router.get("/template/:id", TemplateController.getTemplateById);

router.post('/assets', authenticateUser, upload.array('files'), AssetsController.uploadAssets);
router.get('/assets', authenticateUser, AssetsController.loadAssets);
router.delete('/assets', authenticateUser, AssetsController.deleteAssets);

router.get('/projects', authenticateUser, ProjectController.getAllProjects)
router.post("/save-project", authenticateUser, ProjectController.saveProject);
router.post('/deploy', authenticateUser, ProjectController.deployProject);

router.get('/portfolio/:sitename', PortfolioController.getUserPortfolio);

module.exports = router;