module.exports = {
    getFileURL,
    getFileNames,
    getPlaylist,
    addFile
}

//> Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

//> Create a storage reference from our storage service
const storageRef = storage.ref();

//* Get single online file download/play URL
async function getFileURL(user, filePath) {
    return await storageRef.child(user + "/" + filePath).getDownloadURL();
}

//* Get user uploaded file names
async function getFileNames(user) {
    return (await storageRef.child(user).listAll())._delegate.items.map(item => { return item._location.path_.split('/')[1]; });
}

//* Add file on Firebase storage
async function addFile(user, file) {
    // New file reference
    const fileRef = storageRef.child(user + '/' + file.name);
    
    // Send file to the storage
    const req = await fileRef.put(file).then((snapshot) => {
        return getFileURL(user, file.name);
    });

    return req;
}

//* Get User playlist
async function getPlaylist(user) {
    let titles = await getFileNames(user);

    let list = [];
    for (const title of titles) {
        list.push({ title: title, src: await getFileURL(user, title) });
    }
    return list;
}