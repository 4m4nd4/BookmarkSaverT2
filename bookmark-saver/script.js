const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", function () {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();

    if (!name || !url) {
        alert("Please enter both name and URL.");
        return;
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
        alert("Please enter a valid URL starting with http:// or https://");
        return;
        }

        addBookmark(name, url);
        saveBookmark(name, url);
        bookmarkNameInput.value = "";
        bookmarkUrlInput.value = "";
    }
});

function addBookmark(name, url) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = name;
    link.target = "_blank";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        bookmarkList.removeChild(li);
        removeBookmarkFromStorage(name, url);
    });

    li.appendChild(link);
    li.appendChild(removeButton);

    bookmarkList.appendChild(li);
}

function getBookmarksFromStorage() {
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
    /* 
        Is there actually a piece of paper in this drawer?
            - If YES (?): It takes the paper, uses JSON.parse to rebuild the LEGO blocks (turning the text back into a real list), and hands it over.
            - If NO (:): If the drawer is completely empty (like the very first time you open the website), it doesn't panic. It just hands over an empty list ([]) so you can start fresh.

            JSON.stringify(): Takes that live data and converts it into a single, long string of text.
            JSON.parse(): reads that text string, interprets the data structure, and completely resurrects it back into a live JavaScript object or list that you can interact with.

            - stringify() turns Objects -> Text (so you can save it).
            - parse() turns Text -> Objects (so you can use it).
    */
}

function saveBookmark(name, url) {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.push({ name, url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}

function removeBookmarkFromStorage(name, url) {
    let bookmarks = getBookmarksFromStorage();
    bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url !== url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}