import { email } from "@web3-storage/w3up-client/types";
import { contract } from "./index";

function parseErrorMsg(e) {
    const json = JSON.parse(JSON.stringify(e));
    return json?.reason || json?.error?.message;
}

// Get username by address
export async function getUsernameByAddress(userAddress) {
    try {
        const contractObj = await contract();
        const username = await contractObj.getUsernameByAddress(userAddress);
        return username;
    } catch (error) {
        console.log(error);
        parseErrorMsg(error);
    }
}

// Create User
export async function createUser(username, basicInfo, professionalInfo, socialLinks, visibility) {
    try {
        // Validate parameters
        if (!username || typeof username !== 'string') {
            throw new Error('Invalid username');
        }

        const contractObj = await contract();

        const tx = await contractObj.createUser(username, basicInfo, professionalInfo, socialLinks, visibility);

        try {
            const receipt = await tx.wait();
            return receipt;
        } catch (txError) {
            console.error('Transaction failed:', txError);
            throw new Error('Transaction failed, please try again later.');
        }
    } catch (error) {
        console.error('Error creating user:', error);
        parseErrorMsg(error);
        throw new Error('Failed to create user');
    }
}


// Edit User
export async function editUser(username, basicInfo, professionalInfo, socialLinks, visibility) {
    try {
        const contractObj = await contract();
        const tx = await contractObj.editUser(username, basicInfo, professionalInfo, socialLinks, visibility);
        const reciept = await tx.wait();
        return reciept;
    } catch (error) {
        console.log(error);
        parseErrorMsg(error);
    }
}

// Get user by username
export async function getUserByUsername(username) {
    try {
        const contractObj = await contract();
        const user = await contractObj.getUserByUsername(username);
        return {
            basicInfo: {
                firstName: user.basicInfo.firstName,
                lastName: user.basicInfo.lastName,
                email: user.basicInfo.email,
                homeAddress: user.basicInfo.homeAddress,
                dateOfBirth: user.basicInfo.dateOfBirth,
                phoneNumber: user.basicInfo.phoneNumber,
            },
            professionalInfo: {
                education: user.professionalInfo.education,
                workHistory: user.professionalInfo.workHistory,
                jobTitle: user.professionalInfo.jobTitle,
                info: user.professionalInfo.info,
                skills: user.professionalInfo.skills,
                imageURL: user.professionalInfo.imageURL,
            },
            socialLinks: {
                x: user.socialLinks.x,
                instagram: user.socialLinks.instagram,
                tiktok: user.socialLinks.tiktok,
                youtube: user.socialLinks.youtube,
                linkedin: user.socialLinks.linkedin,
            },
            visibility: {
                education: user.visibility.education,
                workHistory: user.visibility.workHistory,
                phoneNumber: user.visibility.phoneNumber,
                homeAddress: user.visibility.homeAddress,
                dateOfBirth: user.visibility.dateOfBirth,
            },
        }
    } catch (error) {
        console.log(error);
        parseErrorMsg(error);
    }
};

// Get user by address
export async function getUserByAddress(userAddress) {
    try {
        const contractObj = await contract();
        const user = await contractObj.getUserByAddress(userAddress);

        return {
            basicInfo: {
                firstName: user.basicInfo.firstName,
                lastName: user.basicInfo.lastName,
                email: user.basicInfo.email,
                homeAddress: user.basicInfo.homeAddress,
                dateOfBirth: user.basicInfo.dateOfBirth,
                phoneNumber: user.basicInfo.phoneNumber,
            },
            professionalInfo: {
                education: user.professionalInfo.education,
                workHistory: user.professionalInfo.workHistory,
                jobTitle: user.professionalInfo.jobTitle,
                info: user.professionalInfo.info,
                skills: user.professionalInfo.skills,
                imageURL: user.professionalInfo.imageURL,
            },
            socialLinks: {
                x: user.socialLinks.x,
                instagram: user.socialLinks.instagram,
                tiktok: user.socialLinks.tiktok,
                youtube: user.socialLinks.youtube,
                linkedin: user.socialLinks.linkedin,
            },
            visibility: {
                education: user.visibility.education,
                workHistory: user.visibility.workHistory,
                phoneNumber: user.visibility.phoneNumber,
                homeAddress: user.visibility.homeAddress,
                dateOfBirth: user.visibility.dateOfBirth,
            },
        }
    } catch (error) {
        console.log("Error in getUserByAddress:", error);
        return parseErrorMsg(error);
    }
};

// Function to add a job ID that a user has applied to
export async function addJob(username, jobId) {
    try {
        const contractObj = await contract();
        const transactionResponse = await contractObj.addJob(username, jobId);
        const receipt = await transactionResponse.wait();
        return receipt;
    } catch (e) {
        console.error("Error in addJob:", e);
        return parseErrorMsg(e);
    }
}

// Function to get all job IDs applied by a user
export async function getJobs(username) {
    try {
        const contractObj = await contract();
        const jobIds = await contractObj.getJobs(username);
        return jobIds.map((jobId) => jobId.toString());
    } catch (e) {
        console.error("Error in getJobs:", e);
        return parseErrorMsg(e);
    }
}

// Function to set the visibility of user information
export async function setVisibility(
    username,
    education,
    workHistory,
    phoneNumber,
    homeAddress,
    dateOfBirth
) {
    try {
        const contractObj = await contract();
        const transactionResponse = await contractObj.setVisibility(
            username,
            education,
            workHistory,
            phoneNumber,
            homeAddress,
            dateOfBirth
        );
        const receipt = await transactionResponse.wait();
        return receipt;
    } catch (e) {
        console.error("Error in setVisibility:", e);
        return parseErrorMsg(e);
    }
}

// Function to get the visibility of user information
export async function getVisibility(username) {
    try {
        const contractObj = await contract();
        const visibility = await contractObj.getVisibility(username);
        return {
            education: visibility.education,
            workHistory: visibility.workHistory,
            phoneNumber: visibility.phoneNumber,
            homeAddress: visibility.homeAddress,
            dateOfBirth: visibility.dateOfBirth,
        };
    } catch (e) {
        console.error("Error in getVisibility:", e);
        return parseErrorMsg(e);
    }
}