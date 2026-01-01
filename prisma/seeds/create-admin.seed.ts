import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedAdminUser() {
	// Check if admin already exists
	const existingAdmin = await prisma.user.findFirst({
		where: {
			email: "admin@zeroshell.local",
		},
	});

	if (existingAdmin) {
		console.log("⚠️  Admin user already exists, skipping...");
		return;
	}

	// Create admin user
	const adminPassword = "admin123"; // Change this!
	const hashedPassword = bcrypt.hashSync(adminPassword, 10);

	const admin = await prisma.user.create({
		data: {
			name: "Admin",
			email: "admin@zeroshell.local",
			hash: hashedPassword,
			role: "ADMIN",
			emailVerified: new Date(),
			lastLogin: new Date().toISOString(),
			options: {
				create: {
					localControllerUrl: process.platform === 'win32'
						? "http://localhost:9993"
						: "http://127.0.0.1:9993",
				},
			},
		},
	});

	console.log("✅ Admin user created successfully!");
	console.log("📧 Email: admin@zeroshell.local");
	console.log("🔑 Password: admin123");
	console.log("⚠️  IMPORTANT: Change this password after first login!");

	return admin;
}