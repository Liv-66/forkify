export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, image) {
        const like = { id, title, author, image };
        this.likes.push(like);
        this.storageLikes();
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(e => e.id === id);
        this.likes.splice(index, 1);
        this.storageLikes();
    }
    
    isLike(id) {
        return this.likes.findIndex(e => e.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    storageLikes() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        if(localStorage.likes) this.likes = JSON.parse(localStorage.likes);
    }


};