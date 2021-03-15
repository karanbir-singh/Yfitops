module.exports = {
    getFileURL,
    getFileNames,
    getPlaylist,

    addFile
}

// Hook
function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

//> Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

//> Create a storage reference from our storage service
const storageRef = storage.ref();


//TODO set playlist a globalstate

//* Get single online file download/play URL
async function getFileURL(user, filePath) {
    return await storageRef.child(user + "/" + filePath).getDownloadURL();
}

//* Get user uploaded file names
async function getFileNames(user) {
    return (await storageRef.child(user).listAll())._delegate.items.map(item => { return item._location.path_.split('/')[1]; });
}

//* Get User playlist
async function getPlaylist(user) {
    let titles = await getFileNames(user);

    let list = [];
    for (const title of titles) {
        list.push({ title: formatTitle(title), src: await getFileURL(user, title) });
    }
    return list;
}

async function addFile(user, file) {
    const fileRef = storageRef.child(user + '/' + file.name);
    fileRef.put(file).then((snapshot) => {
        // getFileURL(user, file.name).then((url) => {
        //     let data = JSON.parse(localStorage.getItem("user-playlist"));
        //     data.push({ title: formatTitle(file.name), src: url });

        // });
    });
}

// Formats the track title
function formatTitle(title) {
    if (title === undefined) {
        return;
    }
    if (title.includes('.mp3')) {
        return title.split('.mp3')[0];
    }
    if (title.includes('.m4a')) {
        return title.split('.m4a')[0];
    }
    if (title.includes('.flac')) {
        return title.split('.flac')[0];
    }
}