class Node {
    constructor(key, next = null) {
        this.key = key;
        this.next = next;
    }
}

class HashSet {
    #capacity = 16;
    #loadFactor = 0.75;
    #buckets = new Array(this.#capacity);

    constructor() {
        this.#buckets.fill(null);
    }

    // change buckets size if quantity / capacity >= load factor
    #growBucketsSize() {
        let quantity = this.length();
        if (quantity / this.#capacity >= this.#loadFactor) {
            this.#capacity = this.#capacity * 2;
            let newBuckets = new Array(this.#capacity).fill(null);

            for (let i = 0; i < this.#buckets.length; i++) {
                let node = this.#buckets[i];
                while (node !== null) {
                    let newIndex = this.#hash(node.key);
                    let nextNode = node.next;
                    node.next = newBuckets[newIndex];
                    newBuckets[newIndex] = node;
                    node = nextNode;
                }
            }
            this.#buckets = newBuckets;
        }
    }

    // return hash code that is produced from given key
    #hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
        }
        return hashCode;
    }

    // add given key to hash set
    set(key) {
        this.#growBucketsSize();
        const index = this.#hash(key);
        let node = this.#buckets[index];

        if (node === null) {
            this.#buckets[index] = new Node(key);
            return;
        }

        while (node !== null) {
            if (node.key === key) return;
            if (node.next === null) {
                node.next = new Node(key);
                return;
            }
            node = node.next;
        }
    }

    // return true if the key is in the hash set, otherwise return false
    has(key) {
        const index = this.#hash(key);
        let node = this.#buckets[index];

        while (node !== null) {
            if (node.key === key) return true;
            node = node.next;
        }
        return false;
    }

    // remove given key in hash set and return true, otherwise return false
    remove(key) {
        const index = this.#hash(key);
        let node = this.#buckets[index];
        let prevNode = null;

        while (node !== null) {
            if (node.key === key) {
                if (prevNode === null) {
                    this.#buckets[index] = node.next;
                } else {
                    prevNode.next = node.next;
                }
                return true;
            }

            prevNode = node;
            node = node.next;
        }
        return false;
    }

    // return the number of the stored keys in the hash set
    length() {
        let numberOfKeys = 0;

        for (let i = 0; i < this.#buckets.length; i++) {
            let node = this.#buckets[i];
            while (node !== null) {
                numberOfKeys++;
                node = node.next;
            }
        }
        return numberOfKeys;
    }

    // clear all keys in the hash set
    clear() {
        this.#buckets.fill(null);
    }

    // return an array containing all the keys inside the hash set
    keys() {
        let keys = [];

        for (let i = 0; i < this.#buckets.length; i++) {
            let node = this.#buckets[i];
            while (node !== null) {
                keys.push(node.key);
                node = node.next;
            }
        }
        return keys;
    }
}

let hashSet = new HashSet();

hashSet.set('car');
hashSet.set('car');
hashSet.set('1');
hashSet.set('2');
hashSet.set('3');
hashSet.set('4');
hashSet.set('5');
hashSet.set('6');
hashSet.set('7');
hashSet.set('8');
hashSet.set('9');
hashSet.set('10');
hashSet.set('11');
hashSet.set('12');
hashSet.set('13');
hashSet.set('14');
hashSet.set('15');
hashSet.remove('10');

console.log(hashSet.has('randomName'));
console.log(hashSet.length());
console.log(hashSet.keys());

hashSet.clear();
console.log(hashSet.length());
console.log(hashSet.keys());
