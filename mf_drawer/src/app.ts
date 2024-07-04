console.log("uhuuu")
const favoriteCountElement = document.getElementById('favorite-count');
console.log(favoriteCountElement)
function getFavoriteCount() {
    return 5;
}

function updateFavoriteCount() {
    const count = getFavoriteCount();
    if (favoriteCountElement) favoriteCountElement.textContent = `${count}`;
}

updateFavoriteCount();

