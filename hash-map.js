class Node {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class HashMap {
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
            this.#capacity *= 2;
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

    // set given value to given key
    set(key, value) {
        this.#growBucketsSize();
        const index = this.#hash(key);
        let node = this.#buckets[index];

        if (node === null) {
            this.#buckets[index] = new Node(key, value);
            return;
        }

        while (node !== null) {
            if (node.key === key) {
                node.value = value;
                return;
            }
            if (node.next === null) {
                node.next = new Node(key, value);
                return;
            }
            node = node.next;
        }
    }

    // return value assigned to given key
    get(key) {
        const index = this.#hash(key);
        let node = this.#buckets[index];

        while (node !== null) {
            if (node.key === key) return node.value;
            node = node.next;
        }
        return null;
    }

    // return true if the key is in the has map, otherwise return false
    has(key) {
        const index = this.#hash(key);
        let node = this.#buckets[index];

        while (node !== null) {
            if (node.key === key) return true;
            node = node.next;
        }
        return false;
    }

    // remove entry with given key in hash map and return true, otherwise return false
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

    // return the number of the stored keys in the hash map
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

    // removes all entries in the hash map
    clear() {
        this.#buckets.fill(null);
    }

    // return an array containing all the keys inside the hash map
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

    // return an array containing all the values inside the hash map
    values() {
        let values = [];

        for (let i = 0; i < this.#buckets.length; i++) {
            let node = this.#buckets[i];
            while (node !== null) {
                values.push(node.value);
                node = node.next;
            }
        }
        return values;
    }

    // return an array containing each 'key, value' pair - '[[firstKey, firstValue], [secondKey, secondValue]]'
    entries() {
        let entries = [];

        for (let i = 0; i < this.#buckets.length; i++) {
            let node = this.#buckets[i];
            while (node !== null) {
                entries.push([node.key, node.value]);
                node = node.next;
            }
        }
        return entries;
    }
}

let hashMap = new HashMap();

hashMap.set('car', 'Volvo');
hashMap.set('car', 'Toyota');
hashMap.set('1', '1');
hashMap.set('2', '2');
hashMap.set('3', '3');
hashMap.set('4', '4');
hashMap.set('5', '5');
hashMap.set('6', '6');
hashMap.set('7', '7');
hashMap.set('8', '8');
hashMap.set('9', '9');
hashMap.set('10', '10');
hashMap.set('11', '11');
hashMap.set('12', '12');
hashMap.set('13', '13');
hashMap.set('14', '14');
hashMap.set('15', '15');
hashMap.remove('10');

console.log(hashMap.get('car'));
console.log(hashMap.has('randomName'));
console.log(hashMap.length());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());

hashMap.clear();
console.log(hashMap.length());
console.log(hashMap.entries());
