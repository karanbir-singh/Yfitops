//* Export functions
module.exports = {
    getFileURL,
    getFileNames,
    addFile,
    deleteFile
}

//* Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

//* Create a storage reference from our storage service
const storageRef = storage.ref();

//* Get single online file download/play URL
async function getFileURL(user, fileName) {
    return await storageRef.child(user + "/" + fileName).getDownloadURL();
}

//> Get user uploaded file names
async function getFileNames(user) {
    // Get file names within the user folder
    return (await storageRef.child(user).listAll())._delegate.items.map(item => { return item._location.path_.split('/')[1]; });
}

//> Add file on Firebase storage
async function addFile(user, file) {
    // New file reference
    const fileRef = storageRef.child(user + '/' + file.name);

    // Send file to the storage
    const req = await fileRef.put(file).then((snapshot) => {
        return true;
    });

    return req;
}

//> Delete file on Firebase storage
async function deleteFile(user, fileName) {
    // File to delete
    const fileRef = storageRef.child(user + '/' + fileName);

    // Delete the file
    fileRef.delete().then(() => {
        location.reload();
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
    });
}