class Node {
	constructor(value) {
		this.value = value;
		this.prev = null;
		this.next = null;
	}
}

export default class HistoryStack {
	constructor(capacity) {
		this.capacity = capacity;
		this.size = 0;
		this.head = new Node(null);
		this.tail = new Node(null);
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	push(value) {
		if (this.size === this.capacity) {
			this._removeFirst();
		}
		let node = new Node(value);
		let last = this.tail.prev;
		last.next = node;
		node.prev = last;
		node.next = this.tail;
		this.tail.prev = node;
		this.size += 1;
	}

	_removeFirst() {
		let first = this.head.next;
		this.head.next = first.next;
		first.next.prev = this.head;
		first = null;
		this.size -= 1;
	}

	pop() {
		if (this.size > 0) {
			let last = this.tail.prev;
			this.tail.prev = last.prev;
			last.prev.next = this.tail;
			this.size -= 1;
			return last.value;
		}
		return null;
	}

	clear() {
		this.head.next = this.tail;
		this.tail.prev = this.head;
		this.size = 0;
	}
}
