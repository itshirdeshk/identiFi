import { ethers } from "ethers";
import identiFi from "./IdentiFi.json"

export const contract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;
    if (ethereum) {
        const signer = provider.getSigner();
        const contractReader = new ethers.Contract('0x0a2d068cB7a89a2354b1aDf5A863173465afaB47', identiFi.abi, signer);
        return contractReader;
    }
}