class UploadController {
  constructor({ uploadService, handleError }) {
    this.uploadService = uploadService;
    this.handleError = handleError;
  }

  uploadFile = async (req, res) => {
    try {
      const upload = await this.uploadService.uploadFile(req.file);
      return res.status(201).json(upload);
    } catch (error) {
      this.handleError(res, error);
    }
  };
}

module.exports = UploadController;
