const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // Automatically deletes after 5 minutes
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully:", mailResponse.response);
	} catch (error) {
		console.error("Error occurred while sending email:", error);
		throw error; // Rethrow error for handling in pre-hook
	}
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	if (this.isNew) {
		try {
			await sendVerificationEmail(this.email, this.otp);
		} catch (error) {
			console.error("Error sending verification email:", error);
			return next(error); // Pass error to next middleware
		}
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;