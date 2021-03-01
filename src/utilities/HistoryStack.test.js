import HistoryStack from './HistoryStack';

test('history stack size', () => {
	let stack = new HistoryStack(3);
	expect(stack.size).toBe(0);
	stack.push(1);
	expect(stack.size).toBe(1);
	stack.push(2);
	stack.push(3);
	stack.push(4);
	expect(stack.size).toBe(3);
	stack.pop();
	expect(stack.size).toBe(2);
	stack.pop();
	expect(stack.size).toBe(1);
	stack.pop();
	expect(stack.size).toBe(0);
});

test('history stack value', () => {
	let stack = new HistoryStack(3);
	stack.push(1);
	expect(stack.pop()).toBe(1);
	stack.push(2);
	stack.push(3);
	expect(stack.pop()).toBe(3);
	expect(stack.pop()).toBe(2);
	expect(stack.pop()).toBe(null);
});
