module.exports = {
    getFileURL,
    getFileNames,
    getPlaylist
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
    console.log(await storageRef.child(user).listAll());
    return (await storageRef.child(user).listAll())._delegate.items.map(item => { return item._location.path_.split('/')[1]; });
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