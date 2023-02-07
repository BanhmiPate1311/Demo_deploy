const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");

const upload = () => {
  return (req, res, next) => {
    const file = req.file;
    if (!file) {
      next(new AppError(400, "Please upload a file"));
    }
    // Có thể validate loại file và kích thước bằng file.mimetype và file.size
    file.path = file.path.replace(/\\/g, "/"); // Đối với window

    const url = `http://localhost:4000/${file.path}`;
    res.status(200).json(response(url));
  };
};

module.exports = {
  upload,
};
