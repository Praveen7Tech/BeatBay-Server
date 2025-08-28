// src/server.ts
import dotenv2 from "dotenv";

// src/framework/express/app.ts
import express, { urlencoded } from "express";
import cors from "cors";

// src/framework/database/models/OtpModel.ts
import mongoose from "mongoose";
var OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }
  // 5 min expiry
});
var OtpModel_default = mongoose.model("Otp", OtpSchema);

// src/framework/database/models/UserModel.ts
import mongoose2 from "mongoose";
var UserSchema = new mongoose2.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  }
});
var UserModel_default = mongoose2.model("UserModel", UserSchema);

// src/infrastructure/repositories/UserRepository.ts
var UserRepository = class {
  async findByEmail(email) {
    return UserModel_default.findOne({ email });
  }
  async saveOTP(email, otp) {
    await OtpModel_default.findOneAndUpdate(
      { email },
      { otp, createdAt: /* @__PURE__ */ new Date() },
      { upsert: true }
    );
  }
  async createUser(data) {
    const user = new UserModel_default(data);
    user.save();
  }
};

// src/infrastructure/service/EmailService.ts
import nodemailer from "nodemailer";
var EmailService = class {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.API_EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  async sendOTP(email, otp) {
    console.log("email service reach", email);
    await this.transporter.sendMail({
      from: process.env.API_EMAIL,
      to: email,
      subject: "Your OTP Verification code",
      text: `Your Otp code is : ${otp}`
    });
    console.log("email sent success");
  }
};

// src/interface-adapters/controllers/users/UserController.ts
var UserController = class {
  constructor(userUseCase2) {
    this.userUseCase = userUseCase2;
  }
  async signup(req, res) {
    try {
      const { email } = req.body;
      console.log("body", email);
      if (!email) {
        res.status(400).json({ success: false, message: "Email required" });
        return;
      }
      await this.userUseCase.signUp(email);
      res.status(200).json({ success: true, message: "OTP sent" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

// src/use-case/user/UserUseCase.ts
var UserUseCase = class {
  constructor(userRepo2, emailService2) {
    this.userRepo = userRepo2;
    this.emailService = emailService2;
  }
  async signUp(email) {
    const existUser = await this.userRepo.findByEmail(email);
    if (existUser) {
      throw new Error("User already exists");
    }
    const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
    await this.userRepo.saveOTP(email, otp);
    console.log("otp save");
    await this.emailService.sendOTP(email, otp);
    console.log("otp sent");
  }
};

// src/framework/routes/baseRoutes.ts
import { Router } from "express";
var BaseRoute = class {
  router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }
};

// src/framework/routes/user/userRoute.ts
var userRepo = new UserRepository();
var emailService = new EmailService();
var userUseCase = new UserUseCase(userRepo, emailService);
var userController = new UserController(userUseCase);
var UserRoutes = class extends BaseRoute {
  constructor() {
    super();
  }
  initializeRoutes() {
    this.router.post("/signup", (req, res) => {
      userController.signup(req, res);
    });
  }
};

// src/framework/express/app.ts
var app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173"
    //credentials: true,
  })
);
var userRoutes = new UserRoutes();
app.use("/user", userRoutes.router);
var app_default = app;

// src/framework/database/db.ts
import mongoose3 from "mongoose";
import dotenv from "dotenv";
dotenv.config();
var connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGO_URI is not defined in .env");
    await mongoose3.connect(mongoUri);
    console.log("\u2705 MongoDB Connected");
  } catch (error) {
    console.error("\u274C DB Connection Error:", error);
    process.exit(1);
  }
};
var db_default = connectDB;

// src/server.ts
dotenv2.config();
var PORT = process.env.PORT || 5e3;
db_default();
app_default.listen(PORT, () => {
  console.log(`\u{1F680} Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map