import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployERC6551: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const ERC4337EntryPoint = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
  
  const multiCallContract = await deploy("Multicall3", {
    from: deployer,
    // Contract constructor arguments
    // args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const registryContract = await deploy("ERC6551Registry", {
    from: deployer,
    // Contract constructor arguments
    // args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    deterministicDeployment: "0x0000000000000000000000000000000000000000fd8eb4e1dca713016c518e31",
    autoMine: true,
  });
  
  const guardianContract = await deploy("AccountGuardian", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const accountV3Contract = await deploy("AccountV3", {
    from: deployer,
    // Contract constructor arguments
    args: [
      ERC4337EntryPoint,
      multiCallContract.address,
      registryContract.address,
      guardianContract.address
    ],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });


  console.log("multiCallContract", multiCallContract.address);
  console.log("registryContract", registryContract.address);
  console.log("guardianContract", guardianContract.address);
  console.log("accountV3Contract", accountV3Contract.address);

};

export default deployERC6551;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployERC6551.tags = ["ERC6551Registry"];
