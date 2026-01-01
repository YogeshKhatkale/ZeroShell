import { updateUserId } from "./seeds/update-user-id";
import { seedUserOptions } from "./seeds/user-option.seed";
import { seedAdminUser } from "./seeds/create-admin.seed";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Starting database seeding...");
	
	try {
		// Create admin user first
		await seedAdminUser();
		
		// Then seed other data
		await seedUserOptions();
		await updateUserId();
		
		console.log("✅ Seeding completed successfully!");
	} catch (error) {
		console.error("❌ Seeding failed:", error);
		throw error;
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});