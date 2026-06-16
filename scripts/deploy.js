import pkg from 'hardhat';
const { ethers } = pkg;
import fs from "fs";

async function main() {
  console.log("🚀 Starting deployment...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");
  
  // Deploy contract
  console.log("\n📦 Deploying DecenAIX contract...");
  const DecenAIX = await ethers.getContractFactory("DecenAIX");
  const decenAIX = await DecenAIX.deploy();
  
  await decenAIX.waitForDeployment();
  
  const contractAddress = await decenAIX.getAddress();
  
  console.log("\n✅ DecenAIX deployed successfully!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("\n🔗 View on Sepolia Etherscan:");
  console.log(`https://sepolia.etherscan.io/address/${contractAddress}`);
  
  console.log("\n📋 SAVE THIS CONTRACT ADDRESS - YOU'LL NEED IT FOR FRONTEND!");
  console.log("\n⚠️  IMPORTANT: Copy the contract address above!");
  
  // Save to a file for easy reference
  const deploymentInfo = {
    network: "sepolia",
    contractAddress: contractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    etherscanUrl: `https://sepolia.etherscan.io/address/${contractAddress}`
  };
  
  fs.writeFileSync(
    'deployment-info.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\n💾 Deployment info saved to: deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
